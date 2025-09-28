import React, {useEffect, useState} from 'react';
import {Box, Button, useTheme} from "@mui/material";
import Header from "../../components/Header.jsx";
import {Link, useParams} from "react-router-dom";
import ApiService from "../../services/ApiService.js";
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import {tokens} from "../../theme.js";

const PlaylistDetails = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const { id } = useParams();
    const [playlist, setPlaylist] = useState([]);

    useEffect(() => {
        ApiService
            .getPlaylist(id)
            .then((data) => {
                setPlaylist(data);
            });
    }, [id]);

    return (
        <>
        <Button
            sx={{
                backgroundColor: colors.primary[400],
                color: colors.greenAccent[400],
                fontWeight: "bold",
                mx:20+'px',
            }}
            component={Link}
            to={'/playlists'}
        >
            <ArrowBackOutlinedIcon sx={{mr: "10px"}}/>
            Back to playlists
        </Button>

        <Box m="20px" display={'flex'}>
            <Box display="flex" alignItems="center">
                <Header title={playlist.title} subtitle={playlist.description} />
            </Box>

        </Box>
        </>
    );
};

export default PlaylistDetails;