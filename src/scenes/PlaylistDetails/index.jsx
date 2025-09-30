import React, {useEffect, useState} from 'react';
import {Box} from "@mui/material";
import Header from "../../components/Header.jsx";
import {Link, useParams} from "react-router-dom";
import ApiService from "../../services/ApiService.js";
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import SongsTable from "../../components/SongsTable.jsx";
import BeatBuddyButton from "../../components/ui/buttons/BeatBuddyButton.jsx";

const PlaylistDetails = () => {
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

            <Box display="flex" alignItems="center">
                <Header title={playlist.title} subtitle={playlist.description}/>
            </Box>
            <BeatBuddyButton
                sx={{
                    mb: "10px"
                }}
                component={Link}
                to={'/playlists'}
            >
                <ArrowBackOutlinedIcon sx={{mr: "10px"}}/>
                Back to playlists
            </BeatBuddyButton>

            {playlist.songs && playlist.songs.length > 0 && <SongsTable initialSongs={playlist.songs}/>}

        </Box>

    );
};

export default PlaylistDetails;