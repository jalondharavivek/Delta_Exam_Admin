var otp;
async function clickFetch() {
    var email = document.getElementById("email").value;
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


        })
}

function validOtp() {
    console.log("valid open")

    var enterOtp = document.getElementById("enterOtp").value;

    if (otp == enterOtp) {
        console.log("same in if")
        document.getElementById("password_lable").innerHTML = "";
        document.getElementById("submitAll").disabled = false;
    } else {
        console.log("not same in else")
        document.getElementById("password_lable").innerHTML = "Otp is not same"
        document.getElementById("password_lable").style.color = "red";
        document.getElementById("submitAll").disabled = true;
    }

}


async function valid_email(email1) {
    let emailValid = await fetch('http://localhost:8050/changePassword', {
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
        document.getElementById("email_valid").innerHTML = "This email id not register ! Pelese enter valid email id for forget password";
        document.getElementById("email_valid").style.color = "red";
        document.getElementById("sendBtn").disabled = true;
    } else {
        document.getElementById("email_valid").innerHTML = ""
        document.getElementById("sendBtn").disabled = false;
    }
}