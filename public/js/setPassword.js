function validateForm() {
    var password = document.getElementById("password").value;
    var confirm = document.getElementById('confirm').value;
    console.log(password, confirm);

    if (password != confirm) {
        alert("Passwords do not match")
        return false;
    }
}

function confim_password() {
    var password1 = document.getElementById("password").value;
    var confirm1 = document.getElementById('confirm').value;
    if (password1 != confirm1) {
        document.getElementById("confirm_lable").innerHTML = 'Pelese Enter Same Password In both input filde';
        document.getElementById("confirm_lable").style.color = 'red';
        document.getElementById("submitAll").style.display = 'none';

    } else if (password1 == confirm1) {
        document.getElementById("confirm_lable").innerHTML = '';
        document.getElementById("submitAll").style.display = 'block';
    }
}


function validPass(password) {
    const errors = [];
    if (password.length == 0) {
        document.getElementById("password_lable").innerHTML = ""
    } else {
        if (password.length < 3) {
            errors.push("Your password must be at least 3 characters");
        }
        if (password.search(/[a-z]/) < 0) {
            errors.push("Your password must contain at least one lower case letter.");
        }
        if (password.search(/[0-9]/) < 0) {
            errors.push("Your password must contain at least one digit.");
        }
        if (password.search(/[!@#\$%\^&\*_]/) < 0) {
            errors.push("Your password must contain at least special char from -[ ! @ # $ % ^ & * _ ]");
        }
        if (password.length > 10) {
            errors.push("Your password must be at max 10 characters");
        }
    }

    if (errors.length > 0) {

        document.getElementById("password_lable").innerHTML = errors.join("\n");
        document.getElementById("password_lable").style.color = "red";
        document.getElementById("submitAll").style.display = "none";
    } else {
        document.getElementById("password_lable").innerHTML = ""
        document.getElementById("submitAll").style.display = "block";
    }
}