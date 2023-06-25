
/* ******************* Q&A 글쓰기 */
function create(){
    // 입력한 값 가져오기
    let title = document.getElementById("selectTitle")
    let id = getCookie("login");
    let name = document.getElementById("name");
    let pw = document.getElementById("pw");
    let content = document.getElementById("content");
    let product = document.getElementById("product");
    let today = new Date();
    let date = today.toLocaleDateString();
    let count = 0;
    
    // session에 저장된 값이 없으면
    if(JSON.parse(sessionStorage.getItem("board")) == undefined){
        count = 3;
        // 새로운 배열에 저장후 session에 값 넣어주기
        let create = [];
        create.push({
            title :title.options[title.selectedIndex].value,
            id : id,
            name : name.value,
            pw : pw.value,
            product : product.value,
            content : content.value,
            date : date,
            count : count,
    })

     //sessionStorage에 값 저장
        sessionStorage.setItem("board",JSON.stringify(create));
        alert("작성 완료되었습니다");
     // Q&A 페이지로 이동
        location.href ="/Q&A-list.html";
        
    }else { // session에 값이 있다면
        let value = JSON.parse(sessionStorage.getItem("board"));
        
        // session 마지막 값에 3더해주기
        count = parseInt(value.length) + 3;
        console.log("count",count)

        // 원래 session 배열에 값 넣어주기
        value.push({
            title :title.options[title.selectedIndex].value,
            id : id,
            name : name.value,
            pw : pw.value,
            product : product.value,
            content : content.value,
            date : date,
            count : count,
        })

         //sessionStorage에 board값을 더해서 저장
            sessionStorage.setItem("board",JSON.stringify(value));
            alert("작성 완료되었습니다");
            // Q&A 페이지로 이동
            location.href ="/Q&A-list.html";
    }

    }

  /* ************************* 글쓰기 수정 */
    function createEdit(){

        // Get parameta , key 값 받아오기
        let keyValue =decodeURI(window.location.search);
        keyValue = keyValue.replace("?키=","");

        let cookie = getCookie("login");

        //session 값 가져오기
        let value = JSON.parse(sessionStorage.getItem("board"));
            console.log(`value`,value);
            for(let j=0; j<value.length; j++){
                // parameta로 받은 값과 value 인덱스 값이 같고 , 아이디가 같으면
                if(keyValue == j && cookie == value[j].id) {
                    
                    //입력한 값 가져오기
                        let title = document.getElementById("selectTitle");
                        let name = document.getElementById("name");
                        let pw = document.getElementById("pw");
                        let product = document.getElementById("product");
                        let content = document.getElementById("content");

                        // 수정하는 날짜로 변경
                        let today = new Date();
                        let date = today.toLocaleDateString();

                        // 새로운 값 넣어주기
                        value.push({
                                    title :title.value,
                                    id : cookie,
                                    name : name.value,
                                    pw : pw.value,
                                    product : product.value,
                                    content : content.value,
                                    date : date,
                                    count : value[j].count,
                                });
                                // 원래 있던 값은 지워주기
                                value.splice(j,1);
                                console.log(`value2`,value);
        
                            
                    // 원래 값에 덮어쓰기
                        sessionStorage.setItem("board",JSON.stringify(value))
                        alert("수정이 완료되었습니다")
                        location.href="Q&A-list.html"

                    }
                }
            }
        
        





    /******************************* 글쓰기 리셋*/
    function reset(){

    let pw = document.getElementById("pw");
    let content = document.getElementById("content");
    let product = document.getElementById("product");

        pw.value = "";
        content.value = "";
        product.value = "";
    }


  /********************************* 글쓰기 삭제 */
    function deleteSession() {
        // Get parameta , key 값 받아오기
        console.log("s눌럿다")
        let keyValue = decodeURI(window.location.search);
        keyValue = keyValue.replace("?키=","");
        console.log(keyValue)
        
        // session 값 가져오기
        let value = JSON.parse(sessionStorage.getItem("board"));
            for(let i=0; i<value.length; i++) { 
                if(keyValue == i){ //parameta로 받은 값과 value 인덱스 값이 같으면 
                    value.splice(i,1); // 그 인덱스 값을 삭제
                    console.log(`value`,value);

                    // sessionStorage 값 리셋해주기
                    sessionStorage.setItem("board",JSON.stringify(value));
                    alert("글이 삭제되었습니다.");
                    location.href = "Q&A-list.html"
                }
            }
        }


