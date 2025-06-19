  import React from "react";
  import { ColumnLayer } from "@deck.gl/layers";
  import { wohnungenDataKaiserslautern } from "../../../utils/processedDataKaiserslautern";
  import { priceToColor } from "../../../utils/utilFunctions";
  const BarsWohnungenKaiserslauternLayer = () => {
    const pricesKL = wohnungenDataKaiserslautern.map(d => d.price_per_qm);
    const logPricesKL = pricesKL.map(p => Math.log(p));
    const minLogKL = Math.min(...logPricesKL);
    const maxLogKL = Math.max(...logPricesKL);
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
      getFillColor: d => priceToColor(d.price_per_qm, minLogKL, maxLogKL),
      getLineColor: [0, 0, 0, 255],
      getLineWidth: 3,
      lineWidthUnits: 'pixels',
      getElevation: d => d.price_per_qm,
  });
}

  export default BarsWohnungenKaiserslauternLayer;