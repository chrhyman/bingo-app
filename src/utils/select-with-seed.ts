import seededRandom from "./seeded-random"

/**
 * Selects `count` randomly selected, randomly ordered items from `allItems`
 * using `seed` as the random seed, so repeated calls are idempotent.
 * @param count number of items to return
 * @param seed seed to pseudo-randomize the array
 * @param allItems the full array of possible items
 * @returns an array of length `count`
 */
export default function <T>(count: number, seed: string, allItems: T[]): T[] {
  // convert the `seed` to a pseudo-random integer
  const random = seededRandom(seed)
  const shuffledItems = [...allItems]

  // Fisher-Yates shuffle algorithm using the seeded random function
  for (let i = shuffledItems.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1))
    ;[shuffledItems[i], shuffledItems[j]] = [shuffledItems[j], shuffledItems[i]]
  }

  // return the first `count` elements
  return shuffledItems.slice(0, count)
}
