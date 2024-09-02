/**
 * Takes a seed input and returns a (function that returns an) integer pseudo-random hash of the seed
 * @param seed string seed input (must be non-zero length)
 * @returns function returning a number hash of the input seed
 */
export default function (seed: string): () => number {
  let h = 2166136261 >>> 0
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(h ^ seed.charCodeAt(i), 16777619)
  }
  return () => {
    h += h << 13
    h ^= h >>> 7
    h += h << 3
    h ^= h >>> 17
    h += h << 5
    return (h >>> 0) / 4294967296
  }
}
