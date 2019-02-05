
function fooo() {
    event.preventDefault();
    let name = document.getElementById('name').value;
    let password = document.getElementById('password').value;
    let email = document.getElementById('email').value;
    let address = document.getElementById('address').value;
    let contact = document.getElementById('contact').value;
    if (name != "" && password != "" && email.search(/[A-Z,a-z]+[0-9]*@[A-Z,a-z]+.com/i) != -1 && address != "" && contact.search(/[0-9]{10}/i) != -1) {
        var obj = {
            '_id': document.getElementById('id').innerHTML,
            'name': name,
            'password': password,
            'email': email,
            'address': address,
            'contact': contact
        };
        fetch('/updateaccdb', {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: {
                'content-type': "application/json"
            }
        }).then(function (res) {
            return res.text();
        }).then(function (data) {
            if (data == "true") {
                document.getElementById('name').value = "";
                document.getElementById('password').value = "";
                document.getElementById('email').value = "";
                document.getElementById('address').value = "";
                document.getElementById('contact').value = "";
                document.getElementById('submitsuccess').innerHTML = "User updated successfully";
            }
            else {
                document.getElementById('submitsuccess').innerHTML = "There is some error processing your request . Please try again later";
            }
        })
    }

}