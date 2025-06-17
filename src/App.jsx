import React, { useState } from 'react';
import { DeckGL } from '@deck.gl/react';
import { Map } from 'react-map-gl';

import StadtteileOutlineLayer from './components/decklayers/geojsonlayers/StadtteileOutlineLayerMannheim';
import StadtteilLabelLayer from './components/decklayers/textlayers/StadtteilLabelLayerMannheim';
import BarsStadtteileMannheimLayer from './components/decklayers/columnlayers/BarsStadtteileMannheimLayer';
import BarsWohnungenMannheimLayer from './components/decklayers/columnlayers/BarsWohnungenMannheimLayer';

import ToggleBarViewButton from './components/buttons/ToggleBarViewButton';
import WohnungInfoCard from './components/cards/WohnungInfoCardMannheim';
import { wohnungenDataMannheim } from './utils/processedDataMannheim';
const MAPBOX_TOKEN = "pk.eyJ1IjoibGF1cmVudDE1NCIsImEiOiJjbWI4ZXRmYWowYnM3MmtzYnpxdnluNmlyIn0.5Y8kOPYR-F_Ac-bAJTPiog";

const App = () => {
  const [selectedObjectId, setSelectedObjectId] = useState(null);
  const [viewMode, setViewMode] = useState("avg");
  const INITIAL_VIEW_KL = {
  longitude: 7.778,  // Kaiserslautern
  latitude: 49.444,
  zoom: 12,
  pitch: 45,
  bearing: 0,
};

const INITIAL_VIEW_MANNHEIM = {
  longitude: 8.466,
  latitude: 49.4875,
  zoom: 12,
  pitch: 45,
  bearing: 0,
};

  // Mannheim-Layers (so wie bisher)
  const mannheimLayers = [
    StadtteileOutlineLayer(),
    StadtteilLabelLayer(),
    viewMode === "avg"
      ? BarsStadtteileMannheimLayer()
      : BarsWohnungenMannheimLayer(),
  ];
  // Wohnung auswählen (nur Mannheim als Beispiel)
  const selectedObject = selectedObjectId !== null
    ? wohnungenDataMannheim.find(d => d.id === selectedObjectId)
    : null;

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw' }}>
      {/* Linke Seite: Kaiserslautern */}
      <div style={{ flex: 1, borderRight: '2px solid #ccc' }}>
        <DeckGL
          initialViewState={INITIAL_VIEW_KL}
          controller={true}
          layers={''} // Muss später noch verändert werden 
          onClick={() => setSelectedObjectId(null)} // Reset Auswahl wenn man links klickt

        >
          <Map
            mapStyle="mapbox://styles/mapbox/dark-v11"
            mapboxAccessToken={MAPBOX_TOKEN}
          />
        </DeckGL>
      </div>

      {/* Rechte Seite: Mannheim */}
      <div style={{ flex: 1, position: 'relative' }}>
        <ToggleBarViewButton 
          viewMode={viewMode} 
          onToggle={() => setViewMode(viewMode === "avg" ? "wohnungen" : "avg")} 
        />
        <DeckGL
          initialViewState={INITIAL_VIEW_MANNHEIM}
          controller={true}
          layers={mannheimLayers}
 
          onClick={info => {
            if (info.object && viewMode === "wohnungen") {
              setSelectedObjectId(selectedObjectId === info.object.id ? null : info.object.id);
            } else {
              setSelectedObjectId(null);
            }
          }}
        >
          <Map
            mapStyle="mapbox://styles/mapbox/dark-v11"
            mapboxAccessToken={MAPBOX_TOKEN}
          />
        </DeckGL>

        {selectedObject && viewMode === "wohnungen" && (
          <WohnungInfoCard wohnung={selectedObject} />
        )}
      </div>
    </div>
  );
};

export default App;
