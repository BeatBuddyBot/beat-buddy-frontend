import React, {useState} from 'react';
import {AgGridReact} from 'ag-grid-react';
import {AllCommunityModule, ModuleRegistry, themeQuartz} from 'ag-grid-community';
import {formatDuration} from "../utils/formatters.js";
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import ApiService from "../services/ApiService.js";
import YouTubeIcon from '@mui/icons-material/YouTube';
import {Button} from "@mui/material";
import {myDarkAgGridTheme} from "../constants/myAgGridThemes.js";

ModuleRegistry.registerModules([AllCommunityModule]);


const SongsTable = ({songs, setPlaylist}) => {

    const handleRemoveSong = (params) => {
        const idToRemove = params.data.id;
        ApiService
            .deleteSong(idToRemove)
            .then(() => {
                setPlaylist((prev) => ({
                    ...prev,
                    songs: prev.songs.filter((song) => song.id !== idToRemove),
                }));

            });
    };
    const [colDefs, setColDefs] = useState([
        {
            headerName: "#",
            valueGetter: "node.rowIndex + 1"
        },
        {
            field: "title",
            flex: 4
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
                <Button  sx={{ border: 0 }} color='neutral' size="small" href={params.value} target={'_blank'}>
                    <YouTubeIcon/>
                </Button>
            ),
            sortable: false,
        },
        {
            colId: "to_delete",
            headerName: "Remove",
            cellRenderer: (params) => (
                <Button sx={{ border: 0 }} color='neutral' size="small" onClick={() => handleRemoveSong(params)}>
                    <ClearOutlinedIcon/>
                </Button>
            ),
            sortable: false,
        }
    ]);

    return (
        <div style={{height: "500px", width: "100%"}}>
            <AgGridReact
                theme={myDarkAgGridTheme}
                rowData={songs}
                columnDefs={colDefs}
                defaultColDef={{
                    resizable: false,
                    sortable: true,
                    lockPosition: true,
                    flex: 1
                }}
            />
        </div>
    )
};

export default SongsTable;