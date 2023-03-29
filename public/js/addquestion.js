



const option_a = document.getElementById("option_a");
const option_b = document.getElementById("option_b");
const option_c = document.getElementById("option_c");
const option_d = document.getElementById("option_d");
const selectbox = document.getElementById("correct_option");


option_a.addEventListener("input", updateSelectBox);
option_b.addEventListener("input", updateSelectBox);
option_c.addEventListener("input", updateSelectBox);
option_d.addEventListener("input", updateSelectBox);


function updateSelectBox() {
 try{
  const value1 = option_a.value;
  const value2 = option_b.value;
  const value3 = option_c.value;
  const value4 = option_d.value;

  const values = [value1, value2, value3, value4];

  selectbox.innerHTML = "";

 
  values.forEach((value) => {
    const option = document.createElement("option");
    option.text = value;
    selectbox.add(option);
  });
 }catch(err){
  err
 }
}





