
let student_id = document.getElementById('student_id').value;

let col = document.getElementById("col");

collagerender();
let collage_id;
let city_id;
function collagerender() {
    fetch(`/collage?id=${student_id}`).then(res => res.json()).then(data => {

        collage_id = data[0].college_id;

    }).catch(err => console.log(err));

}
allcollage();
function allcollage() {
    let str = "";
    fetch(`/allcollage`).then(res => res.json()).then(data => {

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
    console.log(state_id)
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