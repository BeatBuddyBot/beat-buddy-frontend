import React, {useState} from "react";
import {Box, IconButton, Slider, Typography} from "@mui/joy";
import {Pause, PlayArrow, Repeat, Shuffle, SkipNext, SkipPrevious} from "@mui/icons-material";
import RepeatOneIcon from '@mui/icons-material/RepeatOne';


export default function MusicPlayerBar() {
    const [paused, setPaused] = useState(false)
    const [loading, setLoading] = useState(false)

    const [nextSongLoading, setNextSongLoading] = useState(false)
    const [prevSongLoading, setPrevSongLoading] = useState(false)

    const handleNextSong = () => {
        setNextSongLoading(true)
        setLoading(true)
        setTimeout(() => {
            setNextSongLoading(false)
            setLoading(false)
        }, 500);
    }

    const handlePrevSong = () => {
        setPrevSongLoading(true)
        setLoading(true)
        setTimeout(() => {
            setPrevSongLoading(false)
            setLoading(false)
        }, 500);
    }

    return (
        <Box
            sx={{
                position: "fixed",
                height: 70,
                bottom: 0,
                left: 0,
                width: "100%",
                bgcolor: '#0B0D0F',
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                px: 3,
                py: 1.5,
                gap: 1,
                boxShadow: "0 -2px 10px rgba(0,0,0,0.5)",
                zIndex: 1299, // Under modals
            }}
        >
            <Typography
                level="body-sm"
                sx={{
                    width: 300,
                    overflow: "hidden",
                    display: "-webkit-box",
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: "vertical",
                    textAlign: "right",
                    mr: 3
                }}
            >
                IC3PEAK - Смерти больше нет
            </Typography>

            <IconButton
                disabled={loading}
            >
                <Shuffle/>
            </IconButton>
            <IconButton
                disabled={loading}
                loading={prevSongLoading}
                onClick={handlePrevSong}
            >
                <SkipPrevious/>
            </IconButton>
            <IconButton
                size="lg"
                variant={'solid'}
                onClick={() => setPaused(!paused)}
                disabled={loading}
            >
                {paused ? (
                    <PlayArrow />
                ) : (
                    <Pause />
                )}
            </IconButton>

            <IconButton
                disabled={loading}
                loading={nextSongLoading}
                onClick={handleNextSong}
            >
                <SkipNext/>

            </IconButton>

            <IconButton
                disabled={loading}
            >
                <Repeat />
                {/*<Repeat color={'success'} />*/}
                {/*<RepeatOneIcon color={'success'} />*/}
            </IconButton>


            <Box sx={{display: "flex", alignItems: "center", width: 300, ml: 3}}>
                <Typography level="body-sm" sx={{width: 35}}>
                    2:40
                </Typography>
                <Slider
                    disabled
                    value={82.5}
                    sx={{flex: 1, mx: 1}}
                />
                <Typography level="body-sm" sx={{width: 35}}>
                    3:14
                </Typography>

            </Box>
        </Box>
    );
}
