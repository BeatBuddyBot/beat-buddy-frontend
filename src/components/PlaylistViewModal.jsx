import * as React from 'react';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import SongsTable from "./SongsTable.jsx";
import ApiService from "../services/ApiService.js";
import LavalinkModal from "./LavalinkModal.jsx";
import {Box} from "@mui/material";

export default function PlaylistViewModal({playlist, setPlaylist}) {
    const [open, setOpen] = React.useState(false);

    const addSongToTable = (song) => {
        setPlaylist(prev => ({
            ...prev,
            songs: [...(prev.songs || []), song],
        }));
    };

    const handleOpen = () => {
        if (playlist.songs) {
            setOpen(true);
        } else {
            ApiService
                .getPlaylist(playlist.id)
                .then((data) => {
                    setPlaylist(data);
                    setOpen(true);
                });
        }
    };
    return (
        <React.Fragment>
            <Button variant="outlined" color="neutral" sx={{flexGrow: 1}} onClick={handleOpen}>
                View
            </Button>
            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={open}
                onClose={() => setOpen(false)}
                sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
            >
                <Sheet
                    variant="outlined"
                    sx={{
                        width: "50vw",
                        borderRadius: 'md',
                        p: 3, boxShadow: 'lg'
                    }}
                >
                    <ModalClose variant="plain" sx={{m: 1}}/>
                    <Typography
                        component="h2"
                        id="modal-title"
                        level="h3"
                        textColor="inherit"
                        sx={{fontWeight: 'lg', mb: 1}}
                    >
                        {playlist.title}
                    </Typography>
                    <Box display="flex" justifyContent="space-between" alignItems="center" width="100%" >
                        <Typography
                            component="p"
                            id="modal-title"
                            textColor="inherit"
                            sx={{mb: 1}}
                        >
                            {playlist.description}
                        </Typography>

                    </Box>
                    <Box display="flex" justifyContent="flex-end" alignItems="end" width="100%" sx={{mb: 1}}>
                        <LavalinkModal playlist_id={playlist.id} addSongToTable={addSongToTable}/>
                    </Box>
                    <SongsTable songs={playlist.songs} setPlaylist={setPlaylist}/>
                </Sheet>
            </Modal>
        </React.Fragment>
    );
}