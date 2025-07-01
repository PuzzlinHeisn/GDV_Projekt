import React, { useState, useEffect, useRef } from 'react';
import { DeckGL } from '@deck.gl/react';
import { Map } from 'react-map-gl';
import BarsWohnungenMannheimLayer from '../deckgl/columnlayers/BarsWohnungenMannheimLayer';
import StadtteileOutlineLayerMannheim from '../deckgl/geojsonlayers/StadtteileOutlineLayerMannheim';
import stadtteilLabelLayerMannheim from '../deckgl/textlayers/StadtteilLabelLayerMannheim';

const INITIAL_VIEW_KL = {
  longitude: 8.520,
  latitude: 49.4875,
  zoom: 12,
  pitch: 45,
  bearing: 0,
};

const MAPBOX_TOKEN = "pk.eyJ1IjoibGF1cmVudDE1NCIsImEiOiJjbWI4ZXRmYWowYnM3MmtzYnpxdnluNmlyIn0.5Y8kOPYR-F_Ac-bAJTPiog";

const KaiserslauternMapView = ({ setSelected, setFoundApartment, selected, foundApartement }) => {
  const [viewState, setViewState] = useState(INITIAL_VIEW_KL);
  const [isInteracting, setIsInteracting] = useState(false);
  const animationFrameId = useRef(null);

  const layers = [
    StadtteileOutlineLayerMannheim(),
    BarsWohnungenMannheimLayer(selected, foundApartement),
    stadtteilLabelLayerMannheim(),
  ];

  // Animation loop für Rotation
  useEffect(() => {
    if (!isInteracting) {
      const animate = () => {
        setViewState(prev => ({
          ...prev,
          bearing: (prev.bearing + 0.01) % 360, // langsames Drehen
        }));
        animationFrameId.current = requestAnimationFrame(animate);
      };
      animationFrameId.current = requestAnimationFrame(animate);

      return () => cancelAnimationFrame(animationFrameId.current);
    } else {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    }
  }, [isInteracting]);

  return (
    <div style={{ flex: 1, position: 'relative', display: 'flex' }}>
      <DeckGL
        controller={true}  // Nur true, damit User drehen kann
        viewState={viewState}
        onViewStateChange={({ viewState: vs, interactionState }) => {
          setViewState(vs);
          setIsInteracting(
            interactionState.isDragging || 
            interactionState.isRotating || 
            interactionState.isZooming
          );
        }}
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
