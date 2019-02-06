function del(id){
    console.log(id);
    fetch('/deleteacc',{
        headers:{
            'id':id,
        'Content-Type':'text/plain'
        }
    }).then(function(res){
        return res.text();
    }).then(function(data){
        if(data=="true"){
            location.href = "/viewacc";
        }else{
            document.getElementById("error").innerHTML="Unable to delete. Please try after sometime";
        }
    })
    
};




