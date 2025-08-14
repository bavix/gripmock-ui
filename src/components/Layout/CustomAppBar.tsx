import {
    AppBar,
    ToggleThemeButton,
    TitlePortal,
} from "react-admin";
import { Typography } from '@mui/material';

export const CustomAppBar = () => (
    <AppBar toolbar={<ToggleThemeButton />}>
        <TitlePortal />
        <Typography
            flex="-1"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
            overflow="hidden"
            variant="h6"
            color="inherit"
            id="react-admin-logo"
        >
            GripMock UI
        </Typography>
    </AppBar>
);
