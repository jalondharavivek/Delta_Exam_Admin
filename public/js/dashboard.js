let menuicn = document.querySelector(".menuicn");
let nav = document.querySelector(".navcontainer");

menuicn.addEventListener("click",()=>
{
    nav.classList.toggle("navclose");
})

var link = document.querySelectorAll('#link');
var current_link = window.location.href;

link.forEach(l => {
    if(current_link == l.href)
        l.classList.add("active")
})

