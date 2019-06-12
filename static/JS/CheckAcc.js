function checkAcc() {
    var username = document.getElementById('accusername').value;
    var password = document.getElementById('accpassword').value;
    var error = document.getElementById('error2');
    if (username != "" && password != "") {
        var obj = {
            'username': username,
            'password': password
        };
        fetch('/checkAcclogin', {
            method: "POST",
            body: JSON.stringify(obj),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (result) {
            return result.text();
        }).then(function (data) {
            if (data !== "false") {
                document.cookie=`token=${data}; path=/;`;
                location.href = "/acchome";
            }
            else {
                error.style.display = 'block';
                error.innerHTML = "Wrong Id or Password";
            }
        })
    }
}

function hideWarningAccountant(){
    document.getElementById('error2').style.display='none';
}
