import { Button, styled } from "@mui/material"

const BingoItemButton = styled(Button)(({ theme }) => ({
  aspectRatio: 1 / 1,
  width: "100%",
  textOverflow: "ellipsis",
  textTransform: "none",
  lineHeight: 1,
  fontSize: theme.typography.body1.fontSize,
}))

export default BingoItemButton
