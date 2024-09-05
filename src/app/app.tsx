import { useEffect, useState } from "react"
import { Container } from "@mui/material"
import AppProvider from "./providers/app-provider"
import Header from "@/components/header"
import BingoGrid from "@/components/bingo-grid"
import selectWithSeed from "@/utils/select-with-seed"
import mwcGoals from "@/bingo-item-lists/mwc-goals"

const BINGO_SQUARES = 25

const App = () => {
  const [seed, setSeed] = useState<string>("")

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const rawSeedValue = params.get("seed")
    if (!rawSeedValue) {
      const newSeedValue = Math.ceil(Math.random() * 1e6).toString()
      setSeed(newSeedValue)
    } else {
      setSeed(rawSeedValue)
    }
  }, [])

  const selectedGoals =
    seed && seed.length > 0 ? selectWithSeed(BINGO_SQUARES, seed, mwcGoals) : []

  return (
    <AppProvider>
      <Container maxWidth="md" sx={{ pb: 25 }}>
        <Header />
        <Container maxWidth="sm">
          <BingoGrid items={selectedGoals} seed={seed} />
        </Container>
      </Container>
    </AppProvider>
  )
}

export default App
