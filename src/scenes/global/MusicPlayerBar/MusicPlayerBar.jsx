import { Box, CircularProgress } from '@mui/joy';
import React, { useEffect, useState } from 'react';

import ProgressBar from './ProgressBar.jsx';
import SongInfo from './SongInfo.jsx';
import PlayerControls from './PlayerControls.jsx';
import ApiService from '../../../services/ApiService.js';

export default function MusicPlayerBar() {
  const [loading, setLoading] = useState(true);
  const [playerStatus, setPlayerStatus] = useState({});

  useEffect(() => {
    const ws = ApiService.subscribePlayerStatus();

    ws.onmessage = (event) => {
      setLoading(false);
      setPlayerStatus(JSON.parse(event.data));
    };

    return () => {
      ws.close();
    };
  }, []);

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
      {loading ? (
        <CircularProgress color="neutral" size="sm" />
      ) : (
        <>
          <PlayerControls />
          <ProgressBar playerStatus={playerStatus} />
          <SongInfo playerStatus={playerStatus} />
        </>
      )}
    </Box>
  );
}
