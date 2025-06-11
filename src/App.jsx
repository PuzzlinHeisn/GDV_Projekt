import React, { useState } from 'react';
import { DeckGL } from '@deck.gl/react';
import { Map } from 'react-map-gl';
import { ColumnLayer, GeoJsonLayer, TextLayer } from '@deck.gl/layers';
import { Button } from '@mui/material';

import rawData from './wohnungen.json';
import stadtteile_mannheim from './stadtteile_mannheim.json';

const MAPBOX_TOKEN = "pk.eyJ1IjoibGF1cmVudDE1NCIsImEiOiJjbWI4ZXRmYWowYnM3MmtzYnpxdnluNmlyIn0.5Y8kOPYR-F_Ac-bAJTPiog";

function stringToColor(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const r = (hash >> 0) & 255;
  const g = (hash >> 8) & 255;
  const b = (hash >> 16) & 255;
  return [r, g, b, 100];
}

const getCentroid = (feature) => {
  const coords = feature.geometry.coordinates[0];
  const lons = coords.map(coord => coord[0]);
  const lats = coords.map(coord => coord[1]);
  const lon = (Math.min(...lons) + Math.max(...lons)) / 2;
  const lat = (Math.min(...lats) + Math.max(...lats)) / 2;
  return [lon, lat];
};

const jitter = () => (Math.random() - 0.5) * 0.0016;

const INITIAL_VIEW_STATE = {
  longitude: 8.466,
  latitude: 49.4875,
  zoom: 12,
  pitch: 45,
  bearing: 0,
};

const App = () => {
  const [selectedObjectId, setSelectedObjectId] = useState(null);
  const [viewMode, setViewMode] = useState("avg");

  const [data] = useState(() =>
  rawData
  .filter(d => d.latitude && d.longlitude)
  .map((d, i) => ({
    ...d,
    id: i,
    position: [
      parseFloat(d.longlitude) + jitter(),
                  parseFloat(d.latitude) + jitter()
    ]
  }))
  );

  const stadtteilLayerMannheim = new GeoJsonLayer({
    id: 'stadtteile',
    data: stadtteile_mannheim,
    stroked: true,
    filled: true,
    lineWidthScale: 2,
    lineWidthMinPixels: 1,
    getLineColor: [0, 0, 0, 200],
    getFillColor: f => stringToColor(f.properties.name),
                                                  pickable: true,
                                                  getLineWidth: 1,
  });

  const stadtteilLabelLayer = new TextLayer({
    id: 'stadtteil-labels',
    data: stadtteile_mannheim.features.map(f => ({
      position: getCentroid(f),
                                                 name: f.properties.name
    })),
    pickable: false,
    getPosition: d => d.position,
    getText: d => d.name,
    getSize: 18,
    getColor: [0, 0, 0, 255],
    fontFamily: 'Arial, sans-serif',
    sizeUnits: 'pixels',
  });

  const columnLayer = new ColumnLayer({
    id: 'wohnungen',
    data,
    diskResolution: 6,
    radius: 40,
    extruded: true,
    pickable: true,
    wireframe: true,
    elevationScale: 60,
    getPosition: d => d.position,
    getId: d => d.id,
    getFillColor: d =>
    selectedObjectId === d.id
    ? [50, 150, 255, 180]
    : [220, 220, 220, 200],
    getLineColor: [0, 0, 0, 255],
    getLineWidth: 3,
    lineWidthUnits: 'pixels',
    getElevation: d => d.price_per_qm,
  });

  const testAvgData = stadtteile_mannheim.features.map((feature, i) => ({
    id: i,
    name: feature.properties.name,
    position: getCentroid(feature),
                                                                        price_per_qm: Math.floor(8 + Math.random() * 10), // testwerte 8–18
  }));

  const avgColumnLayer = new ColumnLayer({
    id: 'stadtteil-avg-balken',
    data: testAvgData,
    diskResolution: 6,
    radius: 130,
    extruded: true,
    pickable: true,
    elevationScale: 120,
    getPosition: d => d.position,
    getElevation: d => d.price_per_qm,
    getFillColor: [153, 102, 255, 200], // lila
    getLineColor: [80, 0, 130, 255], // dunkellila Kontur
    getLineWidth: 1,
    lineWidthUnits: 'pixels',
  });

  const layers = [
    stadtteilLayerMannheim,
    stadtteilLabelLayer,
    viewMode === "avg" ? avgColumnLayer : columnLayer
  ];

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
    <Button
    variant="contained"
    color="secondary"
    style={{
      position: 'absolute',
      top: 20,
      right: 20,
      zIndex: 1000
    }}
    onClick={() =>
      setViewMode(viewMode === "avg" ? "wohnungen" : "avg")
    }
    >
    {viewMode === "avg"
      ? "🏢 Einzelwohnungen anzeigen"
      : "📊 Durchschnitt pro Stadtteil"}
      </Button>

      <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      layers={layers}
      onClick={info => {
        if (info.object && viewMode === "wohnungen") {
          if (selectedObjectId === info.object.id) {
            setSelectedObjectId(null);
          } else {
            setSelectedObjectId(info.object.id);
          }
        } else {
          setSelectedObjectId(null);
        }
      }}
      >
      <Map
      mapStyle="mapbox://styles/mapbox/light-v11"
      mapboxAccessToken={MAPBOX_TOKEN}
      />
      </DeckGL>

      {selectedObjectId !== null && viewMode === "wohnungen" && (() => {
        const selectedObject = data.find(d => d.id === selectedObjectId);
        if (!selectedObject) return null;
        return (
          <div style={{
            position: 'absolute',
            bottom: 20,
            left: 20,
            padding: '10px 15px',
            background: 'white',
            boxShadow: '0 0 10px rgba(0,0,0,0.3)',
                borderRadius: '8px',
                maxWidth: '300px',
                zIndex: 999
          }}>
          <h3 style={{ margin: 0 }}>{selectedObject.title}</h3>
          <p style={{ margin: 0 }}>💰 Miete: {selectedObject.price_per_qm} €</p>
          <p style={{ margin: 0 }}>📍 Adresse: {selectedObject.street}</p>
          <p style={{ margin: 0 }}>📐 {selectedObject.price_per_qm} €/m²</p>
          </div>
        );
      })()}
      </div>
  );
};

export default App;
