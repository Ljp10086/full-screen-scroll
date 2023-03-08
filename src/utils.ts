export const clamp = (i: number, lower: number, upper: number) => {
  return Math.min(Math.max(i, lower), upper);
}