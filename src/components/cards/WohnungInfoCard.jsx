import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { green } from '@mui/material/colors';
import merged_data from './../../data/merged_data.json'
import Zoom from '@mui/material/Zoom';
const WohnungInfoCard = ({ wohnungTitle, selected }) => {
  const wohnung = merged_data.find(w => w.title === wohnungTitle);
  if (!wohnung) return null;
    return(
    <Zoom in={selected}>
    <Card
        sx={{
            position: 'absolute',
            top: 20,
            left: 20,
            maxWidth: 300,
            zIndex: 999,
            boxShadow: 9,
            backgroundColor: 'black'
        }}
        >
   <CardContent sx={{ backgroundColor: '#1e1e2f', borderRadius: 2 }}>
  <Typography variant="h5" sx={{ color: '#ffffff' }} gutterBottom>
    {wohnung.title}
  </Typography>

  <Typography variant="h6" sx={{ color: '#ffffff' }}>
    Preis €/m²: <Typography variant="h6" component="span" sx={{ color: '#c792ea', fontWeight: 'bold' }}>{wohnung.price_per_qm}</Typography>
  </Typography>

  <Typography variant="h6" sx={{ color: '#ffffff' }}>
    Preis Kalt: <Typography variant="h6" component="span" sx={{ color: '#c792ea', fontWeight: 'bold' }}>{wohnung.price_cold}</Typography>
  </Typography>

  <Typography variant="h6" sx={{ color: '#ffffff' }}>
    Preis Warm: <Typography variant="h6" component="span" sx={{ color: '#c792ea', fontWeight: 'bold' }}>{wohnung.price_warm}</Typography>
  </Typography>

  <Typography variant="h6" sx={{ color: '#ffffff' }}>
    Fläche: <Typography  variant="h6" component="span" sx={{ color: '#c792ea', fontWeight: 'bold' }}>{wohnung.qm}</Typography> qm
  </Typography>

  <Typography variant="h6" sx={{ color: '#ffffff' }}>
    Adresse: <Typography variant="h6" component="span" sx={{ color: '#c792ea', fontWeight: 'bold' }}>{wohnung.street}</Typography>
  </Typography>

  <Typography variant="h6" sx={{ color: '#ffffff' }}>
    Stadt: <Typography variant="h6" component="span" sx={{ color: '#c792ea', fontWeight: 'bold' }}>{wohnung.city}</Typography>
  </Typography>

  <Typography variant="h6" sx={{ color: '#ffffff' }}>
    Anzahl Zimmer: <Typography variant="h6" component="span" sx={{ color: '#c792ea', fontWeight: 'bold' }}>{wohnung.rooms}</Typography>
  </Typography>

  <Typography variant="h6" sx={{ color: '#ffffff' }}>
    Anzahl Etagen: <Typography variant="h6" component="span" sx={{ color: '#c792ea', fontWeight: 'bold' }}>{wohnung.floor}</Typography>
  </Typography>
</CardContent>
  
    </Card>
    </Zoom>
)};

export default WohnungInfoCard;