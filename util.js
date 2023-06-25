
// 주어진 이름의 쿠키를 반환하는데,
// 조건에 맞는 쿠키가 없다면 undefined를 반환합니다.
/* get cookies */
function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

/* set cookies */
function setCookie(name, value, options = {}) {
  
    options = {
      path: '/', // 경로 지정
      ...options // 아규먼트로 옵션을 넘겨줬을경우 전개연산자로 추가 갱신
    };
  
    if (options.expires instanceof Date) {
      options.expires = options.expires.toUTCString(); // 생 Date 객체라면 형식에 맞게 인코딩
    }
  
    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
  
    for (let optionKey in options) {
      updatedCookie += "; " + optionKey;
      let optionValue = options[optionKey];
      if (optionValue !== true) { // 밸류가 없다면
        updatedCookie += "=" + optionValue;
      }
    }
  
    document.cookie = updatedCookie; // 새로 갱신
  }
  
  //쿠키 생성
  /*if (!document.cookie) {
      setCookie('expires', date.toUTCString());
      console.log('new Cookie created !');
  }*/
  
  // 쿠키 추가
 // setCookie(loginYn, "Y", {secure: true, 'max-age': 3600});


/* delete cookies */
function deleteCookie(name) { // 해당 쿠키 요소만 삭제
    setCookie(name, "", {
      'max-age': -1
    })
    console.log(document.cookie)
  }