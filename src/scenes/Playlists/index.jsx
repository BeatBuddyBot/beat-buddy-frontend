import React, {useEffect, useState} from 'react';
import Header from "../../components/Header.jsx";
import {Box, Button, Grid} from "@mui/material";
import PlaylistCard from "../../components/PlaylistCard.jsx";
import ApiService from "../../services/ApiService.js";
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';

const Playlists = () => {
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        ApiService
            .getPlaylists()
            .then((data) => {
                setPlaylists(data);
            });
    }, []);

    return (

        <Box m="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="PLAYLISTS" subtitle="Build the perfect playlist"/>
                <Box>
                    <Button variant={'outlined'}>
                        <PlaylistAddIcon sx={{mr: "10px"}}/>
                        Create new playlist
                    </Button>
                </Box>
            </Box>

            <Grid container spacing={3}>
                {playlists.map((playlist) => (
                    <Grid size={2} key={playlist.id}  >
                        <PlaylistCard key={playlist.id} playlist={playlist}/>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Playlists;
