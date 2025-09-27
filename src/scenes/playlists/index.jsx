import React from 'react';
import Header from "../../components/Header.jsx";
import {Box} from "@mui/material";

const Playlists = () => {
    return (
        <Box m="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="PLAYLISTS" subtitle="Build the perfect playlist" />
            </Box>
        </Box>
    );
};

export default Playlists;
