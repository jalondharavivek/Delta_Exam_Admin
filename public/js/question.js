// async function editquestion(id)
// {  try 
//     {
//         const  question = await fetch(`/editquestion?id=${id}`);
//     }
//     catch (err) 
//     {
//         console.log("error");
//     }    
// }
//edit question
// async function editque(editquesid){
//   let queresult = await fetch(`/editquestion?question_id=${editquesid}`);
// }


//view detail
// async function viewdetail(viewid){
//   console.log(viewid,":::::::::::jhgjkggjk  view id")
//   const viewfetch = await fetch(`/viewdetail?viewid=${viewid}`)
// }



//delet question 
async function deletquestion(delet) {
  try {
    const deletquesti = await fetch(`/deletquestion?question_id=${delet}`, { method: "POST" });
    confirm('are you sure for delet this question?')
    location.reload()
  } catch (err) {
    err
  }
}

//retrive question

async function retriveque() {
  try {

    let retrivequeresult = await fetch(`/retriveque`)
    let data = await retrivequeresult.json();

    let tabqueret = document.getElementById("quetable")
    let quetabretrive = `  <thead> <tr>
                         <th>Id</th>
                         <th>Category</th>
                        <th>Question</th>
                        <th>Answer</th>
                         <th>view</th>
                         <th>Action</th>
                         </tr> 
                    </thead>`;

    if (Object.keys(data.data).length == 0) {
      quetabretrive += `<tr><td colspan=5>No record found</td></tr>`

    }
    else {

      for (let i = 0; i < data.data.length; i++) {
        quetabretrive += `<tr>
    <td class="width-td">
        ${data.data[i].question_id}
    </td>
    <td  class="width-td">  0</td>
    <td class="question-width" >
        ${data.data[i].question_text}
    </td>
  
    <td class="answercolor">
        ${data.data[i].answer}
    </td>
    <td>
    
    <a href="viewdetail?question_id=${data.data[i].question_id}" ><i class="fa fa-eye" aria-hidden="true"></i></a>
    
    </td>
    <td class="button-width">

    <a href="editquestion?question_id=${data.data[i].question_id}" ><i class="fas fa-edit"></i></a>
    <a href=""   onclick="retquestion(${data.data[i].question_id})"><i class="fas fa-trash-restore"></i></a>
    </td>
</tr>`
      }



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
    // console.log(name,"question module in search search:::::;")
    let queresult = await fetch(`/searchque?nameque=${quesearch}`);
    let datas = await queresult.json();

    let tabque = document.getElementById("quetable")
    let quetabsearch = `  <thead> <tr>
                             <th>Id</th>
                             <th>Category</th>
                            <th>Question</th>
                            <th>Answer</th>
                             <th>view</th>
                             <th>Action</th>
                             </tr> 
                        </thead>`;

    if (Object.keys(datas.search).length == 0) {
      quetabsearch += `<tr><td colspan=5>No record found</td></tr>`

    }
    else {
      {
        for (let i = 0; i < datas.search.length; i++) {
          quetabsearch += `<tr>
        <td class="width-td">
            ${datas.search[i].question_id}
        </td>
        <td  class="width-td">  0</td>
        <td class="question-width" >
            ${datas.search[i].question_text}
        </td>
      
        <td class="answercolor">
            ${datas.search[i].answer}
        </td>
        <td>
        
        <a href="viewdetail?question_id=${datas.search[i].question_id}" ><i class="fa fa-eye" aria-hidden="true"></i></a>
        
        </td>
        <td class="button-width">

        <a href="editquestion?question_id=${datas.search[i].question_id}" ><i class="fas fa-edit"></i></a>
        <a href=""   onclick="deletque(${datas.search[i].question_id})"><i class="fa fa-trash" aria-hidden="true"></i></a>
        </td>
    </tr>`
        }


      }
    }
    tabque.innerHTML = quetabsearch;


  } catch (err) {
    console.log(err)
  }

}


//<td>${ (new Date(d.created_date).toLocaleDateString()) }</td><td><a class="btnn" id="status" onclick="check(${ d.category_id },${ d.category_status });">${ d.category_status }</a></td><td><a class="edit-btn fas fa-edit" onclick="editCategory(${ d.category_id })"> EDIT</a></td>
// {/* <td class="width-td">
// ${data.search[0].option_a}
// </td>
// <td  class="width-td">
// ${data.search[0].option_b}
// </td>
// <td class="width-td">
// ${data.search[0].option_c}
// </td>
// <td class="width-td">
// ${data.search[0].option_d}
// </td> */}