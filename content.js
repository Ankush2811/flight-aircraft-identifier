// Know Your Plane Content Script
(function() {
  'use strict';

  // Configuration
  const CONFIG = {
    scanInterval: 2000, // Scan every 2 seconds for new content
    processedClass: 'aircraft-identified',
    tagClass: 'aircraft-manufacturer-tag'
  };

  // Common selectors for flight information across different booking sites
  const FLIGHT_SELECTORS = [
    // Generic selectors
    '[data-testid*="aircraft"]',
    '[class*="aircraft"]',
    '[class*="plane"]',
    '[class*="equipment"]',
    '.flight-details',
    '.segment-details',
    '.aircraft-type',
    '.plane-type',
    
    // Site-specific selectors
    // Google Flights
    '.pJTWq', // Aircraft info
    '[data-value*="Boeing"]',
    '[data-value*="Airbus"]',
    
    // Expedia
    '.flight-module-segment-aircraft-type',
    '.segment-aircraft',
    
    // Kayak
    '.c_cgF.c_cgF-mod-variant-default',
    '.aircraft',
    
    // Skyscanner
    '[data-testid="trip-details"]',
    '.FlightLegDetails_aircraft',
    
    // United
    '.app-components-FlightResults-FlightResultsSegment-FlightResultsSegment__aircraft',
    
    // Delta
    '.aircraft-info',
    
    // American Airlines
    '.aircraft-type-name',
    
    // Indian booking sites
    // Cleartrip
    '.flight-info-wrap',
    '.aircraft-details',
    '.flight-segment-info',
    '.flight-detail-row',
    
    // Ixigo
    '.flight-card',
    '.flight-details-wrap',
    '.aircraft-info',
    '.flight-info-row',
    
    // MakeMyTrip
    '.flight-details-section',
    '.aircraft-type-info',
    '.flight-leg-info',
    
    // Goibibo
    '.flight-item',
    '.flight-aircraft-info',
    '.fli-list-wrap',
    
    // Yatra
    '.flight-result-item',
    '.aircraft-name',
    '.flight-segment-detail'
  ];

  // Text patterns to search for aircraft information
  const AIRCRAFT_PATTERNS = [
    /Boeing\s*(\d{3})/gi,
    /Airbus\s*A(\d{3})/gi,
    /B(\d{3})/gi,
    /A(\d{3})/gi,
    /(\d{3})\s*(Boeing|Airbus)/gi,
    /(Boeing|Airbus)\s*(\d{3})/gi,
    /Aircraft:\s*([^\n\r]+)/gi,
    /Equipment:\s*([^\n\r]+)/gi,
    /Plane:\s*([^\n\r]+)/gi
  ];

  // Create and inject styles
  function injectStyles() {
    if (document.getElementById('aircraft-identifier-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'aircraft-identifier-styles';
    style.textContent = `
      .aircraft-manufacturer-tag {
        display: inline-block !important;
        padding: 3px 8px !important;
        margin: 0 4px !important;
        border-radius: 12px !important;
        font-size: 10px !important;
        font-weight: bold !important;
        color: white !important;
        text-transform: none !important;
        letter-spacing: 0.3px !important;
        box-shadow: 0 1px 3px rgba(0,0,0,0.2) !important;
        z-index: 9999 !important;
        position: relative !important;
        white-space: nowrap !important;
        max-width: 150px !important;
        overflow: hidden !important;
        text-overflow: ellipsis !important;
      }
      
      .aircraft-manufacturer-tag.boeing {
        background-color: #0066CC !important;
      }
      
      .aircraft-manufacturer-tag.airbus {
        background-color: #FF6B35 !important;
      }
      
      .aircraft-manufacturer-tag.other {
        background-color: #666666 !important;
      }
      
      .aircraft-info-enhanced {
        position: relative !important;
      }
      
      .aircraft-highlight {
        background-color: rgba(255, 235, 59, 0.3) !important;
        padding: 2px 4px !important;
        border-radius: 3px !important;
      }
    `;
    document.head.appendChild(style);
  }

  // Create manufacturer tag with detailed model information
  function createManufacturerTag(aircraftInfo) {
    const tag = document.createElement('span');
    const manufacturer = aircraftInfo.manufacturer || 'Unknown';
    const model = aircraftInfo.model || '';
    const fullName = aircraftInfo.fullName || `${manufacturer} ${model}`;
    const confidence = aircraftInfo.confidence || 'direct';
    
    tag.className = `aircraft-manufacturer-tag ${manufacturer.toLowerCase()} ${confidence}`;
    
    // Different display logic based on confidence
    if (confidence === 'airline-based') {
      // For airline-based detection, just show manufacturer name
      tag.textContent = manufacturer + '*';
      tag.title = `${manufacturer} aircraft - Based on airline fleet data`;
      // Add a dashed border indicator for airline-based identification
      tag.style.border = '1px dashed rgba(255,255,255,0.8)';
      tag.style.opacity = '0.9';
    } else {
      // For direct detection, show detailed aircraft information
      if (model && model !== manufacturer) {
        // Show specific model (e.g., "Boeing 737 MAX", "Airbus A350")
        if (fullName.length <= 20) {
          tag.textContent = fullName;
        } else {
          // Fallback to shorter format for very long names
          tag.textContent = `${manufacturer} ${model}`;
        }
      } else {
        // Fallback to just manufacturer
        tag.textContent = manufacturer;
      }
      tag.title = `Aircraft: ${fullName}`;
      tag.style.border = '1px solid transparent';
    }
    
    return tag;
  }

  // Search for aircraft information in text content
  function findAircraftInText(text, context = {}) {
    if (!text) return null;
    
    const cleanText = text.replace(/\s+/g, ' ').trim();
    
    // First try direct identification
    const directMatch = identifyAircraft(cleanText);
    if (directMatch) {
      return directMatch;
    }
    
    // Try pattern matching for aircraft models
    for (const pattern of AIRCRAFT_PATTERNS) {
      const matches = cleanText.match(pattern);
      if (matches) {
        for (const match of matches) {
          const identified = identifyAircraft(match);
          if (identified) {
            return identified;
          }
        }
      }
    }
    
    // Try enhanced identification (airline-based)
    const enhanced = identifyAircraftEnhanced(cleanText, context);
    if (enhanced) {
      return enhanced;
    }
    
    return null;
  }

  // Extract airline information from flight card
  function extractAirlineInfo(element) {
    const text = element.textContent || element.innerText || '';
    
    // Common patterns for airline names and codes
    const airlinePatterns = [
      /IndiGo|6E/i,
      /SpiceJet|SG/i,
      /Air India|AI/i,
      /Vistara|UK/i,
      /GoAir|Go First|G8/i,
      /AirAsia|I5/i,
      /Akasa|QP/i,
      /Jet Airways|9W/i
    ];
    
    for (const pattern of airlinePatterns) {
      const match = text.match(pattern);
      if (match) {
        return match[0];
      }
    }
    
    return null;
  }

  // Process a single element for aircraft information
  function processElement(element) {
    if (element.classList.contains(CONFIG.processedClass)) return;
    
    const textContent = element.textContent || element.innerText || '';
    
    // Extract airline context for enhanced identification
    const airlineInfo = extractAirlineInfo(element);
    const context = airlineInfo ? { airline: airlineInfo } : {};
    
    const aircraft = findAircraftInText(textContent, context);
    
    if (aircraft) {
      element.classList.add(CONFIG.processedClass);
      
      // Create and insert the tag with detailed aircraft information
      const tag = createManufacturerTag(aircraft);
      
      // Find the best place to insert the tag
      let insertLocation = element;
      
      // For airline-based identification, try to place near airline info
      if (aircraft.confidence === 'airline-based') {
        const airlineElements = element.querySelectorAll('*');
        for (const airlineEl of airlineElements) {
          if (airlineEl.textContent && extractAirlineInfo(airlineEl)) {
            insertLocation = airlineEl;
            break;
          }
        }
      } else {
        // For direct identification, find aircraft-specific location
        const possibleLocations = element.querySelectorAll('span, div, p');
        for (const location of possibleLocations) {
          const locationAircraft = findAircraftInText(location.textContent, context);
          if (locationAircraft && locationAircraft.confidence === 'direct') {
            insertLocation = location;
            break;
          }
        }
      }
      
      // Insert the tag
      if (insertLocation.children.length > 0) {
        insertLocation.appendChild(tag);
      } else {
        insertLocation.parentNode.insertBefore(tag, insertLocation.nextSibling);
      }
      
      // Add highlight class for direct matches only
      if (aircraft.confidence === 'direct') {
        insertLocation.classList.add('aircraft-highlight');
      }
      
      // Update statistics
      updateStatistics(aircraft.manufacturer);
      
      const displayText = aircraft.fullName || `${aircraft.manufacturer} ${aircraft.model}`;
      console.log(`Aircraft identified: ${displayText} (${aircraft.confidence})`);
    }
  }

  // Update statistics
  function updateStatistics(manufacturer) {
    chrome.storage.local.get(['aircraftStats'], function(result) {
      const stats = result.aircraftStats || {
        total: 0,
        boeing: 0,
        airbus: 0,
        other: 0
      };
      
      stats.total++;
      
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
        // Notify popup to update statistics
        chrome.runtime.sendMessage({ 
          action: 'updateStats', 
          stats: stats 
        });
      });
    });
  }

  // Scan page for flight information
  function scanPage() {
    // Process elements matching our selectors
    FLIGHT_SELECTORS.forEach(selector => {
      try {
        const elements = document.querySelectorAll(selector);
        elements.forEach(processElement);
      } catch (e) {
        // Ignore selector errors for sites that don't support certain selectors
      }
    });
    
    // Also scan common text patterns throughout the page
    const allElements = document.querySelectorAll('*');
    for (const element of allElements) {
      if (element.children.length === 0 && element.textContent) {
        const text = element.textContent.trim().toLowerCase();
        if ((text.includes('boeing') || text.includes('airbus') || 
             text.match(/\bb?\d{3}\b/) || text.includes('aircraft') || 
             text.includes('equipment') || text.includes('plane')) && 
            text.length < 200) {
          processElement(element);
        }
      }
    }
  }

  // Extension state
  let extensionEnabled = true;
  let scanningInterval;
  let domObserver;

  // Initialize the extension
  function init() {
    console.log('Know Your Plane: Initializing...');
    
    // Check if extension is enabled
    chrome.storage.sync.get(['extensionEnabled'], function(result) {
      extensionEnabled = result.extensionEnabled !== false;
      
      if (extensionEnabled) {
        startExtension();
      }
    });
    
    // Listen for messages from popup
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
      if (request.action === 'toggleExtension') {
        extensionEnabled = request.enabled;
        
        if (extensionEnabled) {
          startExtension();
        } else {
          stopExtension();
        }
        
        sendResponse({success: true});
      }
    });
    
    console.log('Know Your Plane: Ready!');
  }

  // Start extension functionality
  function startExtension() {
    injectStyles();
    
    // Initial scan
    scanPage();
    
    // Set up periodic scanning for dynamic content
    if (scanningInterval) clearInterval(scanningInterval);
    scanningInterval = setInterval(() => {
      if (extensionEnabled) scanPage();
    }, CONFIG.scanInterval);
    
    // Watch for DOM changes
    if (domObserver) domObserver.disconnect();
    domObserver = new MutationObserver((mutations) => {
      if (!extensionEnabled) return;
      
      let shouldScan = false;
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          shouldScan = true;
        }
      });
      if (shouldScan) {
        setTimeout(scanPage, 500); // Debounce
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

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})(); 