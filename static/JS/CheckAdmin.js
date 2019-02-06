function checkAdmin() {
    var username = document.getElementById('adminusername').value;
    var password = document.getElementById('adminpassword').value;
    if(username!=""&&password!=""){
    var obj = { 'name': username, 'password': password };
    fetch('/checkadminlogin', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function (res) {
        return res.text();
    }).then(function (data) {
        if (data == "true") {
            location.href="/adminhome";
        }
        else {
            document.getElementById("error1").innerHTML = "Wrong id or password";  
            document.getElementById("error1").style.display = 'block';
        }
    });    
}
}

function hideWarningAdmin(){
    document.getElementById('error1').style.display='none';
}

