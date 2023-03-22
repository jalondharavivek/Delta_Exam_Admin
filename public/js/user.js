togglecolorchnage();
function togglecolorchnage(){
let btn = document.querySelectorAll('.btn');
btn.forEach(e => {

console.log(e);
if (e.innerHTML == '0') {

e.innerHTML = 'DISABLE';
e.style.color = 'red';
e.style.cursor = 'pointer';
}
else if (e.innerHTML == '1') {

e.innerHTML = 'ENABLE';
e.style.color = 'blue';
e.style.cursor = 'pointer';
}
})
}


function toggle(status, id) {
    console.log(id)
    console.log("dnjhbfdbfgh")
    var togglediv = document.getElementById('toggle' + id);
    var toggle_id = document.getElementById(id);

    console.log(togglediv)

    console.log(toggle_id)

    fetch(`/student_status?status=${status}&id=${id}`).then(res => res.json()).then(data => {
        if (data.info = 'rows matched: 1 changed: 1 Warnings: 0') {
            if (status == '1') {
                togglediv.innerHTML = `<p class="btn" id="${id}" onclick="toggle('0','${id}')" style="color: red;cursor:pointer">DISABLE</p>`;
            } else if (status = '0') {
                togglediv.innerHTML = `<p class="btn" id="${id}" onclick="toggle('1','${id}')" style="color: blue;cursor:pointer">ENABLE</p>`;
            }
        }
    }).catch(err => console.log(err));
}

