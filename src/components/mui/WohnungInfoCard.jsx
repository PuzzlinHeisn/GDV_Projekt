import React ,{useMemo}from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import Zoom from '@mui/material/Zoom';
import merged_data from '../../data/merged_data.json';

const WohnungInfoCard = ({ wohnungTitle, selected }) => {
  const wohnung = useMemo(() => merged_data.find(w => w.title === wohnungTitle), [wohnungTitle]);
  if (!wohnung) return null;

  return (
    <Zoom in={selected}>
      <Box>
        <Card
          sx={{
            position: 'absolute',
            top: 80,
            left: wohnung.city_short === 'KL' ? 20 : 'auto',
            right: wohnung.city_short === 'MA' ? 20 : 'auto',
            maxWidth: 400,
            zIndex: 10,
            boxShadow: 9,
          }}
        >

          <CardContent sx={{ backgroundColor: '#1e1e2f', borderRadius: 2 }}>
            <Typography variant="h6" sx={{ color: '#ffffff', mb: 1 }}>
              {wohnung.title}
            </Typography>

            {[
              ['Preis €/m²', wohnung.price_per_qm],
              ['Preis Kalt', wohnung.price_cold],
              ['Preis Warm', wohnung.price_warm],
              ['Fläche', `${wohnung.qm} qm`],
              ['Adresse', wohnung.street],
              ['Stadt', wohnung.city],
              ['Anzahl Zimmer', wohnung.rooms],
              ['Etage', wohnung.floor],
            ].map(([label, value]) => (
              <Typography key={label} variant="body1" sx={{ color: '#ffffff' }}>
                {label}:{' '}
                <Box component="span" sx={{ color: '#c792ea', fontWeight: 'bold' }}>
                  {value}
                </Box>
              </Typography>
            ))}
          </CardContent>
        </Card>
      </Box>
    </Zoom>
  );
};

export default WohnungInfoCard;
