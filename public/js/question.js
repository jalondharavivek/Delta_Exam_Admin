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

async function searchque(name) {
console.log(name,"question module in search search:::::;")
    let queresult = await fetch(`http://localhost:8765/search?name=${name}`);
    let data = await queresult.json();
    console.log(data,"search question for data");
    let tabque = document.getElementById("quetable")
    let quetabsearch = `  <tr>
                             <th>Id</th>
                             <th>Category</th>
                            <th>Question</th>
                             <th>Option A</th>
                             <th>Option B</th>
                             <th>Option c</th>
                             <th>Option D</th>
                             <th>Answer</th>
                             <th>Action</th>
                        </tr>`;
                        console.log(data.search.question_text,":::question name  ")
                        console.log(Object.keys(data.search).length == 0 , "::::::::total")
    if(Object.keys(data.search).length == 0)
      {
        quetabsearch +=`<tr><td colspan=5>No record found</td></tr>`;
        }
 else
    {
      {
        quetabsearch += `<tr><td>${ data.tsearch.question_id }</td><td>${ data.search.question_text }</td></tr>`
  }
  }
  tabque.innerHTML = quetabsearch;
//    cat_status();
                    }

//<td>${ (new Date(d.created_date).toLocaleDateString()) }</td><td><a class="btnn" id="status" onclick="check(${ d.category_id },${ d.category_status });">${ d.category_status }</a></td><td><a class="edit-btn fas fa-edit" onclick="editCategory(${ d.category_id })"> EDIT</a></td>