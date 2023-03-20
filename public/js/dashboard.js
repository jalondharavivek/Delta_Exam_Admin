let menuicn = document.getElementById("menuicn");
let nav = document.getElementById("navcontainer");

menuicn.addEventListener("click",()=>
{
    nav.classList.toggle("navclose");
})


let card = document.querySelector(".card"); //declearing profile card element
let displayPicture = document.querySelector(".display-picture"); //declearing profile picture

myLink.onclick = function () {
    if (myMenu.style.display === "none") {
        myMenu.style.display = "block";
    } else {
        myMenu.style.display = "none";
    }
};


var modelWrap = null;
const showModal = ()=>{

    if(modelWrap !== null)
    {
        modelWrap.remove();
    }
    modelWrap = document.createElement('div');
    modelWrap.innerHTML = `
    <div class="modal fade" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <p>Modal body text goes here.</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary">Save changes</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>`;

document.body.append(modelWrap);
var modal = new bootstrap.Modal(modelWrap.querySelector('.modal'));
modal.show();
}
