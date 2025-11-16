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

const getRepeatIcon = (mode) =>
  ({
    disabled: <Repeat />,
    repeat_all: <Repeat color="success" />,
    repeat_one: <RepeatOneIcon color="success" />,
  })[mode];

const PlayerControls = () => {
  const { enqueueSnackbar } = useSnackbar();

  const [repeat, setRepeat] = useState('disabled');
  const [paused, setPaused] = useState(false);
  const [loadingRepeat, setLoadingRepeat] = useState(false);
  const [loadingSkip, setLoadingSkip] = useState(false);
  const [loadingPlayPause, setLoadingPlayPause] = useState(false);
  const isDisabled = loadingPlayPause || loadingSkip || loadingRepeat;
  const repeatOrder = ['disabled', 'repeat_all', 'repeat_one'];

  const toggleRepeat = () => {
    setLoadingRepeat(true);

    ApiService.repeat().catch(() => {
      enqueueSnackbar('Failed', { variant: 'error' });
    });

    setTimeout(() => {
      const currentIndex = repeatOrder.indexOf(repeat);
      setRepeat(repeatOrder[(currentIndex + 1) % repeatOrder.length]);
      setLoadingRepeat(false);
    }, 500);
  };

  const handleSkip = () => {
    setLoadingSkip(true);

    ApiService.skip().catch(() => {
      enqueueSnackbar('Failed to skip', { variant: 'error' });
    });

    setTimeout(() => {
      setLoadingSkip(false);
    }, 500);
  };

  const togglePlayPause = () => {
    setLoadingPlayPause(true);

    ApiService.pause().catch(() => {
      enqueueSnackbar('Failed', { variant: 'error' });
    });

    setTimeout(() => {
      setPaused(!paused);
      setLoadingPlayPause(false);
    }, 500);
  };
  return (
    <>
      <IconButton
        size="lg"
        variant={'soft'}
        onClick={togglePlayPause}
        disabled={isDisabled}
        loading={loadingPlayPause}
      >
        {paused ? <PlayArrow /> : <Pause />}
      </IconButton>

      <IconButton
        disabled={isDisabled}
        onClick={handleSkip}
        loading={loadingSkip}
      >
        <SkipNext />
      </IconButton>

      <IconButton disabled={isDisabled}>
        <Shuffle />
      </IconButton>

      <IconButton
        disabled={isDisabled}
        onClick={toggleRepeat}
        variant={repeat !== 'disabled' ? 'soft' : 'plain'}
        loading={loadingRepeat}
      >
        {getRepeatIcon(repeat)}
      </IconButton>
    </>
  );
};

export default PlayerControls;
