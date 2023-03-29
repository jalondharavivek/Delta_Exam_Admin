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

    <a href="/question/editquestion?question_id=${data.data[i].question_id}" ><i class="fas fa-edit"></i></a>
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
    let queresult = await fetch(`/searchque?nameque=${quesearch}`);
    let datas = await queresult.json();
    let id=1
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
            ${id++}
        </td>
        <td  class="width-td">
        ${datas.search[i].category_name} </td>
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

        <a href="/question/editquestion?question_id=${datas.search[i].question_id}" ><i class="fas fa-edit"></i></a>
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
        <th>view</th>
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
    data.pages.forEach(c => {
      html += `<tr>
      <td class="width-td">
          ${c.question_id}
      </td>
      <td  class="width-td">
      ${c.category_name} </td>
      <td class="question-width" >
          ${c.question_text}
      </td>
    
      <td class="answercolor">
          ${c.answer}
      </td>
      <td>
      
      <a href="viewdetail?question_id=${c.question_id}" ><i class="fa fa-eye" aria-hidden="true"></i></a>
      
      </td>
      <td class="button-width">

      <a href="/question/editquestion?question_id=${c.question_id}" ><i class="fas fa-edit"></i></a>
      <a href=""   onclick="deletque(${c.question_id})"><i class="fa fa-trash" aria-hidden="true"></i></a>
      </td>
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
          pagi += ` id='${i}' onclick='page(this)'>${i}</a></li>`
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