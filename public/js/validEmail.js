var otp;
var flag;
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
            flag=data.flag;
            if(flag == false ){
                otp_get.innerHTML = "Email is Not valid"; 
                document.getElementById('otp').style.color="red";
            }else{
                otp_get.innerHTML = otp; 

            }
        })
}
function validOtp() {
    
    var enterOtp = document.getElementById("enterOtp").value;
   
     if (otp == enterOtp && flag == true) {
        document.getElementById("password_lable").innerHTML = "";
        document.getElementById("submitAll").disabled = false;
    } else if(flag == true ) {
        
            document.getElementById("password_lable").innerHTML = "Otp is not same"
            document.getElementById("password_lable").style.color = "red";
            document.getElementById("submitAll").disabled = true;  
    }else{
        document.getElementById("submitAll").disabled = true;  
    }

}


async function valid_email(email1) {
    let emailValid = await fetch('/changePassword', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email1
        })
    })

    let nameData1 = await emailValid.json();

    if (nameData1.status == 404) {
        document.getElementById("email_valid").innerHTML = "This email id not register ! Pelese enter valid email id for forget or change password";
        document.getElementById("email_valid").style.color = "red";
        document.getElementById("sendBtn").disabled = true;
    } else {
        document.getElementById("email_valid").innerHTML = ""
        document.getElementById("sendBtn").disabled = false;
    }
}