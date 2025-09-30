import React, {useState} from 'react';
import {AgGridReact} from 'ag-grid-react';
import {AllCommunityModule, ModuleRegistry} from 'ag-grid-community';
import {formatDuration} from "../utils/formatters.js";
import {Button, useTheme} from "@mui/material";
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import {myDarkTheme, myLightTheme} from "../constants/myAgGridThemes.js";
import ApiService from "../services/ApiService.js";
import YouTubeIcon from '@mui/icons-material/YouTube';
import BeatBuddyButton from "./ui/buttons/BeatBuddyButton.jsx";

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
            headerName: "#",
            valueGetter: "node.rowIndex + 1"
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
                <BeatBuddyButton  sx={{ border: 0 }} size="small" href={params.value} target={'_blank'}>
                    <YouTubeIcon/>
                </BeatBuddyButton>
            ),
            sortable: false,
        },
        {
            colId: "to_delete",
            headerName: "Remove",
            cellRenderer: (params) => (
                <BeatBuddyButton sx={{ border: 0 }} size="small" onClick={() => handleRemoveSong(params)}>
                    <ClearOutlinedIcon/>
                </BeatBuddyButton>
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