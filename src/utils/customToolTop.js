import React from "react";
import { Typography, Box } from "@mui/material";

const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload || !payload.length) return null;

    const wohnung = payload[0].payload;

    return (
        <Box
            sx={{
                backgroundColor: "#1e1e2f",
                color: "#f5f5f5",
                border: "1px solid #c792ea",
                borderRadius: 2,
                padding: 2,
                maxWidth: 320,
                boxShadow: 6,
                zIndex: 9999,
            }}
        >
            <Typography variant="subtitle2" sx={{ fontWeight: "bold", color: "#c792ea", mb: 1 }}>
                {wohnung.title}
            </Typography>

            <Typography variant="body2">
                <strong style={{ color: "#c792ea" }}>Preis €/m²:</strong> {wohnung.price_per_qm}
            </Typography>
            <Typography variant="body2">
                <strong style={{ color: "#c792ea" }}>Preis Kalt:</strong> {wohnung.price_cold}
            </Typography>
            <Typography variant="body2">
                <strong style={{ color: "#c792ea" }}>Preis Warm:</strong> {wohnung.price_warm}
            </Typography>
            <Typography variant="body2">
                <strong style={{ color: "#c792ea" }}>Fläche:</strong> {wohnung.qm} qm
            </Typography>
            <Typography variant="body2">
                <strong style={{ color: "#c792ea" }}>Adresse:</strong> {wohnung.street}
            </Typography>
            <Typography variant="body2">
                <strong style={{ color: "#c792ea" }}>Stadt:</strong> {wohnung.city}
            </Typography>
            <Typography variant="body2">
                <strong style={{ color: "#c792ea" }}>Zimmer:</strong> {wohnung.rooms}
            </Typography>
            <Typography variant="body2">
                <strong style={{ color: "#c792ea" }}>Etage:</strong> {wohnung.floor}
            </Typography>
        </Box>
    );
};

export default CustomTooltip;
