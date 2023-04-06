var otp;
var flag;
async function valid_email(email1) {

    let emailValid = await fetch('/emailValid', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email1
        })
    }).then(res => res.json())
        .then(data => {
            flag = data.flag; 
            if(flag==false){
                document.getElementById("password_lable").innerHTML = "Entered email is not registered yet"
                document.getElementById("password_lable").style.color = "red";
                document.getElementById("submitAll").disabled = true;
            }
            if(flag==true){
                document.getElementById("password_lable").innerHTML = " "
                document.getElementById("submitAll").disabled = false;
            }
        })
}
async function clickFetch() {

    var email = document.getElementById("email").value;
    var otp_get = document.getElementById("otp");
    var fetch_method = await fetch('/fetch_api', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email
        })
    }).then(res => res.json())
        .then(data => {
            otp = data.otp;
            flag = data.flag;
            if (flag == false) {
                otp_get.innerHTML = "Email is Not valid";
                document.getElementById('otp').style.color = "red";
            } else {
                otp_get.innerHTML = otp;

            }
        })
}
function validOtp() {
    var enterOtp = document.getElementById("enterOtp").value;
    var email = document.getElementById("email").value;
    

    if (otp == enterOtp && flag == true) {
      
        document.getElementById("password_lable").innerHTML = "";
        document.getElementById("submitAll").disabled = false;
    } 
    else {
       
        document.getElementById("password_lable").innerHTML = "Otp is not same"
        document.getElementById("password_lable").style.color = "red";
        document.getElementById("submitAll").disabled = true;
    }

}


