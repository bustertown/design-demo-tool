/**
 * Simple rgba converter to Glclampf data type. Colors are much more complex,
 * but for this use case keep it simple
 *
 * @param r red value 0 - 255
 * @param g green value 0 - 255
 * @param b blue value 0 - 255
 * @param a alpha value
 * @returns Glclampf values (0 to 1.0) in an array list [number, number, number, number]
 */
export function toGlclampf(
  r: number,
  g: number,
  b: number,
  a: number,
): [number, number, number, number] {
  return [r / 255, g / 255, b / 255, a]
}
