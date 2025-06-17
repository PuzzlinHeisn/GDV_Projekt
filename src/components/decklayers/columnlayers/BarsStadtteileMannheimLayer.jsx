  import React from "react";
  import { ColumnLayer } from "@deck.gl/layers";
  import stadtteile_mannheim from '../../../data/stadtteile_mannheim.json'
  import { getCentroid } from "../../../utils/utilFunctions";

  const testAvgData = stadtteile_mannheim.features.map((feature, i) => {
    const [lon, lat] = getCentroid(feature);
    return {
      id: i,
      name: feature.properties.name,
      position: [lon, lat + 0.000], // 0.001 Grad ≈ 110m nach Süden
      price_per_qm: Math.floor(8 + Math.random() * 10), // testwerte 8–18
    };
  });


  const BarsStadtteileMannheimLayer = () => new ColumnLayer({
    id: 'stadtteil-avg',
    data: testAvgData,
    diskResolution: 6,
    radius: 130,
    extruded: true,
    wireframe: true,
    pickable: true,
    elevationScale: 120,
    getPosition: d => d.position,
    getElevation: d => d.price_per_qm,
    getFillColor: [255, 140, 0, 140], // lila
    getLineColor: [255, 255, 255, 255], // dunkellila Kontur
    getLineWidth: 3,
    lineWidthUnits: 'pixels',
  });
  
  export default BarsStadtteileMannheimLayer;