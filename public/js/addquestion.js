



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

function enabledisableinputbox() {
  const comboboxcategory = document.getElementById("category");
  const allrInputbox = document.querySelectorAll(".all-inputbox");
  console.log("rgerderyerye")
  if (comboboxcategory.value) {
    allrInputbox.forEach(input => {
          input.disabled = false;
      });
  } else {
    allrInputbox.forEach(input => {
          input.disabled = true;
      });
  }
}


//validation js
// const form = document.getElementById('quetable');
// const question_Text = document.getElementById('question');
// const optiona = document.getElementById('option_a');
// const optionb = document.getElementById('option_b');
// const optionc = document.getElementById('option_c');
// const optiond = document.getElementById('option_d');

// form.addEventListener('submit',(event) => {
//   event.preventDefault();

//   if (question_Text.value === '') {
//     alert('Please enter a question.');
//     return;
//   }

//   if (optiona.value === '' || optionb.value === '' || optionc.value === '' || optiond.value === '') {
//     alert('Please enter all options.');
//     return;
//   }

//   // if (correctAnswer.value < 1 || correctAnswer.value > 4) {
//   //   alert('Please enter a number between 1 and 4 for the correct answer.');
//   //   return;
//   // }

//   // If all validation passes, submit the form
//   form.submit();
// });


function validatequestion(){
  try{
    console.log("SDswdfsdrgtwer")
    var cateoption = document.getElementById("category").value
  var questiont1 = document.getElementById("question_text").value;
  var questiont = questiont1.trim()
  console.log(questiont,"::::: :que")
  var optiona1 = document.getElementById("option_a").value;
 var  optiona = optiona1.trim()
  console.log(questiont)
  var optionb1 = document.getElementById("option_b").value;
   var optionb = optionb1.trim()
  var optionc1 = document.getElementById("option_c").value;
var optionc = optionc1.trim()
  var optiond1 = document.getElementById("option_d").value;
  var optiond = optiond1.trim()
  
  
  //cat option validation
  if (cateoption == "" || cateoption == null){
    document.getElementById("cat_textid").innerHTML = "*Select Category "
     return false;
   }else{
     document.getElementById("cat_textid").innerHTML = ""
 }




//question validation
  if (questiont == "" || questiont == null){
   document.getElementById("question_textid").innerHTML = "*Enter Question "
    return false;
  }else{
    document.getElementById("question_textid").innerHTML = ""
}
//option a validation
if (optiona == "" || optiona == null){
document.getElementById("option_a_id").innerHTML = "*Enter Option a "
return false;
}else{
document.getElementById("option_a_id").innerHTML = ""
}

//option b validation
if (optionb == "" || optionb == null){
document.getElementById("option_b_id").innerHTML = "*Enter Option b "
return false;
}else{
document.getElementById("option_b_id").innerHTML = ""
}

//option c validation
if (optionc == "" || optionc == null){
document.getElementById("option_c_id").innerHTML = "*Enter Option c "
return false;
}else{
document.getElementById("option_c_id").innerHTML = ""
}
//option d validation
if (optiond == "" || optiond == null){
  document.getElementById("option_d_id").innerHTML = "*Enter Option c "
  return false;
  }else{
  document.getElementById("option_d_id").innerHTML = ""
  }

  //same option validation
  if (optiona == optionb || optiona == optionc || optiona == optiond || optionb == optionc || optionb == optiond || optionc == optiond){
    document.getElementById("sameoption").innerHTML = "*Enter Different Option "
     return false;
   }else{
     document.getElementById("sameoption").innerHTML = ""
 }

}

catch(err){
  err
}
}



//edit question
function editquevalidate(){
  try{
    
  
  var questiont1 = document.getElementById("question_text").value;
  var questiont = questiont1.trim()
  var optiona1 = document.getElementById("option_a").value;
 var optiona = optiona1.trim()
  let optionb1 = document.getElementById("option_b").value;
  var optionb = optionb1.trim()
  let optionc1 = document.getElementById("option_c").value;
  var optionc = optionc1.trim()
  let optiond1 = document.getElementById("option_d").value;
  var optiond = optiond1.trim()
  
  
 



//question validation
  if (questiont == "" || questiont == null){
   document.getElementById("question_textid").innerHTML = "*Enter Question "
    return false;
  }else{
    document.getElementById("question_textid").innerHTML = ""
}
//option a validation
if (optiona == "" || optiona == null){
document.getElementById("option_a_id").innerHTML = "*Enter Option a "
return false;
}else{
document.getElementById("option_a_id").innerHTML = ""
}

//option b validation
if (optionb == "" || optionb == null){
document.getElementById("option_b_id").innerHTML = "*Enter Option b "
return false;
}else{
document.getElementById("option_b_id").innerHTML = ""
}

//option c validation
if (optionc == "" || optionc == null){
document.getElementById("option_c_id").innerHTML = "*Enter Option c "
return false;
}else{
document.getElementById("option_c_id").innerHTML = ""
}
//option d validation
if (optiond == "" || optiond == null){
  document.getElementById("option_d_id").innerHTML = "*Enter Option c "
  return false;
  }else{
  document.getElementById("option_d_id").innerHTML = ""
  }

  //same option validation
  if (optiona == optionb || optiona == optionc || optiona == optiond || optionb == optionc || optionb == optiond || optionc == optiond){
    document.getElementById("sameoption").innerHTML = "*Enter Different Option "
     return false;
   }else{
     document.getElementById("sameoption").innerHTML = ""
 }

}

catch(err){
  err
}
}

