sts = document.querySelectorAll('#status');
console.log(sts);
sts.forEach(e => {
    console.log(e);
    console.log(e.innerHTML);

    if (e.innerHTML == '0') {
        console.log("if")
        e.innerHTML = 'DISABLE';
        e.style.color = 'white';
        e.style.backgroundColor = 'red';
    }
    else if (e.innerHTML == '1') {
        console.log("else if")
        e.innerHTML = 'ENABLE';
        e.style.color = 'white';
        e.style.backgroundColor = 'blue';

    }
})
