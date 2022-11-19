function setCookie (key: string, value: string | number | boolean, expires = 2592000000, samesite = 'Lax', path = '/') {
  const d = new Date()
  d.setTime(d.getTime() + expires)
  document.cookie = `${key}=${encodeURIComponent(value)};expires=${d.toUTCString()};samesite=${samesite};path=${path}`
}

function getCookie (key: string) {
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
