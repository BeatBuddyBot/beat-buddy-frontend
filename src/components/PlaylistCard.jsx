import * as React from 'react';
import {useState} from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from '@mui/joy/Divider';
import Typography from '@mui/joy/Typography';
import IconButton from '@mui/joy/IconButton';
import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import {formatDuration} from "../utils/formatters.js";
import CardActions from '@mui/joy/CardActions';
import PlaylistPlayOutlinedIcon from '@mui/icons-material/PlaylistPlayOutlined';
import PlaylistViewModal from "./PlaylistViewModal.jsx";
import ApiService from "../services/ApiService.js";

export default function PlaylistCard({initialPlaylist}) {
    const [playlist, setPlaylist] = useState(initialPlaylist)


    const getPlaylistSongsNumber = () => {
        return Array.isArray(playlist.songs) ? playlist.songs.length : playlist.length
    }

    const getPlaylistDuration = () => {
        return formatDuration(
            Array.isArray(playlist.songs)
                ? playlist.songs.reduce((sum, song) => sum + song.duration, 0)
                : playlist.duration
        )
    }


    const toggleFavourite = () => {
        ApiService
            .patchPlaylist(playlist.id, {'is_favourite': !playlist.is_favourite})
            .then((data) => {
                setPlaylist(prev => ({
                    ...prev,
                    is_favourite: !prev.is_favourite,
                }));
            });
    };

    return (
        <Card variant="outlined" sx={{height: '100%'}}>
            <CardOverflow>
                <AspectRatio ratio="1">
                    <img
                        src={playlist.cover_url ? playlist.cover_url: 'src/assets/playlist_default_cover.png'}
                        loading="lazy"
                    />
                </AspectRatio>
            </CardOverflow>
            <CardContent>
                <Typography
                    level="title-md"
                    gutterBottom
                    sx={{
                        overflow: "hidden",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical"
                    }}>
                    {playlist.title}
                </Typography>
                <Typography
                    level="body-sm"
                    variant="body2"
                    sx={{
                        overflow: "hidden",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical"
                    }}
                >
                    {playlist.description}
                </Typography>
            </CardContent>
            <CardActions
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between', // по краям
                    alignItems: 'center',
                }}
            >
                <IconButton
                    variant={playlist.is_favourite ? "solid" : "outlined"}
                    color={playlist.is_favourite ? "danger" : "neutral"}
                    onClick={toggleFavourite}
                >
                    {playlist.is_favourite ? <Favorite/> : <FavoriteBorder/>}
                </IconButton>
                <PlaylistViewModal playlist={playlist} setPlaylist={setPlaylist}/>
                <IconButton variant={'solid'} color={'success'}>
                    <PlaylistPlayOutlinedIcon/>
                </IconButton>
            </CardActions>
            <CardOverflow variant="soft">
                <Divider inset="context"/>
                <CardContent orientation="horizontal">
                    <Typography
                        level="body-xs"
                        sx={{
                            overflow: "hidden",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical"
                        }}
                    >
                        Songs number: {getPlaylistSongsNumber()}
                    </Typography>
                    <Divider orientation="vertical"/>
                    <Typography
                        level="body-xs"
                        sx={{
                            overflow: "hidden",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical"
                        }}
                    >
                        Duration: {getPlaylistDuration()}
                    </Typography>
                </CardContent>
            </CardOverflow>
        </Card>
    );
}