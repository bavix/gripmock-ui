import { defaultLightTheme, defaultDarkTheme } from "react-admin";
import { indigo, deepOrange, red } from '@mui/material/colors';

export const customTheme = {
    ...defaultLightTheme,
    palette: {
        primary: indigo,
        secondary: deepOrange,
        error: red,
        contrastThreshold: 3,
        tonalOffset: 0.2,
    },
};

export const customDarkTheme = defaultDarkTheme;
