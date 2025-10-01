import * as React from 'react';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import SongsTable from "./SongsTable.jsx";
import ApiService from "../services/ApiService.js";

export default function PlaylistDetailModal({playlist}) {
    const [open, setOpen] = React.useState(false);
    const [songs, setSongs] = React.useState([]);
    const handleOpen = () => {
        ApiService
            .getPlaylist(playlist.id)
            .then((data) => {
                setSongs(data.songs);
                setOpen(true)
            });
    };

    return (
        <React.Fragment>
            <Button variant="outlined" color="neutral" sx={{ flexGrow: 1 }} onClick={handleOpen}>
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
                        width: "70vw",
                        borderRadius: 'md',
                        p: 3, boxShadow: 'lg'
                }}
                >
                    <ModalClose variant="plain" sx={{ m: 1 }} />
                    <Typography
                        component="h2"
                        id="modal-title"
                        level="h3"
                        textColor="inherit"
                        sx={{ fontWeight: 'lg', mb: 1 }}
                    >
                        {playlist.title}
                    </Typography>
                    <Typography
                        component="p"
                        id="modal-title"
                        level="h4"
                        textColor="inherit"
                        sx={{ mb: 1 }}
                    >
                        {playlist.description}
                    </Typography>
                    <SongsTable initialSongs={songs}/>
                </Sheet>
            </Modal>
        </React.Fragment>
    );
}