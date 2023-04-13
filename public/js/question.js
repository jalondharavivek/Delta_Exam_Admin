// const { question } = require("../../src/controller/question_controller");



//delet question 
async function deletquestion(delet) {
  try {
    
    var confrimdlt =  confirm('are you sure ?')
    if(confrimdlt){
      const deletquesti = await fetch(`/deletquestion?question_id=${delet}`, { method: "POST" });
      location.reload()
    }
    
  } catch (err) {
    err
  }
}


//href="viewdetail?question_id=<%= data[i].question_id %>"
async function  queviewajax(idv){
  try{
let viewque =  await fetch(`/viewdetail?question_id=${idv}`)
let data = await viewque.json();

let quev = document.getElementById("mainadd");
quev.innerHTML = "";
let viewsques = '';
viewsques += `<div class="form-containerview">
                    <label class="questionno" for="questiondetail">Question No : ${data.data[0].question_id}</label>
                    <div>
                      <label for="question"><strong>Question:</strong>${data.data[0].question_text}</label>
                    </div>
                    <p><strong>Category : </strong>${data.data[0].category_name}</p>`;
if (data.data[0].question_image) 
{
  viewsques+= `<p><strong>image :</strong></p>
  <img src= "/public/assets/uploads/${data.data[0].question_image}" width="100%" />`;
} 
viewsques += `<p> <strong>Option A :</strong>${data.data[0].option_a} </p>
  <p><strong>Option B :</strong>${data.data[0].option_b}</p>
  <p><strong>Option C :</strong>${data.data[0].option_c }</p>
  <p><strong>Option D :</strong>${data.data[0].option_d }</p>
  <p style="color: darkgreen;"> <strong>Answer :</strong>${data.data[0].answer }</p>`;
  if (data.data[0].description) 
  { 
    viewsques += `<p class="quesans"><strong>Description :</strong>${data.data[0].description}</p>`;
  } 
  viewsques += `<div>
    <a onclick="editquestionajax(${data.data[0].question_id})" class="edit-btn">Edit</a>
    <a href="/question" class="edit-btn"> Cancle </a>
    </div>
    </div>`;
quev.innerHTML= viewsques;
  }
  catch(err){
    err;
  }

}

//retrive question

async function retriveque() {
  try {

    let retrivequeresult = await fetch(`/retriveque`)
    let data = await retrivequeresult.json();
    let tabqueret = document.getElementById("mainadd")
    let quetabretrive = `<div><table><thead> <tr>
                         <th>Id</th>
                         <th>Category</th>
                         <th>Question</th>
                         <th>Answer</th>
                         <th>Action</th>
                         </tr> 
                    </thead>`;

    if (Object.keys(data.data).length == 0) {
      quetabretrive += `<tbody><tr><td colspan=5>No record found</td></tr>`
      quetabretrive +=   `<br><a class="button" href="/question" >Back</a>`
    }
    else {

      for (let i = 0; i < data.data.length; i++) {
        quetabretrive += `<tr>
    <td class="width-td">
        ${data.data[i].question_id}
    </td>
    <td class="width-tdc">
    ${data.data[i].category_name}</td>
    <td class="question-width" >
        ${data.data[i].question_text}
    </td>
  
    <td class="answercolor">
        ${data.data[i].answer}
    </td>
 
    <td class="button-width">
    <a onclick="queviewajax(${data.data[i].question_id})" ><i class="fa fa-eye" aria-hidden="true"></i></a>
    <a onclick="editquestionajax(${data.data[i].question_id})" ><i class="fas fa-edit"></i></a>
    <a href=""   onclick="retquestion(${data.data[i].question_id})"><i class="fas fa-trash-restore"></i></a>
    </td>
</tr>`
      }
      quetabretrive +=   `</tbody></table></div>`
      quetabretrive += `<br><br>`
      quetabretrive +=   `<a class="button" href="/question" >Back</a>`

    }
    tabqueret.innerHTML = quetabretrive;

  } catch (err) {
    err
  }
}

async function retquestion(idretque) {
  try {
    let reque = await fetch(`/retrivequestion?requeid=${idretque}`, { method: "POST" })

    location.reload()
  } catch (err) {
    err
  }
}


async function searchque(quesearch) {
  try {
    let queresult = await fetch(`/searchque?nameque=${quesearch}`);
    let datas = await queresult.json();
    let id=1
    let tabque = document.getElementById("quetable")
    let quetabsearch = `  <thead> <tr>
                             <th>Id</th>
                             <th>Category</th>
                            <th>Question</th>
                            <th>Answer</th>
                           <th>Action</th>
                             </tr> 
                        </thead>`;

    if (Object.keys(datas.search).length == 0) {
      quetabsearch += `<tr><td style="text-align: center;" colspan=5>No Record Found</td></tr>`

    }
    else {
      {
        for (let i = 0; i < datas.search.length; i++) {
          quetabsearch += `<tr>
        <td class="width-td">
            ${id++}
        </td>
        <td  class="width-tdc">
        ${datas.search[i].category_name} </td>
        <td class="question-width" >
            ${datas.search[i].question_text}
        </td>
      
        <td class="answercolor">
            ${datas.search[i].answer}
        </td>
        
        <td class="button-width">
        <a  onclick="queviewajax(${datas.search[i].question_id})"><i class="fa fa-eye" aria-hidden="true"></i></a>
        <a onclick="editquestionajax(${datas.search[i].question_id})" ><i class="fas fa-edit"></i></a>
        <a href="" onclick="deletquestion(${datas.search[i].question_id})"><i class="fa fa-trash" aria-hidden="true"></i></a>
        </td>
    </tr>`
        }


      }
    }
    tabque.innerHTML = quetabsearch;
    let page = document.getElementById('page');
    page.innerHTML='';

  } catch (err) {
    console.log(err)
  }

}


async function page(pages, name = '') {
  try {

    let table = document.getElementById('quetable');
    let pagination = document.getElementById('pagination');
    let id = 1;
    let html = ` <thead> <tr>
        <th>Id</th>
        <th>Category</th>
       <th>Question</th>
       <th>Answer</th>
     
        <th>Action</th>
        </tr> 
   </thead>`;
    let page = pages.id;
    const results = await fetch(`/question/questionpage`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ page, name })
    });
    var data = await results.json();
    data.pages.forEach(q => {
      html += `<tr>
      <td class="width-td">
          ${id++}
      </td>
      <td  class="width-tdc">
      ${q.category_name} </td>
      <td class="question-width" >
          ${q.question_text}
      </td>
    
      <td class="answercolor">
          ${q.answer}
      </td>
     
      <td class="button-width">
      <a  onclick="queviewajax(${q.question_id})" ><i class="fa fa-eye" aria-hidden="true"></i></a>
      <a onclick="editquestionajax(${q.question_id})" ><i class="fas fa-edit"></i></a>
      <a id="deletquesid" onclick="deletquestion(${q.question_id})"><i class="fa fa-trash" aria-hidden="true"></i></a>
     
  </tr>`;
    })
    let pagi = '';
    if (name == '') {
     
      pagi += `<li class="page-item"><a class="page-link" id="0" onclick='page(this)'>First</a></li>`;
      if (parseInt(data.page) <= 5) {
        for (let i = 1; i <= parseInt(data.page); i++) {
          pagi += `<li class="page-item"><a class="page-link `;
          if (parseInt(data.page) == i) { pagi += `pageactive"` } else { pagi += `disabled"` }
          pagi += ` id='${i}' onclick='page(this)'>${i}</a></li>`
        }
      }
      else {
        for (let i = (parseInt(data.page) - 5); i <= parseInt(data.page); i++) {
          pagi += `<li class="page-item"><a class="page-link `;
          if (parseInt(data.page) == i) { pagi += `pageactive"` } else { pagi += `disabled"` }
          pagi += ` id='${i}' onclick='page(this)'> ${i}</a></li>`
        }
      }
      if (Math.ceil(parseInt(data.total) / parseInt(data.limit)) - 5 >= parseInt(data.page)) {
        for (let i = parseInt(data.page) + 1; i <= parseInt(data.page) + 5; i++) {
          pagi += `<li class="page-item"><a class="page-link `
          if (parseInt(data.page) == i) { pagi += `pageactive"` } else { pagi += `disabled"` }
          pagi += ` id='${i}' onclick='page(this)'>${i}</a></li>`
        }
      }
      else {
        for (let i = parseInt(data.page) + 1; i <= Math.ceil(parseInt(data.total) / parseInt(data.limit)); i++) {
          pagi += `<li class="page-item"><a class="page-link `;
          if (parseInt(data.page) == i) { pagi += `pageactive"` } else { pagi += `disabled"` }
          pagi += ` id='${i}' onclick='page(this)'>${i}</a></li>`
        }
      }
      pagi += `<li class="page-item"><a class="page-link" onclick='page(this)' id="${Math.ceil(data.total/ data.limit)}">Last</a></li>`
      pagination.innerHTML = pagi;

    }
    table.innerHTML = html;

   
  }
  catch (err) {
    console.log(err);
  }
}



// ajax edit question



// href="/question/editquestion?question_id=<%= data[i].question_id %>"


async function editquestionajax(editquestionid){
  try{
let editques =  await fetch(`/question/editquestion?question_id=${editquestionid}`)
let dataqedit =  await editques.json();

let editque = document.getElementById("mainadd");
editque.innerHTML = "";
let editquev = '';

editquev += ` <div class="form-container">
              <h2>Edit Question</h2>
              <form class="add-question-form"  onsubmit="return editquevalidate()" oninput="return editquevalidate()"  method="post" enctype="multipart/form-data" action="/editquestion">
              <div class="form-container">
              <input type="hidden" name="question_id"  value="${dataqedit.data[0].question_id}">
             <label for="quiz">cateories:</label>
             <select id="category" class ="designcss" name="category">
              <option value="${dataqedit.data2[0].category_name}" selected disabled >${dataqedit.data2[0].category_name}</option>`
              for(i=0 ; i< dataqedit.data1.length ; i++){
                editquev += ` <option value="${dataqedit.data1[i].category_id}">
                             ${dataqedit.data1[i].category_name}
                              </option>`
                                        }
                  editquev += ` </select>
                                <label for="question">Question:</label>
                                <textarea class ="designcss" id="question_text" name="question_text"  rows="3" >${dataqedit.data[0].question_text}</textarea>
                                <span class="validationcolo" id="question_textid"></span>
                                <label for="Image">Image</label>
                                <input  type="file" id="image" name="image" > `
                                if (dataqedit.data[0].question_image ) {
                                  editquev += ` <img src="/public/assets/uploads/${dataqedit.data[0].question_image}" width="40%" />`
                                       } 
                                 editquev +=   `<label for="option_a">Option A:</label>
                                                <input class ="designcss" type="text" id="option_a_ajax" value="${dataqedit.data[0].option_a}" name="option_a" onchange="event_listen()" >
                                                <span class="validationcolor" id="option_a_id"></span>
                                                
                                                <label for="option_b">Option B:</label>
                                                <input class ="designcss" type="text" id="option_b_ajax" onchange="event_listen()" value="${dataqedit.data[0].option_b}" name="option_b" >
                                                <span class="validationcolor" id="option_b_id"></span>
                                
                                                <label for="option_c">Option C:</label>
                                                <input class ="designcss" type="text" id="option_c_ajax" onchange="event_listen()" value="${dataqedit.data[0].option_c}" name="option_c" >
                                                <span class="validationcolor" id="option_c_id"></span>
                                
                                                <label for="option_d">Option D:</label>
                                                <input class ="designcss" type="text" id="option_d_ajax" onchange="event_listen()" value="${dataqedit.data[0].option_d}" name="option_d" >
                                                <span class="validationcolor" id="option_d_id"></span>
                                                
                                                <span class="validationcolor" id="sameoption"></span>
                                
                                                <label for="correct_option" class="all-inputbox" >Correct Option:</label>
                                                <select class ="designcss" id="correct_option" name="answer" required>`
                                
                                
                                                editquev +=    `<option value="${dataqedit.data[0].option_a}"` 
                                                if(dataqedit.data[0].answer == dataqedit.data[0].option_a){
                               editquev +=   `selected`
                                                }
                                                editquev += `> ${dataqedit.data[0].option_a}</option>`
                                                
                                                editquev +=    `<option value="${dataqedit.data[0].option_b}"` 
                                                if(dataqedit.data[0].answer == dataqedit.data[0].option_b){
                                                  editquev +=   `selected`
                                                }
                                                editquev += `> ${dataqedit.data[0].option_b}</option>`
                                                
                                                editquev +=    `<option value="${dataqedit.data[0].option_c}"` 
                                                if(dataqedit.data[0].answer == dataqedit.data[0].option_c){
                                                  editquev +=   `selected`
                                                }
                                                editquev += `> ${dataqedit.data[0].option_c}</option>`
                                                
                                                editquev +=    `<option value="${dataqedit.data[0].option_d}"` 
                                                if(dataqedit.data[0].answer == dataqedit.data[0].option_d){
             editquev +=   `selected`
                                                }
                                                editquev += `> ${dataqedit.data[0].option_d}</option></select>
                                                                <label for="Description">Description</label>
                                                                <input class ="designcss" type="text" id="Description" value="${dataqedit.data[0].description}" name="description" >
                                                               </div>
                                                    <input class="sub-add"  type='submit' value='Update' name='submit'>
                                                    <a href="/question" class="button"> Back </a>
                                                    </form>
                                                    </div>`
  
    editque.innerHTML = editquev;



    
   
  
   
}
catch(err){
  err
}



}

function event_listen(){
  let option_A = document.getElementById("option_a_ajax").value;
  let option_B = document.getElementById("option_b_ajax").value;
  let option_C = document.getElementById("option_c_ajax").value;
  let option_D = document.getElementById("option_d_ajax").value;
  const value1 = option_A;
  const value2 = option_B;
  const value3 = option_C;
  const value4 = option_D;
  const values = [value1, value2, value3, value4];
  var selectbox = document.getElementById("correct_option");
  selectbox.innerHTML = "";
  values.forEach((value) => {
      const option = document.createElement("option");
      option.text = value;
      selectbox.add(option);
  });

}

// add question ajax code
// href="/addquestion" 
async function addquestionajax(){
  try{
let addques =  await fetch(`/question/addquestion`)
let dataadd =  await addques.json();



let addqueq = document.getElementById("mainadd");

addqueq.innerHTML = "";
let addquestiona = "";


addquestiona += `<div class="form-container">
             <h2>Add Question</h2>
             <form id="quetable" class="add-question-form" onsubmit="return validatequestion()" oninput="return validatequestion()" method="post" enctype="multipart/form-data" action="/addquestion">
             <div class="form-container"> 
             <input type="hidden">
             <label class="" for="category">cateories:</label>
             <select class="designcss" id="category" name="category" onchange="enabledisableinputbox()">
                <option class="" value="">select Categories </option>`
      for(i=0 ; i<dataadd.data.length ; i++){
        addquestiona += `<option class="" value="${dataadd.data[i].category_id}">
                        ${dataadd.data[i].category_name}
                    </option>`
                    }
   addquestiona +=`</select>
            <span class="validationcolor " id="cat_textid"></span>
            <label for="question">Question:</label>
            <textarea class="all-inputbox designcss" id="question_text" name="question_text" rows="3" disabled  ></textarea>
            <span class="validationcolo " id="question_textid"></span>
            <label for="Image">Image</label>
            <input class="all-inputbox" type="file" id="image" name="image" disabled >

            <label for="option_a">Option A:</label>
            <input class="all-inputbox designcss" type="text" id="option_a_add" oninput="answer_input()" name="option_a" disabled >

            <span class="validationcolor " id="option_a_id"></span>

            <label for="option_b">Option B:</label>
            <input type="text" class="all-inputbox designcss"  id="option_b_add" oninput="answer_input()" name="option_b" disabled >
            <span class="validationcolor " id="option_b_id"></span>

            <label for="option_c">Option C:</label>
            <input type="text" class="all-inputbox designcss" id="option_c_add" oninput="answer_input()" name="option_c" disabled >
            <span class="validationcolor " id="option_c_id"></span>

            <label for="option_d">Option D:</label>
            <input type="text" class="all-inputbox designcss" id="option_d_add" oninput="answer_input()" name="option_d" disabled >
            <span class="validationcolor " id="option_d_id"></span>

            <span class="validationcolor " id="sameoption"></span>

            <label for="correct_option ">Correct Option:</label>
            <select id="correct_option_add" oninput="answer_input()" class="all-inputbox designcss" name="answer" disabled >
                <option value="">Select Correct Option</option>
             </select>
             <label for="description">Description</label>
             <input class="all-inputbox designcss" type="text" id="description" name="description" disabled >
           
            </div>



            <input class="sub-add"  type='submit' value ='submit' name='submit'  >        
            <a href="/question" class="button"> Back </a> 
             
       
</form>
</div>`
 addqueq.innerHTML = addquestiona;

  }
  catch(err){
    err
  }
}






function enabledisableinputbox() {
  const comboboxcategory = document.getElementById("category");
  const allrInputbox = document.querySelectorAll(".all-inputbox");
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




function validatequestion(){
  try{
    var cateoption = document.getElementById("category").value
  var questiont1 = document.getElementById("question_text").value;
  var questiont = questiont1.trim()
  var optiona1 = document.getElementById("option_a_add").value;
 var  optiona = optiona1.trim()
  var optionb1 = document.getElementById("option_b_add").value;
   var optionb = optionb1.trim()
  var optionc1 = document.getElementById("option_c_add").value;
var optionc = optionc1.trim()
  var optiond1 = document.getElementById("option_d_add").value;
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
document.getElementById("option_a_id").innerHTML = "*Enter Option A "
return false;
}else{
document.getElementById("option_a_id").innerHTML = ""
}

//option b validation
if (optionb == "" || optionb == null){
document.getElementById("option_b_id").innerHTML = "*Enter Option B "
return false;
}else{
document.getElementById("option_b_id").innerHTML = ""
}

//option c validation
if (optionc == "" || optionc == null){
document.getElementById("option_c_id").innerHTML = "*Enter Option C "
return false;
}else{
document.getElementById("option_c_id").innerHTML = ""
}
//option d validation
if (optiond == "" || optiond == null){
  document.getElementById("option_d_id").innerHTML = "*Enter Option D"
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
// answer option box function
function answer_input(){
  let option_A_add = document.getElementById("option_a_add").value;
  let option_B_add = document.getElementById("option_b_add").value;
  let option_C_add = document.getElementById("option_c_add").value;
  let option_D_add = document.getElementById("option_d_add").value;
  const value1_add = option_A_add;
  const value2_add = option_B_add;
  const value3_add = option_C_add;
  const value4_add = option_D_add;
 
  const values = [value1_add, value2_add, value3_add, value4_add];
  var selectbox = document.getElementById("correct_option_add");
 
  selectbox.innerHTML = "";
  values.forEach((value) => {
      const option = document.createElement("option");
      option.text = value;
      selectbox.add(option);
  });
}

function editquevalidate(){
  try{
    
  
  var questiont1 = document.getElementById("question_text").value;
  var questiont = questiont1.trim()
 
  var optiona1 = document.getElementById("option_a_ajax").value;
 var optiona = optiona1.trim()
  let optionb1 = document.getElementById("option_b_ajax").value;
  var optionb = optionb1.trim()

  let optionc1 = document.getElementById("option_c_ajax").value;
  var optionc = optionc1.trim()
  let optiond1 = document.getElementById("option_d_ajax").value;
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
document.getElementById("option_a_id").innerHTML = "*Enter Option A "
return false;
}else{
document.getElementById("option_a_id").innerHTML = ""
}

//option b validation
if (optionb == "" || optionb == null){
document.getElementById("option_b_id").innerHTML = "*Enter Option B "
return false;
}else{
document.getElementById("option_b_id").innerHTML = ""
}

//option c validation
if (optionc == "" || optionc == null){
document.getElementById("option_c_id").innerHTML = "*Enter Option C "
return false;
}else{
document.getElementById("option_c_id").innerHTML = ""
}
//option d validation
if (optiond == "" || optiond == null){
  document.getElementById("option_d_id").innerHTML = "*Enter Option D "
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


