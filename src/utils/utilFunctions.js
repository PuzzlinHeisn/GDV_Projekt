export function stringToColor(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const r = (hash >> 0) & 255;
  const g = (hash >> 8) & 255;
  const b = (hash >> 16) & 255;
  return [r, g, b, 80];
}

export function getCentroid(feature) {
  const coords = feature.geometry.coordinates[0];
  const lons = coords.map(coord => coord[0]);
  const lats = coords.map(coord => coord[1]);
  const lon = (Math.min(...lons) + Math.max(...lons)) / 2;
  const lat = (Math.min(...lats) + Math.max(...lats)) / 2;
  return [lon, lat];
}

export function jitter () {
 return((Math.random() - 0.5) * 0.0016)};

export function priceToColor(price, minLog, maxLog) {

  const logP = Math.log(price);
  const ratio = Math.max(0, Math.min(1, (logP - minLog) / (maxLog - minLog || 0.0001)));
  const r = Math.floor(255 * ratio);
  const g = Math.floor(255 * (1 - Math.abs(ratio - 0.5) * 2)); // grün in der Mitte
  const b = Math.floor(255 * (1 - ratio));
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function toHex(c) {
  const hex = c.toString(16);
  return hex.length === 1 ? '0' + hex : hex;
}

export function hexToRgbaArray(hex) {
  // Hex kann sein: #RRGGBB oder #RRGGBBAA
  // Entferne das führende '#'
  const cleanHex = hex.replace(/^#/, '');

  const r = parseInt(cleanHex.slice(0, 2), 16);
  const g = parseInt(cleanHex.slice(2, 4), 16);
  const b = parseInt(cleanHex.slice(4, 6), 16);

  let a = 255; // default opaque
  if (cleanHex.length === 8) {
    a = parseInt(cleanHex.slice(6, 8), 16);
  }

  return [r, g, b, a];
}
export function invertHexColor(hex) {
  // Entferne das '#' am Anfang, falls vorhanden
  const cleanHex = hex.startsWith('#') ? hex.slice(1) : hex;
  // Parst die 3 oder 6-stellige Hex in RGB
  let r, g, b;

  if (cleanHex.length === 3) {
    r = parseInt(cleanHex[0] + cleanHex[0], 16);
    g = parseInt(cleanHex[1] + cleanHex[1], 16);
    b = parseInt(cleanHex[2] + cleanHex[2], 16);
  } else if (cleanHex.length === 6) {
    r = parseInt(cleanHex.slice(0, 2), 16);
    g = parseInt(cleanHex.slice(2, 4), 16);
    b = parseInt(cleanHex.slice(4, 6), 16);
  } else {
    // Falls falsches Format, gib schwarz zurück
    return '#000000';
  }

  // Invertiere jede Komponente
  r = 255 - r;
  g = 255 - g;
  b = 255 - b;

  // Konvertiere zurück zu Hex mit führenden Nullen
  const toHex = c => c.toString(16).padStart(2, '0');
  console.log(`#${toHex(r)}${toHex(g)}${toHex(b)}`);
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}