import { useState } from "react"
import {
  Box,
  Button,
  Card,
  IconButton,
  Snackbar,
  TextField,
  Tooltip,
} from "@mui/material"
import Grid from "@mui/material/Grid2"
import ShareIcon from "@mui/icons-material/Share"
import BingoItemButton from "./bingo-item-button"
import ColorPicker from "./color-picker"
import { Colors } from "@/types/colors.enum"

interface BingoGridProps {
  items: string[]
  seed: string
}

const BingoGrid = ({ items, seed }: BingoGridProps) => {
  const [selectedColor, setSelectedColor] = useState(Colors.Primary)
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [notifOpen, setNotifOpen] = useState(false)

  const handleColorChange = (color: Colors) => {
    setSelectedColor(color)
  }

  const handleToggle = (item: string) => {
    setSelectedItems((prev) => {
      if (prev.includes(item)) {
        return prev.filter((value) => value !== item)
      } else {
        return [...prev, item]
      }
    })
  }

  const handleReset = () => {
    setSelectedItems([])
  }

  const handleShareButton = () => {
    setNotifOpen(true)
    const { host, pathname } = window.location
    const urlWithSeed = `${host}${pathname}?seed=${seed}`
    navigator.clipboard.writeText(urlWithSeed)
  }

  return (
    <Card>
      <Grid container spacing={1} alignItems="center">
        {items.map((item, index) => (
          <Grid size={2.4} key={index}>
            <BingoItemButton
              onClick={() => handleToggle(item)}
              variant={selectedItems.includes(item) ? "contained" : "outlined"}
              color={selectedColor}
            >
              {item}
            </BingoItemButton>
          </Grid>
        ))}
        <Grid size={4} justifyContent="center">
          <Box
            sx={{
              display: "flex",
              justifyContent: "left",
              alignItems: "center",
              width: "100%",
              px: 3,
            }}
          >
            <TextField
              id="seed-value"
              label="Seed"
              variant="standard"
              color={selectedColor}
              value={seed}
              disabled
            />
            <Tooltip title="Copy sharable link to clipboard">
              <IconButton color={selectedColor} onClick={handleShareButton}>
                <ShareIcon />
              </IconButton>
            </Tooltip>
            <Snackbar
              message="Copied to clipboard"
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              autoHideDuration={1500}
              onClose={() => setNotifOpen(false)}
              open={notifOpen}
            />
          </Box>
        </Grid>
        <Grid size={4}>
          <ColorPicker onColorChange={handleColorChange} />
        </Grid>
        <Grid size={4} justifyContent="center">
          <Box
            sx={{
              display: "flex",
              justifyContent: "right",
              alignItems: "center",
              width: "100%",
              px: 3,
            }}
          >
            <Button
              variant="contained"
              color={selectedColor}
              onClick={handleReset}
            >
              Clear grid
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Card>
  )
}

export default BingoGrid
