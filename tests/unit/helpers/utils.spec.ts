import { isInRange, closestRangeValue } from '@/helpers/utils'

describe('isInRange', () => {
  it('range: -100..100 | step: 10 | value: 50', () => {
    const res = isInRange(-100, 100, 10, 50)
    expect(res).toBeTruthy()
  })

  it('range: -100..100 | step: 20 | value: 50', () => {
    const res = isInRange(-100, 100, 20, 50)
    expect(res).toBeFalsy()
  })

  it('range: -100..100 | step: 10 | value: 50.1', () => {
    const res = isInRange(-100, 100, 10, 50.1)
    expect(res).toBeFalsy()
  })

  it('range: -100..100 | step: 0.1 | value: 50.1', () => {
    const res = isInRange(-100, 100, 0.01, -90.01000)
    expect(res).toBeTruthy()
  })

  it('range: -100..100 | step: 0.1 | value: 50.12', () => {
    const res = isInRange(-100, 100, 0.1, 50.12)
    expect(res).toBeFalsy()
  })

  it('range: 0..1000000000 | step: 0.1 | value: 100000000', () => {
    const res = isInRange(0, 1000000000, 0.1, 100000000)
    expect(res).toBeTruthy()
  })

  it('range: 0..100 | step: 40 | value: 0 ', function () {
    const res = isInRange(-100, 100, 40, 0)
    expect(res).toBeFalsy()
  })
})

describe('closestRangeValue', () => {
  it('range: 0..100 | step: 10 | value: 200', () => {
    const res = closestRangeValue(0, 100, 10, 200)
    expect(res).toEqual(100)
  })

  it('range: 0..100 | step: 10 | value: -50', () => {
    const res = closestRangeValue(0, 100, 10, -50)
    expect(res).toEqual(0)
  })

  it('range: 100..10 | step: 10 | value: 50', () => {
    const res = closestRangeValue(100, 10, 10, 50)
    expect(res).toEqual(0)
  })

  it('range: 0..100 | step: 10 | value: 50', () => {
    const res = closestRangeValue(0, 100, 10, 50)
    expect(res).toEqual(50)
  })

  it('range: -100..100 | step: 10 | value: 50', () => {
    const res = closestRangeValue(-100, 100, 10, 50)
    expect(res).toEqual(50)
  })

  it('range: -100..100 | step: 40 | value: 0', () => {
    const res = closestRangeValue(-100, 100, 40, 0)
    expect(res).toEqual(20)
  })

  it('range: -100..100 | step: 40 | value: 10', () => {
    const res = closestRangeValue(-100, 100, 40, 1)
    expect(res).toEqual(20)
  })

  it('range: -100..100 | step: 40 | value: -10', () => {
    const res = closestRangeValue(-100, 100, 40, -10)
    expect(res).toEqual(-20)
  })

  it('range: -1..1 | step: 0.4 | value: -0.1', () => {
    const res = closestRangeValue(-1, 1, 0.4, -0.1)
    expect(res).toEqual(-0.2)
  })

  it('range: -100..100 | step: 10 | value: 51', () => {
    const res = closestRangeValue(-100, 100, 10, 51)
    expect(res).toEqual(50)
  })

  it('range: -100..100 | step: 10 | value: 49', () => {
    const res = closestRangeValue(-100, 100, 10, 49)
    expect(res).toEqual(50)
  })

  it('range: -100..100 | step: 10 | value: 55', () => {
    const res = closestRangeValue(-100, 100, 10, 55)
    expect(res).toEqual(60)
  })

  it('range: -100..100 | step: 10 | value: 55.1', () => {
    const res = closestRangeValue(-100, 100, 10, 55.1)
    expect(res).toEqual(60)
  })

  it('range: -100..100 | step: 10 | value: 54.9', () => {
    const res = closestRangeValue(-100, 100, 10, 54.9)
    expect(res).toEqual(50)
  })

  it('range: -100..100 | step: 1 | value: 55', () => {
    const res = closestRangeValue(-100, 100, 1, 55)
    expect(res).toEqual(55)
  })

  it('range: -100..100 | step: 1 | value: 55.1', () => {
    const res = closestRangeValue(-100, 100, 1, 55.1)
    expect(res).toEqual(55)
  })

  it('range: -100..100 | step: 1 | value: 55.5', () => {
    const res = closestRangeValue(-100, 100, 1, 55.5)
    expect(res).toEqual(56)
  })

  it('range: -100..100 | step: 0.1 | value: 55.5', () => {
    const res = closestRangeValue(-100, 100, 0.1, 55.5)
    expect(res).toEqual(55.5)
  })

  it('range: -100..100 | step: 0.1 | value: 55.51', () => {
    const res = closestRangeValue(-100, 100, 0.1, 55.51)
    expect(res).toEqual(55.5)
  })

  it('range: -100..100 | step: 0.1 | value: 55.55', () => {
    const res = closestRangeValue(-100, 100, 0.1, 55.55)
    expect(res).toEqual(55.6)
  })

  it('range: 0..100 | step: 1 | value: 19', () => {
    const res = closestRangeValue(-100, 100, 0.1, 55.55)
    expect(res).toEqual(55.6)
  })
})
