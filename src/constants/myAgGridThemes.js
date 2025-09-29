import {themeQuartz} from "ag-grid-community";

export const myDarkTheme = themeQuartz
    .withParams({
        accentColor: "#70D8BD",
        backgroundColor: "#1F2A40",
        browserColorScheme: "dark",
        foregroundColor: "#FFFFFF",
        headerFontSize: 14,
        headerTextColor: "#70D8BD",

    });

export const myLightTheme = themeQuartz
    .withParams({
        accentColor: "#70D8BD",
        backgroundColor: "#FFFFFF",
        browserColorScheme: "light",
        foregroundColor: "#1F2A40",
        headerFontSize: 14,
        headerTextColor: "#70D8BD",

    });