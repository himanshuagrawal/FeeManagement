

function del(id){
    fetch('/deletestu',{
        method:"POST",
        headers:{
            'id':id,
            'Content-Type':'text/plain'
        }
    }).then(function(result){
        return result.text();
    }).then(function(data){
        if(data=="true"){
            location.href="/viewstu";
        }else{
            document.getElementById("error").innerHTML="Some problem occured during the processing of the request";
        }
    })
}