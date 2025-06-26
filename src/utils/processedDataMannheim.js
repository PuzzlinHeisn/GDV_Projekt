import rawData from '../data/wohnungsdaten_mannheim.json';
import { jitter, priceToColor } from '../utils/utilFunctions';

export const wohnungenDataMannheim = (() => {
  const filtered = rawData.filter(d => d.latitude && d.longlitude);

  const validPrices = filtered
    .map(d => parseFloat(d.price_per_qm))
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
    price_per_qm: parseFloat(d.price_per_qm),
    color: priceToColor(parseFloat(d.price_per_qm), minLog, maxLog)
  }));
})();
export default wohnungenDataMannheim;