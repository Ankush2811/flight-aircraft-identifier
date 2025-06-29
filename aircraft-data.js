// Enhanced aircraft database with detailed model information
const AIRCRAFT_DATA = {
  // Boeing Aircraft - with detailed model info
  'B737': { manufacturer: 'Boeing', model: '737', fullName: 'Boeing 737' },
  'B738': { manufacturer: 'Boeing', model: '737-800', fullName: 'Boeing 737-800' },
  'B739': { manufacturer: 'Boeing', model: '737-900', fullName: 'Boeing 737-900' },
  'B737-700': { manufacturer: 'Boeing', model: '737-700', fullName: 'Boeing 737-700' },
  'B737-800': { manufacturer: 'Boeing', model: '737-800', fullName: 'Boeing 737-800' },
  'B737-900': { manufacturer: 'Boeing', model: '737-900', fullName: 'Boeing 737-900' },
  'B737 MAX': { manufacturer: 'Boeing', model: '737 MAX', fullName: 'Boeing 737 MAX' },
  'B737 MAX 7': { manufacturer: 'Boeing', model: '737 MAX 7', fullName: 'Boeing 737 MAX 7' },
  'B737 MAX 8': { manufacturer: 'Boeing', model: '737 MAX 8', fullName: 'Boeing 737 MAX 8' },
  'B737 MAX 9': { manufacturer: 'Boeing', model: '737 MAX 9', fullName: 'Boeing 737 MAX 9' },
  'B737 MAX 10': { manufacturer: 'Boeing', model: '737 MAX 10', fullName: 'Boeing 737 MAX 10' },
  'B747': { manufacturer: 'Boeing', model: '747', fullName: 'Boeing 747' },
  'B747-400': { manufacturer: 'Boeing', model: '747-400', fullName: 'Boeing 747-400' },
  'B747-8': { manufacturer: 'Boeing', model: '747-8', fullName: 'Boeing 747-8' },
  'B757': { manufacturer: 'Boeing', model: '757', fullName: 'Boeing 757' },
  'B757-200': { manufacturer: 'Boeing', model: '757-200', fullName: 'Boeing 757-200' },
  'B757-300': { manufacturer: 'Boeing', model: '757-300', fullName: 'Boeing 757-300' },
  'B767': { manufacturer: 'Boeing', model: '767', fullName: 'Boeing 767' },
  'B767-200': { manufacturer: 'Boeing', model: '767-200', fullName: 'Boeing 767-200' },
  'B767-300': { manufacturer: 'Boeing', model: '767-300', fullName: 'Boeing 767-300' },
  'B767-400': { manufacturer: 'Boeing', model: '767-400', fullName: 'Boeing 767-400' },
  'B777': { manufacturer: 'Boeing', model: '777', fullName: 'Boeing 777' },
  'B777-200': { manufacturer: 'Boeing', model: '777-200', fullName: 'Boeing 777-200' },
  'B777-300': { manufacturer: 'Boeing', model: '777-300', fullName: 'Boeing 777-300' },
  'B777-300ER': { manufacturer: 'Boeing', model: '777-300ER', fullName: 'Boeing 777-300ER' },
  'B777X': { manufacturer: 'Boeing', model: '777X', fullName: 'Boeing 777X' },
  'B787': { manufacturer: 'Boeing', model: '787', fullName: 'Boeing 787 Dreamliner' },
  'B787-8': { manufacturer: 'Boeing', model: '787-8', fullName: 'Boeing 787-8 Dreamliner' },
  'B787-9': { manufacturer: 'Boeing', model: '787-9', fullName: 'Boeing 787-9 Dreamliner' },
  'B787-10': { manufacturer: 'Boeing', model: '787-10', fullName: 'Boeing 787-10 Dreamliner' },
  'Boeing 737': { manufacturer: 'Boeing', model: '737', fullName: 'Boeing 737' },
  'Boeing 747': { manufacturer: 'Boeing', model: '747', fullName: 'Boeing 747' },
  'Boeing 757': { manufacturer: 'Boeing', model: '757', fullName: 'Boeing 757' },
  'Boeing 767': { manufacturer: 'Boeing', model: '767', fullName: 'Boeing 767' },
  'Boeing 777': { manufacturer: 'Boeing', model: '777', fullName: 'Boeing 777' },
  'Boeing 787': { manufacturer: 'Boeing', model: '787', fullName: 'Boeing 787 Dreamliner' },
  'Dreamliner': { manufacturer: 'Boeing', model: '787', fullName: 'Boeing 787 Dreamliner' },

  // Airbus Aircraft - with detailed model info
  'A318': { manufacturer: 'Airbus', model: 'A318', fullName: 'Airbus A318' },
  'A319': { manufacturer: 'Airbus', model: 'A319', fullName: 'Airbus A319' },
  'A320': { manufacturer: 'Airbus', model: 'A320', fullName: 'Airbus A320' },
  'A321': { manufacturer: 'Airbus', model: 'A321', fullName: 'Airbus A321' },
  'A320neo': { manufacturer: 'Airbus', model: 'A320neo', fullName: 'Airbus A320neo' },
  'A321neo': { manufacturer: 'Airbus', model: 'A321neo', fullName: 'Airbus A321neo' },
  'A330': { manufacturer: 'Airbus', model: 'A330', fullName: 'Airbus A330' },
  'A330-200': { manufacturer: 'Airbus', model: 'A330-200', fullName: 'Airbus A330-200' },
  'A330-300': { manufacturer: 'Airbus', model: 'A330-300', fullName: 'Airbus A330-300' },
  'A330neo': { manufacturer: 'Airbus', model: 'A330neo', fullName: 'Airbus A330neo' },
  'A340': { manufacturer: 'Airbus', model: 'A340', fullName: 'Airbus A340' },
  'A340-200': { manufacturer: 'Airbus', model: 'A340-200', fullName: 'Airbus A340-200' },
  'A340-300': { manufacturer: 'Airbus', model: 'A340-300', fullName: 'Airbus A340-300' },
  'A340-500': { manufacturer: 'Airbus', model: 'A340-500', fullName: 'Airbus A340-500' },
  'A340-600': { manufacturer: 'Airbus', model: 'A340-600', fullName: 'Airbus A340-600' },
  'A350': { manufacturer: 'Airbus', model: 'A350', fullName: 'Airbus A350' },
  'A350-900': { manufacturer: 'Airbus', model: 'A350-900', fullName: 'Airbus A350-900' },
  'A350-1000': { manufacturer: 'Airbus', model: 'A350-1000', fullName: 'Airbus A350-1000' },
  'A380': { manufacturer: 'Airbus', model: 'A380', fullName: 'Airbus A380' },
  'Airbus A318': { manufacturer: 'Airbus', model: 'A318', fullName: 'Airbus A318' },
  'Airbus A319': { manufacturer: 'Airbus', model: 'A319', fullName: 'Airbus A319' },
  'Airbus A320': { manufacturer: 'Airbus', model: 'A320', fullName: 'Airbus A320' },
  'Airbus A321': { manufacturer: 'Airbus', model: 'A321', fullName: 'Airbus A321' },
  'Airbus A330': { manufacturer: 'Airbus', model: 'A330', fullName: 'Airbus A330' },
  'Airbus A340': { manufacturer: 'Airbus', model: 'A340', fullName: 'Airbus A340' },
  'Airbus A350': { manufacturer: 'Airbus', model: 'A350', fullName: 'Airbus A350' },
  'Airbus A380': { manufacturer: 'Airbus', model: 'A380', fullName: 'Airbus A380' },

  // Other manufacturers for completeness
  'CRJ': { manufacturer: 'Bombardier', model: 'CRJ', fullName: 'Bombardier CRJ' },
  'ERJ': { manufacturer: 'Embraer', model: 'ERJ', fullName: 'Embraer ERJ' },
  'E170': { manufacturer: 'Embraer', model: 'E170', fullName: 'Embraer E170' },
  'E175': { manufacturer: 'Embraer', model: 'E175', fullName: 'Embraer E175' },
  'E190': { manufacturer: 'Embraer', model: 'E190', fullName: 'Embraer E190' },
  'E195': { manufacturer: 'Embraer', model: 'E195', fullName: 'Embraer E195' },
  'MD80': { manufacturer: 'McDonnell Douglas', model: 'MD-80', fullName: 'McDonnell Douglas MD-80' },
  'MD90': { manufacturer: 'McDonnell Douglas', model: 'MD-90', fullName: 'McDonnell Douglas MD-90' },
  'DC-9': { manufacturer: 'McDonnell Douglas', model: 'DC-9', fullName: 'McDonnell Douglas DC-9' },
  'DC-10': { manufacturer: 'McDonnell Douglas', model: 'DC-10', fullName: 'McDonnell Douglas DC-10' },
  'ATR': { manufacturer: 'ATR', model: 'ATR', fullName: 'ATR' },
  'Dash 8': { manufacturer: 'Bombardier', model: 'Dash 8', fullName: 'Bombardier Dash 8' },
  'Q400': { manufacturer: 'Bombardier', model: 'Q400', fullName: 'Bombardier Q400' }
};

// Function to identify aircraft with detailed model information
function identifyAircraft(aircraftText) {
  if (!aircraftText) return null;
  
  const text = aircraftText.toUpperCase().trim();
  
  // Direct lookup first - find the most specific match
  let bestMatch = null;
  let bestMatchLength = 0;
  
  for (const [model, details] of Object.entries(AIRCRAFT_DATA)) {
    if (text.includes(model.toUpperCase()) && model.length > bestMatchLength) {
      bestMatch = {
        manufacturer: details.manufacturer,
        model: details.model,
        fullName: details.fullName,
        confidence: 'direct',
        matchedText: model
      };
      bestMatchLength = model.length;
    }
  }
  
  if (bestMatch) return bestMatch;
  
  // Pattern matching for common variations
  if (text.match(/B\s*7\d{2}/i) || text.match(/BOEING\s*7\d{2}/i)) {
    const match = text.match(/B\s*7(\d{2})/i) || text.match(/BOEING\s*7(\d{2})/i);
    const series = match ? match[1] : '';
    return {
      manufacturer: 'Boeing',
      model: `7${series}`,
      fullName: `Boeing 7${series}`,
      confidence: 'pattern',
      matchedText: match ? match[0] : 'Boeing 7xx'
    };
  }
  
  if (text.match(/A\s*3\d{2}/i) || text.match(/AIRBUS\s*A\s*3\d{2}/i)) {
    const match = text.match(/A\s*3(\d{2})/i) || text.match(/AIRBUS\s*A\s*3(\d{2})/i);
    const series = match ? `3${match[1]}` : '';
    return {
      manufacturer: 'Airbus',
      model: `A${series}`,
      fullName: `Airbus A${series}`,
      confidence: 'pattern',
      matchedText: match ? match[0] : 'Airbus A3xx'
    };
  }
  
  return null;
}

// Function to get manufacturer color
function getManufacturerColor(manufacturer) {
  switch (manufacturer) {
    case 'Boeing':
      return '#0066CC'; // Boeing blue
    case 'Airbus':
      return '#FF6B35'; // Airbus orange
    default:
      return '#666666'; // Gray for others
  }
}

// Simplified Indian airline fleet data - just manufacturer for airline-based detection
const INDIAN_AIRLINE_FLEETS = {
  // IndiGo - Primarily Airbus A320 family
  'IndiGo': { manufacturer: 'Airbus' },
  '6E': { manufacturer: 'Airbus' },
  'IGO': { manufacturer: 'Airbus' },
  
  // SpiceJet - Mixed fleet but mainly Boeing 737
  'SpiceJet': { manufacturer: 'Boeing' },
  'SG': { manufacturer: 'Boeing' },
  'SEJ': { manufacturer: 'Boeing' },
  
  // Air India - Mixed fleet, mainly Airbus for domestic
  'Air India': { manufacturer: 'Airbus' },
  'AI': { manufacturer: 'Airbus' },
  'AIC': { manufacturer: 'Airbus' },
  
  // Vistara - Airbus A320 family
  'Vistara': { manufacturer: 'Airbus' },
  'UK': { manufacturer: 'Airbus' },
  'VTI': { manufacturer: 'Airbus' },
  
  // GoAir/Go First - Airbus A320 family
  'GoAir': { manufacturer: 'Airbus' },
  'Go First': { manufacturer: 'Airbus' },
  'G8': { manufacturer: 'Airbus' },
  'GOW': { manufacturer: 'Airbus' },
  
  // AirAsia India - Airbus A320 family
  'AirAsia': { manufacturer: 'Airbus' },
  'AirAsia India': { manufacturer: 'Airbus' },
  'I5': { manufacturer: 'Airbus' },
  'IAD': { manufacturer: 'Airbus' },
  
  // Akasa Air - Boeing 737 MAX
  'Akasa Air': { manufacturer: 'Boeing' },
  'Akasa': { manufacturer: 'Boeing' },
  'QP': { manufacturer: 'Boeing' },
  
  // Air India Express - Boeing 737
  'Air India Express': { manufacturer: 'Boeing' },
  'IX': { manufacturer: 'Boeing' },
  'AXB': { manufacturer: 'Boeing' },
  
  // Jet Airways - Boeing 737 (when operational)
  'Jet Airways': { manufacturer: 'Boeing' },
  '9W': { manufacturer: 'Boeing' },
  'JAI': { manufacturer: 'Boeing' }
};

// Function to identify aircraft by airline when aircraft type is not shown
function identifyAircraftByAirline(airlineText) {
  if (!airlineText) return null;
  
  const text = airlineText.toUpperCase().trim();
  
  // Check for airline names and codes
  for (const [airline, fleetInfo] of Object.entries(INDIAN_AIRLINE_FLEETS)) {
    if (text.includes(airline.toUpperCase())) {
      return {
        manufacturer: fleetInfo.manufacturer,
        model: fleetInfo.manufacturer, // Just use manufacturer name
        fullName: fleetInfo.manufacturer, // Just use manufacturer name
        confidence: 'airline-based',
        source: `${airline} typically operates ${fleetInfo.manufacturer} aircraft`,
        matchedAirline: airline
      };
    }
  }
  
  return null;
}

// Enhanced aircraft identification function
function identifyAircraftEnhanced(text, context = {}) {
  // First try direct aircraft identification
  const directMatch = identifyAircraft(text);
  if (directMatch) {
    return directMatch;
  }
  
  // If no direct match and we have airline context, try airline-based identification
  if (context.airline) {
    const airlineMatch = identifyAircraftByAirline(context.airline);
    if (airlineMatch) {
      return airlineMatch;
    }
  }
  
  // Try to find airline info in the same text
  const airlineMatch = identifyAircraftByAirline(text);
  if (airlineMatch) {
    return airlineMatch;
  }
  
  return null;
}

// Export for use in content script
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { 
    AIRCRAFT_DATA, 
    INDIAN_AIRLINE_FLEETS,
    identifyAircraft, 
    identifyAircraftByAirline,
    identifyAircraftEnhanced,
    getManufacturerColor 
  };
} 