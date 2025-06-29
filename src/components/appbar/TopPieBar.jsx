import React from 'react';
import { AppBar, Toolbar, Box, Typography, IconButton, Slide } from '@mui/material';
import Slide from '@mui/material/Slide';
import StadtPieChart from '../charts/StadtPieChart';

const TopPieBar = ({ ShowPie }) => {

  return (
    <Slide in={ShowPie} direction='down'>
    <AppBar
  position="fixed"
  sx={{
    top: 'auto',
    zIndex: 20,
    top: 0,
    boxShadow: 10,
    backgroundColor: '#1e1e2f',
    color: '#ffffff',
  }}
>
      <Toolbar>
        <Box sx={{ display: 'flex', width: '100%'}}>
          
  
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" sx={{ color: 'white', mt: 2 }}>
                Quadratmeter Durchschnitt
              </Typography>
              <StadtPieChart dataKey={"qm"}></StadtPieChart>
               </Box>
              <Box sx={{ flex: 1 }}
              >
                <Typography variant="h6" sx={{ color: 'white', mt: 2 }}>
                Preis pro Quadratmeter Durchschnitt
              </Typography>
              <StadtPieChart dataKey={"price_per_qm"}></StadtPieChart>
               </Box>

              <Box sx={{ flex: 1 }}>
            <Typography variant="h6" sx={{ color: 'white', mt: 2 }}>
                Preis Warm Durchschnitt
              </Typography>
              <StadtPieChart dataKey={"price_warm"}></StadtPieChart>
              </Box>
        </Box>
      </Toolbar>
    </AppBar>
    </Slide>
  );
};
 export default TopPieBar;