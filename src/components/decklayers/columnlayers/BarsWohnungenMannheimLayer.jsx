  import React from "react";
  import { ColumnLayer } from "@deck.gl/layers";
  import { wohnungenDataMannheim } from "../../../utils/processedDataMannheim";
  import { priceToColor } from "../../../utils/utilFunctions";
  const BarsWohnungenMannheimLayer = () => {
    const prices = wohnungenDataMannheim.map(d => d.price_per_qm);
    const logPrices = prices.map(p => Math.log(p));
    const minLog = Math.min(...logPrices);
    const maxLog = Math.max(...logPrices);
    return new ColumnLayer({
      id: 'wohnungen-mannheim',
      data: wohnungenDataMannheim,
      diskResolution: 6,
      radius: 100,
      extruded: true,
      pickable: true,
      wireframe: true,
      elevationScale: 75,
      getPosition: d => d.position,
      getId: d => d.id,
      getFillColor: d => priceToColor(d.price_per_qm, minLog, maxLog),
      getLineColor: [0, 0, 0, 255],
      getLineWidth: 3,
      lineWidthUnits: 'pixels',
      getElevation: d => d.price_per_qm,
  });
}

  export default BarsWohnungenMannheimLayer;