import rawData from '../data/wohnungsdaten_kaiserslautern.json';
import { jitter, priceToColor } from '../utils/utilFunctions';

export const wohnungenDataKaiserslautern = (() => {
  const filtered = rawData.filter(d => d.latitude && d.longlitude);

  // valide Preise extrahieren, für Farbskalierung
  const validPrices = filtered
    .map(d => parseFloat(d.price_per_qm))  // evtl. musst du hier den richtigen Key prüfen
    .filter(p => typeof p === 'number' && p > 0 && !isNaN(p));

  const logPrices = validPrices.map(p => Math.log(p));
  const minLog = Math.min(...logPrices);
  const maxLog = Math.max(...logPrices);

  return filtered.map((d, i) => ({
    ...d,
    id: i,
    position: [
      parseFloat(d.longlitude) + jitter(),
      parseFloat(d.latitude) + jitter()
    ],
    price_per_qm: parseFloat(d.price_per_qm), // sicherheitshalber als float speichern
    color: priceToColor(parseFloat(d.price_per_qm), minLog, maxLog)
  }));
})();
export default wohnungenDataKaiserslautern
