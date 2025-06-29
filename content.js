// Know Your Plane Content Script
(function() {
  'use strict';

  // Configuration
  const CONFIG = {
    scanInterval: 8000, // Scan every 8 seconds
    processedClass: 'aircraft-identified',
    tagClass: 'aircraft-manufacturer-tag',
    flightCardClass: 'flight-processed'
  };

  // Site-specific flight card selectors
  const SITE_SELECTORS = {
    // Kayak
    'kayak.com': {
      flightCards: ['[data-resultid]', '.flight-card', '.result-item'],
      insertionTargets: ['.airline', '.codeshares', '.flight-info', '.segment-info'],
      aircraftSelectors: ['.aircraft', '.plane-type']
    },
    
    // Google Flights
    'flights.google.com': {
      flightCards: ['[data-testid*="flight"]', '.pJTWq', '.gws-flights-results__collapsed-itinerary'],
      insertionTargets: ['.gws-flights-results__itinerary-operator', '.airline', '.flight-info'],
      aircraftSelectors: ['.gws-flights-results__aircraft', '.aircraft-type']
    },
    
    // Expedia
    'expedia.com': {
      flightCards: ['.flight-module', '.flight-info', '.uitk-layout-flex-item'],
      insertionTargets: ['.airline-name', '.flight-operator', '.segment-info'],
      aircraftSelectors: ['.flight-aircraft', '.equipment']
    },
    
    // Cleartrip
    'cleartrip.com': {
      flightCards: ['.flight-card', '.flight-info-wrap', '.flight-detail-row'],
      insertionTargets: ['.airline-info', '.flight-operator', '.carrier-info'],
      aircraftSelectors: ['.aircraft-details', '.aircraft-type']
    },
    
    // MakeMyTrip
    'makemytrip.com': {
      flightCards: ['.flight-details-section', '.listingCard', '.flight-card'],
      insertionTargets: ['.airline-name', '.operator-name', '.flight-info'],
      aircraftSelectors: ['.aircraft-type-info', '.equipment-type']
    },
    
    // Skyscanner
    'skyscanner.com': {
      flightCards: ['[data-testid*="flight"]', '.FlightCard', '.itinerary'],
      insertionTargets: ['.airline', '.carrier', '.operator'],
      aircraftSelectors: ['.aircraft', '.equipment']
    }
  };

  // Generic fallback selectors
  const GENERIC_SELECTORS = {
    flightCards: [
      '[class*="flight-card"]', '[class*="flight-result"]', '[class*="flight-item"]',
      '[class*="result-item"]', '[class*="itinerary"]', '[data-testid*="flight"]',
      '.flight', '.segment', '.result'
    ],
    insertionTargets: [
      '[class*="airline"]', '[class*="operator"]', '[class*="carrier"]',
      '.flight-info', '.segment-info', '.flight-details'
    ]
  };

  // Aircraft patterns
  const AIRCRAFT_PATTERNS = [
    /Airbus\s*A(\d{3})/gi,
    /Boeing\s*(\d{3})/gi,
    /A(\d{3})/gi,
    /B(\d{3})/gi
  ];

  // Get current site configuration
  function getSiteConfig() {
    const hostname = window.location.hostname.toLowerCase();
    
    for (const [site, config] of Object.entries(SITE_SELECTORS)) {
      if (hostname.includes(site)) {
        console.log(`🌐 Detected site: ${site}`);
        return config;
      }
    }
    
    console.log('🌐 Using generic selectors for:', hostname);
    return GENERIC_SELECTORS;
  }

  // Create and inject styles
  function injectStyles() {
    if (document.getElementById('aircraft-identifier-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'aircraft-identifier-styles';
    style.textContent = `
      .aircraft-manufacturer-tag {
        display: inline-flex !important;
        align-items: center !important;
        padding: 3px 7px !important;
        margin: 0 5px !important;
        border-radius: 10px !important;
        font-size: 10px !important;
        font-weight: 600 !important;
        color: white !important;
        text-transform: uppercase !important;
        letter-spacing: 0.3px !important;
        box-shadow: 0 1px 3px rgba(0,0,0,0.4) !important;
        z-index: 999999 !important;
        position: relative !important;
        white-space: nowrap !important;
        border: 1px solid rgba(255,255,255,0.3) !important;
        vertical-align: middle !important;
        line-height: 1 !important;
        max-height: 20px !important;
      }
      
      .aircraft-manufacturer-tag.boeing {
        background: linear-gradient(135deg, #0066CC 0%, #004499 100%) !important;
      }
      
      .aircraft-manufacturer-tag.airbus {
        background: linear-gradient(135deg, #FF6B35 0%, #CC5522 100%) !important;
      }
      
      .aircraft-manufacturer-tag.other {
        background: linear-gradient(135deg, #666666 0%, #444444 100%) !important;
      }
      
      /* Specific positioning fixes for different sites */
      [data-resultid] .aircraft-manufacturer-tag {
        margin-left: 8px !important;
        margin-right: 4px !important;
      }
      
      .flight-card .aircraft-manufacturer-tag {
        margin: 2px 6px !important;
      }
      
      /* Prevent tags from floating to corners */
      .aircraft-manufacturer-tag {
        float: none !important;
        position: static !important;
        transform: none !important;
      }
    `;
    document.head.appendChild(style);
  }

  // Create manufacturer tag
  function createManufacturerTag(manufacturer, model) {
    const tag = document.createElement('span');
    tag.className = `aircraft-manufacturer-tag ${manufacturer.toLowerCase()}`;
    tag.setAttribute('data-extension-created', 'true');
    tag.textContent = manufacturer.toUpperCase();
    tag.title = `Aircraft: ${manufacturer} ${model}`;
    
    return tag;
  }

  // Find aircraft information in text
  function findAircraftInText(text) {
    if (!text || typeof text !== 'string') return null;
    
    const cleanText = text.trim().toLowerCase();
    
    for (const pattern of AIRCRAFT_PATTERNS) {
      const matches = cleanText.match(pattern);
      if (matches) {
        const match = matches[0];
        
        // Airbus detection
        if (match.includes('airbus') || match.includes('a32') || match.includes('a33') || 
            match.includes('a34') || match.includes('a35') || match.includes('a38')) {
          const modelMatch = match.match(/a?(\d{3})/i);
          return {
            manufacturer: 'Airbus',
            model: modelMatch ? `A${modelMatch[1]}` : 'A321'
          };
        }
        
        // Boeing detection
        if (match.includes('boeing') || match.includes('b73') || match.includes('b74') || 
            match.includes('b75') || match.includes('b76') || match.includes('b77') || match.includes('b78')) {
          const modelMatch = match.match(/b?(\d{3})/i);
          return {
            manufacturer: 'Boeing',
            model: modelMatch ? modelMatch[1] : '737'
          };
        }
        
        // Handle standalone numbers (common aircraft models)
        const numberMatch = match.match(/(\d{3})/);
        if (numberMatch) {
          const number = numberMatch[1];
          if (['318', '319', '320', '321', '330', '340', '350', '380'].includes(number)) {
            return {
              manufacturer: 'Airbus',
              model: `A${number}`
            };
          }
          if (['737', '747', '757', '767', '777', '787'].includes(number)) {
            return {
              manufacturer: 'Boeing',
              model: number
            };
          }
        }
      }
    }
    
    return null;
  }

  // Find the best insertion point for the tag
  function findBestInsertionPoint(flightCard, siteConfig) {
    console.log('🎯 Finding insertion point for:', flightCard);
    
    // Try site-specific insertion targets first
    if (siteConfig.insertionTargets) {
      for (const selector of siteConfig.insertionTargets) {
        const target = flightCard.querySelector(selector);
        if (target && target.textContent.trim().length > 0) {
          console.log(`✅ Found site-specific target: ${selector}`);
          return { element: target, method: 'inline' };
        }
      }
    }
    
    // Try to find airline/operator information
    const airlineSelectors = [
      '[class*="airline"]', '[class*="operator"]', '[class*="carrier"]',
      '.airline', '.operator', '.carrier', '.flight-operator'
    ];
    
    for (const selector of airlineSelectors) {
      const target = flightCard.querySelector(selector);
      if (target && target.textContent.trim().length > 0) {
        console.log(`✅ Found airline element: ${selector}`);
        return { element: target, method: 'inline' };
      }
    }
    
    // Try to find flight info containers
    const infoSelectors = [
      '.flight-info', '.segment-info', '.flight-details', '.flight-header',
      '[class*="flight-info"]', '[class*="segment"]'
    ];
    
    for (const selector of infoSelectors) {
      const target = flightCard.querySelector(selector);
      if (target) {
        console.log(`✅ Found info container: ${selector}`);
        return { element: target, method: 'append' };
      }
    }
    
    // Fallback: find any suitable text container
    const textElements = flightCard.querySelectorAll('span, div');
    for (const element of textElements) {
      const text = element.textContent.trim();
      if (text.length > 5 && text.length < 100 && 
          (text.includes('flight') || text.includes('airline') || /\d{2}:\d{2}/.test(text))) {
        console.log('✅ Found text fallback element');
        return { element: element, method: 'inline' };
      }
    }
    
    console.log('⚠️ Using flight card as fallback');
    return { element: flightCard, method: 'append' };
  }

  // Insert tag into the best location
  function insertTag(tag, insertionPoint) {
    const { element, method } = insertionPoint;
    
    try {
      if (method === 'inline' && element.textContent.trim().length > 0) {
        // Insert after the text content inline
        element.appendChild(document.createTextNode(' '));
        element.appendChild(tag);
      } else {
        // Append to container
        element.appendChild(tag);
      }
      console.log('✅ Tag inserted successfully');
      return true;
    } catch (error) {
      console.log('❌ Tag insertion failed:', error);
      return false;
    }
  }

  // Process a single flight card
  function processFlightCard(flightCard, siteConfig) {
    // Skip if already processed
    if (flightCard.classList.contains(CONFIG.flightCardClass)) {
      return false;
    }
    
    // Skip if already has our tag
    if (flightCard.querySelector('.aircraft-manufacturer-tag')) {
      return false;
    }
    
    console.log('🔍 Processing flight card:', flightCard);
    
    // Get aircraft info - try specific selectors first, then all text
    let aircraftInfo = null;
    
    // Try site-specific aircraft selectors
    if (siteConfig.aircraftSelectors) {
      for (const selector of siteConfig.aircraftSelectors) {
        const aircraftElement = flightCard.querySelector(selector);
        if (aircraftElement) {
          aircraftInfo = findAircraftInText(aircraftElement.textContent);
          if (aircraftInfo) break;
        }
      }
    }
    
    // Fallback to scanning all text
    if (!aircraftInfo) {
      const flightText = flightCard.textContent || '';
      aircraftInfo = findAircraftInText(flightText);
    }
    
    if (aircraftInfo) {
      console.log(`✅ Found aircraft: ${aircraftInfo.manufacturer} ${aircraftInfo.model}`);
      
      // Mark as processed
      flightCard.classList.add(CONFIG.flightCardClass);
      
      // Create and insert tag
      const tag = createManufacturerTag(aircraftInfo.manufacturer, aircraftInfo.model);
      const insertionPoint = findBestInsertionPoint(flightCard, siteConfig);
      
      if (insertTag(tag, insertionPoint)) {
        updateStatistics(aircraftInfo.manufacturer);
        return true;
      }
    }
    
    return false;
  }

  // Update statistics with error handling
  function updateStatistics(manufacturer) {
    // Check if Chrome storage is available
    if (typeof chrome === 'undefined' || !chrome.storage || !chrome.storage.local) {
      console.log('📊 Chrome storage not available, skipping statistics update');
      return;
    }
    
    try {
      chrome.storage.local.get(['aircraftStats'], function(result) {
        if (chrome.runtime.lastError) {
          console.log('📊 Storage error:', chrome.runtime.lastError);
          return;
        }
        
        const stats = result.aircraftStats || {
          boeing: 0,
          airbus: 0,
          other: 0
        };
        
        switch (manufacturer.toLowerCase()) {
          case 'boeing':
            stats.boeing++;
            break;
          case 'airbus':
            stats.airbus++;
            break;
          default:
            stats.other++;
        }
        
        chrome.storage.local.set({ aircraftStats: stats }, function() {
          if (chrome.runtime.lastError) {
            console.log('📊 Storage set error:', chrome.runtime.lastError);
            return;
          }
          
          try {
            chrome.runtime.sendMessage({ 
              action: 'updateStats', 
              stats: stats 
            });
            console.log('📊 Statistics updated:', stats);
          } catch (e) {
            console.log('📊 Message send error (normal):', e.message);
          }
        });
      });
    } catch (error) {
      console.log('📊 Statistics update failed:', error.message);
    }
  }

  // Main scanning function
  function scanPage() {
    if (!extensionEnabled) return;
    
    console.log('🔍 Starting enhanced page scan...');
    
    const siteConfig = getSiteConfig();
    let processedCount = 0;
    let foundCount = 0;
    
    // Try site-specific selectors first
    siteConfig.flightCards.forEach((selector, index) => {
      try {
        const flightCards = document.querySelectorAll(selector);
        if (flightCards.length > 0) {
          console.log(`✅ Found ${flightCards.length} flight cards with: "${selector}"`);
          
          flightCards.forEach(card => {
            processedCount++;
            if (processFlightCard(card, siteConfig)) {
              foundCount++;
            }
          });
        }
      } catch (e) {
        console.log(`❌ Selector error for "${selector}":`, e.message);
      }
    });
    
    console.log(`🎯 Site-specific scan: processed ${processedCount} cards, tagged ${foundCount}`);
    
    // If no results, try generic approach
    if (foundCount === 0) {
      console.log('📝 Trying generic flight detection...');
      
      // Look for any elements that might contain flight information
      const potentialFlights = document.querySelectorAll('div, section, article');
      
      potentialFlights.forEach(element => {
        const text = element.textContent || '';
        
        // Check if this looks like a flight result
        if (text.length > 50 && text.length < 1000 &&
            (text.includes('departure') || text.includes('arrival') || 
             text.includes('flight') || /\d{1,2}:\d{2}/.test(text))) {
          
          processedCount++;
          if (processFlightCard(element, siteConfig)) {
            foundCount++;
          }
        }
      });
      
      console.log(`📝 Generic scan: processed ${processedCount} elements, tagged ${foundCount}`);
    }
  }

  // Extension state
  let extensionEnabled = true;
  let scanningInterval;
  let domObserver;

  // Initialize the extension with error handling
  function init() {
    console.log('Aircraft Identifier: Initializing...');
    
    // Check if Chrome APIs are available
    if (typeof chrome === 'undefined') {
      console.log('⚠️ Chrome APIs not available, running in basic mode');
      extensionEnabled = true;
      startExtension();
      return;
    }
    
    // Try to get extension settings
    try {
      if (chrome.storage && chrome.storage.sync) {
        chrome.storage.sync.get(['extensionEnabled'], function(result) {
          if (chrome.runtime.lastError) {
            console.log('⚠️ Storage access error, using defaults:', chrome.runtime.lastError);
            extensionEnabled = true;
          } else {
            extensionEnabled = result.extensionEnabled !== false;
          }
          
          if (extensionEnabled) {
            startExtension();
          }
        });
      } else {
        console.log('⚠️ Chrome storage not available, using defaults');
        extensionEnabled = true;
        startExtension();
      }
    } catch (error) {
      console.log('⚠️ Settings load error, using defaults:', error.message);
      extensionEnabled = true;
      startExtension();
    }
    
    // Set up message listener with error handling
    try {
      if (chrome.runtime && chrome.runtime.onMessage) {
        chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
          try {
            if (request.action === 'toggleExtension') {
              extensionEnabled = request.enabled;
              
              if (extensionEnabled) {
                startExtension();
              } else {
                stopExtension();
              }
              
              sendResponse({success: true});
            }
          } catch (error) {
            sendResponse({success: false, error: error.message});
          }
        });
      }
    } catch (error) {
      console.log('⚠️ Message listener setup failed:', error.message);
    }
    
    console.log('Aircraft Identifier: Ready!');
  }

  // Start extension functionality
  function startExtension() {
    injectStyles();
    
    // Initial scan after page loads
    setTimeout(scanPage, 3000);
    
    // Periodic scanning for dynamic content
    if (scanningInterval) clearInterval(scanningInterval);
    scanningInterval = setInterval(scanPage, CONFIG.scanInterval);
    
    // Watch for DOM changes
    if (domObserver) domObserver.disconnect();
    domObserver = new MutationObserver((mutations) => {
      if (!extensionEnabled) return;
      
      let shouldScan = false;
      for (const mutation of mutations) {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          shouldScan = true;
          break;
        }
      }
      
      if (shouldScan) {
        setTimeout(scanPage, 1000);
      }
    });
    
    domObserver.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  // Stop extension functionality
  function stopExtension() {
    if (scanningInterval) {
      clearInterval(scanningInterval);
      scanningInterval = null;
    }
    
    if (domObserver) {
      domObserver.disconnect();
      domObserver = null;
    }
    
    // Hide existing tags
    const existingTags = document.querySelectorAll('.aircraft-manufacturer-tag');
    existingTags.forEach(tag => tag.style.display = 'none');
  }

  // Initialize when ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    setTimeout(init, 1000);
  }

})(); 