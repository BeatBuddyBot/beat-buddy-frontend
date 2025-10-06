import * as React from 'react';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import DialogActions from '@mui/joy/DialogActions';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import ApiService from "../services/ApiService.js";

export default function PlaylistDeleteConfirmationModal({
                                                            open,
                                                            setIsDeleteConfirmationModalOpen,
                                                            playlist,
                                                            setPlaylists
                                                        }) {

    const handleDeletePlaylist = () => {
        ApiService
            .deletePlaylist(playlist.id)
            .then((data) => {
                setPlaylists((prev) => prev.filter((p) => p.id !== playlist.id));
            });
    }

    return (
        <Modal open={open} onClose={() => setIsDeleteConfirmationModalOpen(false)}>
            <ModalDialog variant="outlined" role="alertdialog">
                <DialogTitle>
                    <WarningRoundedIcon/>
                    Confirmation
                </DialogTitle>
                <Divider/>
                <DialogContent>
                    Are you sure you want to delete this playlist??
                </DialogContent>
                <DialogActions>
                    <Button variant="solid" color="danger" onClick={handleDeletePlaylist}>
                        Delete
                    </Button>
                    <Button variant="plain" color="neutral" onClick={() => setIsDeleteConfirmationModalOpen(false)}>
                        Cancel
                    </Button>
                </DialogActions>
            </ModalDialog>
        </Modal>
    );
}