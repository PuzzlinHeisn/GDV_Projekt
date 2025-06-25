import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { green } from '@mui/material/colors';

const WohnungInfoCard = ({ wohnung }) => (
    <Card
        sx={{
            position: 'absolute',
            bottom: 20,
            left: 20,
            maxWidth: 300,
            zIndex: 999,
            boxShadow: 9,
            backgroundColor: 'background.paper'
        }}
        >
        <CardContent>
<Typography variant="h5" gutterBottom>{wohnung.title}</Typography>

<Typography variant="h6">
  Preis €/m²: <Typography variant="h6" component="span" sx={{ color: 'secondary.main', fontWeight: 'bold' }}>{wohnung.price_per_qm}</Typography>
</Typography>

<Typography variant="h6">
  Preis Kalt: <Typography variant="h6" component="span" sx={{ color: 'secondary.main', fontWeight: 'bold' }}>{wohnung.price_cold}</Typography>
</Typography>

<Typography variant="h6">
  Preis Warm: <Typography variant="h6" component="span" sx={{ color: 'secondary.main', fontWeight: 'bold' }}>{wohnung.price_warm}</Typography>
</Typography>

<Typography variant="h6">
  Fläche: <Typography variant="h6" component="span" sx={{ color: 'secondary.main', fontWeight: 'bold' }}>{wohnung.qm}</Typography> qm
</Typography>

<Typography variant="h6">
  Adresse: <Typography variant="h6" component="span" sx={{ color: 'secondary.main', fontWeight: 'bold' }}>{wohnung.street}</Typography>
</Typography>

<Typography variant="h6">
  Stadt: <Typography variant="h6" component="span" sx={{ color: 'secondary.main', fontWeight: 'bold' }}>{wohnung.city}</Typography>
</Typography>

<Typography variant="h6">
  Anzahl Zimmer: <Typography variant="h6" component="span" sx={{ color: 'secondary.main', fontWeight: 'bold' }}>{wohnung.rooms}</Typography>
</Typography>

<Typography variant="h6">
  Anzahl Etagen: <Typography variant="h6" component="span" sx={{ color: 'secondary.main', fontWeight: 'bold' }}>{wohnung.floor}</Typography>
</Typography>
        </CardContent>        
    </Card>
);

export default WohnungInfoCard;