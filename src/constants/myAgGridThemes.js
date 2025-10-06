import {themeQuartz} from "ag-grid-community";
import {grey} from "@mui/material/colors";

export const myDarkAgGridTheme = themeQuartz
    .withParams({
        backgroundColor: "#161A1D",
        browserColorScheme: "dark",
        chromeBackgroundColor: {
            ref: "foregroundColor",
            mix: 0.07,
            onto: "backgroundColor"
        },
        foregroundColor: "#FFF",
        headerBackgroundColor: "#0B0D0F",
        headerFontSize: 14
    });


export const myAltDarkAgGridTheme = themeQuartz
    .withParams({
        backgroundColor: "#0b0d0f",
        browserColorScheme: "dark",
        chromeBackgroundColor: {
            ref: "foregroundColor",
            mix: 0.07,
            onto: "backgroundColor"
        },
        foregroundColor: "#FFF",
        headerBackgroundColor: "#0B0D0F",
        headerFontSize: 14,

        borderColor: grey[500],
        columnBorder: false,
        headerRowBorder: false,
        wrapperBorder: false

    });