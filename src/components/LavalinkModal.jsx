import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import {Autocomplete, DialogActions, DialogTitle, ModalDialog} from "@mui/joy";
import Divider from "@mui/joy/Divider";
import * as React from "react";
import {Fragment, useCallback, useState} from "react";
import ApiService from "../services/ApiService.js";
import ModalClose from "@mui/joy/ModalClose";
import axios from "axios";
import {debounce} from "lodash";


export default function LavalinkModal({playlist_id, addSongToTable}) {
    const [openModal, setOpenModal] = useState(false);
    const [selectedSong, setSelectedSong] = useState();
    const [disableAddButton, setDisableAddButton] = useState(true)

    const [options, setOptions] = useState([]);

    const resetModal = () => {
        setSelectedSong(null)
        setOpenModal(false)
        setDisableAddButton(true);
    }

    const getData = (searchTerm) => {
        setOptions([])

        axios.get(`${import.meta.env.VITE_LAVALINK_URL}/v4/loadtracks`, {
            params: {
                identifier: `ytsearch:${searchTerm}`,
            },
            headers: {
                "Content-Type": "application/json",
                Authorization: import.meta.env.VITE_LAVALINK_TOKEN,
            },
        }).then(function (data) {

            const transformedSongs = data.data.data.slice(0, 5).map((song, index) => ({
                label: song.info.title.length <= 60 ? song.info.title : song.info.title.slice(0, 60) + "...",
                title: song.info.title,
                url: song.info.uri,
                duration: song.info.length / 1000,
                playlist_id: playlist_id
            }));


            setOptions(transformedSongs);
        });
    };

    const debouncedGetData = useCallback(
        debounce((value) => getData(value), 400),
        []
    );

    const handleChange = (e) => {
        setOptions([]);
        const value = e.target.value;
        value ? debouncedGetData(value) : setOptions([]);
    };

    const handleOnChange = (event, newValue) => {
        if (newValue) {
            setSelectedSong(newValue)
            setDisableAddButton(false)
        } else {
            setDisableAddButton(false)
        }

    }

    const handleAddSong = () => {
        if (selectedSong) {
            ApiService
                .addSongToPlaylist(selectedSong)
                .then((data) => {
                    addSongToTable(data)
                    resetModal()
                });
        }
    }

    return (
        <Fragment>
            <Button variant="outlined" color="neutral" onClick={() => setOpenModal(true)}>
                Add new song
            </Button>

            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={openModal}
                onClose={resetModal}
                sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
            >

                <ModalDialog variant="outlined" role="alertdialog">
                    <ModalClose variant="plain" sx={{m: 1}}/>
                    <DialogTitle>
                        Add new song
                    </DialogTitle>
                    <Divider/>

                    <Autocomplete
                        options={options}
                        onInputChange={handleChange}
                        onChange={handleOnChange}
                        style={{width: 500}}
                        filterOptions={(options) => options} // Disable filtering. IMPORTANT!

                    />
                    <DialogActions>
                        <Button variant="outlined" color="neutral" onClick={handleAddSong} disabled={disableAddButton}>
                            Add
                        </Button>
                    </DialogActions>
                </ModalDialog>
            </Modal>
        </Fragment>
    );
}