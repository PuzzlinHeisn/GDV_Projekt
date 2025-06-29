import React, { useState } from 'react';
import MannheimMapView from './components/mapviews/MannheimMapView'
import KaiserslauternMapView from './components/mapviews/KaiserslauternMapView';
import WohnungsBarChart from './components/charts/WohnungsBarChart';
import BottomChartBar from './components/appbar/BottomChartBar';
import { wohnungenDataMannheim } from './utils/processedDataMannheim';
import { wohnungenDataKaiserslautern } from './utils/processedDataKaiserslautern';
import { findBestMatch } from './utils/findBestMatch';
import merged_data from './data/merged_data.json'
import { Button, Fade } from '@mui/material';
import TogglePieViewButton from './components/buttons/TogglePieViewButton';
import TopPieBar from './components/appbar/TopPieBar';
import WohnungInfoCard from './components/cards/WohnungInfoCard';
const App = () => {

  const [selectedObject, setSelected] = useState(null);
  const [ShowPie, setShowPie] = useState(false);
  const [foundApartement, setFoundApartement] = useState(null);
  const [HideBar, setHideBar] = useState(false);
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
  <TopPieBar ShowPie={ShowPie}></TopPieBar>
  
  {foundApartement && <WohnungInfoCard wohnungTitle={foundApartement.title} selected={!!foundApartement} foundApartement = {true}/>}

  {selectedObject && <WohnungInfoCard wohnungTitle={selectedObject} selected={!!selectedObject} foundApartement = {false}/>}
  {/* Obere schwebende Leiste mit Balkendiagrammen */}
 <BottomChartBar selectedObject={selectedObject} foundApartement={foundApartement}/>
    {/* Button über Maps */}
  <div style={{
    position: 'absolute',
    top: '45%',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 1000
  }}>
    <Fade in={!!selectedObject}>
      <Button
  color="primary"
  onClick={handleFindBestMatch}
  sx={{
    px: 4,               // padding-left und padding-right
    py: 1.5,             // padding-top und padding-bottom
    fontWeight: '800',
    fontSize: '1.1rem',
    borderRadius: 2,     // 8px (MUI spacing)
    boxShadow: '0 4px 12px rgba(25, 118, 210, 0.4)', // schöner Schatten in blau
    background: 'linear-gradient(180deg, #FF6EC7,rgb(255, 255, 255))', // blauer Farbverlauf
    color: '#000',
    textTransform: 'none', // kein Großbuchstaben
    transition: 'all 0.3s ease',
    '&:hover': {
      background: 'linear-gradient(180deg,rgb(255, 154, 216),rgb(250, 250, 250))',
    },
  }}
>
  Ähnliche Wohnung finden
</Button>
    </Fade>
  </div>
  <TogglePieViewButton setShowPie={setShowPie} ShowPie={ShowPie}></TogglePieViewButton>
  {/* Kartenbereich */}
  <div style={{ height: '100vh', display: 'flex' }}>
    <KaiserslauternMapView
      selected={selectedObject}
      setSelected={setSelected}
      setFoundApartment={setFoundApartement}
    />
    <MannheimMapView
      selected={selectedObject}
      setSelected={setSelected}
      setFoundApartment={setFoundApartement}
    />

  </div>
</div>

  );
};

export default App;
