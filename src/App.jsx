import React, { useState } from 'react';
import MannheimMapView from './components/mapviews/MannheimMapView'
import KaiserslauternMapView from './components/mapviews/KaiserslauternMapView';
import WohnungsBarChart from './components/barcharts/WohnungsBarChart';
import BottomChartBar from './components/appbar/BottomChartBar';
import { wohnungenDataMannheim } from './utils/processedDataMannheim';
import { wohnungenDataKaiserslautern } from './utils/processedDataKaiserslautern';
import { findBestMatch } from './utils/findBestMatch';
import merged_data from './data/merged_data.json'
import { Button, Fade } from '@mui/material';
const App = () => {

  const [selectedObject, setSelected] = useState(null);
  const [viewMode, setViewMode] = useState('wohnungen');
  const [foundApartement, setFoundApartement] = useState(null);
  const handleFindBestMatch = () => {
  const selectedObjectComplete = merged_data.find(obj => obj.title === selectedObject);
  if (!selectedObjectComplete) return;

  let result = null;
  if (selectedObjectComplete.city_short === "MA") {
    result = findBestMatch(selectedObjectComplete, wohnungenDataKaiserslautern);
  } else {
    result = findBestMatch(selectedObjectComplete, wohnungenDataMannheim);
  }

  if (result) {
    setFoundApartement(result); // setzt das gefundene Objekt für BarChart etc.
  }
};
  return (
    <div style={{ height: '100vh', width: '100vw', position: 'relative' }}>
  
  {/* Obere schwebende Leiste mit Balkendiagrammen */}
  <BottomChartBar selectedObject={selectedObject} foundApartement={foundApartement}/>
    {/* Button über Maps */}
  <div style={{
    position: 'absolute',
    top: '0',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 1000
  }}>
    <Fade in={!!selectedObject}>
      <Button color="primary" onClick={handleFindBestMatch}>Search Corresponding</Button>
    </Fade>
  </div>

  {/* Kartenbereich */}
  <div style={{ height: '100vh', display: 'flex' }}>
    <KaiserslauternMapView
      selected={selectedObject}
      setSelected={setSelected}
      viewMode={viewMode}
    />
    <MannheimMapView
      selected={selectedObject}
      setSelected={setSelected}
      viewMode={viewMode}
    />

  </div>
</div>

  );
};

export default App;
