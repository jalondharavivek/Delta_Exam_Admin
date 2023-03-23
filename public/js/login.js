

    var status;
    async function validatePassword(e) {
        var frm = document.getElementById('frm');
        var useremail = document.getElementById("email").value;
        var userPassword = document.getElementById("password").value;
        console.log(userPassword)
        console.log("userEmail", useremail)
        let emailValid = await fetch('/validPassword', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                useremail,
                userPassword
            })
        })

        let nameData1 = await emailValid.json();
        status = nameData1.status;
        console.log(status)
        let a = 0;

        if (nameData1.status == 404) {

            document.getElementById("email_valid").innerHTML = "This email id not register."
            document.getElementById("email_valid").style.color = "red";
            document.getElementById("submitAll").style.pointerEvents = "none";
            console.log('wrong email')
            a = 0;

        }
        if (nameData1.status == 400) {

            document.getElementById("password_lable").innerHTML = "Password is incorrect.";
            document.getElementById("password_lable").style.color = "red";
            document.getElementById("submitAll").style.pointerEvents = "none";
            console.log('wrong email psw')
            a = 0;

        }
        if (nameData1.status == 200) {

            document.getElementById("email_valid").innerHTML = ""
            document.getElementById("password_lable").innerHTML = "";
            document.getElementById("submitAll").style.pointerEvents = "";
            console.log('okkk')
            a = 1;

        }

        if (a == 1) {
            frm.submit();
        }

    }
