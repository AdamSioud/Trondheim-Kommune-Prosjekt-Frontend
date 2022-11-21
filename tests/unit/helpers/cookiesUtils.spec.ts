import { setCookie } from '@/helpers/cookiesUtils'

describe('setCookie', () => {
  it('range: -100..100 | step: 10 | value: 50', () => {
    const res = setCookie('test', 'test', {
      sameSite: 'Strict',
      path: '/',
      maxAge: 46546,
      custom: [['test1', '1'], ['test2', '2']]
    })
    expect(res)
  })
})
