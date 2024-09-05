/**
 * @param n the length of the Array to create
 * @param multiplier multiplier for each element in the result, default `1`
 * @returns Array of length `n`
 * with elements `[0, 1 * multuplier, ..., (n-2) * multiplier, (n-1) * multiplier]`
 */
export const arrayOfN = (n: number, multiplier = 1) =>
  Array.from(Array(n), (_, i) => i * multiplier)

/**
 * e.g. Chunk an array of length 25 into an array of 5 arrays each with length 5
 * @param array the input Array to be split into chunks
 * @param size the max length of each chunk
 * @returns Array of Arrays, elements of `array` split into chunks of length `size`
 */
export const arrayChunks = <T>(array: T[], size: number): T[][] =>
  arrayOfN(array.length / size, size).map((begin) =>
    array.slice(begin, begin + size),
  )

/**
 * Transposes the columns and rows of the input matrix
 * @param matrix the input matrix (array of arrays)
 * @returns the transposed matrix
 */
export const transpose = <T>(matrix: T[][]) =>
  matrix[0].map((_, i) => matrix.map((row) => row[i]))
