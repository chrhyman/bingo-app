import { useEffect, useState } from "react"
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
import { Win } from "@/types/win.enum"
import bingoWin from "@/utils/bingo-win"
import BingoWinAlert from "./bingo-win-alert"

interface BingoGridProps {
  items: string[]
  seed: string
}

const BingoGrid = ({ items, seed }: BingoGridProps) => {
  const [selectedColor, setSelectedColor] = useState(Colors.Primary)
  const [selectedItems, setSelectedItems] = useState<number[]>([])
  const [copiedNotifOpen, setCopiedNotifOpen] = useState(false)
  const [winState, setWinState] = useState(Win.None)
  const [lineWinAlert, setLineWinAlert] = useState(false)
  const [lineWinDismissed, setLineWinDismissed] = useState(false)
  const [blackoutWinAlert, setBlackoutWinAlert] = useState(false)
  const [blackoutWinDismissed, setBlackoutWinDismissed] = useState(false)

  useEffect(() => {
    setWinState(bingoWin(selectedItems))
  }, [selectedItems, winState])

  useEffect(() => {
    setLineWinAlert(winState === Win.Line && !lineWinDismissed)
  }, [winState, lineWinDismissed])

  useEffect(() => {
    setBlackoutWinAlert(winState === Win.Blackout && !blackoutWinDismissed)
  }, [winState, blackoutWinDismissed])

  const dismissLineWin = () => {
    setLineWinDismissed(true)
  }

  const dismissBlackoutWin = () => {
    setBlackoutWinDismissed(true)
  }

  const handleColorChange = (color: Colors) => {
    setSelectedColor(color)
  }

  const handleToggle = (index: number) => {
    setSelectedItems((prev) => {
      if (prev.includes(index)) {
        // if index was selected, deselect it by removing index from array
        return prev.filter((i) => i !== index)
      } else {
        // otherwise select it by appending to array
        return [...prev, index]
      }
    })
  }

  const handleReset = () => {
    setSelectedItems([])
    setCopiedNotifOpen(false)
    setWinState(Win.None)
    setLineWinAlert(false)
    setLineWinDismissed(false)
    setBlackoutWinAlert(false)
    setBlackoutWinDismissed(false)
  }

  const handleShareButton = () => {
    setCopiedNotifOpen(true)
    const { host, pathname } = window.location
    const urlWithSeed = `${host}${pathname}?seed=${seed}`
    navigator.clipboard.writeText(urlWithSeed)
  }

  return (
    <Card>
      <BingoWinAlert
        open={lineWinAlert}
        handleClose={dismissLineWin}
        win={winState}
      />
      <BingoWinAlert
        open={blackoutWinAlert}
        handleClose={dismissBlackoutWin}
        win={winState}
      />
      <Grid container spacing={1} alignItems="center">
        {items.map((item, index) => (
          <Grid size={2.4} key={index}>
            <BingoItemButton
              onClick={() => handleToggle(index)}
              variant={selectedItems.includes(index) ? "contained" : "outlined"}
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
              onClose={() => setCopiedNotifOpen(false)}
              open={copiedNotifOpen}
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
