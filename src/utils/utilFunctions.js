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
  const ratio = (logP - minLog) / (maxLog - minLog);
  const r = Math.floor(255 * ratio);
  const g = Math.floor(255 * (1 - Math.abs(ratio - 0.5) * 2));
  const b = Math.floor(255 * (1 - ratio));
  return [r, g, b, 180];
}

