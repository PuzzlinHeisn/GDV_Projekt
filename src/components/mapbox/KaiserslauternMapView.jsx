import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { DeckGL } from '@deck.gl/react';
import { Map } from 'react-map-gl';
import BarsWohnungenKaiserslauternLayer from '../deckgl/columnlayers/BarsWohnungenKLLayer';
import StadtOutlineLayerKaiserslautern from '../deckgl/geojsonlayers/StadtOutlineLayerKL';
import stadtteilLabelLayerKaiserslautern from '../deckgl/textlayers/StadtteilLabelLayerKaiserslautern';

const INITIAL_VIEW_KL = {
  longitude: 7.760,
  latitude: 49.444,
  zoom: 12,
  pitch: 45,
  bearing: 0,
};

const MAPBOX_TOKEN = "pk.eyJ1IjoibGF1cmVudDE1NCIsImEiOiJjbWI4ZXRmYWowYnM3MmtzYnpxdnluNmlyIn0.5Y8kOPYR-F_Ac-bAJTPiog";

const staticLayers = [
  StadtOutlineLayerKaiserslautern(),
  stadtteilLabelLayerKaiserslautern(),
];

const KaiserslauternMapView = ({ setSelected, setFoundApartment, selected, foundApartement }) => {
  const [viewState, setViewState] = useState(INITIAL_VIEW_KL);
  const [isInteracting, setIsInteracting] = useState(false);
  const animationFrameId = useRef(null);

  const layers = useMemo(() => [
    ...staticLayers,
    BarsWohnungenKaiserslauternLayer(selected, foundApartement)
  ], [selected, foundApartement]);

  const handleClick = useCallback((info) => {
    if (info.object) {
      setSelected(prev => prev === info.object.title ? null : info.object.title);
      setFoundApartment(null);
    } else {
      setSelected(null);
    }
  }, [setSelected, setFoundApartment]);

  // Animation für automatische Drehung
  useEffect(() => {
    if (!isInteracting) {
      const animate = () => {
        setViewState(prev => ({
          ...prev,
          bearing: (prev.bearing + 0.01) % 360,
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
        viewState={viewState}
        controller={true}
        onViewStateChange={({ viewState: vs, interactionState }) => {
          setViewState(vs);
          setIsInteracting(
            interactionState.isDragging ||
            interactionState.isRotating ||
            interactionState.isZooming
          );
        }}
        layers={layers}
        onClick={handleClick}
      >
        <Map
          mapStyle="mapbox://styles/mapbox/dark-v11"
          mapboxAccessToken={MAPBOX_TOKEN}
        />
      </DeckGL>
    </div>
  );
};

export default React.memo(KaiserslauternMapView);
