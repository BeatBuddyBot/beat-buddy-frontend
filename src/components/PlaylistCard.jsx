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
import Box from '@mui/joy/Box';
import CardCover from '@mui/joy/CardCover';
import Dropdown from '@mui/joy/Dropdown';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import MoreVert from '@mui/icons-material/MoreVert';
import Edit from '@mui/icons-material/Edit';
import DeleteForever from '@mui/icons-material/DeleteForever';
import {ListItemDecorator} from "@mui/joy";
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import {pink, red} from "@mui/material/colors";


export default function PlaylistCard({initialPlaylist, setPlaylists}) {
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

    const handleDeletePlaylist = () => {
        ApiService
            .deletePlaylist(playlist.id)
            .then((data) => {
                setPlaylists((prev) => prev.filter((p) => p.id !== playlist.id));
            });
    }

    const toggleFavourite = () => {
        ApiService
            .patchPlaylist(playlist.id, {'is_favorite': !playlist.is_favorite})
            .then((data) => {
                setPlaylist(prev => ({
                    ...prev,
                    is_favorite: !prev.is_favorite,
                }));
            });
    };

    return (
        <Card variant="outlined" sx={{height: '100%'}}>
            <CardOverflow>
                <AspectRatio ratio="1">
                    <img
                        src={playlist.cover_url ? playlist.cover_url : 'src/assets/playlist_default_cover.png'}
                        loading="lazy"
                    />
                </AspectRatio>
                <CardCover
                    className="gradient-cover"
                    sx={{
                        '&:hover, &:focus-within': {
                            opacity: 1,
                        },
                        opacity: 0,
                        transition: '0.1s ease-in',
                        background:
                            'linear-gradient(0deg, transparent 62%, rgba(0,0,0,0.4) 91.17%)',
                    }}
                >
                    <div>
                        <Box
                            sx={{
                                p: 2,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1.5,
                                flexGrow: 1,
                                alignSelf: 'flex-start',
                            }}
                        >
                            <Dropdown>
                                <MenuButton
                                    slots={{root: IconButton}}
                                    slotProps={{
                                        root: {
                                            variant: "solid",
                                            color: "neutral",
                                            sx: {
                                                ml: "auto",
                                                bgcolor: "rgba(0 0 0 / 0.2)",
                                            },
                                        },
                                    }}
                                >
                                    <MoreVert/>
                                </MenuButton>
                                <Menu size="sm">
                                    <MenuItem>
                                        <ListItemDecorator>
                                            <Edit/>
                                        </ListItemDecorator>{' '}

                                        <Typography>
                                            Edit
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem>
                                        <ListItemDecorator>
                                            <ImageOutlinedIcon/>
                                        </ListItemDecorator>{' '}

                                        <Typography>
                                            Upload new cover
                                        </Typography>
                                    </MenuItem>
                                    <Divider sx={{ my: 0.5 }} />
                                    <MenuItem onClick={handleDeletePlaylist}>
                                        <ListItemDecorator>
                                            <DeleteForever sx={{ color: red[500] }} />
                                        </ListItemDecorator>{' '}
                                        <Typography>
                                            Delete
                                        </Typography>
                                    </MenuItem>
                                </Menu>
                            </Dropdown>
                        </Box>
                    </div>
                </CardCover>
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
                    variant={playlist.is_favorite ? "solid" : "outlined"}
                    color={playlist.is_favorite ? "danger" : "neutral"}
                    onClick={toggleFavourite}
                >
                    {playlist.is_favorite ? <Favorite/> : <FavoriteBorder/>}
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