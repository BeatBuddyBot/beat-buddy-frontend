import React, {useEffect, useState} from 'react';
import Header from "../../components/Header.jsx";
import {Box, Button, Grid, useTheme} from "@mui/material";
import {tokens} from "../../theme.js";
import PlaylistCard from "../../components/PlaylistCard.jsx";
import ApiService from "../../services/ApiService.js";
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';

const Playlists = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        ApiService
            .getPlaylists()
            .then((data) => {

                // TODO: delete
                // Temporary sorting
                data = data.sort((a, b) => b.duration - a.duration);

                setPlaylists(data);
            });
    }, []);

    return (
        <Box m="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="PLAYLISTS" subtitle="Build the perfect playlist"/>
                <Box>
                    <Button
                        sx={{
                            backgroundColor: colors.primary[400],
                            color: colors.greenAccent[400],
                            fontWeight: "bold",
                        }}
                    >
                        <PlaylistAddIcon sx={{mr: "10px"}}/>
                        Create new playlist
                    </Button>
                </Box>
            </Box>

            <Grid container spacing={2}>
                {playlists.map((playlist) => (
                    <Grid size={3} key={playlist.id}>
                        <PlaylistCard key={playlist.id} playlist={playlist}/>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Playlists;
