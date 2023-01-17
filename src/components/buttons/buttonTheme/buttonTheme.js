import { createTheme } from "@mui/material/styles"


const TAVUS_BUTTON_BLUE = "#1877F2"
const TAVUS_LIGHTER_GREY = "#303443"
const buttonsTheme = createTheme({
    palette: {
        primary: {
            // light: will be calculated from palette.primary.main,
            main: TAVUS_BUTTON_BLUE
            // dark: will be calculated from palette.primary.main,
            // contrastText: will be calculated to contrast with palette.primary.main
          },
        secondary: {
            main: TAVUS_LIGHTER_GREY
        }

    }
})

export default buttonsTheme