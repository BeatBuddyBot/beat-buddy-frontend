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

  const [repeat, setRepeat] = useState('disabled');
  const [loadingRepeat, setLoadingRepeat] = useState(false);

  const repeatIcons = {
    disabled: <Repeat />,
    repeat_all: <Repeat color={'success'} />,
    repeat_one: <RepeatOneIcon color={'success'} />,
  };

  const repeatOrder = ['disabled', 'repeat_all', 'repeat_one'];

  const toggleRepeat = () => {
    setLoadingRepeat(true);
    setDisabled(true);

    ApiService.repeat().catch(() => {
      enqueueSnackbar('Failed', { variant: 'error' });
    });

    setTimeout(() => {
      const currentIndex = repeatOrder.indexOf(repeat);
      setRepeat(repeatOrder[(currentIndex + 1) % repeatOrder.length]);
      setLoadingRepeat(false);
      setDisabled(false);
    }, 500);
  };

  const [loadingSkip, setLoadingSkip] = useState(false);

  const handleSkip = () => {
    setLoadingSkip(true);
    setDisabled(true);

    ApiService.skip().catch(() => {
      enqueueSnackbar('Failed to skip', { variant: 'error' });
    });

    setTimeout(() => {
      setLoadingSkip(false);
      setDisabled(false);
    }, 500);
  };

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
      setPaused(!paused);
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
      <IconButton
        size="lg"
        variant={'soft'}
        onClick={() => togglePlayPause()}
        disabled={disabled}
        loading={loadingPlayPause}
      >
        {paused ? <PlayArrow /> : <Pause />}
      </IconButton>

      <IconButton
        disabled={disabled}
        onClick={handleSkip}
        loading={loadingSkip}
      >
        <SkipNext />
      </IconButton>

      <IconButton disabled={disabled}>
        <Shuffle />
      </IconButton>

      <IconButton
        disabled={disabled}
        onClick={() => toggleRepeat()}
        variant={repeat !== 'disabled' ? 'soft' : 'plain'}
        loading={loadingRepeat}
      >
        {repeatIcons[repeat]}
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
      <Typography
        level="body-sm"
        sx={{
          width: 300,
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: 1,
          WebkitBoxOrient: 'vertical',
        }}
      >
        IC3PEAK - Смерти больше нет
      </Typography>
    </Box>
  );
}
