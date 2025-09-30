import {Box} from "@mui/material";
// import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
// import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";

const Topbar = () => {

    return (
        <Box display="flex" justifyContent="space-between" p={2}>

            {/* EXAMPLE SEARCH BAR FOR FUTURE */}
            {/*<Box*/}
            {/*    display="flex"*/}
            {/*    backgroundColor={colors.primary[400]}*/}
            {/*    borderRadius="3px"*/}
            {/*>*/}
            {/*    <InputBase sx={{ml: 2, flex: 1}} placeholder="Search"/>*/}
            {/*    <IconButton type="button" sx={{p: 1}}>*/}
            {/*        <SearchIcon/>*/}
            {/*    </IconButton>*/}
            {/*</Box>*/}

            {/* PLACEHOLDER */}
            <Box/>

            {/* ICONS */}
            <Box display="flex">
                {/* EXAMPLE ICONS FOR FUTURE */}
                {/*<IconButton>*/}
                {/*    <SettingsOutlinedIcon/>*/}
                {/*</IconButton>*/}
                {/*<IconButton>*/}
                {/*    <PersonOutlinedIcon/>*/}
                {/*</IconButton>*/}
            </Box>
        </Box>
    );
};

export default Topbar;