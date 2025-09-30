import {themeQuartz} from "ag-grid-community";

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
