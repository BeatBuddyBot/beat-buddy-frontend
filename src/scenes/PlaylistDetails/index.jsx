import React, {useEffect, useState} from 'react';
import {Box, Button, useTheme} from "@mui/material";
import Header from "../../components/Header.jsx";
import {Link, useParams} from "react-router-dom";
import ApiService from "../../services/ApiService.js";
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import {tokens} from "../../theme.js";
import SongsTable from "../../components/SongsTable.jsx";

const PlaylistDetails = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const {id} = useParams();
    const [playlist, setPlaylist] = useState([]);

    useEffect(() => {
        ApiService
            .getPlaylist(id)
            .then((data) => {
                setPlaylist(data);
            });

    }, [id]);

    return (
        <Box m="20px">
            <Button
                sx={{
                    backgroundColor: colors.primary[400],
                    color: colors.greenAccent[400],
                    fontWeight: "bold",
                    mb: "10px"
                }}
                component={Link}
                to={'/playlists'}
            >
                <ArrowBackOutlinedIcon sx={{mr: "10px"}}/>
                Back to playlists
            </Button>

            <Box display="flex" alignItems="center">
                <Header title={playlist.title} subtitle={playlist.description}/>
            </Box>

            {playlist.songs && playlist.songs.length > 0 && <SongsTable initialSongs={playlist.songs}/>}

        </Box>

    );
};

export default PlaylistDetails;