
import rawData from '../data/wohnungsdaten_kaiserslautern.json';
import { jitter } from '../utils/utilFunctions';

export const wohnungenDataKaiserslautern = rawData
  .filter(d => d.latitude && d.longlitude)
  .map((d, i) => ({
    ...d,
    id: i,
    position: [
      parseFloat(d.longlitude) + jitter(),
      parseFloat(d.latitude) + jitter()
    ]
  }));
