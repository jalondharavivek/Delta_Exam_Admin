
let page1 = document.getElementById('page');
let tbody = document.getElementById('tbody');

async function companylist(list)
{
    try
    {
        console.log(list);
        let results = document.getElementById("result");
        results.innerHTML = "Exams";
        let id = list;
        let table = document.getElementById('MyTable');
        let result = await fetch(`/companylist?id=${id}`);
        let data = await result.json();
        table.innerHTML='';
        let sid = 1;
        let tbl = `<tr>
                    <th>No</th>
                    <th>exam name</th>
                    <th>Action</th> 
                    </tr>`;
        data.query.forEach(e => {
            tbl += `<tr>
                        <td>${sid++}</td>
                        <td>${e.exam_name}</td>
                        <td><a onclick="getexamdetail(${e.exam_id},${id})" id="${e.exam_id}">View</a></td>
                    </tr>`;
        });
        table.innerHTML=tbl;
        let back = document.getElementById("back");
        back.classList.add("back");
        back.innerHTML = "Back";
        back.href = "/result";
        back.removeAttribute('onclick');
        let search = document.getElementById('search');
        search.parentNode.innerHTML='';
    }
    catch(err)
    {
        console.log(err);
    }
}

async function getexamdetail(exam, id)
{
    try
    { 
        let results = document.getElementById("result");
        results.innerHTML = "Category";
        let user_id = id;
        let exam_id = exam;
        let table = document.getElementById('MyTable');
        let result = await fetch(`/getexamdetail?id=${exam_id}`);
        let data = await result.json();
        table.innerHTML='';
        let sid = 1;
        let tbl = `<tr>
                    <th>No</th>
                    <th>Category</th>
                    <th>Action</th> 
                    </tr>`;
        data.query.forEach(e => {
            tbl += `<tr>
                        <td>${sid++}</td>
                        <td>${e.category_name}</td>
                        <td><a onclick="viewquestionresult(${e.category_id},${user_id},${exam_id})" id="${e.exam_id}">View</a></td>
                    </tr>`;
        });
        document.getElementById('answer').innerHTML="";
        document.getElementById('obtained_answer').innerHTML="";
        table.innerHTML=tbl;
        let back = document.getElementById("back");
        back.innerHTML = "Back";
        back.removeAttribute('href');
        back.setAttribute('onclick',`companylist(${user_id})`);
    }
    catch(err)
    {
        console.log(err);
    }
}

async function viewquestionresult(category, id,exam)
{
    try
    {
        let results = document.getElementById("result");
        results.innerHTML = "Questions";
        let category_id = category;
        let user_id = id;
        let exam_id = exam;
        let table = document.getElementById('MyTable');
        const result = await fetch(`/viewquestionresult`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ category_id, user_id}),
        });
        var data = await result.json();
        table.innerHTML='';
        let sid = 1;
        let tbl = `<tr>
                    <th>No</th>
                    <th>Question </th>
                    <th>Answer</th>
                    <th>Student answer</th>
                </tr>`;
        data.query.forEach(e => {
            tbl += `<tr>
                        <td>${sid++}</td>
                        <td>${e.question_text}</td>
                        <td>${e.answer}</td>
                        <td>${e.user_answers}</td>
                    </tr>`;
        });
        table.innerHTML=tbl;
        let count =0;
        data.query.forEach(e =>{
            ans1 = e.answer;
            ans2 = e.user_answers;
            if(ans1.localeCompare(ans2) !=0 ){
                count++;
            }
        })
        let answer = document.getElementById('answer');
        answer.innerHTML="Total Marks:"+data.query.length;
        let obtained_answer = document.getElementById('obtained_answer');
        let total = data.query.length-count;
        obtained_answer.innerHTML="Achived Marks:"+total;

        let back = document.getElementById("back");
        back.innerHTML = "Back";
        back.removeAttribute('href');
        back.setAttribute('onclick',`getexamdetail(${exam_id},${user_id})`);
    }
    catch(err)
    {
        console.log(err);
    }
}

async function searchstudent(results,id)
{
    try
    {
        let search_value = results;
        let user_id = id;
        const result = await fetch(`/search`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ search_value}),
        });
        var data = await result.json();
        let table = document.getElementById("MyTable");
        table.innerHTML = '';
        let design = '';
        design += `<tr>
                        <th>No</th>
                        <th>Student Name</th>
                        <th>Action</th>
                    </tr>`
        let no = 0;
        data.query.forEach(e => {
            design += `<tr>
                            <td>${no++}</td>
                            <td>${e.name}</td>
                            <td><a onclick="companylist(this.id)" id="${e.user_id}">View</a></td>
                        </tr>`
        })
        table.innerHTML = design;
    }
    catch(err)
    {
        console.log(err);
    }
}

async function search_exam(results,id)
{
    try
    {
        let user_id = id;
        let search_value = results;
        const result = await fetch(`/search_exam`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ search_value, user_id}),
        });
        var data = await result.json();
        let table = document.getElementById("MyTable");
        table.innerHTML = '';
        let design = '';
        design += `<tr>
                        <th>No</th>
                        <th>Exam Name</th>
                        <th>Action</th>
                    </tr>`
        let no = 0;
        data.query.forEach(e => {
            design += `<tr>
                            <td>${no++}</td>
                            <td>${e.name}</td>
                            <td><a onclick="companylist(this.id)" id="${e.user_id}">View</a></td>
                        </tr>`
        })
        table.innerHTML = design;
    }
    catch(err)
    {
        console.log(err);
    }
}


// async function page(num, count1) {
 
//     fetch(`/result/page?num=${num}`).then(res => res.json()).then(data => {
//         tbody.innerHTML = "";
//         for (i = 0; i < data.data.length; i++) {
//             tbody.innerHTML += `<tr>
//             <td>
//                 ${i + 1}
//             </td>
//             <td>
//                 ${data.data[i].name}
//             </td>
//             <td><a href="/companylist?id=${data.data[i].user_id}" id="${data.data[i].user_id}">View</a></td>
//         </tr>`
//         }
//         page1.innerHTML = "";

//         if (num == 1) {
//             page1.innerHTML += `<p onclick="page(1,${count1})" class="p">prev</p>`

//         } else {
//             page1.innerHTML += `<p onclick="page(${num}-1,${count1})" class="p">prev</p>`

//         }

//         for (i = 1; i <= count1; i++) {
//             if (i == num) {
//                 page1.innerHTML += `<p onclick="page(${i},${count1})" class="p"><b>${i}</b></p>`
//             } else {
//                 page1.innerHTML += `<p onclick="page(${i},${count1})" class="p">${i}</p>`
//             }
//         }


//         if (num == count1) {

//             page1.innerHTML += `<p onclick="page(${count1},${count1})" class="p">next</p>`

//         } else if (num < count1) {

//             page1.innerHTML += `<p onclick="page(${num}+1,${count1})" class="p">next</p>`;
//         }



//     }).catch(err => console.log(err));

// }

