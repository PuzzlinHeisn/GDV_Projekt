import React from 'react';
import { AppBar, Toolbar, Box, Typography } from '@mui/material';
import Slide from '@mui/material/Slide';
import StadtPieChart from '../../rechart/StadtPieChart';

const TopPieBar = ({ ShowPie }) => {
  return (
    <Slide in={ShowPie} direction='down'>
      <AppBar
        position="fixed"
        sx={{
          top: 0,
          zIndex: 20,
          boxShadow: 10,
          backgroundColor: '#1e1e2f',
          color: '#ffffff',
        }}
      >
        <Toolbar>
          <Box sx={{ display: 'flex', width: '100%', gap: 2, flexWrap: 'wrap' }}>
            <Box sx={{ flex: 1, minWidth: 250 }}>
              <Typography variant="h6" sx={{ color: 'white', mt: 2 }}>
                Quadratmeter Durchschnitt
              </Typography>
              <StadtPieChart dataKey={"qm"} />
            </Box>
            <Box sx={{ flex: 1, minWidth: 250 }}>
              <Typography variant="h6" sx={{ color: 'white', mt: 2 }}>
                Preis pro Quadratmeter Durchschnitt
              </Typography>
              <StadtPieChart dataKey={"price_per_qm"} />
            </Box>
            <Box sx={{ flex: 1, minWidth: 250 }}>
              <Typography variant="h6" sx={{ color: 'white', mt: 2 }}>
                Preis Warm Durchschnitt
              </Typography>
              <StadtPieChart dataKey={"price_warm"} />
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </Slide>
  );
};

export default TopPieBar;
