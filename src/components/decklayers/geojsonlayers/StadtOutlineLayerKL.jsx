// components/StadtteileOutlineLayer.jsx
import React from 'react';
import { GeoJsonLayer } from '@deck.gl/layers';
import KaiserslauternGeoJSON from '../../../data/stadt_outline_kaiserslautern.json'
const StadtOutlineLayerKL = () => new GeoJsonLayer({
    id: 'stadtteile-outline',
    data: KaiserslauternGeoJSON,
    stroked: true,
    filled: false,
    lineWidthScale: 4,
    lineWidthMinPixels: 3,
    getFillColor: [180, 180, 255, 80],
    getLineColor: [255, 255, 255, 200],
  });

export default StadtOutlineLayerKL;
