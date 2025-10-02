import {Box} from "@mui/material";
import IconButton from "@mui/joy/IconButton";
import Input from "@mui/joy/Input"
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from '@mui/icons-material/Search';

const Topbar = () => {

    return (
        <Box display="flex" justifyContent="space-between" p={2}>

            {/* EXAMPLE SEARCH BAR FOR FUTURE */}
            <Box
                display="flex"
                // backgroundColor={colors.primary[400]}
                borderRadius="3px"
            >
                <Input sx={{ml: 2, flex: 1}} placeholder="Search" startDecorator={<SearchIcon />} />
            </Box>

            {/* PLACEHOLDER */}
            <Box/>

            {/* ICONS */}
            <Box display="flex">
                {/* EXAMPLE ICONS FOR FUTURE */}
                <IconButton>
                    <SettingsOutlinedIcon/>
                </IconButton>
                <IconButton>
                    <PersonOutlinedIcon/>
                </IconButton>
            </Box>
        </Box>
    );
};

export default Topbar;