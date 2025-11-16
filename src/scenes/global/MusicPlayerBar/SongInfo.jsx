import React from 'react';
import { Typography } from '@mui/joy';

const SongInfo = ({ playerStatus }) => {
  return (
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
      {playerStatus.player.current_song.title}
    </Typography>
  );
};

export default SongInfo;
