import React, {useState} from 'react';
import {AgGridReact} from 'ag-grid-react';
import {AllCommunityModule, ModuleRegistry} from 'ag-grid-community';
import {formatDuration} from "../utils/formatters.js";
import {Button, useTheme} from "@mui/material";
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import {myDarkTheme, myLightTheme} from "../constants/myAgGridThemes.js";
import ApiService from "../services/ApiService.js";
import YouTubeIcon from '@mui/icons-material/YouTube';

ModuleRegistry.registerModules([AllCommunityModule]);


const SongsTable = ({initialSongs}) => {
    const [songs, setSongs] = useState(initialSongs)
    const theme = useTheme();

    const handleRemoveSong = (params) => {
        const idToRemove = params.data.id;
        ApiService
            .deleteSong(idToRemove)
            .then(() => {
                setSongs((prev) => prev.filter((song) => song.id !== idToRemove));
            });
    };
    const [colDefs, setColDefs] = useState([
        {
            field: "position",
        },
        {
            field: "title",
        },
        {
            field: "duration",
            valueFormatter: (params) => {
                return formatDuration(params.value);
            },
        },
        {
            field: "url",
            headerName: "Youtube link",
            cellRenderer: (params) => (
                <Button color="inherit" size="small" href={params.value} target={'_blank'}>
                    <YouTubeIcon/>
                </Button>
            ),
            sortable: false,
        },
        {
            colId: "to_delete",
            headerName: "Remove",
            cellRenderer: (params) => (
                <Button color="inherit" size="small" onClick={() => handleRemoveSong(params)}>
                    <ClearOutlinedIcon/>
                </Button>
            ),
            sortable: false,
        }
    ]);

    return (
        <div style={{height: "500px", width: "100%"}}>
            <AgGridReact
                theme={theme.palette.mode === 'dark' ? myDarkTheme : myLightTheme}
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