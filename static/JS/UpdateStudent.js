function fooo() {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var sex = document.getElementById('radio').value;
    var course = document.getElementById('course').value;
    var fee = document.getElementById('fee').value;
    var paid = document.getElementById('paid').value;
    var due = document.getElementById('due').value;
    var address = document.getElementById('address').value;
    var contact = document.getElementById('contact').value;
    var error = document.getElementById('submitsuccess');
    if (name != "" && email.search(/[A-Z,a-z]+[0-9]*@[A-Z,a-z]+.com/i) != -1 && fee != "" && paid != "" && due != "" && address != "" && contact.search(/[0-9]{10}/i) != -1) {
        {
            var obj = {
                '_id': document.getElementById('id').innerHTML,
                'name': name,
                'email': email,
                'sex': sex,
                'course': course,
                'fee': fee,
                'paid': paid,
                'due': due,
                'address': address,
                'contact': contact,
            };
            fetch('/updatestudb', {
                method: "POST",
                body: JSON.stringify(obj),
                headers: {
                    'Content-type': 'application/json'
                }
            }).then(function (res) {
                return res.text();
            }).then(function (data) {
                if (data == "true") {
                    document.getElementById('name').value = "";
                    document.getElementById('email').value = "";
                    document.getElementById('radio').value = "male";
                    document.getElementById('course').value = "java";
                    document.getElementById('fee').value = 0;
                    document.getElementById('paid').value = 0;
                    document.getElementById('due').value = 0;
                    document.getElementById('address').value = "";
                    document.getElementById('contact').value = "";
                    error.innerHTML = "Student updated Successfully";
                } else {
                    error.innerHTML = "There is some error while inserting the records. Please enter after some time";
                }
            })
        }
    }
}