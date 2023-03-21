function cat_status()
{
    let sts = document.querySelectorAll('#status');
    sts.forEach(e => {
        if (e.innerHTML == '0') {
            e.innerHTML = 'DISABLE';
            e.style.color = 'white';
            e.style.backgroundColor = 'rgb(0,90,190)';
            e.style.opacity = '0.9';
        }
        else  if(e.innerHTML == '1')
        {
            e.innerHTML = 'ENABLE';
            e.style.color = 'white';
            e.style.backgroundColor = 'rgb(0,140,0)';
        }
    })
}

cat_status();

async function check(id, status) 
{
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
            const result = await fetch(`http://localhost:8765/categorystatus`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id, status })
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
            data.forEach(d => {
                html += `<tr><td>${ d.category_id }</td><td>${ d.category_name }</td><td>${ (new Date(d.created_date).toLocaleDateString()) }</td><td><a class="btnn" id="status" onclick="check(${ d.category_id },${ d.category_status });">${ d.category_status }</a></td><td><a class="edit-btn fas fa-edit" onclick="editCategory(${ d.category_id })"> EDIT</a></td></tr>`
            })
            table.innerHTML = html;
            console.log(data);

            // window.location.reload();
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
        // console.log(id);
        // const result= await fetch(`http://localhost:8765/editCategory?id=${id}`);
        // const ans = await result.json();
        // if(ans)
        // {
            // console.log(ans[0].category_name);
            

            document.getElementById("overlay").style.display="block";
            let dialogues = document.querySelector('.dialogues');
            let text = document.getElementById('text');
            let id = document.getElementById('id');
            // console.log(text);
            // id.value = ans[0].category_id;
            // text.value = ans[0].category_name;
            let yesButton = dialogues.querySelector('.yes');
            let noButton = dialogues.querySelector('.no');
            // dialogues.style.display = 'none';
            yesButton.addEventListener('click',async function() {
                console.log("yes");
                dialogues.style.display = 'none';
                document.getElementById("overlay").style.display="none";
                // document.style.display="none";
            });
            noButton.addEventListener('click', function() {
                dialogues.style.display = 'none';
                document.getElementById("overlay").style.display="none";
            });
            dialogues.style.display = 'block';
        // }
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
        // console.log(id);
        document.getElementById("overlay").style.display="block";
        const result= await fetch(`http://localhost:8765/editCategory?id=${id}`);
        const ans = await result.json();
        if(ans)
        {
            // console.log(ans[0].category_name);
            let dialogue = document.querySelector('.dialogue');
            let text = document.getElementById('text');
            let id = document.getElementById('id');
            console.log(text);
            id.value = ans[0].category_id;
            text.value = ans[0].category_name;
            let yesButton = dialogue.querySelector('.yes');
            let noButton = dialogue.querySelector('.no');
            // dialogue.style.display = 'none';
            yesButton.addEventListener('click',async function() {
                console.log("yes");
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
    // console.log(name);
    let result = await fetch(`http://localhost:8765/search?name=${name}`);
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
    if(Object.keys(data.search).length != 0)
    {
        data.search.forEach(d => {
            html += `<tr><td>${ d.category_id }</td><td>${ d.category_name }</td><td>${ (new Date(d.created_date).toLocaleDateString()) }</td><td><a class="btnn" id="status" onclick="check(${ d.category_id },${ d.category_status });">${ d.category_status }</a></td><td><a class="edit-btn fas fa-edit" onclick="editCategory(${ d.category_id })"> EDIT</a></td></tr>`
        })

        pages = `<li class="page-item"><a class="page-link" id="0" onclick="page(this,'${name}')">First</a></li>`;
            for(let i=data.page;i<=Math.ceil(data.total/data.limit);i++){
                pages +=`<li class="page-item"><a class="page-link" onclick="page(this,'${name}')" id="${i}">${i}</a></li>`
            }
        pages +=`<li class="page-item"><a class="page-link" onclick="page(this,'${name}')" id="${Math.ceil(data.total/data.limit)}">Last</a></li>`;

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

async function page(pages,name = '')
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
    const results = await fetch(`http://localhost:8765/categorypage`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ page, name })
    });
    // var results = await fetch(`http://localhost:8765/categorypage?page=${pages.id}`);
    var data = await results.json();
    data.pages.forEach(c => {
        html += `<tr><td>${ c.category_id }</td><td>${ c.category_name }</td><td>${ (new Date(c.created_date).toLocaleDateString()) }</td><td><a class="btnn" id="status" onclick="check(${ c.category_id },${ c.category_status });">${ c.category_status }</a></td><td><a class="edit-btn fas fa-edit" onclick="editCategory(${ c.category_id })"> EDIT</a></td></tr>`;
    })

    if(name == '')
    {
        let pagi ='' ;
        pagi += `<li class="page-item"><a class="page-link" id="0" onclick='page(this)'>First</a></li>`;
        if(parseInt(data.page) <=5) {
            for(let i=1;i<=parseInt(data.page);i++) {  
                pagi += `<li class="page-item"><a class="page-link" id='${i}' onclick='page(this)'>${i}</a></li>`
            }
        }
        else {
            for(let i=(parseInt(data.page)-5);i<=parseInt(data.page);i++){
                pagi += `<li class="page-item"><a class="page-link" id='${i}' onclick='page(this)'>${i}</a></li>`
            }
        }
        if(Math.ceil((data.total)/(data.limit))-5 >= (data.page)) {
            for(let i=parseInt(data.page)+1;i<=parseInt(data.page)+5;i++){
                pagi += `<li class="page-item"><a class="page-link" id='${i}' onclick='page(this)'>${i}</a></li>`
            } 
        } 
        else {
            for(let i=parseInt(data.page)+1;i<=Math.ceil(parseInt(data.total)/parseInt(data.limit));i++) {
                console.log("manoijsjdhvasd");
                pagi += `<li class="page-item"><a class="page-link" id='${i}' onclick='page(this)'>${i}</a></li>`
            }
        }

        pagi += `<li class="page-item"><a class="page-link" onclick='page(this)' id="${Math.ceil(data.total/data.limit)}">Last</a></li>`        

        pagination.innerHTML = pagi;
    }




    table.innerHTML = html;



    cat_status();
}