 import React from "react";
 import { TextLayer } from "@deck.gl/layers";
 import stadtteile_mannheim from '../../../data/stadtteile_mannheim.json'
 import { getCentroid } from "../../../utils/utilFunctions";
 const stadtteilLabelLayer = () => new TextLayer({
    id: 'stadtteil-labels',
    data: stadtteile_mannheim.features.map(f => {
      const [lon, lat] = getCentroid(f);
      return {
        position: [lon, lat, 100], // 100 Meter über Grund
        name: f.properties.name,
      };
    }),
    pickable: false,
    getPosition: d => d.position,
    getText: d => d.name,
    getSize: 200,
    sizeUnits: 'meters',
    getColor: [255, 255, 255, 255],
    fontFamily: 'Arial, sans-serif',
    billboard: true, // optional: true für immer lesbar
    characterSet: 'auto',
  });

  export default stadtteilLabelLayer;