import { useState } from "react"
import { Card } from "@mui/material"
import Grid from "@mui/material/Grid2"
import BingoItemButton from "./bingo-item-button"
import ColorPicker from "./color-picker"
import { Colors } from "@/types/colors.enum"

interface BingoGridProps {
  items: string[]
}

const BingoGrid = ({ items }: BingoGridProps) => {
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

  return (
    <Card>
      <Grid container spacing={1}>
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
        <Grid size={4} />
        <Grid size={4}>
          <ColorPicker onColorChange={handleColorChange} />
        </Grid>
        <Grid size={4} />
      </Grid>
    </Card>
  )
}

export default BingoGrid
