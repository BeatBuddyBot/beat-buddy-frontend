import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import SongsTable from './SongsTable.jsx';
import ApiService from '../services/ApiService.js';
import LavalinkModal from './LavalinkModal.jsx';
import { Box } from '@mui/material';
import PlaylistPlayOutlinedIcon from '@mui/icons-material/PlaylistPlayOutlined';
import { useSnackbar } from 'notistack';

export default function PlaylistViewModal({ playlist, setPlaylist }) {
  const [open, setOpen] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [playLoading, setPlayLoading] = useState(false);

  const handleAddPlaylist = () => {
    setPlayLoading(true);
    ApiService.addPlaylist({ playlist_id: playlist.id })
      .then(() => {
        setTimeout(() => {
          setPlayLoading(false);
          setOpen(false);
        }, 500);
      })
      .catch(() => {
        enqueueSnackbar('Failed to start playlist', { variant: 'error' });
        setPlayLoading(false);
        setOpen(false);
      });
  };

  const addSongToTable = (song) => {
    setPlaylist((prev) => ({
      ...prev,
      songs: [...(prev.songs || []), song],
    }));
  };

  const handleOpen = () => {
    if (playlist.songs) {
      setOpen(true);
    } else {
      ApiService.getPlaylist(playlist.id)
        .then((data) => {
          setPlaylist(data);
          setOpen(true);
        })
        .catch(() => {
          enqueueSnackbar('Failed to retrieve playlist', { variant: 'error' });
        });
    }
  };
  return (
    <React.Fragment>
      <Button
        variant="outlined"
        color="neutral"
        sx={{ flexGrow: 1 }}
        onClick={handleOpen}
      >
        View
      </Button>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => setOpen(false)}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Sheet
          variant="outlined"
          sx={{
            width: '50vw',
            borderRadius: 'md',
            p: 3,
            boxShadow: 'lg',
          }}
        >
          <ModalClose variant="plain" sx={{ m: 1 }} />
          <Typography
            component="h2"
            id="modal-title"
            level="h3"
            textColor="inherit"
            sx={{
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 1,
              WebkitBoxOrient: 'vertical',
              fontWeight: 'lg',
              mb: 1,
            }}
          >
            {playlist.title}
          </Typography>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
          >
            <Typography
              component="p"
              id="modal-title"
              textColor="inherit"
              sx={{ mb: 1 }}
            >
              {playlist.description}
            </Typography>
          </Box>
          <Box
            display="flex"
            justifyContent="flex-end"
            alignItems="end"
            width="100%"
            sx={{ mb: 1 }}
            gap={2}
          >
            <LavalinkModal
              playlist_id={playlist.id}
              addSongToTable={addSongToTable}
            />
            <Button
              variant="solid"
              color="success"
              startDecorator={<PlaylistPlayOutlinedIcon />}
              loading={playLoading}
              onClick={handleAddPlaylist}
            >
              Play
            </Button>
          </Box>
          <SongsTable playlist={playlist} setPlaylist={setPlaylist} />
        </Sheet>
      </Modal>
    </React.Fragment>
  );
}
