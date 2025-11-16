import React, { useState } from 'react';
import { useSnackbar } from 'notistack';
import RepeatOneIcon from '@mui/icons-material/RepeatOne';
import IconButton from '@mui/joy/IconButton';
import {
  Pause,
  PlayArrow,
  Repeat,
  Shuffle,
  SkipNext,
} from '@mui/icons-material';

import ApiService from '../../../services/ApiService.js';

const PlayerControls = () => {
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
    <>
      <IconButton
        size="lg"
        variant={'soft'}
        onClick={togglePlayPause}
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
        onClick={toggleRepeat}
        variant={repeat !== 'disabled' ? 'soft' : 'plain'}
        loading={loadingRepeat}
      >
        {repeatIcons[repeat]}
      </IconButton>
    </>
  );
};

export default PlayerControls;
