function cat_status()
{
    try
    {

        let sts = document.querySelectorAll('#status');
        sts.forEach(e => {
            if (e.innerHTML == '0') {
                e.innerHTML = 'DISABLE';
                e.style.color = 'White';
                e.style.backgroundColor = 'rgb(0,90,190)';
            }
            else  if(e.innerHTML == '1')
            {
                e.innerHTML = 'ENABLE';
                e.style.color = 'White';
                e.style.backgroundColor = 'rgb(0,140,0)';
            }
        })
    }
    catch (err)
    {
        console.log(err);
    }
}

cat_status();

async function check(id, status) 
{
    let c_id = id;
    let sts;
    if (status == 1) {
        sts = "disable";
    }
    else  if(status == 0)
    {
        sts = "enable";
    }
    if (confirm(`Are you sure you want to ${sts}`)) {
        try {
            const result = await fetch(`/categorystatus`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ c_id , status })
            });
            let data = await result.json();
            let table = document.getElementById("myTable");
            let html = `<tr>
                            <th>ID</th>
                            <th>Category Name</th>
                            <th>Created Date</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>`;
            let id=1
            data.forEach(d => {
                html += `<tr><td>${id++}</td><td>${ d.category_name }</td><td>${ (new Date(d.created_date).toLocaleDateString()) }</td><td><a class="btnn" id="status" onclick="check(${ d.category_id },${ d.category_status });">${ d.category_status }</a></td><td><a class="edit-btn fas fa-edit" onclick="editCategory(${ d.category_id })"> EDIT</a></td></tr>`
            })
            table.innerHTML = html;
        }
        catch (err) {
            console.log(err);
        }
       
    }
     cat_status();
}
let dialogues = document.querySelector('.dialogues');
dialogues.style.display = 'none';

async function addCategory()
{
    try 
    {
        document.getElementById("overlay").style.display="block";
        let dialogues = document.querySelector('.dialogues');
        let text = document.getElementById('text');
        let id = document.getElementById('id');

        let yesButton = dialogues.querySelector('.yes');
        let noButton = dialogues.querySelector('.no');

        yesButton.addEventListener('click',async function() {
            dialogues.style.display = 'none';
            document.getElementById("overlay").style.display="none";
        });
        noButton.addEventListener('click', function() {
            dialogues.style.display = 'none';
            document.getElementById("overlay").style.display="none";
        });
        dialogues.style.display = 'block';
    }
    catch (err) 
    {
        console.log("error");
    }    
}

let dialogue = document.querySelector('.dialogue');
dialogue.style.display = 'none';

async function editCategory(id)
{
    try 
    {
        document.getElementById("overlay").style.display="block";
        const result= await fetch(`/editCategory?id=${id}`);
        const ans = await result.json();
        if(ans)
        {
            let dialogue = document.querySelector('.dialogue');
            let text = document.getElementById('text');
            let id = document.getElementById('id');
            id.value = ans[0].category_id;
            text.value = ans[0].category_name;
            let yesButton = dialogue.querySelector('.yes');
            let noButton = dialogue.querySelector('.no');
            yesButton.addEventListener('click',async function() {
                dialogue.style.display = 'none';
                document.getElementById("overlay").style.display="none";
            });
            noButton.addEventListener('click', function() {
                dialogue.style.display = 'none';
                document.getElementById("overlay").style.display="none";
            });
            dialogue.style.display = 'block';
        }
    }
    catch (err) 
    {
        console.log(err);
    }    
}

async function search(name)
{
    try
    {
        let result = await fetch(`/search?name=${name}`);
        let data = await result.json();
        let page = document.getElementById("pagination");
        let pages = '';
        let table = document.getElementById("myTable");
        let html = `<tr>
                        <th>ID</th>
                        <th>Category Name</th>
                        <th>Created Date</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>`;
        let id=1;
        if(Object.keys(data.search).length != 0)
        {
            data.search.forEach(d => {
                html += `<tr><td>${id++}</td><td>${ d.category_name }</td><td>${ (new Date(d.created_date).toLocaleDateString()) }</td><td><a class="btnn" id="status" onclick="check(${ d.category_id },${ d.category_status });">${ d.category_status }</a></td><td><a class="edit-btn fas fa-edit" onclick="editCategory(${ d.category_id })"> EDIT</a></td></tr>`
            })

            pages += `<li class="page-item"><a class="page-link" id="0" onclick="page(this,'${name}')"><<</a></li>`;
            pages += `<li class="page-item"><a class="page-link" id="${data.page-1}" onclick="page(this,'${name}')"><</a></li>`;
            if(parseInt(data.page) <=5) {
                for(let i=1;i<=parseInt(data.page);i++) {  
                    pages += `<li class="page-item"><a class="page-link `
                    if(parseInt(data.page) == i){ pages += `pageactive"`}else { pages += `disabled"`}
                    pages += ` id='${i}' onclick="page(this,'${name}')">${i}</a></li>`
                }
            }
            else {
                for(let i=(parseInt(data.page)-5);i<=parseInt(data.page);i++){
                    pages += `<li class="page-item"><a class="page-link `
                    if(parseInt(data.page) == i){ pages += `pageactive"`}else { pages += `disabled"`}
                    pages += ` id='${i}' onclick="page(this,'${name}')">${i}</a></li>`
                }
            }
            if(Math.ceil(parseInt(data.total)/parseInt(data.limit))-5>= parseInt(data.page)) {
                for(let i=parseInt(data.page)+1;i<=parseInt(data.page)+ 5;i++){
                    pages += `<li class="page-item"><a class="page-link `
                    if(parseInt(data.page) == i){ pages += `pageactive"`}else { pages += `disabled"`}
                    pages += ` id='${i}' onclick="page(this,'${name}')">${i}</a></li>`
                } 
            } 
            else 
            {
                for(let i=parseInt(data.page)+1;i<=Math.ceil(parseInt(data.total)/parseInt(data.limit));i++) {
                    pages += `<li class="page-item"><a class="page-link `
                    if(parseInt(data.page) == i){ pages += `pageactive"`}else { pages += `disabled"`}
                    pages += ` id='${i}' onclick="page(this,'${name}')">${i}</a></li>`
                }
            }
            pages +=`<li class="page-item"><a class="page-link" onclick="page(this,'${name}')" id="`
            if(data.page < Math.ceil(data.totalpages/data.limit))
            {
                pages+= `${data.page+1}`
            }
            pages += `">></a></li>`;
            pages +=`<li class="page-item"><a class="page-link" onclick="page(this,'${name}')" id="${Math.ceil(data.totalpages/data.limit)}">>></a></li>`;

        }
        else if(Object.keys(data.search).length == 0)
        {
            html +=`<tr><td colspan=5>No record found</td></tr>`;
            pages += '';
        }
        table.innerHTML = html;
        page.innerHTML=pages;
        cat_status();
    }
    catch(err)
    {
        console.log(err);
    }
}

async function page(pages,name = '')
{
    try
    {

        let table = document.getElementById('myTable');
        let pagination = document.getElementById('pagination');
        let html=`<tr>
                    <th>ID</th>
                    <th>Category Name</th>
                    <th>Created Date</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>`;
        let page = pages.id;
        const results = await fetch(`/categorypage`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ page, name })
        });
        let id = 1;
        var data = await results.json();
        data.pages.forEach(c => {
            html += `<tr><td>${id++}</td><td>${ c.category_name }</td><td>${ (new Date(c.created_date).toLocaleDateString()) }</td><td><a class="btnn" id="status" onclick="check(${ c.category_id },${ c.category_status });">${ c.category_status }</a></td><td><a class="edit-btn fas fa-edit" onclick="editCategory(${ c.category_id })"> EDIT</a></td></tr>`;
        })
        let pagi ='' ;
        if(name == '')
        {
            pagi += `<li class="page-item"><a class="page-link" id="0" onclick='page(this)'><<</a></li>`;
            pagi += `<li class="page-item"><a class="page-link" id="${data.page-1}" onclick='page(this)'><</a></li>`;
            if(parseInt(data.page) <=5) {
                for(let i=1;i<=parseInt(data.page);i++) {  
                    pagi += `<li class="page-item"><a class="page-link `;
                    if(parseInt(data.page) == i){ pagi += `pageactive"`}else { pagi += `disabled"`}
                    pagi += ` id='${i}' onclick='page(this)'>${i}</a></li>`
                }
            }
            else {
                for(let i=(parseInt(data.page)-5);i<=parseInt(data.page);i++){
                    pagi += `<li class="page-item"><a class="page-link `;
                    if(parseInt(data.page) == i){ pagi += `pageactive"`}else { pagi += `disabled"`}
                    pagi += ` id='${i}' onclick='page(this)'>${i}</a></li>`
                }
            }
            if(Math.ceil(parseInt(data.total)/parseInt(data.limit))-5>= parseInt(data.page)) {
                for(let i=parseInt(data.page)+1;i<=parseInt(data.page)+ 5;i++){
                    pagi += `<li class="page-item"><a class="page-link `
                    if(parseInt(data.page) == i){ pagi += `pageactive"`}else { pagi += `disabled"`}
                    pagi += ` id='${i}' onclick='page(this)'>${i}</a></li>`
                } 
            } 
            else 
            {
                for(let i=parseInt(data.page)+1;i<=Math.ceil(parseInt(data.total)/parseInt(data.limit));i++) {
                    pagi += `<li class="page-item"><a class="page-link `;
                    if(parseInt(data.page) == i){ pagi += `pageactive"`}else { pagi += `disabled"`}
                    pagi += ` id='${i}' onclick='page(this)'>${i}</a></li>`
                }
            }
            pagi += `<li class="page-item"><a class="page-link" onclick='page(this)' id="`
            if(data.page < Math.ceil(data.total/data.limit))
            {
                pagi+= `${data.page+1}`
            }
            pagi += `">></a></li>`;

            pagi += `<li class="page-item"><a class="page-link" onclick='page(this)' id="${Math.ceil(data.total/data.limit)}">>></a></li>`
            pagination.innerHTML = pagi;

        }
        else
        {
            pagi += `<li class="page-item"><a class="page-link" id="0" onclick="page(this,'${name}')"><<</a></li>`;
            pagi += `<li class="page-item"><a class="page-link" id="${data.page-1}" onclick="page(this,'${name}')"><</a></li>`;
                for(let i=1;i<=Math.ceil(data.totalpages/data.limit);i++){
                    pagi += `<li class="page-item"><a class="page-link `
                    if(parseInt(data.page) == i){ pagi += `pageactive"`}else { pagi += `disabled"`}
                    pagi += ` id='${i}' onclick="page(this,'${name}')">${i}</a></li>`
                }
            pagi +=`<li class="page-item"><a class="page-link" onclick="page(this,'${name}')" id="`
            if(data.page < Math.ceil(data.totalpages/data.limit))
            {
                pagi+= `${data.page+1}`
            }
            pagi += `">></a></li>`;
            pagi +=`<li class="page-item"><a class="page-link" onclick="page(this,'${name}')" id="${Math.ceil(data.totalpages/data.limit)}">>></a></li>`;
            pagination.innerHTML = pagi;
        }
        table.innerHTML = html;
        
        cat_status();
    }
    catch(err) 
    {
        console.log(err);
    }
}
