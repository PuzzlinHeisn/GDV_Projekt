
import React from 'react';
import {Button} from '@mui/material'
const TogglePieViewButton = ({ ShowPie, setShowPie }) => (
  <Button
    variant="contained"
    color="secondary"
    style={{
      position: 'absolute',
      top: 20,
      right: 20,
      zIndex: 1000
    }}
    onClick={() => setShowPie(show => !show)}  // hier onToggle nutzen, nicht setViewMode
  >
    {ShowPie === false
      ? "🏢 Städtevergleich anzeigen"
      : "Städtevergleich schließen"}
  </Button>
);
export default TogglePieViewButton;
