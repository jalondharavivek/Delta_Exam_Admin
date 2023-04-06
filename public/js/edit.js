let student_id = document.getElementById('student_id').value;


let col = document.getElementById("col");


collagerender();
let collage_id;
let city_id;
function collagerender() {

    fetch(`/college?id=${student_id}`).then(res => res.json()).then(data => {

        collage_id = data[0].college_id;

    }).catch(err => console.log(err));

}
allcollage();
function allcollage() {
    let str = "";


    fetch(`/allcollege`).then(res => res.json()).then(data => {

        for (i = 0; i < data.length; i++) {
            if (data[i].college_id == collage_id) {
                str += `<option value="${data[i].college_id}" selected>${data[i].college_name}</option>`;

            } else {
                str += `<option value="${data[i].college_id}">${data[i].college_name}</option>`;

            }

        }

        col.innerHTML = str;
    }).catch(err => console.log(err));
}

let state = document.getElementById('state');


selectedcity();
function selectedcity() {

    fetch(`/city?id=${student_id}`).then(res => res.json()).then(data => {


        city_id = data[0].city;


    }).catch(err => console.log(err));
}

kartikcity();
state.addEventListener("change", kartikcity);
function kartikcity() {


    let str;
    let city = document.getElementById('city');


    let state_id = state.value;
    +
        fetch(`/student/city?state_id=${state_id}`).then(res => res.json()).then(data => {
            for (i = 0; i < data.length; i++) {

                if (data[i].city_id == city_id) {
                    str += `<option value="${data[i].city_name}" selected>${data[i].city_name}</option>`;

                } else {
                    str += `<option value="${data[i].city_name}">${data[i].city_name}</option>`;

                }


            }
            city.innerHTML = str;
        }).catch(err => console.log(err));
}

function validateForm() {
    var name = document.getElementById("name").value;

    var contact = document.getElementById("contact").value;
    var address = document.getElementById("address").value;


    var nameRegex = /^[a-zA-Z\s]+$/;
    var contactRegex = /^[0-9]+$/;
    var addressRegex = /^[a-zA-Z0-9\s,'-]*$/;


    if (!nameRegex.test(name)) {
        document.getElementById("pname").innerHTML = "** Name must contain only letters **";
        return false;
    }
    else if(nameRegex.test(name)) {
        document.getElementById("pname").innerHTML = "";
      
    }
  

     if (!contactRegex.test(contact)) {
        document.getElementById("pcontact").innerHTML = "** Contact must contain only numbers **";
        return false;
    }
    else if(contact.length>10 || contact.length < 10){
        document.getElementById("pcontact").innerHTML = "** not valid **";
        return false;
    }
    else if (contactRegex.test(contact))  {
        document.getElementById("pcontact").innerHTML = "";
      
    }

    if (!addressRegex.test(address)) {
        document.getElementById("paddress").innerHTML = " ** address not valid **";
        return false;
    }
    else if (addressRegex.test(address)) {
        document.getElementById("paddress").innerHTML = "";
       
    }

}

 