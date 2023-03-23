let category_select = document.getElementById('category_select');

//categoty fetch on ajax 
categortFetch();
function categortFetch() {
    fetch('/categories').then(res => res.json()).then(data => {

        for (let i = 0; i < data.arr.length; i++) {

            category_select.innerHTML += `<option value="${data.arr2[i]}">${data.arr[i]}</option>`;
        }
    }).catch(err => console.log(err));
}


//when page relkoad as database they chnage into enable and disable

togglecolorchnage();
function togglecolorchnage() {

    let btn = document.querySelectorAll('.btn');
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

//toggle switch with database chnages with no reload
function toggle(status, id) {
    let togglediv = document.getElementById(`toggle${id}`);
    let toggle_id = document.getElementById(`${id}`);

    fetch(`/exam/status?status=${status}&id=${id}`).then(res => res.json()).then(data => {
        if (data.info = 'rows matched: 1 changed: 1 Warnings: 0') {
            if (status == '1') {
                togglediv.innerHTML = `<p class="btn" id="${id}" onclick="toggle('0','${id}')" style="color: red;cursor:pointer">DISABLE</p>`;
            } else if (status = '0') {
                togglediv.innerHTML = `<p class="btn" id="${id}" onclick="toggle('1','${id}')" style="color: blue;cursor:pointer">ENABLE</p>`;
            }
        }
    }).catch(err => console.log(err));
}

//exam edit script when click on edit button
async function examedit(id) {

    let change = document.getElementById('change');


    let result = await fetch(`/edit?exam_id=${id}`)
    let data = await result.json();
    async function htmstring() {

        let str = `<div class="exam_main">
        <div class="combine">
            <div class="one">
                <label for="">ADD EXAM</label>
            </div>
            <form action="/edit" method="post">
                <input type="text" name="exam_id" value="${data[0].exam_id}" id="exam_id" hidden>
    
                <div class="two">
                    <div class="input_taker">
    
                        <label for="exam_name" class="labelofInput"> exam name: </label>
                        <input type="text" name="exam_name" value="${data[0].exam_name}"
                            placeholder="enter exam name" class="input_tag" required>
    
                    </div>
    
                    <!-- selected category is show  -->
                    <div class="input_taker">
                        <label for="" class="labelofInput"> category :</label>
                        <select name="category" id="category_select" multiple required>
    
                        </select>
    
    
                    </div>
    
                    <div class="input_taker">
                        <label for="question" class="labelofInput">no of questions: </label>
                        <input type="text" name="question" id="" placeholder="enter no of questions"
                            value="${data[0].total_questions}" class="input_tag" required>
    
                    </div>
                    <div class="input_taker">
                        <label for="time" class="labelofInput"> time limit: </label>
    
                        <input type="text" name="time" id="" placeholder="enter time limit"
                            value="${data[0].exam_time}" class="input_tag" required>
                        <label for="" class="extra_label">(adding time limit in minutes)</label>
    
                    </div>
    
    
                    <div class="input_taker">
                        <label for="start_date" class="labelofInput"> start date: </label>
                        <input type="date" name="start_date" id="" placeholder="enter start date"
                            value="${data[0].exam_date}" class="input_tag" required>
    
                    </div>
    
    
                </div>
                <div class="save_div">
    
                    <input type="submit" id="save_btn" value="UPDATE">
    
    
                </div>
            </form>
       
        </div>`;
        return str;
    }

    change.innerHTML = await htmstring();

    callback();

}


async function callback() {
    let category_select = document.getElementById('category_select')
    
    let arat = await selectedcategory();
    console.log(arat)

    async function selectedcategory() {
        console.log("selected category is called")
        let category_name = [];
        let exam_id = document.getElementById('exam_id').value;

        await fetch(`/selected/category?exam_id=${exam_id}`).then(res => res.json()).then(data => {
            console.log(data)
            for (i = 0; i < data.length; i++) {
                category_name.push(data[i][0].category_name);
            }
        }
        ).catch(err => console.log(err));

        return category_name;
    }

    categortFetch();
    async function categortFetch() {

        fetch('/categories').then(res => res.json()).then(data => {
            console.log("all category fetch is called")
            let checker;
            for (let i = 0; i < data.arr.length; i++) {
                console.log(data.arr.length)
                for (j = 0; j < arat.length; j++) {
                    console.log(arat.length , "this is arat")
                    if (data.arr[i] == arat[j]) {

                        category_select.innerHTML += `<option value="${data.arr2[i]}" selected>${data.arr[i]}</option>`;
                        checker = i;
                    }
                }
                if (checker != i) {

                    category_select.innerHTML += `<option value="${data.arr2[i]}">${data.arr[i]}</option>`;

                }

            }

        }).catch(err => console.log(err));
    }

}

//add exam code run on plus icon
async function addexam() {
    let change = document.getElementById('change');
    async function htmstring() {

        let str = `<div class="exam_main">
        <div class="combine">
            <div class="one">
                <label for="">ADD EXAM</label>
            </div>
            <form action="/exam" method="post" onsubmit="return validateform()">
                <div class="two">
                    <div class="input_taker">
                        <label for="exam_name" class="labelofInput"> exam name: </label>
                        <input type="text" name="exam_name" id="exam_name"
                            placeholder="enter exam name" class="input_tag"
                            onfocusout="examvalidation()" required>

                    </div>
                    <div class="input_taker">
                        <label for="" class="labelofInput"> category :</label>
                        <select name="category" id="category_select" multiple required>

                        </select>


                    </div>

                    <div class="input_taker">
                        <label for="question" class="labelofInput">no of questions: </label>
                        <input type="number" name="question" id="question"
                            placeholder="enter no of questions" class="input_tag" min="10" max="50"
                            value="10" required>

                    </div>
                    <div class="input_taker">
                        <label for="time" class="labelofInput"> time limit: </label>

                        <input type="number" name="time" id="time" placeholder="enter time limit"
                            class="input_tag" min="10" max="180" value="10" required>
                        <label for="" class="extra_label">(adding time limit in minutes)</label>

                    </div>


                    <div class="input_taker">
                        <label for="start_date" class="labelofInput"> start date: </label>
                        <input type="date" name="start_date" id="start_date"
                            placeholder="enter start date" class="input_tag" required>

                    </div>


                </div>
                <div class="save_div">
                    <p id="0"></p>

                    <input type="submit" id="save_btn" value="SAVE">
                   

                </div>
            </form>


        </div>
    </div>`;
        return str;
    }

    change.innerHTML = await htmstring();


    function validateform() {
        let exam_name = document.getElementById('exam_name').value;
        let symbol = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '<', '>', '?', '/', ',', '.', '"', ':', ';', '+', '-', '`', '~', '=', '[', ']', '{', '}'];

        if (exam_name == '') {
            alert('name cant be empty')
            return false;
        }
        for (i = 0; i < symbol.length; i++) {
            if (exam_name.includes(symbol[i])) {
                alert('special character is not allowed')
                return false;
            }
        }
        if (!isNaN(exam_name)) {
            alert('only numbers are not allowed')
            return false;
        }


    }

    let exam_name = document.getElementById('exam_name').value;
    let question = document.getElementById('question').value;
    let time = document.getElementById('time').value;
    let start_date = document.getElementById('start_date').value;
    let category_select = document.getElementById('category_select');


    categortFetch();
    function categortFetch() {
        fetch('/categories').then(res => res.json()).then(data => {
           

            for (let i = 0; i < data.arr.length; i++) {
                
                category_select.innerHTML += ` <option value="${data.arr2[i]}">${data.arr[i]}</option>`;

            }

        }).catch(err => console.log(err));
    }


}
//exam search code
function examSearch() {

    let search = document.getElementById('search').value;
    let exam_search = document.getElementById('exam_search');

    fetch(`/exam/search?exam_name=${search}`).then(res => res.json()).then(data => {
        
        if (data.data1.length == 0) {
            tbody.innerHTML = "there is no found data";
        }
        let tbody = document.getElementById('tbody');
        tbody.innerHTML = "";
        let str = "";
        str += ` <tr>
                            <th>Sr .No</th>
                            <th>exam_name</th>
                            <th>category</th>
                            <th>total_questions</th>
                            <th>time_limit</th>
                            <th>start date</th>
                            <th>exam statuss</th>
                            <th>edit</th>
                            <!-- <th>delete</th> -->

                        </tr>`;
        for (i = 0; i < data.data1.length; i++) {
            str += `<tr>
                                <td>
                                    <div class="td">
                                        ${(i + 1)}

                                    </div>
                                </td>
                                <td>
                                    <div class="td">
                                        ${data.data1[i].exam_name}

                                    </div>

                                </td>
                                <td>
                                    <div class="td">

                                        ${data.data1[i].category}

                                    </div>

                                </td>
                                <td>
                                    <div class="td">
                                        ${data.data1[i].total_questions}
                                       

                                    </div>

                                </td>
                                <td>
                                    <div class="td">
                                        ${data.data1[i].exam_time}
                                       

                                    </div>

                                </td>
                                <td>
                                    <div class="td">
                                        ${data.data1[i].exam_date}
                                   

                                    </div>

                                </td>
                                <td>


                                    <div id="toggle${data.data1[i].exam_id}">
                                        <p class="btn" id="${data.data1[i].exam_id}" onclick="toggle('${data.data1[i].exam_status}','${data.data1[i].exam_id}')" style="color: red;cursor:pointer">${data.data1[i].exam_status}</p>
                                    
                                    </div>
                                </td>
                                <td>


                                    <div class="edit">
                                    <p onclick="examedit(${data.data1[i].exam_id})" style="cursor: pointer;">edit</p>

                                    </div>
                                </td>
                               
                            </tr>
                           `;
        }
        num=1 ;     
        tbody.innerHTML = str;

        let pageid = document.getElementById('page');
       

        let newstr = '';
        pageid.innerHTML = "";

        if (num == 1) {

            pageid.innerHTML += `<p onclick="page(1)" class="p">prev</p>`;

        } else {

            pageid.innerHTML += `<p onclick="page(${num}-1)" class="p">prev</p>`;

        }

        for (let i = 1; i <= data.count; i++) {
            if (i == num) {
                pageid.innerHTML += `<p onclick="page(${i})" class="p">
            <b>${i}</b>
        </p>`;
            } else {
                pageid.innerHTML += `<p onclick="page(${i})" class="p">
            ${i}
        </p>`;
            }

        }

        if (num == 7) {

            pageid.innerHTML += `<p onclick="page(7)" class="p">next</p>`;

        } else {
            pageid.innerHTML += `<p onclick="page(${num} + 1)" class="p">next</p>`;
        }

        let pclass = document.querySelectorAll('.p');
     

    })
        .catch(err => console.log(err));

}
//pagination code is start

async function page(num,count) {

    let result = await fetch(`/examlist/page?page=${num}`);
    let data = await result.json();
    



    let tbody = document.getElementById('tbody');


    tbody.innerHTML = "";
    let str = "";

    str += ` <tr>
                    <th>Sr .No</th>
                    <th>exam_name</th>
                    <th>category</th>
                    <th>total_questions</th>
                    <th>time_limit</th>
                    <th>start date</th>
                    <th>exam statuss</th>
                    <th>edit</th>
                    

                </tr>`;

    for (i = 0; i < data.data1.length; i++) {
        str += `<tr>
                        <td>
                            <div class="td">
                                ${(i + 1)}

                            </div>
                        </td>
                        <td>
                            <div class="td">
                                ${data.data1[i].exam_name}

                            </div>

                        </td>
                        <td>
                            <div class="td">

                            ${data.data1[i].category}

                            </div>

                        </td>
                        <td>
                            <div class="td">
                                ${data.data1[i].total_questions}
                               

                            </div>

                        </td>
                        <td>
                            <div class="td">
                                ${data.data1[i].exam_time}
                               

                            </div>

                        </td>
                        <td>
                            <div class="td">
                                ${data.data1[i].exam_date}
                           

                            </div>

                        </td>
                        <td>


                            <div id="toggle${data.data1[i].exam_id}">
                                <p class="btn" id="${data.data1[i].exam_id}" onclick="toggle('${data.data1[i].exam_status}','${data.data1[i].exam_id}')" style="color: red;cursor:pointer">${data.data1[i].exam_status}</p>
                            
                            </div>
                        </td>
                        <td>


                            <div class="edit">
                            <p onclick="examedit(${data.data1[i].exam_id})" style="cursor: pointer;">edit</p>

                            </div>
                        </td>
                       
                    </tr>
                   `;
    }

    tbody.innerHTML = str;
    let pageid = document.getElementById('page');
   

    let newstr = '';
    pageid.innerHTML = "";

    if (num == 1) {

        pageid.innerHTML += `<p onclick="page(1)" class="p">prev</p>`;

    } else {

        pageid.innerHTML += `<p onclick="page(${num}-1)" class="p">prev</p>`;

    }

    for (let i = 1; i <= data.count; i++) {
        if (i == num) {
            pageid.innerHTML += `<p onclick="page(${i})" class="p">
            <b>${i}</b>
        </p>`;
        } else {
            pageid.innerHTML += `<p onclick="page(${i})" class="p">
            ${i}
        </p>`;
        }

    }

    if (num == count) {

        pageid.innerHTML += `<p onclick="page(7)" class="p">next</p>`;

    } else {
        pageid.innerHTML += `<p onclick="page(${num} + 1)" class="p">next</p>`;
    }

    let pclass = document.querySelectorAll('.p');
    

}