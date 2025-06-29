// Background Service Worker for Aircraft Identifier
console.log('🔧 Background service worker starting...');

// Extension installation/update
chrome.runtime.onInstalled.addListener((details) => {
  console.log('📦 Extension installed/updated:', details.reason);
  
  // Initialize default settings
  chrome.storage.sync.set({
    extensionEnabled: true,
    airlineMode: true
  }).then(() => {
    console.log('✅ Default settings initialized');
  });
  
  // Initialize statistics
  chrome.storage.local.set({
    aircraftStats: {
      boeing: 0,
      airbus: 0,
      other: 0
    }
  }).then(() => {
    console.log('📊 Statistics initialized');
  });
});

// Handle messages from content scripts and popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('📨 Background received message:', request);
  
  if (request.action === 'updateStats') {
    handleStatsUpdate(request, sendResponse);
    return true; // Keep message channel open
  }
  
  sendResponse({ success: false, error: 'Unknown action' });
});

async function handleStatsUpdate(request, sendResponse) {
  try {
    const result = await chrome.storage.local.get(['aircraftStats']);
    const stats = result.aircraftStats || { boeing: 0, airbus: 0, other: 0 };
    
    if (request.manufacturer) {
      const manufacturer = request.manufacturer.toLowerCase();
      
      if (manufacturer === 'boeing') {
        stats.boeing++;
      } else if (manufacturer === 'airbus') {
        stats.airbus++;
      } else {
        stats.other++;
      }
      
      await chrome.storage.local.set({ aircraftStats: stats });
      console.log('📈 Stats updated:', stats);
    }
    
    sendResponse({ success: true, stats: stats });
    
  } catch (error) {
    console.error('❌ Stats update error:', error);
    sendResponse({ success: false, error: error.message });
  }
}

// Handle extension icon click
chrome.action.onClicked.addListener((tab) => {
  console.log('Extension icon clicked on tab:', tab.url);
});

console.log('✅ Background service worker ready'); 