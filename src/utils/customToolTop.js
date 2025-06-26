import React from "react";
import { Typography, Box } from "@mui/material";

const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload || !payload.length) return null;

    const wohnung = payload[0].payload;

    return (
        <Box
            sx={{
                backgroundColor: "white",
                maxWidth: 400,
                boxShadow: 3,
            }}
        >
            <Typography variant="body2" fontWeight="bold" gutterBottom>
                {wohnung.title}
            </Typography>

            <Typography variant="body2">
                <strong>Preis €/m²:</strong> {wohnung.price_per_qm}
            </Typography>
            <Typography variant="body2">
                <strong>Preis Kalt:</strong> {wohnung.price_cold}
            </Typography>
            <Typography variant="body2">
                <strong>Preis Warm:</strong> {wohnung.price_warm}
            </Typography>
            <Typography variant="body2">
                <strong>Fläche:</strong> {wohnung.qm} qm
            </Typography>
            <Typography variant="body2">
                <strong>Adresse:</strong> {wohnung.street}
            </Typography>
            <Typography variant="body2">
                <strong>Stadt:</strong> {wohnung.city}
            </Typography>
            <Typography variant="body2">
                <strong>Zimmer:</strong> {wohnung.rooms}
            </Typography>
            <Typography variant="body2">
                <strong>Etage:</strong> {wohnung.floor}
            </Typography>
        </Box>
    );
};

export default CustomTooltip;