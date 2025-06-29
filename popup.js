// Popup functionality for Know Your Plane
document.addEventListener('DOMContentLoaded', function() {
  // Elements
  const toggleBtn = document.getElementById('enableExtension');
  const detectedCount = document.getElementById('status'); // Using status for total count
  const boeingCount = document.getElementById('boeingCount');
  const airbusCount = document.getElementById('airbusCount');
  const lastUpdate = document.getElementById('lastUpdate');

  // Load saved settings and stats
  loadSettings();
  loadStatistics();

  // Event listeners (with null checks)
  if (toggleBtn) toggleBtn.addEventListener('change', toggleExtension);
  
  // Update last update time
  if (lastUpdate) lastUpdate.textContent = new Date().toLocaleTimeString();

  // Load extension settings
  function loadSettings() {
    chrome.storage.sync.get(['extensionEnabled'], function(result) {
      const isEnabled = result.extensionEnabled !== false; // Default to true
      updateToggleButton(isEnabled);
    });
  }

  // Load statistics
  function loadStatistics() {
    chrome.storage.local.get(['aircraftStats'], function(result) {
      const stats = result.aircraftStats || {
        total: 0,
        boeing: 0,
        airbus: 0
      };
      
      // Update counts with null checks
      if (boeingCount) boeingCount.textContent = stats.boeing;
      if (airbusCount) airbusCount.textContent = stats.airbus;
      if (detectedCount) detectedCount.textContent = `✅ ${stats.total} Aircraft Detected`;
      if (lastUpdate) lastUpdate.textContent = new Date().toLocaleTimeString();
    });
  }

  // Toggle extension on/off
  function toggleExtension() {
    if (!toggleBtn) return;
    
    const newState = toggleBtn.checked;
    
    chrome.storage.sync.set({ extensionEnabled: newState }, function() {
      updateToggleButton(newState);
      
      // Send message to content script to update state
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        if (tabs[0]) {
          chrome.tabs.sendMessage(tabs[0].id, {
            action: 'toggleExtension',
            enabled: newState
          }, function(response) {
            // Handle response if needed
          });
        }
      });
    });
  }

  // Update toggle button appearance
  function updateToggleButton(isEnabled) {
    if (toggleBtn) {
      toggleBtn.checked = isEnabled;
    }
    
    if (detectedCount) {
      if (isEnabled) {
        detectedCount.textContent = '✅ Extension Active';
        detectedCount.classList.add('active');
      } else {
        detectedCount.textContent = '❌ Extension Disabled';
        detectedCount.classList.remove('active');
      }
    }
  }

  // Refresh statistics display
  function refreshDisplay() {
    loadStatistics();
    if (lastUpdate) {
      lastUpdate.textContent = new Date().toLocaleTimeString();
    }
  }

  // Update statistics when tab changes
  chrome.tabs.onActivated.addListener(function() {
    setTimeout(refreshDisplay, 1000);
  });

  // Listen for messages from content script
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'updateStats') {
      refreshDisplay();
    }
  });

  // Refresh statistics every 5 seconds
  setInterval(refreshDisplay, 5000);
}); 