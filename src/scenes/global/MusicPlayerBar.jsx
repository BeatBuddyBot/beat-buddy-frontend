import React, { useState } from 'react';
import { Box, IconButton, Slider, Typography } from '@mui/joy';
import {
  Pause,
  PlayArrow,
  Repeat,
  Shuffle,
  SkipNext,
  SkipPrevious,
} from '@mui/icons-material';
import RepeatOneIcon from '@mui/icons-material/RepeatOne';
import ApiService from '../../services/ApiService.js';
import { useSnackbar } from 'notistack';

export default function MusicPlayerBar() {
  const { enqueueSnackbar } = useSnackbar();

  const [paused, setPaused] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const [loadingPlayPause, setLoadingPlayPause] = useState(false);

  const togglePlayPause = () => {
    setLoadingPlayPause(true);
    setDisabled(true);

    ApiService.pause().catch(() => {
      enqueueSnackbar('Failed', { variant: 'error' });
    });

    setTimeout(() => {
      setPaused(!paused)
      setLoadingPlayPause(false);
      setDisabled(false);
    }, 500);
  };


  return (
    <Box
      sx={{
        position: 'fixed',
        height: 70,
        bottom: 0,
        left: 0,
        width: '100%',
        bgcolor: '#0B0D0F',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 3,
        py: 1.5,
        gap: 1,
        boxShadow: '0 -2px 10px rgba(0,0,0,0.5)',
        zIndex: 1299, // Under modals
      }}
    >
      <Typography
        level="body-sm"
        sx={{
          width: 300,
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: 1,
          WebkitBoxOrient: 'vertical',
          textAlign: 'right',
          mr: 3,
        }}
      >
        IC3PEAK - Смерти больше нет
      </Typography>

      <IconButton
        disabled={disabled}
      >
        <Shuffle />
      </IconButton>
      <IconButton
        disabled={disabled}
      >
        <SkipPrevious />
      </IconButton>
      <IconButton
        size="lg"
        variant={'solid'}
        onClick={() => togglePlayPause()}
        disabled={disabled}
        loading={loadingPlayPause}
      >
        {paused ? <PlayArrow /> : <Pause />}
      </IconButton>

      <IconButton
        disabled={disabled}
      >
        <SkipNext />
      </IconButton>

      <IconButton disabled={disabled}>
        <Repeat />
        {/*<Repeat color={'success'} />*/}
        {/*<RepeatOneIcon color={'success'} />*/}
      </IconButton>

      <Box sx={{ display: 'flex', alignItems: 'center', width: 300, ml: 3 }}>
        <Typography level="body-sm" sx={{ width: 35 }}>
          2:40
        </Typography>
        <Slider disabled value={82.5} sx={{ flex: 1, mx: 1 }} />
        <Typography level="body-sm" sx={{ width: 35 }}>
          3:14
        </Typography>
      </Box>
    </Box>
  );
}
