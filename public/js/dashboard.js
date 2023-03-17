let menuicn = document.getElementById("menuicn");
let nav = document.getElementById("navcontainer");

menuicn.addEventListener("click",()=>
{
    nav.classList.toggle("navclose");
})


var myLink = document.getElementById("myLink");
var myMenu = document.getElementById("myMenu");

myLink.onclick = function () {
    if (myMenu.style.display === "none") {
        myMenu.style.display = "block";
    } else {
        myMenu.style.display = "none";
    }
};