import { Box, Typography, useTheme } from "@mui/material"
import WugIcon from "./wug-icon"

const Header = () => {
  const theme = useTheme()
  return (
    <Box
      sx={{
        paddingBottom: 2,
        px: 2,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography variant="h1">MWC Bingo</Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Typography variant="h6">A micro-React app by Chris</Typography>
        <WugIcon strokeColor={theme.palette.secondary.dark} />
      </Box>
    </Box>
  )
}

export default Header
