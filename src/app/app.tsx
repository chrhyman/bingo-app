import { useEffect, useState } from "react"
import { Container } from "@mui/material"
import AppProvider from "./providers/app-provider"
import Header from "@/components/header"
import BingoGrid from "@/components/bingo-grid"
import selectWithSeed from "@/utils/select-with-seed"
import minecraftGoals from "@/bingo-item-lists/minecraft-goals"

const BINGO_SQUARES = 25

const App = () => {
  const [seed, setSeed] = useState<string | null>(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const rawSeedValue = params.get("seed")
    if (!rawSeedValue) {
      const newSeedValue = Math.ceil(Math.random() * 1e6).toString()
      console.log(
        `No seed supplied. Generating a new card with seed '${newSeedValue}'`,
      )
      setSeed(newSeedValue)
    } else {
      console.log(`Using supplied seed: '${rawSeedValue}'`)
      setSeed(rawSeedValue)
    }
  }, [])

  const selectedGoals =
    seed && seed.length > 0
      ? selectWithSeed(BINGO_SQUARES, seed, minecraftGoals)
      : minecraftGoals.slice(0, BINGO_SQUARES)

  return (
    <AppProvider>
      <Container maxWidth="md" sx={{ pb: 25 }}>
        <Header />
        <BingoGrid items={selectedGoals} />
      </Container>
    </AppProvider>
  )
}

export default App
