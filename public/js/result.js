
let page1 = document.getElementById('page');
let tbody = document.getElementById('tbody');

async function companylist(list)
{
    try
    {
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
                        <td><a onclick="viewquestionresult(${e.exam_id},${id})" id="${e.exam_id}">View</a></td>
                    </tr>`;
        });
        table.innerHTML=tbl;
        document.getElementById('answer').innerHTML='';
        document.getElementById('obtained_answer').innerHTML="";
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

// async function getexamdetail(exam, id)
// {
//     try
//     { 
//         let results = document.getElementById("result");
//         results.innerHTML = "Category";
//         let user_id = id;
//         let exam_id = exam;
//         let table = document.getElementById('MyTable');
//         let result = await fetch(`/getexamdetail?id=${exam_id}`);
//         let data = await result.json();
//         table.innerHTML='';
//         let sid = 1;
//         let tbl = `<tr>
//                     <th>No</th>
//                     <th>Category</th>
//                     <th>Action</th> 
//                     </tr>`;
//         data.query.forEach(e => {
//             tbl += `<tr>
//                         <td>${sid++}</td>
//                         <td>${e.category_name}</td>
//                         <td><a onclick="viewquestionresult(${exam_id},${user_id})" id="${exam_id}">View</a></td>
//                     </tr>`;
//         });
        // document.getElementById('answer').innerHTML="";
        // document.getElementById('obtained_answer').innerHTML="";
        // table.innerHTML=tbl;
        // let back = document.getElementById("back");
        // back.innerHTML = "Back";
        // back.removeAttribute('href');
        // back.setAttribute('onclick',`companylist(${user_id})`);
//     }
//     catch(err)
//     {
//         console.log(err);
//     }
// }

async function viewquestionresult(exam, id)
{
    try
    {
        let results = document.getElementById("result");
        results.innerHTML = "Questions";
        let exam_id = exam;
        let user_id = id;
        let table = document.getElementById('MyTable');
        const result = await fetch(`/viewquestionresult`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ exam_id, user_id }),
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
                        <td class="answer">${e.answer}</td>
                        <td class="uans">${e.user_answers}</td>
                    </tr>`;
        });
        table.innerHTML=tbl;
        let count =0;
        data.query.forEach(e =>{
            ans1 = e.answer;
            ans2 = e.user_answers;
            var answer = document.getElementsByClassName('answer');
            var uans = document.getElementsByClassName('uans');
            for(var i = 0; i < answer.length; i++) {
                if(answer[i].innerHTML == uans[i].innerHTML)
                {
                    uans[i].style.color = "green";
                    uans[i].style.fontSize = "20px";
                    uans[i].style.fontWeight = "200px";
                }
                else
                {
                    uans[i].style.color = "Red";
                    
                }
            }
            if(ans1 == ans2 ){
                count++;
            }
        })
        let answer = document.getElementById('answer');
        answer.innerHTML="Total Marks:"+data.query.length;
        let obtained_answer = document.getElementById('obtained_answer');
        obtained_answer.innerHTML="Achived Marks:"+count;

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

async function searchstudent(results)
{
    try
    {
        let search_value = results;
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
        let no = 1;
        if(data.query.length !=0)
        {
            data.query.forEach(e => {
                design += `<tr>
                                <td>${no++}</td>
                                <td>${e.name}</td>
                                <td><a onclick="companylist(this.id)" id="${e.user_id}">View</a></td>
                            </tr>`
            })
        }
        else
        {
            design += '<tr><td colspan=3>No record found</td></tr>';
        }
        table.innerHTML = design;
    }
    catch(err)
    {
        console.log(err);
    }
}