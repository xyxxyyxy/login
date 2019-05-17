
let output = ""
let url_to_fetch = "http://localhost:5000" // change to server domain

function writeOutput(data) {
    output += '<h6 id="">' + "> " + data + '</h6>'
    document.getElementById("outputHTML").innerHTML = output;
}


function showModal() {
    $("#modalServer").modal();
}

function showModal2() {
    $("#modalServer2").modal();
}

function login(){
    let username = document.getElementById('username_login').value
    let password = document.getElementById('password_login').value
    let tmp_url = url_to_fetch + "/login/" + username + "/" + password
    fetch(tmp_url).then((resp) => resp.json()).then(function(data) {
        if (data.session_id) {
            document.cookie = "session_id=" + data.session_id
            checkSessionCookie()
        } else{
            writeOutput(data.connection)
        }
    })
}

function register(){
    let username = document.getElementById('username_register').value
    let password = document.getElementById('password_register').value
    let tmp_url = url_to_fetch + "/register/" + username + "/" + password
    fetch(tmp_url).then((resp) => resp.json()).then(function(data) {
        writeOutput(data.connection)
    })

}

function getCookieValue(a) {
    var b = document.cookie.match('(^|[^;]+)\\s*' + a + '\\s*=\\s*([^;]+)');
    return b ? b.pop() : '';
}

function checkSessionCookie(){
    let cookie = getCookieValue("session_id")
    let tmp_url = url_to_fetch + "/session/" + cookie
    if (cookie){
        fetch(tmp_url).then((resp) => resp.json()).then(function(data) {
            if(data.connection){
                writeOutput(data.connection)
            }
            else{
                writeOutput("connected as")
                writeOutput(data.username)
            }
        })
    }
    else{
        writeOutput("please register or log in")
    }
}