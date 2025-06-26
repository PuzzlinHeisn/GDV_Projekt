import React from 'react';
import { DeckGL } from '@deck.gl/react';
import { Map } from 'react-map-gl';
import BarsWohnungenKaiserslauternLayer from '../decklayers/columnlayers/BarsWohnungenKLLayer';
import StadtOutlineLayerKaiserslautern from '../decklayers/geojsonlayers/StadtOutlineLayerKL';
import WohnungInfoCard from '../cards/WohnungInfoCard';
import stadtteilLabelLayerKaiserslautern from '../decklayers/textlayers/StadtteilLabelLayerKaiserslautern';
import merged_data from '../../data/merged_data.json'
const INITIAL_VIEW_KL = {
  longitude: 7.760,
  latitude: 49.444,
  zoom: 12,
  pitch: 45,
  bearing: 0,
};

const MAPBOX_TOKEN = "pk.eyJ1IjoibGF1cmVudDE1NCIsImEiOiJjbWI4ZXRmYWowYnM3MmtzYnpxdnluNmlyIn0.5Y8kOPYR-F_Ac-bAJTPiog";

const KaiserslauternMapView = ({ selected, setSelected, viewMode }) => {
  const layers = [
    StadtOutlineLayerKaiserslautern(),
    BarsWohnungenKaiserslauternLayer(),
    stadtteilLabelLayerKaiserslautern(),
  ];


  return (
    <div style={{ flex: 1, position: 'relative', display: 'flex' }}>
      <DeckGL
        initialViewState={INITIAL_VIEW_KL}
        controller={true}
        layers={layers}
        onClick={info => {
          if (info.object && viewMode === "wohnungen") {
            setSelected(prev => prev === info.object.title ? null : info.object.title);
          } else {
            setSelected(null);
          }
        }}
      >
        <Map
          mapStyle="mapbox://styles/mapbox/dark-v11"
          mapboxAccessToken={MAPBOX_TOKEN}
        />
      </DeckGL>
      {selected && <WohnungInfoCard wohnungTitle={selected} selected={!!selected}/>}
    </div>
  );
};


function getWohnungWithIdByTitle(title, allWohnungen) {
    const fullWohnung = allWohnungen.find(w => w.title === title);
    return fullWohnung;
}


export default KaiserslauternMapView;
