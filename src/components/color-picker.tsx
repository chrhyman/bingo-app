import { useState } from "react"
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  useTheme,
} from "@mui/material"
import { Colors } from "@/types/colors.enum"

interface ColorPickerProps {
  onColorChange: (color: Colors) => void // Callback to notify parent of change
}

const colorOptions = [
  { name: "Light Blue", value: Colors.Primary },
  { name: "Purple", value: Colors.Secondary },
  { name: "Green", value: Colors.Success },
  { name: "Orange", value: Colors.Warning },
  { name: "Blue", value: Colors.Info },
  { name: "Red", value: Colors.Error },
]

const ColorPicker = ({ onColorChange }: ColorPickerProps) => {
  const theme = useTheme()
  const [selectedColor, setSelectedColor] = useState(Colors.Primary)

  const handleSelection = (event: SelectChangeEvent<string>) => {
    const newColor = event.target.value as Colors
    setSelectedColor(newColor)
    onColorChange(newColor)
  }

  const getColor = (colorValue: string) => {
    switch (colorValue) {
      case Colors.Primary:
        return theme.palette.primary.dark
      case Colors.Secondary:
        return theme.palette.secondary.dark
      case Colors.Success:
        return theme.palette.success.dark
      case Colors.Warning:
        return theme.palette.warning.dark
      case Colors.Info:
        return theme.palette.info.dark
      case Colors.Error:
        return theme.palette.error.dark
      default:
        return theme.palette.primary.dark
    }
  }

  return (
    <FormControl fullWidth sx={{ my: 2 }}>
      <InputLabel id="color-picker-label" color={selectedColor}>
        Pick a color
      </InputLabel>
      <Select
        labelId="color-picket-label"
        value={selectedColor}
        onChange={handleSelection}
        label="Select Color"
        color={selectedColor}
        sx={{
          color: getColor(selectedColor),
        }}
        renderValue={(value) => (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              sx={{
                width: 16,
                height: 16,
                borderRadius: "50%",
                backgroundColor: getColor(value),
              }}
            />
            {colorOptions.find((color) => color.value === value)?.name}
          </Box>
        )}
      >
        {colorOptions.map((color) => (
          <MenuItem
            key={color.value}
            value={color.value}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              color: getColor(color.value),
            }}
          >
            {/* Color indicator */}
            <Box
              sx={{
                width: 16,
                height: 16,
                borderRadius: "50%",
                backgroundColor: getColor(color.value),
              }}
            />
            {color.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default ColorPicker
