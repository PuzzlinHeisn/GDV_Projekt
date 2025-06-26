import React from 'react';
import { AppBar, Toolbar, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/material/Icon';
import WohnungsBarChart from '../barcharts/WohnungsBarChart';
import processedDataKaiserslautern from './../../utils/processedDataKaiserslautern'
import processedDataMannheim from './../../utils/processedDataMannheim'
import WohnungsBarChart from '../barcharts/WohnungsBarChart';
import Slide from '@mui/material/Slide';

const BottomChartBar = ({ selectedObject, learSelections }) => {

  return (
    <Slide direction="up" in={!!selectedObject} mountOnEnter unmountOnExit > 
    <AppBar
  position="fixed"
  sx={{
    top: 'auto',
    bottom: 0,
    boxShadow: 10,
    backgroundColor: '#1e1e2f',
    color: '#ffffff',
  }}
>
      <Toolbar>
        <Box sx={{ display: 'flex', width: '100%'}}>
          {selectedObject && (
            <Box sx={{ flex: 1 }}>
              <WohnungsBarChart
                data={[...processedDataKaiserslautern].sort((a, b) => a.price_per_qm - b.price_per_qm)}
                selected={selectedObject}
                dataKey="price_per_qm"
                label="Kaiserslautern (€/m²)"
            
              />
              <WohnungsBarChart
                data={[...processedDataKaiserslautern].sort((a, b) => a.qm - b.qm)}
                selected={selectedObject}
                dataKey="qm"
                label="Kaiserslautern (€/m²)"
            
              />
              <WohnungsBarChart
                data={[...processedDataKaiserslautern].sort((a, b) => a.price_per_qm - b.price_per_qm)}
                selected={selectedObject}
                dataKey="price_per_qm"
                label="Kaiserslautern (€/m²)"
            
              />
            </Box>
            
          )}
          {selectedObject && (
            <Box sx={{ flex: 1 }}>
              <WohnungsBarChart
                data={[...processedDataMannheim].sort((a, b) => a.price_per_qm - b.price_per_qm)}
                selected={selectedObject}
                dataKey="price_per_qm"
                label="Mannheim (€/m²)"
              />
              <WohnungsBarChart
                data={[...processedDataMannheim].sort((a, b) => a.qm - b.qm)}
                selected={selectedObject}
                dataKey="qm"
                label="Mannheim (€/m²)"
              />
              <WohnungsBarChart
                data={[...processedDataMannheim].sort((a, b) => a.price_per_qm - b.price_per_qm)}
                selected={selectedObject}
                dataKey="price_per_qm"
                label="Mannheim (€/m²)"
              />
            </Box>
          )}


        </Box>
      </Toolbar>
    </AppBar>
    </Slide>
  );
};
 export default BottomChartBar;