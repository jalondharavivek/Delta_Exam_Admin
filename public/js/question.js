// async function editquestion(id)
// {  try 
//     {
//         const  question = await fetch(`http://localhost:8765/editquestion?id=${id}`);
//     }
//     catch (err) 
//     {
//         console.log("error");
//     }    
// }
//edit question
// async function editque(editquesid){
//   let queresult = await fetch(`http://localhost:8765/editquestion?question_id=${editquesid}`);
// }

///delet question 
async function deletques(delet){
  let queresult = await fetch(`http://localhost:8765//deletequestion?question_id=${delet}`);
  console.log(delet,":::question id for delet")
  location.reload()
}



async function searchque(name) {
console.log(name,"question module in search search:::::;")
    let queresult = await fetch(`http://localhost:8765/search?name=${name}`);
    let data = await queresult.json();
    console.log(data,"search question for data");
    let tabque = document.getElementById("quetable")
    let quetabsearch = `  <thead> <tr>
                             <th>Id</th>
                             <th>Category</th>
                            <th>Question</th>
                            <th>Answer</th>
                            <th>view</th>
                             <th>Action</th>
                        </tr> </thead>`;
                        console.log(data.search[0].question_text,":::question name  ")
                        console.log(Object.keys(data.search).length == 0 , "::::::::total")
    if(Object.keys(data.search).length == 0)
      {
        quetabsearch +=`<tr><td colspan=5>No record found</td></tr>`;
        }
 else
    {
      {
        for(let i=0; i<data.search.length; i++){
        quetabsearch += `<tr>
        <td class="width-td">
            ${data.search[i].question_id}
        </td>
        <td  class="width-td"> 0 </td>
        <td class="question-width" >
            ${data.search[i].question_text}
        </td>
      
        <td class="answercolor">
            ${data.search[i].answer}
        </td>
        <td>
        <a href="" class="button-view"> view </a>
        </td>
        <td class="button-width">
            <a href="editquestion?question_id=${data.search[i].question_id} " class="edit-btn">Edit</a>
           
        </td>
    </tr>`
        }
  
  
      }
  }
  tabque.innerHTML = quetabsearch;
//    cat_status();
                    }

//<td>${ (new Date(d.created_date).toLocaleDateString()) }</td><td><a class="btnn" id="status" onclick="check(${ d.category_id },${ d.category_status });">${ d.category_status }</a></td><td><a class="edit-btn fas fa-edit" onclick="editCategory(${ d.category_id })"> EDIT</a></td>
{/* <td class="width-td">
${data.search[0].option_a}
</td>
<td  class="width-td">
${data.search[0].option_b}
</td>
<td class="width-td">
${data.search[0].option_c}
</td>
<td class="width-td">
${data.search[0].option_d}
</td> */}