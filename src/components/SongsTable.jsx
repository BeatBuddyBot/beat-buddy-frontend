import React, {useState} from 'react';
import {AgGridReact} from 'ag-grid-react';
import {AllCommunityModule, ModuleRegistry} from 'ag-grid-community';
import {formatDuration} from "../utils/formatters.js";
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import ApiService from "../services/ApiService.js";
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';
import {Button} from "@mui/material";
import {myDarkAgGridTheme} from "../constants/myAgGridThemes.js";
import {useSnackbar} from "notistack";

ModuleRegistry.registerModules([AllCommunityModule]);


const SongsTable = ({playlist, setPlaylist}) => {
    const {enqueueSnackbar} = useSnackbar();

    const handleRemoveSong = (params) => {
        const idToRemove = params.data.id;
        ApiService
            .deleteSong(idToRemove)
            .then(() => {
                setPlaylist((prev) => ({
                    ...prev,
                    songs: prev.songs.filter((song) => song.id !== idToRemove),
                }));

            })
            .catch(() => {
                enqueueSnackbar('Failed to delete song', { variant: 'error' })
            });
    };

    const [colDefs, setColDefs] = useState([
        {
            field: "title",
            flex: 4,
            rowDrag: true
        },
        {
            field: "duration",
            valueFormatter: (params) => {
                return formatDuration(params.value);
            },
        },
        {
            field: "url",
            headerName: "Link",
            cellRenderer: (params) => (
                <Button sx={{border: 0}} color='neutral' size="small" href={params.value} target={'_blank'}>
                    <OpenInNewOutlinedIcon/>
                </Button>
            ),
            sortable: false,
        },
        {
            colId: "to_delete",
            headerName: "Remove",
            cellRenderer: (params) => (
                <Button sx={{border: 0}} color='neutral' size="small" onClick={() => handleRemoveSong(params)}>
                    <ClearOutlinedIcon/>
                </Button>
            ),
            sortable: false,
        }
    ]);

    function onRowDragEnd(e) {
        ApiService
            .patchSong(
                e.node.data.id,
                {
                    position: e.node.rowIndex
                }
            )
            .then(() => {
                setPlaylist((prev) => {
                    const songs = [...prev.songs];
                    const draggedSongIndex = songs.findIndex(song => song.id === e.node.data.id);
                    const [draggedSong] = songs.splice(draggedSongIndex, 1); // удаляем перетаскиваемую песню
                    songs.splice(e.node.rowIndex, 0, draggedSong); // вставляем на новое место
                    return { ...prev, songs };
                });

            })
            .catch(() => {
                enqueueSnackbar('Failed to update song position', { variant: 'error' });
            });
    }

    return (
        <div style={{height: "500px", width: "100%"}}>
            <AgGridReact
                theme={myDarkAgGridTheme}
                rowData={playlist.songs}
                columnDefs={colDefs}
                rowDragManaged
                suppressMoveWhenRowDragging
                onRowDragEnd={onRowDragEnd}
                defaultColDef={{
                    resizable: false,
                    sortable: true,
                    lockPosition: true,
                    flex: 1
                }}
                localeText={{noRowsToShow: 'No songs to display.'}}

            />
        </div>
    )
};

export default SongsTable;