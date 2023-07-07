const id_check = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
// 영문 숫자 특수기호 조합 8자리 이상
const password = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/

// let members = [{id:'hyelim91',
//               name:'김혜림',
//               pw :'gpfla0822!',
//               email :'hyelim0822@naver.com',
//               phone : '010-2866-4146',
//               role : "user",
//               },
//               {id:'hsj',
//               name:'현상주',
//               pw :'test123123!',
//               email :'hsj@naver.com',
//               role : "user",
//               }]

  /************ cookie값이 있는지 확인, 없으면 로그인 */
let except = ["http://127.0.0.1:5500/main.html", // 메인
              "http://127.0.0.1:5500/main2.html", // 로그인 후 메인
              "http://127.0.0.1:5500/signin.html", // 로그인 페이지
              "http://127.0.0.1:5500/signup.html", // 회원가입 페이지
              "http://127.0.0.1:5500/forgetPW.html", // 비밀번호 찾기 페이지
              "http://127.0.0.1:5500/mypage.html", // 마이 페이지
              "http://127.0.0.1:5500/usermodify.html", // 회원수정 페이지
            ];

/*******************현재 페이지를 확인해서 except에 넣어주기 */
let url = window.location.href;
            if(url.includes("signin")){
              except.push(url);
            }

            if(url.includes("main") || url.includes("main2")){
              except.push(url);
            }

            if(url.includes("forgetPW")){
              except.push(url);
            }

  window.onload = function(){
    let cookies = getCookie("login");
    //kakao login 추가
    let kakao = JSON.parse(localStorage.getItem("kakaoID"));
    // 로그인이 안되있으면 , 페이지 제한
    let url = window.location.href;
      // 현재페이지가 except에 없거나 쿠키가 없다면 로그인 페이지로 이동
      if(!except.includes(url) && !cookies && !kakao){
              alert("로그인 먼저 해주세요");
              location.href = "/signin.html";
            }
  }


/************************* 엔터키 이벤트 */

function enter(event){
  let loginInput = document.getElementById("input-password");
  let modiInput = document.getElementById("floatingPasswordCheck");
  let forget = document.getElementById("input-confirmpassword");
  let signupEmail = document.getElementById("input-email");
  let findIdemail = document.getElementById('find_email');
  let findPw = document.getElementById('find_pwCheck');

    if(event.keyCode === 13){
      console.log("엔터눌렀다")
      if(event.target == loginInput){
        signIn(event);
      }else if(event.target == modiInput){
        modify(event);
      }else if(event.target == forget){
        forgetPw(event);
      }else if(event.target == signupEmail){
        submit(event);
      }else if(event.target == findIdemail) {
        findId();
      }else if(event.target == findPw){
        forgetPw();
      }
      
    }
}


/******************* 스크롤 이벤트 */
    let header = document.querySelector(".hd");

    // 스크롤 내리면 헤더 border-bottom 선 그어주기
    document.addEventListener("scroll",() => {
        if(window.scrollY > 50) { // 스크롤이 내려가면
          // class 변경해주기
          let hd = document.querySelector(".hd");
          header.classList.replace("hd","ggo");
        }else{
          header.classList.replace("ggo","hd");
        }
    })


/*********************************로그인 페이지 login button disable 이벤트 */
    
    function buttonOn(event){
      console.log("버튼온")
      console.log(event.target)
      let pwInput = document.getElementById('input-password');
      let signupEmail = document.getElementById("input-email");
      let findEmail = document.getElementById("find_email");
      let findPw = document.getElementById("find_pwCheck");
      let loginBtn = document.querySelector('.submit button');
      let findPwBtn = document.querySelector('.submitPw button')
      
      // 값이 입력 되면 class .focus 추가
        if(event.target == pwInput){
          if(pwInput.value != ""){
            loginBtn.setAttribute("class","focus");
            loginBtn.setAttribute("disabled",false);
          }else{
            loginBtn.setAttribute("disabled","");
            loginBtn.removeAttribute("class","focus");
            loginBtn.setAttribute("class","active")
          }
        }
      
        if(event.target == signupEmail){
          if(signupEmail.value != ""){
            loginBtn.setAttribute("class","focus");
            loginBtn.setAttribute("disabled",false);
          }else {
            loginBtn.setAttribute("disabled","");
            loginBtn.removeAttribute("class","focus");
            loginBtn.setAttribute("class","active")
          }
        }

        if(event.target == findEmail){
          if(findEmail.value != ""){
            loginBtn.setAttribute("class","focus");
            loginBtn.setAttribute("disabled",false);
        
          }else {
            loginBtn.setAttribute("disabled","");
            loginBtn.removeAttribute("class","focus");
            loginBtn.setAttribute("class","active")
          }
        }

        if(event.target == findPw){
          if(findPw.value != ""){
            findPwBtn.setAttribute("class","focus");
            findPwBtn.setAttribute("disabled",false);
          }else {
            findPwBtn.setAttribute("disabled","");
            findPwBtn.removeAttribute("class","focus");
            findPwBtn.setAttribute("class","active")
          }
        }
    }

    /*************************************** 핸드폰 번호 실시간 하이픈 추가 */
        
        // 휴대폰 번호 입력 필드의 값을 모니터링하고 실시간으로 하이픈을 추가합니다.
        if(document.getElementById('input-phone')){
          var phoneNumberInput = document.getElementById('input-phone');

          phoneNumberInput.addEventListener('input', function() {
            var formattedNumber = phoneNumberInput.value.replace(/[^0-9]/g, '') //숫자를 제외한 모든 문자 제거
                                                        .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3").replace(/(\-{1,2})$/g, "");
            phoneNumberInput.value = formattedNumber;
          });
        }
    


/*********************** main page 검색 눌렀을 때 */
  function search_bar() {
    
    // 각 class name 변경해주기
    let search_bar = document.querySelector(".gzRefZ");
    search_bar.className = "ksrLg";

    let close = document.querySelector(".eTRneP");
    close.className = "wXtFi";

      let something = document.querySelector(".iFeRkU");
      something.className = "fAtBFN";

  }
  
  /****************************** 검색바에서 x 눌렀을 때 */
  let close_btn = document.getElementById("close");
  close_btn.addEventListener("click",closeSearch);

  function closeSearch() {
    console.log("clicked");
    
    // 각 class name 변경해주기
    let search_bar = document.querySelector(".ksrLg");
    search_bar.className = "gzRefZ";

    let close = document.querySelector(".wXtFi");
    close.className = "eTRneP";

    let something = document.querySelector(".fAtBFN");
    something.className = "iFeRkU"
  }

  /********************side menu 눌렀을 때 */
  let side_menu = document.querySelector(".menu-btn");
  side_menu.addEventListener("click",sideMenu);

  function sideMenu(){
    console.log("됏다")
    
    // 각 class name 변경해주기
    let side= document.querySelector(".kakfyC");
    side.className = "fgozys";

    let side_bar = document.querySelector(".gdtYNR");
    side_bar.style.cssText = "right : 0px";

    let background = document.querySelector(".fTYzQQ");
    background.className = "kxDJqV";

    let close = document.querySelector(".dXOkqN");
    close.className = "bNzgXx";

    // nav 생성해서 추가해 주기
    let nav = document.createElement("nav");
    nav.className = "uZaHK";

    let h21 = document.createElement("h2");
    let h22 = document.createElement("h2");

    h21.innerText = "테마";
    h22.innerText = "카테고리";

    let ul1 = document.createElement("ul");
    let ul2 = document.createElement("ul");

    let li1 = document.createElement("li");
    let li2 = document.createElement("li");
    let li3 = document.createElement("li");
    let li4 = document.createElement("li");

    li1.innerText = "전체보기";
    li2.innerText = "우리가 돈 나가는 일에 대처하는 자세";
    li3.innerText = "버츄얼굿즈의 탄생";
    li4.innerText = "제 책상 구경하실 분";
    
    ul1.appendChild(li1);
    ul1.appendChild(li2);
    ul1.appendChild(li3);
    ul1.appendChild(li4);

    let li5 = document.createElement("li");
    let li6 = document.createElement("li");
    let li7 = document.createElement("li");
    let li8 = document.createElement("li");
    let li9 = document.createElement("li");
    let li10 = document.createElement("li");
    let li11 = document.createElement("li");
    let li12 = document.createElement("li");

    li5.innerText = "전체보기";
    li6.innerText = "문구";
    li7.innerText = "리빙";
    li8.innerText = "책/매거진F";
    li9.innerText = "배민그린";
    li10.innerText = "배달이친구들";
    li11.innerText = "콜라보레이션";
    li12.innerText = "명예의 전당";

    ul2.appendChild(li5);
    ul2.appendChild(li6);
    ul2.appendChild(li7);
    ul2.appendChild(li8);
    ul2.appendChild(li9);
    ul2.appendChild(li10);
    ul2.appendChild(li11);
    ul2.appendChild(li12);

    nav.appendChild(h21);
    nav.appendChild(ul1);
    nav.appendChild(h22);
    nav.appendChild(ul2);

    // nav 태그 footer 전에 삽입
    let footer = document.querySelector(".chcvRc");
        side_bar.insertBefore(nav,footer)
  }


/********************side menu에서 X 눌렀을 때 */
  let side_closeBtn = document.querySelector(".dXOkqN");
  side_closeBtn.addEventListener("click",sideClose);

  function sideClose(){
    
    // 각 class name 변경해주기
    let side= document.querySelector(".fgozys");
    side.className = "kakfyC";

    let side_bar = document.querySelector(".gdtYNR");
    side_bar.style.cssText = "right : -380px";

    let background = document.querySelector(".kxDJqV");
    background.className = "fTYzQQ";

    let close = document.querySelector(".bNzgXx");
    close.className = "dXOkqN";

    // nav 태그 삭제
    let nav = document.querySelector(".uZaHK")
    // nav의 부모를 찾아서
    let parent = nav.parentElement;
    //부모에서 자식 지워주기
    parent.removeChild(nav);
  }

/******************************* 메인 슬라이더 이미지 호버 이벤트 */
  let before_img = document.querySelectorAll(".list-box p.thumbs");
  
  for(let i=0; i<before_img.length; i ++) {
    //p.thumbs 3개의 리스트
    before_img[i].addEventListener("mouseover",() => {
      // p.thumbs의 img 선택
      let before = before_img[i].querySelector("img");
      // p.thumbs의 span 선택
      let after = before_img[i].querySelector("span");
  
      // span의 style change
      after.style.opacity = "1";
    });

    before_img[i].addEventListener("mouseout",function(){
      let before = before_img[i].querySelector("img");
      let after = before_img[i].querySelector("span");

      // 호버했을 때 , span에 있는 사진 보여주기
      after.style.opacity = "0";
      
    });
  }


/**********************  회원가입 */ 
function submit() {
    console.log("뭐야")
    let checked = valid();
    
    // 검증 완료
    if(checked){
        let id = document.getElementById('input-id').value;
        let userName = document.getElementById('input-name').value;
        let pw = document.getElementById('floatingPassword').value;
        let pwCheck = document.getElementById('floatingPasswordCheck').value;
        let email = document.getElementById('input-email').value;
        let phone = document.getElementById('input-phone').value;
        let birth = document.getElementById('input-birth').value;

        Object.keys(localStorage).forEach((key) => {
          
          if(key.includes("members")){ // members key값이 이미 있으면,
            let member = JSON.parse(localStorage.getItem(key)); // key의 value 가져오기
            
                for(let i=0; i<member.length; i++) { // value 값 가져오기
                  if(member[i].id == id){ // 이미 아이디가 있으면,
                    alert("이미 존재하는 아이디 입니다");
                    return;
                  }else { //아이디가 없고
                    if(birth == undefined || birth == ""){ // 생일을 입력안했으면,
                      // 원래 key값에 push로 저장
                      member.push ({
                        id : id,
                        userName : userName,
                        pw : pw,
                        email : email,
                        phone : phone,
                        birth : "",
                      })
                      //세션에 저장
                      localStorage.setItem("members",JSON.stringify(member));
                      alert("회원가입이 완료되었습니다.");
                      location.href=`signin.html?id=${id}`;

                    } else { // 생일을 입력했으면,
                      // 원래 key값에 push로 저장
                      member.push ({
                        id : id,
                        userName : userName,
                        pw : pw,
                        email : email,
                        phone : phone,
                        birth : birth,
                      })

                      //세션에 저장
                      localStorage.setItem("members",JSON.stringify(member));
                      alert("회원가입이 완료되었습니다.");
                      location.href=`signin.html?id=${id}`;
                    }
                    break;
                  }
                }
            }else if(JSON.parse(localStorage.getItem("members")) == undefined){ // members라는 key값이 없으면
              if(birth == undefined || birth == ""){ // birth를 입력안했으면,
                // 객체에 key ,value 값으로 넣어준다
                let info = [{
                  id : id,
                  userName : userName,
                  pw : pw,
                  email : email,
                  phone : phone,
                  birth : birth,
                }];

                // 세션에 값 저장
                localStorage.setItem("members",JSON.stringify(info))
                alert("회원가입이 완료되었습니다.");
                location.href=`signin.html?id=${id}`;
              } else { // birth값을 입력 했으면,
                 // 객체에 key ,value 값으로 넣어준다
                  let info = [{
                    id : id,
                    userName : userName,
                    pw : pw,
                    email : email,
                    phone : phone,
                    birth : birth,
                  }];

                // 세션에 값 저장
                localStorage.setItem("members",JSON.stringify(info))
                alert("회원가입이 완료되었습니다.");
                location.href=`signin.html?id=${id}`;
              }
            }
          });
    }
  }

  
/*************** 값 검증 */
function valid(){
  
    let id = document.getElementById('input-email')
    let userName = document.getElementById('input-name')
    let pw = document.getElementById('floatingPassword')
    let pwCheck = document.getElementById('floatingPasswordCheck')
    let email = document.getElementById('input-email')
    let phone = document.getElementById('input-phone')

    // id 값이 비었는지 확인
    if(id.value == undefined || id.value == ""){
      alert("이메일을 입력해주세요");
      id.value = "";
      id.focus();
      return false;
    }

    // email 형식이 맞는지 확인
    if(email.value == undefined || email.value == ""){
      alert("이메일 형식이 아닙니다");
      email.value = "";
      email.focus();
      return false;
    }

   // email 형식이 맞는지 확인
    if(!id_check.test(email.value)){
      alert("이메일 형식이 아닙니다");
      id.value = "";
      id.focus();
      return false;
    }
    
   // 이름 값이 비었는지 확인
    if(userName.value == undefined || userName.value == ""){
      alert("이름을 입력해주세요");
      userName.value = "";
      userName.focus();
      return false;
    }

   // 비밀번호 값이 비었는지 확인
    if(pw.value == undefined || pw.value == ""){
      alert("아이디를 입력해주세요");
      pw.value = "";
      pw.focus();
      return false;
    }

  // 비밀번호 형식이 맞는지 확인
  if(!password.test(pw.value)){
      alert("영문 숫자 특수기호 조합 8자리 이상 입력해주세요");
      pw.value = "";
      pw.focus();
      return false;
  }

  // 비밀번호 확인 값이 비었는지 확인
  if(pwCheck.value == undefined || pwCheck.value == ""){
      alert("비밀번호를 입력해주세요");
      pwCheck.value = "";
      pwCheck.focus();
      return false;
  }

  // 비밀번호와 비밀번호 확인값이 다른지 확인
  if(pw.value != pwCheck.value){
      alert("비밀번호가 다릅니다.")
      pw.value = "";
      pw.focus();
      return false;
  }

  // 핸드폰 값이 비었는지 확인
  if(phone.value == undefined || phone.value == ""){
    alert("비밀번호를 입력해주세요");
    phone.value = "";
    phone.focus();
    return false;
}

  // 검증을 다 통과하면
    return true;
}


/************************* 로그인 */
function signIn(){

  // id,pw 맞는지 확인
  let id = document.getElementById("input-id");
  let pw = document.getElementById('input-password');
  let loginCheck = false;
  
  Object.keys(localStorage).forEach(key => {
    
      if(key == "members"){
        debugger;
        let value =JSON.parse(localStorage.getItem(key));
          for(let i =0; i <value.length ; i++) {
          // id가 같은지 확인
          if(value[i].id == id.value) {
            // id가 같고 비번까지 같은지 확인
            if(value[i].pw == pw.value){
              // remember 로그인 체크시
                let checkbox = document.getElementById("remember-check").checked;          
                console.log(checkbox);
                if(checkbox){
                  // 한달 후 까지 60초 * 60분 * 24시간 * 30일
                  setCookie("keepID",value[i].id,{secure:true,'max-age':60*60*24*30})
                }
                // for문 끝내기위해 true
                  loginCheck = true;
                  // 쿠키 등록
                  setCookie('login',value[i].userName,{secure: true, 'max-age': 1200});
                  alert('로그인 성공');

                  // 메인페이지로 이동
                  location.href="/main2.html"
                  }else{ // id는 맞지만 비번이 틀렸을 때
                    alert("비밀번호가 다릅니다.");
                    pw.focus();
                    pw.value = "";
                    return;
                }
              }
          }
          
        }
  });
          // 입력한 id가 없으면
          if (!loginCheck) {
            alert("없는 아이디 입니다.");
            id.value= "";
            id.focus();
  }
}



/******************** 회원정보 수정 */

function modify(){

  //쿠키값 가져오기
  let cookies = getCookie('login');
  
  //수정된 값들 가져오기
  let id = cookies;
  let name = document.getElementById('input-username');
  let pw = document.getElementById('floatingPassword');
  let pwCheck = document.getElementById('floatingPasswordCheck');
  
    let checked = valid();
      if(checked){
      // 쿠키값과 같은 id 찾아서 값 변경해주기
        for(let i = 0; i < members.length ; i++) {
          if(cookies == members[i].id){
              members[i].name = name.value;
              members[i].pw = pw.value;

              // 수정된 값을 sessionStorage에 저장
              let memberNum = board_N();
              sessionStorage.setItem("members" + memberNum,JSON.stringify(members[i]))
              alert("수정이 완료되었습니다.")
              // 메인페이지2로 이동
              location.href="/main2.html";
          }
      }
    }
  
}


/********************** 로그아웃 */
function logout(){
  deleteCookie('login');
  alert("로그아웃 되었습니다");
  location.href = "/main.html";
}

/******** 아이디찾기 버튼에 이벤트 걸어주기 */
  if(document.getElementById("findId")){
    let findidBtn = document.getElementById("findId");
    console.log(findidBtn);
    findidBtn.addEventListener("click",findId);
  }
  
/****************************** 아이디 찾기 */
function findId() {
  let findName = document.getElementById("find_name").value;
  let findEmail = document.getElementById("find_email").value;

  Object.keys(localStorage).forEach(key => {
    if (key === "members") {
      let value = JSON.parse(localStorage.getItem(key));
    
      let found = false;

      for (let i = 0; i < value.length; i++) {
        if (value[i].userName === findName) {
          found = true;
          if (value[i].email === findEmail) {
            alert(`아이디는 ${value[i].id} 입니다.`);
          } else {
            alert("이메일이 일치하지 않습니다.");
          }
          break;
        }
      }

      if (!found) {
        alert("없는 이름입니다.");
      }
    }
  });
}


/*************************** 비밀번호 찾기 */
function forgetPw(){
  
  let beforeId = document.getElementById('find_id');
  let newPw = document.getElementById("find_pw");
  let pwCheck = document.getElementById("find_pwCheck");

   // 비밀번호 형식이 맞는지 확인
  if(!password.test(newPw.value)){
    alert("영문 숫자 특수기호 조합 8자리 이상 입력해주세요");
    newPw.value = "";
    newPw.focus();
  }

   if (newPw.value != pwCheck.value){ // 두개의 값이 같은지 확인 
    alert("비밀번호가 일치하지 않습니다");
    pwCheck.value = "";
    pwCheck.focus();
  } else {
  Object.keys(localStorage).forEach(key => {
      if(key == "members"){
        let value = JSON.parse(localStorage.getItem(key));
        debugger;
        for(let i=0; i <value.length; i++) {
          if(value[i].id == beforeId.value) {
            let members = {
              id : beforeId.value,
              userName:value[i].userName,
              pw :newPw.value,
              email : value[i].email,
              phone : value[i].phone,
              birth : value[i].birth,
              }

              value.push(members);
              members.splice(i,1)
              alert("비밀번호가 변경되었습니다");
              break;
          }
        }
      }
  })
  }
  
}
