import { useState } from "react"
import { Box, Button, Card, TextField } from "@mui/material"
import Grid from "@mui/material/Grid2"
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
              onClick={() => handleReset()}
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
