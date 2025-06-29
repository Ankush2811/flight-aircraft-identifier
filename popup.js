// Aircraft Identifier Popup - Bulletproof Manifest v3 Version
(function() {
  'use strict';
  
  console.log('🚀 Popup starting...');
  console.log('📍 Location:', window.location.href);
  console.log('🔍 Chrome APIs:', {
    chrome: typeof chrome,
    storage: typeof chrome?.storage,
    runtime: typeof chrome?.runtime
  });
  
  // Check if we're in proper extension context
  const isExtensionContext = window.location.protocol === 'chrome-extension:';
  console.log('📋 Extension context:', isExtensionContext);
  
  if (!isExtensionContext) {
    console.error('❌ CRITICAL: Not in extension context!');
    showCriticalError();
    return;
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePopup);
  } else {
    initializePopup();
  }
  
  function showCriticalError() {
    document.body.innerHTML = `
      <div style="padding: 20px; text-align: center; color: white; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
        <h2>🚨 Extension Loading Error</h2>
        <p style="margin: 15px 0;">The extension is not loaded properly in Chrome.</p>
        
        <div style="background: rgba(255,255,255,0.1); padding: 15px; border-radius: 8px; margin: 20px 0; text-align: left;">
          <h3>🔧 Fix Steps:</h3>
          <ol style="margin: 10px 0; padding-left: 20px;">
            <li><strong>Close this popup/tab</strong></li>
            <li><strong>Go to chrome://extensions/</strong></li>
            <li><strong>Remove the Aircraft Identifier extension</strong></li>
            <li><strong>Click "Load unpacked"</strong></li>
            <li><strong>Select the filter-boeing folder</strong></li>
            <li><strong>Click the extension icon in toolbar (not open files directly)</strong></li>
          </ol>
        </div>
        
        <p style="font-size: 12px; opacity: 0.8;">
          Current URL: ${window.location.href}<br/>
          Expected: chrome-extension://...
        </p>
      </div>
    `;
  }
  
  async function initializePopup() {
    console.log('🔧 Initializing popup...');
    
    // Wait for Chrome APIs with timeout
    const chromeReady = await waitForChromeAPIs();
    if (!chromeReady) {
      showChromeAPIError();
      return;
    }
    
    console.log('✅ Chrome APIs ready');
    setupPopupInterface();
  }
  
  function waitForChromeAPIs(maxWait = 3000) {
    return new Promise((resolve) => {
      const startTime = Date.now();
      
      function checkAPIs() {
        if (chrome && chrome.storage && chrome.runtime) {
          console.log('✅ All Chrome APIs available');
          resolve(true);
          return;
        }
        
        if (Date.now() - startTime > maxWait) {
          console.error('❌ Chrome APIs timeout');
          resolve(false);
          return;
        }
        
        console.log('⏳ Waiting for Chrome APIs...');
        setTimeout(checkAPIs, 100);
      }
      
      checkAPIs();
    });
  }
  
  function showChromeAPIError() {
    document.body.innerHTML = `
      <div style="padding: 20px; text-align: center; color: white; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
        <h2>⚠️ Chrome API Error</h2>
        <p>Chrome extension APIs are not responding.</p>
        
        <div style="background: rgba(255,255,255,0.1); padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h3>Quick Fix:</h3>
          <p>1. <strong>Restart Chrome completely</strong></p>
          <p>2. <strong>Reload the extension</strong></p>
          <p>3. <strong>Try again</strong></p>
        </div>
      </div>
    `;
  }
  
  async function setupPopupInterface() {
    console.log('🎨 Setting up interface...');
    
    // Get DOM elements
    const elements = {
      toggleBtn: document.getElementById('enableExtension'),
      status: document.getElementById('status'),
      boeingCount: document.getElementById('boeingCount'),
      airbusCount: document.getElementById('airbusCount'),
      lastUpdate: document.getElementById('lastUpdate'),
      airlineMode: document.getElementById('showAirlineMode')
    };
    
    // Verify all elements exist
    const missing = Object.keys(elements).filter(key => !elements[key]);
    if (missing.length > 0) {
      console.error('❌ Missing elements:', missing);
    } else {
      console.log('✅ All DOM elements found');
    }
    
    // Set up event listeners
    if (elements.toggleBtn) {
      elements.toggleBtn.addEventListener('change', async () => {
        await toggleExtension(elements);
      });
    }
    
    if (elements.airlineMode) {
      elements.airlineMode.addEventListener('change', async () => {
        await toggleAirlineMode(elements);
      });
    }
    
    // Load initial data
    await loadExtensionData(elements);
    
    // Set up auto-refresh
    setInterval(() => loadExtensionData(elements), 5000);
    
    console.log('🎉 Popup setup complete!');
  }
  
  async function loadExtensionData(elements) {
    try {
      console.log('📊 Loading extension data...');
      
      // Load settings
      const settings = await chrome.storage.sync.get({
        extensionEnabled: true,
        airlineMode: true
      });
      
      // Load statistics  
      const statsData = await chrome.storage.local.get({
        aircraftStats: { boeing: 0, airbus: 0, other: 0 }
      });
      
      const stats = statsData.aircraftStats;
      console.log('📈 Stats loaded:', stats);
      
      // Update UI
      if (elements.toggleBtn) {
        elements.toggleBtn.checked = settings.extensionEnabled;
      }
      
      if (elements.airlineMode) {
        elements.airlineMode.checked = settings.airlineMode;
      }
      
      if (elements.boeingCount) {
        elements.boeingCount.textContent = stats.boeing || 0;
      }
      
      if (elements.airbusCount) {
        elements.airbusCount.textContent = stats.airbus || 0;
      }
      
      if (elements.status) {
        const total = (stats.boeing || 0) + (stats.airbus || 0) + (stats.other || 0);
        if (settings.extensionEnabled) {
          elements.status.textContent = `✅ ${total} Aircraft Found`;
          elements.status.classList.add('active');
        } else {
          elements.status.textContent = '❌ Extension Disabled';
          elements.status.classList.remove('active');
        }
      }
      
      if (elements.lastUpdate) {
        elements.lastUpdate.textContent = new Date().toLocaleTimeString();
      }
      
    } catch (error) {
      console.error('❌ Error loading data:', error);
      
      // Set safe defaults
      if (elements.boeingCount) elements.boeingCount.textContent = '0';
      if (elements.airbusCount) elements.airbusCount.textContent = '0';
      if (elements.status) elements.status.textContent = '⚠️ Data Error';
    }
  }
  
  async function toggleExtension(elements) {
    if (!elements.toggleBtn) return;
    
    const enabled = elements.toggleBtn.checked;
    console.log('🔄 Toggling extension:', enabled);
    
    try {
      await chrome.storage.sync.set({ extensionEnabled: enabled });
      console.log('✅ Setting saved');
      
      // Send message to content scripts
      try {
        const tabs = await chrome.tabs.query({active: true, currentWindow: true});
        if (tabs[0]) {
          await chrome.tabs.sendMessage(tabs[0].id, {
            action: 'toggleExtension',
            enabled: enabled
          });
          console.log('📤 Message sent to content script');
        }
      } catch (msgError) {
        console.log('ℹ️ Could not message content script (normal for some pages)');
      }
      
      // Refresh display
      await loadExtensionData(elements);
      
    } catch (error) {
      console.error('❌ Toggle error:', error);
      // Revert toggle
      elements.toggleBtn.checked = !enabled;
    }
  }
  
  async function toggleAirlineMode(elements) {
    if (!elements.airlineMode) return;
    
    const enabled = elements.airlineMode.checked;
    console.log('✈️ Toggling airline mode:', enabled);
    
    try {
      await chrome.storage.sync.set({ airlineMode: enabled });
      console.log('✅ Airline mode saved');
    } catch (error) {
      console.error('❌ Airline mode error:', error);
      elements.airlineMode.checked = !enabled;
    }
  }
  
})(); 