function isSame(){
    let str1=document.getElementById('password').value;
    let str2=document.getElementById('confirm-password').value;

    if(str1 != str2){
        document.getElementById('msg').style.display='block';
        document.getElementById('update').style.display='none';
        
    }else{
        document.getElementById('msg').style.display='none';
        document.getElementById('update').style.display='block';
    }
}
let temp=document.getElementById('password').value;
console.log(temp);
function update(){
    fetch('http://localhost:8000/update', {
        method: 'post',
        headers: {
            "Content-type": 'application/json'
        },
        body: JSON.stringify({
            temp,
        })
    })
}