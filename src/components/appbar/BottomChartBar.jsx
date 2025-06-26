import React from 'react';
import { AppBar, Toolbar, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/material/Icon';
import WohnungsBarChart from '../barcharts/WohnungsBarChart';
import processedDataKaiserslautern from './../../utils/processedDataKaiserslautern'
import processedDataMannheim from './../../utils/processedDataMannheim'
import WohnungsBarChart from '../barcharts/WohnungsBarChart';


const BottomChartBar = ({ selectedObject, learSelections }) => {

  return (
    <AppBar position="fixed" color="default" sx={{ top: 'auto', bottom: 0, boxShadow: 10 }}>
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
  );
};
 export default BottomChartBar;