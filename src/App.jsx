import React, { useState } from 'react';
import MannheimMapView from './components/mapviews/MannheimMapView'
import KaiserslauternMapView from './components/mapviews/KaiserslauternMapView';
import WohnungsBarChart from './components/barcharts/WohnungsBarChart';
import BottomChartBar from './components/appbar/BottomChartBar';
import { wohnungenDataMannheim } from './utils/processedDataMannheim';
import { wohnungenDataKaiserslautern } from './utils/processedDataKaiserslautern';

const App = () => {
  const [selectedObject, setSelected] = useState(null);
  const [viewMode, setViewMode] = useState('wohnungen');

  return (
    <div style={{ height: '100vh', width: '100vw', position: 'relative' }}>
  
  {/* Obere schwebende Leiste mit Balkendiagrammen */}

  <BottomChartBar selectedObject={selectedObject} />


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
