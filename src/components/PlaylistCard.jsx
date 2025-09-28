import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import {formatDuration} from "../utils/formatters.js";
import {Box, useTheme} from "@mui/material";
import {tokens} from "../theme.js";

export default function PlaylistCard({playlist}) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (

        <Card sx={{height: "100%"}}>
            <Box backgroundColor={colors.primary[400]}>

                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="140"
                        src={playlist.cover_url}
                        alt="green iguana"
                    />
                    <CardContent>
                        <Typography
                            gutterBottom
                            variant="h5"
                            component="div"
                            color={colors.greenAccent[400]}
                            sx={{
                                overflow: "hidden",
                                display: "-webkit-box",
                                WebkitLineClamp: 1,
                                WebkitBoxOrient: "vertical"
                            }}>
                            {playlist.title}
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                overflow: "hidden",
                                display: "-webkit-box",
                                WebkitLineClamp: 1,
                                WebkitBoxOrient: "vertical"
                            }}
                        >
                            {playlist.description}
                        </Typography>

                        <Typography
                            variant="subtitle2"
                            component="div"
                            sx={{color: 'text.secondary'}}
                            color={colors.greenAccent[400]}
                        >
                            {playlist.length} songs ({formatDuration(playlist.duration)})
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Box>
        </Card>

    );
}