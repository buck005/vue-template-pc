 const TOKEN_KEY = 'token'
 const TOKEN_TYPE_KEY = 'tokenType'

 function getCookie (cookieName) {
  let name = cookieName + '='
  let ca = document.cookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === ' ') c = c.substring(1)
    if (c.indexOf(name) !== -1) return c.substring(name.length, c.length)
  }
  return ''
}

 function setCookie (cookieName, value, day) {
  let expires = ''
  if (day !== undefined) {
    let d = new Date()
    d.setTime(d.getTime() + (day * 24 * 60 * 60 * 1000))
    expires = 'expires=' + d.toUTCString()
  }
  document.cookie = `${cookieName}=${value};${expires}`
}

 function removeToken (cookieName) {
  setCookie(cookieName, '', -1)
}
 function clearAllCookie() {
  var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
  if(keys) {
    for(var i = keys.length; i--;)
      document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
  }
}
let myCookie={
  getCookie,
  setCookie,
  removeToken,
  clearAllCookie
}
export  {myCookie};