import {Button, styled, useTheme} from '@mui/material';
import {tokens} from "../../../theme.js";


const BeatBuddyButton = ({children, ...props}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const StyledButton = styled(Button)(() => ({
        color: colors.greenAccent[500],
        border: '1px solid',
        borderColor: colors.greenAccent[500],
        fontWeight: "bold",
        '&:hover': {
            color: colors.greenAccent[400],
            borderColor: colors.greenAccent[400],
        },
    }));

    return (
        <StyledButton {...props}>
            {children}
        </StyledButton>
    );
};

export default BeatBuddyButton;
