import { ReactElement } from "react"
import { CssBaseline, ThemeProvider } from "@mui/material"
import theme from "./theme"

interface AppProviderProps {
  children: ReactElement
}

const AppProvider = ({ children }: AppProviderProps) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    {children}
  </ThemeProvider>
)

export default AppProvider
