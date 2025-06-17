
import React from 'react';
import {Button} from '@mui/material'
const ToggleBarViewButton = ({ viewMode, onToggle }) => (
  <Button
    variant="contained"
    color="secondary"
    style={{
      position: 'absolute',
      top: 20,
      right: 20,
      zIndex: 1000
    }}
    onClick={onToggle}  // hier onToggle nutzen, nicht setViewMode
  >
    {viewMode === "avg"
      ? "🏢 Einzelwohnungen anzeigen"
      : "📊 Durchschnitt pro Stadtteil"}
  </Button>
);
export default ToggleBarViewButton;
