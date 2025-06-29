# 🚀 Installation Guide - Know Your Plane Chrome Extension

## Quick Start

### 1. Manual Installation (Developer Mode)

1. **Download Extension Files**
   - Download or clone this repository to your computer
   - Extract to a folder (e.g., `flight-aircraft-identifier`)

2. **Enable Developer Mode in Chrome**
   - Open Google Chrome
   - Go to `chrome://extensions/`
   - Toggle "Developer mode" ON (top-right corner)

3. **Load the Extension**
   - Click "Load unpacked" button
   - Select the folder containing the extension files
   - The extension should now appear in your extensions list

4. **Verify Installation**
   - Look for the airplane icon in your Chrome toolbar
   - Visit the test page: `test-page.html` (open locally)
   - You should see colored tags appear next to aircraft information

### 2. Create Extension Icons (Optional)

The extension references icon files that need to be created:
- `icons/icon16.png` (16x16 pixels)
- `icons/icon48.png` (48x48 pixels)
- `icons/icon128.png` (128x128 pixels)

See `icons/icon-specs.txt` for design guidelines, or use placeholder images for testing.

## 🧪 Testing the Extension

1. **Open Test Page**
   - Open `test-page.html` in Chrome
   - The page contains sample flight data with Boeing and Airbus aircraft

2. **Expected Results**
   - Blue "BOEING" tags should appear next to Boeing aircraft
   - Orange "AIRBUS" tags should appear next to Airbus aircraft
   - Click the extension icon to view statistics

3. **Test on Real Sites**
   - Visit Google Flights, Expedia, Kayak, etc.
   - Search for flights and look for aircraft identification tags

## 🛠️ Troubleshooting

### Extension Not Loading
- Check that all files are in the same folder
- Ensure `manifest.json` is in the root directory
- Refresh the Chrome extensions page

### No Tags Appearing
- Refresh the webpage after installing
- Check that the extension is enabled
- Open browser console (F12) to check for errors

### Permission Issues
- Make sure the extension has permission to access websites
- Check that host permissions are granted in `chrome://extensions/`

## 📂 File Structure Check

Ensure your extension folder contains:
```
flight-aircraft-identifier/
├── manifest.json
├── content.js
├── aircraft-data.js
├── styles.css
├── popup.html
├── popup.js
├── icons/
│   ├── icon16.png (create this)
│   ├── icon48.png (create this)
│   └── icon128.png (create this)
├── test-page.html
└── README.md
```

## 🎯 Next Steps

1. Test the extension on various flight booking sites
2. Report any issues or missing aircraft identifications
3. Customize the aircraft database in `aircraft-data.js` if needed
4. Create proper icon files for a professional appearance

## 📧 Support

If you encounter issues:
1. Check the browser console for error messages
2. Verify all files are properly saved
3. Test with the included `test-page.html` first
4. Review the main README.md for detailed documentation

---

**Ready to identify aircraft while booking flights! ✈️** 