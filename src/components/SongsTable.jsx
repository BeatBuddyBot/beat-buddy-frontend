import React, {useState} from 'react';
import {AgGridReact} from 'ag-grid-react';
import {AllCommunityModule, ModuleRegistry} from 'ag-grid-community';
import {formatDuration} from "../utils/formatters.js";
import {Button, useTheme} from "@mui/material";
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import {myDarkTheme, myLightTheme} from "../constants/myAgGridThemes.js";
import ApiService from "../services/ApiService.js";

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
            width: 100
        },
        {
            field: "title",
            width: 450
        },
        {
            field: "duration",
            width: 100,
            valueFormatter: (params) => {
                return formatDuration(params.value);
            },
        },
        {
            colId: "to_delete",
            headerName: "Remove",
            cellRenderer: (params) => (
                <Button color="error" size="small" onClick={() => handleRemoveSong(params)}>
                    <ClearOutlinedIcon/>
                </Button>
            ),
            width: 100,
            sortable: false,
        }
    ]);

    return (
        <div style={{height: "500px", width: "100%", maxWidth: "765px"}}>
            <AgGridReact
                theme={theme.palette.mode === 'dark' ? myDarkTheme : myLightTheme}
                rowData={songs}
                columnDefs={colDefs}
                defaultColDef={{
                    resizable: false,
                    sortable: true,
                    lockPosition: true,
                }}
            />
        </div>
    )
};

export default SongsTable;