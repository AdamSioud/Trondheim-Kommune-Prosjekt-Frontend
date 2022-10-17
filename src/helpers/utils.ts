/**
 * Check if something is a number
 * The most common test is string to number
 * @param param The parameter to test
 */
export function isNumber (param: unknown): boolean {
  if (typeof param === 'number') return true
  if (typeof param !== 'string') return false
  if (param.trim() === '') return false

  return !Number.isNaN(Number(param))
}

/**
 * Return the number of decimal in a number
 * @param number A number for which we want to know the number of decimal
 */
export function lengthDecimal (number: number): number {
  let lengthDecimal = 0
  const numStr = String(number)
  if (numStr.includes('.')) lengthDecimal = numStr.split('.')[1].length
  else if (numStr.includes('e-')) lengthDecimal = Number.parseInt(numStr.split('e-')[1])
  return lengthDecimal
}

/**
 * Check if a number is in a range with step
 * e.g. range: 0..10 | step: 2 | number: 2   => true
 *      range: 0..10 | step: 2 | number: 11  => false
 *      range: 0..10 | step: 2 | number: 2.1 => false
 *      range: 0..10 | step: 2 | number: 3   => false
 * @param min The lower bound
 * @param max The upper bound
 * @param step The step in the range
 * @param number The number to test
 */
export function isInRange (min: number, max: number, step: number, number: number): boolean {
  if (max < min) return false
  if (number < min || number > max) return false
  if (step < 0) step = -step // Prevent negative value

  const lengthDecimalNumber: number = lengthDecimal(number)
  const lengthDecimalStep: number = lengthDecimal(step)

  if (lengthDecimalNumber > lengthDecimalStep) return false // number: 3.11 | step: 0.1 => false

  const multiplier = Math.pow(10, lengthDecimalStep)

  const newNumber = Math.round((number - min) * multiplier)
  return newNumber % (step * multiplier) === 0
}

/**
 * Return the closest number belonging to the range
 * @param min The lower bound
 * @param max The upper bound
 * @param step The step in the range
 * @param number The number to test
 */
export function closestRangeValue (min: number, max: number, step: number, number: number): number {
  if (max < min) return 0
  if (number < min) return min
  if (number > max) return max
  const decimal = lengthDecimal(step)
  const multiplier = Math.pow(10, decimal)
  number *= multiplier
  step *= multiplier
  min *= multiplier

  number = (Math.round((number - min) / step) * step) + min
  return number / multiplier
}

/**
 * Return the closest number belonging to the array
 * @param arr The array with values
 * @param number The number to test
 */
export function closestArrayValue (arr: number[], number: number): number {
  if (arr.length === 0) return 0
  return arr.reduce(function (prev, curr) {
    return (Math.abs(curr - number) < Math.abs(prev - number) ? curr : prev)
  })
}

export function removeItem<T> (arr: Array<T>, value: T): Array<T> {
  const index = arr.indexOf(value)
  if (index > -1) arr.splice(index, 1)
  return arr
}
