import React from 'react';
import { AppBar, Toolbar, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/material/Icon';
import processedDataKaiserslautern from './../../utils/processedDataKaiserslautern'
import processedDataMannheim from './../../utils/processedDataMannheim'
import WohnungsBarChart from '../charts/WohnungsBarChart';
import Slide from '@mui/material/Slide';
import StadtPieChart from '../charts/StadtPieChart';

const BottomChartBar = ({ selectedObject, foundApartement}) => {

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
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" sx={{ color: 'white', mt: 2 }}>
               Kaiserslautern
              </Typography>
              <WohnungsBarChart
                data={[...processedDataKaiserslautern].sort((a, b) => a.price_per_qm - b.price_per_qm)}
                selected={selectedObject}
                dataKey="price_per_qm"
                label="Kaiserslautern(€/m²)"
                foundApartement={foundApartement}           
              />
              <WohnungsBarChart
                data={[...processedDataKaiserslautern].sort((a, b) => a.qm - b.qm)}
                selected={selectedObject}
                dataKey="qm"
                label="Kaiserslautern(qm)"
                foundApartement={foundApartement}            
              />
              <WohnungsBarChart
                data={[...processedDataKaiserslautern].sort((a, b) => a.distance_to_center - b.distance_to_center)}
                selected={selectedObject}
                dataKey="distance_to_center"
                label="Distanz zum Zentrum(km)"
                foundApartement={foundApartement}           
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" sx={{ color: 'white', mt: 2 }}>
               Mannheim
              </Typography>
              <WohnungsBarChart
                data={[...processedDataMannheim].sort((a, b) => a.price_per_qm - b.price_per_qm)}
                selected={selectedObject}
                dataKey="price_per_qm"
                label="Mannheim(€/m²)"
                foundApartement={foundApartement}
              />
              <WohnungsBarChart
                data={[...processedDataMannheim].sort((a, b) => a.qm - b.qm)}
                selected={selectedObject}
                dataKey="qm"
                label="Mannheim(qm)"
                foundApartement={foundApartement}
              />
              <WohnungsBarChart
                data={[...processedDataMannheim].sort((a, b) => a.distance_to_center - b.distance_to_center)}
                selected={selectedObject}
                dataKey="distance_to_center"
                label="Distanz zum Zentrum(km)"
                foundApartement={foundApartement}
              />
            </Box>
        </Box>
      </Toolbar>
    </AppBar>
    </Slide>
  );
};
 export default BottomChartBar;