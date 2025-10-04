import * as React from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import Stack from '@mui/joy/Stack';
import {Textarea} from "@mui/joy";
import ApiService from "../services/ApiService.js";

export default function PlaylistEditModal({ open, onClose, playlist, setPlaylist }) {
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');

    React.useEffect(() => {
        if (playlist) {
            setTitle(playlist.title);
            setDescription(playlist.description || '');
        }
    }, [playlist, open]);

    const handleSubmitForm = (event) => {
        event.preventDefault();
        ApiService
            .patchPlaylist(playlist.id, {
                title: title,
                description: description,
            })
            .then((data) => {
                setPlaylist(prev => ({
                    ...prev,
                    ...data,
                }));
                onClose();
            });
    }

    return (
            <Modal open={open} onClose={onClose} >
                <ModalDialog
                    sx={{
                        width: '500px',
                        maxWidth: '95vw',
                    }}
                >
                    <DialogTitle>Edit Playlist</DialogTitle>
                    <DialogContent>Update playlist information below:</DialogContent>
                    <form
                        onSubmit={handleSubmitForm}
                    >
                        <Stack spacing={2}>
                            <FormControl>
                                <FormLabel>Title</FormLabel>
                                <Input
                                    required
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Description</FormLabel>
                                <Textarea
                                    minRows={2}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </FormControl>
                            <Button type="submit">Submit</Button>
                        </Stack>
                    </form>
                </ModalDialog>
            </Modal>
    );
}