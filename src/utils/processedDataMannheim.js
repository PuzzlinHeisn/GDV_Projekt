
import rawData from '../data/wohnungsdaten_mannheim.json';
import { jitter } from '../utils/utilFunctions';

export const wohnungenDataMannheim = rawData
  .filter(d => d.latitude && d.longlitude)
  .map((d, i) => ({
    ...d,
    id: i,
    position: [
      parseFloat(d.longlitude) + jitter(),
      parseFloat(d.latitude) + jitter()
    ]
  }));
