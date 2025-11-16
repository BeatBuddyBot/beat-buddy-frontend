import React from 'react';
import { Box, Slider, Typography } from '@mui/joy';
import { formatDuration } from '../../../utils/formatters.js';

const ProgressBar = ({playerStatus}) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', width: 300, ml: 3 }}>
      <Typography level="body-sm" sx={{ width: 35 }}>
        {formatDuration(playerStatus.player.current_song.elapsed/1000)}
      </Typography>
      <Slider disabled value={playerStatus.player.current_song.progress} sx={{ flex: 1, mx: 1 }} />
      <Typography level="body-sm" sx={{ width: 35 }}>
        {formatDuration(playerStatus.player.current_song.duration/1000)}
      </Typography>
    </Box>
  );
};

export default ProgressBar;
