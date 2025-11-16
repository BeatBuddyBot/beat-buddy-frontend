import { Box } from '@mui/joy';
import React from 'react';

import ProgressBar from './ProgressBar.jsx';
import SongInfo from './SongInfo.jsx';
import PlayerControls from './PlayerControls.jsx';

export default function MusicPlayerBar() {
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
      <PlayerControls />
      <ProgressBar />
      <SongInfo />
    </Box>
  );
}
