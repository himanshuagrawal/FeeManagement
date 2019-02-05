function foo(){
    var rollno = document.getElementById('rollno').value;
    if(rollno!=""){
        var obj={
            "rollno":rollno
        };
        fetch('/getstudent',{
            method:'POST',
            body:JSON.stringify(obj),
            headers:{
                'content-type': "application/json"
            }
        }).then(function(res){
            return res.text();
        }).then(function(data){
            if(data=="true"){
                location.href="/searchstu/"+rollno;
            }
            else{
                document.getElementById('submitsuccess').innerHTML = "There is no such Student";
            }
        })
    }
}