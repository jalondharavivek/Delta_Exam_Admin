
function check_status() {

    try{
        let btn = document.querySelectorAll('.btnn');
        btn.forEach(e => {
            if (e.innerHTML == '0') {
    
                e.innerHTML = 'DISABLE';
                e.style.color = 'red';
                e.style.cursor = 'pointer';
                
            }
            else if (e.innerHTML == '1') {
    
                e.innerHTML = 'ENABLE';
                e.style.color = 'blue';
                e.style.cursor = 'pointer';
            }
        })
    }
    catch (err)
    {
        console.log(err);
    }
}
check_status();

function toggle(status, id) {

    try{
        var togglediv = document.getElementById('toggle' + id);
        var toggle_id = document.getElementById(id);
    
    
        fetch(`/student_status?status=${status}&id=${id}`).then(res => res.json()).then(data => {
            if (data.info = 'rows matched: 1 changed: 1 Warnings: 0') {
                if (status == '1') {
                    togglediv.innerHTML = `<p class="btn" id="${id}" onclick="toggle('0','${id}')" style="color: red;cursor:pointer" ;>DISABLE</p>`;
                } else if (status = '0') {
                    togglediv.innerHTML = `<p class="btn" id="${id}" onclick="toggle('1','${id}')" style="color: blue;cursor:pointer">ENABLE</p>`;
                }
            }
        }).catch(err => console.log(err));
    }

    catch(err)
    {
        console.log(err);
    }
   
}



async function page(pages , name = '') {

    try{
        let table = document.getElementById('mytable');
        console.log(table)
        let pagination = document.getElementById('pagination');
        let str = `<tr>
        <th>s_id</th>
        <th>name</th>
        <th>email</th>
        <th>contact</th>
        <th>gender</th>
        <th>address</th>
        <th>status</th>
        <th>state</th>
        <th>city</th>
        <th>college_id</th>
        <th>created_date</th>
        <th>action</th>
    
    </tr>`;
        let page = pages.id;
        console.log(page , "this is [age")
        const results = await fetch(`http://localhost:8765/userpage`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ page, name })
        });
        var student = await results.json();
        console.log(student)
        student.pages.forEach(c => {
            str += `<tr>
            <td>
                ${c.student_id}
            </td>
            <td>
            ${c.name}
            </td>
            <td>
            ${c.email}
            </td>
            <td>
            ${c.contact}
            </td>
            <td>
            ${c.gender}
            </td>
            <td>
            ${c.address}
            </td>
            <td>
    
            <div id="toggle${c.student_id}">
                <p class="btnn" id="status" id="${c.student_id}" onclick="toggle(' ${c.student_status}','${c.student_id}')">${c.student_status}</p>
            </div>
    
    
        </td>
        <td>
        ${c.state_name}
        </td>
        <td>
        ${c.city}
        </td>
        <td>
        ${c.college_name}
        </td>
        <td>
         ${(new Date().toLocaleDateString())}
    
        </td>
        <td>
            <a id="editbutton" href="/edit/:id=${c.student_id}">edit
            </a>
        </td>
    </tr>
    `;
        })
    
        if (name == '') {
            let pagi = '';
            pagi += `<li class="page-item"><a class="page-link" id="0" onclick='page(this)'>First</a></li>`;
            if (parseInt(student.page) <= 5) {
                for (let i = 1; i <= parseInt(student.page); i++) {
                    pagi += `<li class="page-item"><a class="page-link" id='${i}' onclick='page(this)'>${i}</a></li>`
                }
            }
            else {
                for (let i = (parseInt(student.page) - 5); i <= parseInt(student.page); i++) {
                    pagi += `<li class="page-item"><a class="page-link" id='${i}' onclick='page(this)'>${i}</a></li>`
                }
            }
            if (Math.ceil((student.total) / (student.limit)) - 5 >= (student.page)) {
                for (let i = parseInt(student.page) + 1; i <= parseInt(student.page) + 5; i++) {
                    pagi += `<li class="page-item"><a class="page-link" id='${i}' onclick='page(this)'>${i}</a></li>`
                }
            }
            else {
                for (let i = parseInt(student.page) + 1; i <= Math.ceil(parseInt(student.total) / parseInt(student.limit)); i++) {
                    console.log("manoijsjdhvasd");
                    pagi += `<li class="page-item"><a class="page-link" id='${i}' onclick='page(this)'>${i}</a></li>`
                }
            }
    
            pagi += `<li class="page-item"><a class="page-link" onclick='page(this)' id="${Math.ceil(student.total / student.limit)}">Last</a></li>`
    
            pagination.innerHTML = pagi;
        }
        table.innerHTML = str;
        check_status() ;

    }
   
    catch(err)
    {
        console.log(err);
    }
   
}

async function search(name)
{
   
    try
    {
        let result = await fetch(`/user/search?name=${name}`);
        
        let data = await result.json();
        console.log(data)
        let page = document.getElementById("pagination");
        let pages = '';
        let table = document.getElementById("mytable");
        let html = `<tr>
        <th>s_id</th>
        <th>name</th>
        <th>email</th>
        <th>contact</th>
        <th>gender</th>
        <th>address</th>
        <th>status</th>
        <th>state</th>
        <th>city</th>
        <th>college_id</th>
        <th>created_date</th>
        <th>action</th>
    
    </tr>`;
        if(Object.keys(data.search).length != 0)
        {
            data.search.forEach(c => {
                html += `<tr>
                <td>
                    ${c.student_id}
                </td>
                <td>
                ${c.name}
                </td>
                <td>
                ${c.email}
                </td>
                <td>
                ${c.contact}
                </td>
                <td>
                ${c.gender}
                </td>
                <td>
                ${c.address}
                </td>
                <td>
                <div id="toggle${c.student_id}">
                <p class="btnn" id="status" id="${c.student_id}" onclick="toggle(' ${c.student_status}','${c.student_id}')">${c.student_status}</p>
            </div>
        
        
            </td>
            <td>
            ${c.state_name}
            </td>
            <td>
            ${c.city}
            </td>
            <td>
            ${c.college_name}
            </td>
            <td>
             ${(new Date().toLocaleDateString())}
        
            </td>
            <td>
                <a id="editbutton" href="/edit/:id=${c.student_id}">edit
                </a>
            </td>
        </tr>`
            })

            pages = `<li class="page-item"><a class="page-link" id="0" onclick="page(this,'${name}')">First</a></li>`;
                for(let i=data.page;i<=Math.ceil(data.total/data.limit);i++){
                    pages +=`<li class="page-item"><a class="page-link" onclick="page(this,'${name}')" id="${i}">${i}</a></li>`
                }
            pages +=`<li class="page-item"><a class="page-link" onclick="page(this,'${name}')" id="${Math.ceil(data.total/data.limit)}">Last</a></li>`;

        }
        else if(Object.keys(data.search).length == 0)
        {
            html +=`<tr><td colspan=12>No record found</td></tr>`;
            pages += '';
        }
        table.innerHTML = html;
        page.innerHTML=pages;
        check_status();


    }
    catch(err)
    {
        console.log(err);
    }
 
}