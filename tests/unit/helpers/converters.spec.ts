import { toPercent } from '@/helpers/convertersParameters'

describe('toPercent', () => {
  it('should return 0.2', function () {
    expect(toPercent(20)).toEqual(0.2)
  })
  it('should return 0', function () {
    expect(toPercent(-20)).toEqual(0)
  })
  it('should return 1', function () {
    expect(toPercent(200)).toEqual(1)
  })
  it('should return 0.625', function () {
    expect(toPercent(150, 240)).toEqual(0.625)
  })
  it('should return -0.2', function () {
    expect(toPercent(-20, 0, -100)).toEqual(-0.2)
  })
})
