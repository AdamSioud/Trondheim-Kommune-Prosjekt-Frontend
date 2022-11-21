import { CookieOptions } from '@/type'

function setCookie (key: string, value: string | number | boolean, cookieOption: CookieOptions = {
  path: '/',
  sameSite: 'Lax',
  expires: 2592000000
}): void {
  let options = ''
  if (cookieOption) {
    let {
      domain = undefined,
      path = '/',
      sameSite = 'Lax',
      secure = false,
      httponly = false,
      maxAge = undefined,
      expires = 2592000000,
      custom = undefined
    } = cookieOption

    let resDomain = ''
    let resPath = ''
    let resSameSite = ''
    let resSecure = ''
    let resHttponly = ''
    let resMaxAge = ''
    let resExpires = ''
    let resCustom = ''

    if (domain) {
      resDomain = 'domain=' + domain
    }
    if (path) {
      resPath = 'path=' + path
    }
    if (sameSite) {
      resSameSite = 'samesite=' + sameSite
    }
    if (secure) {
      resSecure = 'Secure'
    }
    if (httponly) {
      resHttponly = 'HttpOnly'
    }
    if (maxAge) {
      resMaxAge = 'max-age:' + maxAge
    }
    if (expires) {
      if (typeof expires === 'number') {
        const d = new Date()
        d.setTime(d.getTime() + expires)
        expires = d.toUTCString()
      }
      resExpires = 'expires=' + expires
    }
    if (custom) {
      resCustom = custom.map(e => e.join('=')).join(';')
    }

    options = [resDomain, resPath, resSameSite, resSecure, resHttponly, resMaxAge, resExpires, resCustom].filter(value => value).join(';')
  }
  document.cookie = `${key}=${encodeURIComponent(value)};${options}`
}

function getCookie (key: string): string | null {
  const cookieArr = document.cookie.split(';')
  for (let i = 0; i < cookieArr.length; i++) {
    const cookiePair = cookieArr[i].split('=')
    if (key === cookiePair[0].trim()) {
      return decodeURIComponent(cookiePair[1])
    }
  }
  return null
}

export {
  setCookie,
  getCookie
}
