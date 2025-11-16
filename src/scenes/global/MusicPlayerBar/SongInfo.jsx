import React from 'react';
import { Typography } from '@mui/joy';

const SongInfo = () => {
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
      IC3PEAK - Смерти больше нет
    </Typography>
  );
};

export default SongInfo;
