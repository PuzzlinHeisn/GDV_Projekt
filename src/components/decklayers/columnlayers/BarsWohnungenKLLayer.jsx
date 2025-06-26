  import React from "react";
  import { ColumnLayer } from "@deck.gl/layers";
  import { wohnungenDataKaiserslautern } from "../../../utils/processedDataKaiserslautern";
  import { hexToRgbaArray } from "../../../utils/utilFunctions";
  const BarsWohnungenKaiserslauternLayer = () => {
    const validPrices = wohnungenDataKaiserslautern
    .map(d => d.price_per_qm)
    .filter(p => typeof p === 'number' && p > 0 && !isNaN(p));
    const logPrices = validPrices.map(p => Math.log(p));
    const minLog = Math.min(...logPrices);
    const maxLog = Math.max(...logPrices);
    return new ColumnLayer({
      id: 'wohnungen-kaiserslautern',
      data: wohnungenDataKaiserslautern,
      diskResolution: 6,
      radius: 100,
      extruded: true,
      pickable: true,
      wireframe: true,
      elevationScale: 75,
      getPosition: d => d.position,
      getId: d => d.id,
      getFillColor: d => hexToRgbaArray(d.color),
      getLineColor: [0, 0, 0, 255],
      getLineWidth: 3,
      lineWidthUnits: 'pixels',
      getElevation: d => d.price_per_qm,
  });
}
  export default BarsWohnungenKaiserslauternLayer;