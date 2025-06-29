import React from 'react';
import { DeckGL } from '@deck.gl/react';
import { Map } from 'react-map-gl';
import BarsWohnungenMannheimLayer from '../decklayers/columnlayers/BarsWohnungenMannheimLayer';
import StadtteileOutlineLayerMannheim from '../decklayers/geojsonlayers/StadtteileOutlineLayerMannheim';
import WohnungInfoCard from '../cards/WohnungInfoCard';
import { wohnungenDataMannheim } from '../../utils/processedDataMannheim';
import stadtteilLabelLayerMannheim from '../decklayers/textlayers/StadtteilLabelLayerMannheim';
const INITIAL_VIEW_KL = {
  longitude: 8.520,
  latitude: 49.4875,
  zoom: 12,
  pitch: 45,
  bearing: 0,
};

const MAPBOX_TOKEN = "pk.eyJ1IjoibGF1cmVudDE1NCIsImEiOiJjbWI4ZXRmYWowYnM3MmtzYnpxdnluNmlyIn0.5Y8kOPYR-F_Ac-bAJTPiog";

const KaiserslauternMapView = ({ selected, setSelected, setFoundApartment }) => {
  const layers = [
    StadtteileOutlineLayerMannheim(),
    BarsWohnungenMannheimLayer(),
    stadtteilLabelLayerMannheim(),
  ];


  return (
    <div style={{ flex: 1, position: 'relative', display: 'flex' }}>
      <DeckGL
        initialViewState={INITIAL_VIEW_KL}
        controller={true}
        layers={layers}
        onClick={info => {
          if (info.object) {
            setSelected(prev => prev === info.object.title ? null : info.object.title);
            setFoundApartment(null);
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
    </div>
  );
};

export default KaiserslauternMapView;
