import React from "react";
import { ColumnLayer } from "@deck.gl/layers";
import { wohnungenDataKaiserslautern } from "../../../utils/processedDataKaiserslautern";
import { hexToRgbaArray } from "../../../utils/utilFunctions";
const BarsWohnungenKaiserslauternLayer = (selected, foundApartement) => {

  return new ColumnLayer({
    id: 'wohnungen-kaiserslautern',
    data: wohnungenDataKaiserslautern,
    diskResolution: 6,
    radius: 100,
    extruded: true,
    pickable: true,
    wireframe: true,
    elevationScale: 75,
    getLineWidth: 200,
    material: {
      roughness: 0.5,
      metallic: 0.2,
    },
    updateTriggers: {
      getFillColor: [selected, foundApartement?.title],
      getLineColor: [selected, foundApartement?.title],
    },
    getPosition: d => d.position,
    getId: d => d.id,
    getFillColor: d => {
      if (selected && d.title === selected) {
        return hexToRgbaArray('#FFFEC7'); // Highlight: selected
      }
      if (foundApartement && d.title === foundApartement.title) {
        return hexToRgbaArray('#FF6EC7'); // Highlight: found
      }
      return hexToRgbaArray(d.color); // Default
    },
    getLineColor: d => {
      if (selected && d.title === selected) {
        return [255, 0, 0, 255]; // Highlight: selected
      }
      if (foundApartement && d.title === foundApartement.title) {
        return [255, 110, 199, 255]; // Highlight: found
      }
      return [255, 255, 255, 255]; // Default
    },
    getElevation: d => d.price_per_qm,
  });
}
export default BarsWohnungenKaiserslauternLayer;