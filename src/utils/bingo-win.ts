import { Win } from "@/types/win.enum"
import { arrayChunks, arrayOfN, transpose } from "./array"

const allIndices = arrayOfN(25)
const horizontals = arrayChunks(allIndices, 5)
const verticals = transpose(horizontals)
const diagonals = [
  [0, 6, 12, 18, 24],
  [4, 8, 12, 16, 20],
]
const winningLines = [...horizontals, ...verticals, ...diagonals]

export default (selected: number[]): Win => {
  if (allIndices.every((i) => selected.includes(i))) {
    return Win.Blackout
  } else if (
    winningLines.some((line) => line.every((i) => selected.includes(i)))
  ) {
    return Win.Line
  } else {
    return Win.None
  }
}
