function toPercent (value: number, max = 100, min = 0): number {
  if (value <= min) return 0
  if (value >= max) return 1
  const newMax = max - min
  return (value - min) / newMax
}

export { toPercent }
