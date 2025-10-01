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
import {Link} from "react-router-dom";
import Button from '@mui/joy/Button';
import CardActions from '@mui/joy/CardActions';
import PlaylistPlayOutlinedIcon from '@mui/icons-material/PlaylistPlayOutlined';
import PlaylistDetailModal from "./PlaylistDetailModal.jsx";

export default function PlaylistCard({playlist}) {
    const [isFav, setIsFav] = useState(playlist.is_favourite);

    return (

        <Card variant="outlined" sx={{height: '100%'}}>
                <CardOverflow>
                    <AspectRatio ratio="1">
                        <img
                            src={playlist.cover_url}
                            loading="lazy"
                            alt=""
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
                        variant={isFav ? "solid" : "outlined"}
                        color={isFav ? "neutral" : "neutral"}

                    >
                        {isFav ? <Favorite/> : <FavoriteBorder/>}
                    </IconButton>
                    <PlaylistDetailModal playlist={playlist}/>
                    <IconButton variant={'solid'} color={'neutral'}>
                        {/* ON CLICK -> REDIRECT TO !QUEUE PAGE! */}
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
                            Songs number: {playlist.length}
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
                            Duration: {formatDuration(playlist.duration)}
                        </Typography>
                    </CardContent>
                </CardOverflow>

        </Card>
    );
}