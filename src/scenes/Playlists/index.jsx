import React, { useEffect, useState } from 'react';
import Header from '../../components/Header.jsx';
import { Box, Grid } from '@mui/material';
import PlaylistCard from '../../components/PlaylistCard.jsx';
import ApiService from '../../services/ApiService.js';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import Button from '@mui/joy/Button';
import { useSnackbar } from 'notistack';
import SkipNextOutlinedIcon from '@mui/icons-material/SkipNextOutlined';

const Playlists = () => {
  const [playlists, setPlaylists] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    ApiService.getPlaylists()
      .then((data) => {
        setPlaylists(data);
      })
      .catch(() => {
        enqueueSnackbar('Failed to load playlists', { variant: 'error' });
      });
  }, []);

  const handleCreatePlaylist = () => {
    ApiService.createPlaylist({})
      .then((data) => {
        setPlaylists((prev) => {
          const favorites = prev.filter((p) => p.is_favorite);
          const others = prev.filter((p) => !p.is_favorite);
          return [...favorites, data, ...others];
        });
      })
      .catch(() => {
        enqueueSnackbar('Failed to create playlist', { variant: 'error' });
      });
  };

  const handleSkip = () => {
    ApiService.skip().catch(() => {
      enqueueSnackbar('Failed to skip', { variant: 'error' });
    });
  };

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="PLAYLISTS" subtitle="Build the perfect playlist" />
        <Box>
          {/* TODO: DELETE LATER. TMP BUTTON FOR DEVELOPMENT*/}
          <Button
            variant="outlined"
            color="neutral"
            onClick={handleSkip}
            sx={{ mr: '10px' }}
          >
               <SkipNextOutlinedIcon sx={{ mr: '10px' }} />
            Skip
          </Button>

          <Button
            variant="outlined"
            color="neutral"
            onClick={handleCreatePlaylist}
          >
            <PlaylistAddIcon sx={{ mr: '10px' }} />
            Create new playlist
          </Button>
        </Box>
      </Box>

      <Grid container spacing={2}>
        {playlists.map((playlist) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }} key={playlist.id}>
            <PlaylistCard
              key={playlist.id}
              initialPlaylist={playlist}
              setPlaylists={setPlaylists}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Playlists;
