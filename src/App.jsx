import React, { useState } from 'react';
import { DeckGL } from '@deck.gl/react';
import { Map } from 'react-map-gl';

import StadtteileOutlineLayerMannheim from './components/decklayers/geojsonlayers/StadtteileOutlineLayerMannheim';
import StadtteilLabelLayerMannheim from './components/decklayers/textlayers/StadtteilLabelLayerMannheim';
import BarsWohnungenMannheimLayer from './components/decklayers/columnlayers/BarsWohnungenMannheimLayer';

import ToggleBarViewButton from './components/buttons/ToggleBarViewButton';
import WohnungInfoCard from './components/cards/WohnungInfoCardMannheim';
import { wohnungenDataMannheim } from './utils/processedDataMannheim';

import BarsWohnungenKaiserslauternLayer from './components/decklayers/columnlayers/BarsWohnungenKLLayer';
import StadtOutlineLayerKaiserslautern from './components/decklayers/geojsonlayers/StadtOutlineLayerKL'
import { wohnungenDataKaiserslautern } from './utils/processedDataKaiserslautern';
const MAPBOX_TOKEN = "pk.eyJ1IjoibGF1cmVudDE1NCIsImEiOiJjbWI4ZXRmYWowYnM3MmtzYnpxdnluNmlyIn0.5Y8kOPYR-F_Ac-bAJTPiog";

const App = () => {
  const [selectedObjectIdMA, setSelectedObjectIdMA] = useState(null);
  const [selectedObjectIdKL, setSelectedObjectIdKL] = useState(null);

  const [viewMode, setViewMode] = useState("wohnungen");

  const INITIAL_VIEW_KL = {
  longitude: 7.760,  // Kaiserslautern
  latitude: 49.444,
  zoom: 12,
  pitch: 45,
  bearing: 0,
};

const INITIAL_VIEW_MANNHEIM = {
  longitude: 8.520,
  latitude: 49.4875,
  zoom: 12,
  pitch: 45,
  bearing: 0,
};

  // Mannheim-Layers (so wie bisher)
  const mannheimLayers = [
    StadtteileOutlineLayerMannheim(),
    StadtteilLabelLayerMannheim(),
    BarsWohnungenMannheimLayer(),
  ];

  const KaiserslauternLayers = [
    StadtOutlineLayerKaiserslautern(),
    BarsWohnungenKaiserslauternLayer(),

  ]
  // Wohnung auswählen (nur Mannheim als Beispiel)
  const selectedObjectMA = selectedObjectIdMA !== null
  ? wohnungenDataMannheim.find(d => d.id === selectedObjectIdMA)
  : null;

      // Wohnung auswählen (nur Mannheim als Beispiel)
  const selectedObjectKL = selectedObjectIdKL !== null
  ? wohnungenDataKaiserslautern.find(d => d.id === selectedObjectIdKL)
  : null;

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw' }}>
      {/* Linke Seite: Kaiserslautern */}
      <div style={{ flex: 1, borderRight: '2px solid #ccc', position: 'relative' }}>
        <DeckGL
          initialViewState={INITIAL_VIEW_KL}
          controller={true}
          layers={KaiserslauternLayers} // Muss später noch verändert werden 
          
          onClick={info => {
            if (info.object && viewMode === "wohnungen") {
             setSelectedObjectIdKL(prevId => prevId === info.object.id ? null : info.object.id);
          } else {
             setSelectedObjectIdKL(null);
          }
          }}// Reset Auswahl wenn man links klickt

        >
          <Map
            mapStyle="mapbox://styles/mapbox/dark-v11"
            mapboxAccessToken={MAPBOX_TOKEN}
          />
        </DeckGL>
        {selectedObjectKL && (
          <WohnungInfoCard wohnung={selectedObjectKL} />
        )}
      </div>

      {/* Rechte Seite: Mannheim */}
      <div style={{ flex: 1, position: 'relative' }}>
      {/*  <ToggleBarViewButton 
          viewMode={viewMode} 
          onToggle={() => setViewMode(viewMode === "avg" ? "wohnungen" : "avg")} 
        /> 
        */}
        <DeckGL
          initialViewState={INITIAL_VIEW_MANNHEIM}
          controller={true}
          layers={mannheimLayers}
 
          onClick={info => {
           if (info.object && viewMode === "wohnungen") {
            setSelectedObjectIdMA(prevId => prevId === info.object.id ? null : info.object.id);
        } else {
            setSelectedObjectIdMA(null);
  }
}}
        >
          <Map
            mapStyle="mapbox://styles/mapbox/dark-v11"
            mapboxAccessToken={MAPBOX_TOKEN}
          />
        </DeckGL>

        {selectedObjectMA && (
          <WohnungInfoCard wohnung={selectedObjectMA} />
        )}
      </div>
    </div>
  );
};

export default App;
