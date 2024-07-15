import {createTheme} from "@mui/material";

export const theme = createTheme({
    palette: {
        mode: "light",
        primary: {
            light: "#B7FDA3",
            main: "#75CD7F",
            dark: "#274037",
        },
    },
    typography: {
        fontFamily: "Roboto, sans-serif",
        h1: {
            fontFamily: "Belleza, sans-serif",
            fontStyle: "normal"
        },
        h2: {
            fontFamily: "Belleza, sans-serif",
            fontStyle: "normal"
        },
        h3: {
            fontFamily: "Belleza, sans-serif",
            fontStyle: "normal"
        },
        h4: {
            fontFamily: "Belleza, sans-serif",
            fontStyle: "normal"
        },
        h5: {
            fontFamily: "Belleza, sans-serif",
            fontStyle: "normal"
        },
        h6: {
            fontFamily: "Belleza, sans-serif",
            fontStyle: "normal"
        }
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: "none",
                },
            },
        },
    },
})