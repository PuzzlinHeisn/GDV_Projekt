import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const WohnungInfoCard = ({ wohnung }) => (
    <Card
        sx={{
            position: 'absolute',
            bottom: 20,
            left: 20,
            maxWidth: 300,
            zIndex: 999,
            boxShadow: 3,
        }}
        >
        <CardContent>
            <Typography variant="h6" gutterBottom>{wohnung.title}</Typography>
            <Typography variant="body2">📐 {wohnung.price_per_qm} €/m²</Typography>
            <Typography variant="body2">📍 Adresse: {wohnung.street}</Typography>
        </CardContent>        
    </Card>
);

export default WohnungInfoCard;