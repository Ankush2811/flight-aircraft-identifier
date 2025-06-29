// Popup functionality for Know Your Plane
document.addEventListener('DOMContentLoaded', function() {
  // Elements
  const toggleBtn = document.getElementById('toggle-extension');
  const detectedCount = document.getElementById('detected-count');
  const boeingCount = document.getElementById('boeing-count');
  const airbusCount = document.getElementById('airbus-count');
  const helpLink = document.getElementById('help-link');
  const feedbackLink = document.getElementById('feedback-link');

  // Load saved settings and stats
  loadSettings();
  loadStatistics();

  // Event listeners
  toggleBtn.addEventListener('click', toggleExtension);
  helpLink.addEventListener('click', showHelp);
  feedbackLink.addEventListener('click', showFeedback);

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
      
      detectedCount.textContent = stats.total;
      boeingCount.textContent = stats.boeing;
      airbusCount.textContent = stats.airbus;
    });
  }

  // Toggle extension on/off
  function toggleExtension() {
    chrome.storage.sync.get(['extensionEnabled'], function(result) {
      const currentState = result.extensionEnabled !== false;
      const newState = !currentState;
      
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
    });
  }

  // Update toggle button appearance
  function updateToggleButton(isEnabled) {
    if (isEnabled) {
      toggleBtn.textContent = 'Extension Enabled';
      toggleBtn.classList.remove('disabled');
    } else {
      toggleBtn.textContent = 'Extension Disabled';
      toggleBtn.classList.add('disabled');
    }
  }

  // Show help information
  function showHelp(e) {
    e.preventDefault();
    const helpText = `Know Your Plane Help:

🔍 How it works:
• Automatically scans flight booking pages
• Identifies Boeing and Airbus aircraft
• Shows colored tags next to aircraft information

🏷️ Tag Colors:
• Blue = Boeing aircraft
• Orange = Airbus aircraft
• Gray = Other manufacturers

✈️ Supported Aircraft:
• Boeing: 737, 747, 757, 767, 777, 787
• Airbus: A318, A319, A320, A321, A330, A340, A350, A380

🌐 Supported Sites:
• Google Flights, Expedia, Kayak, Skyscanner
• United, Delta, American Airlines
• And many more booking sites

⚙️ Troubleshooting:
• If tags don't appear, try refreshing the page
• Check that the extension is enabled
• Some sites load content dynamically - tags may appear after a few seconds`;

    alert(helpText);
  }

  // Show feedback information
  function showFeedback(e) {
    e.preventDefault();
    const feedbackText = `We'd love your feedback!

💡 Suggestions:
• New booking sites to support
• Additional aircraft manufacturers
• UI improvements

🐛 Report Issues:
• Missing aircraft identification
• Sites where extension doesn't work
• Performance problems

📧 Contact:
Your feedback helps make this extension better for everyone!`;

    alert(feedbackText);
  }

  // Update statistics when tab changes
  chrome.tabs.onActivated.addListener(function() {
    setTimeout(loadStatistics, 1000);
  });

  // Listen for messages from content script
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'updateStats') {
      loadStatistics();
    }
  });

  // Refresh statistics every 5 seconds
  setInterval(loadStatistics, 5000);
}); 