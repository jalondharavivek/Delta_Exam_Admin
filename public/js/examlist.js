

// let category_select = document.getElementById('category_select');


// //categoty fetch on ajax 
// categortFetch();
// function categortFetch() {
//     fetch('/categories').then(res => res.json()).then(data => {

//         for (let i = 0; i < data.arr.length; i++) {

//             category_select.innerHTML += `<option value="${data.arr2[i]}">${data.arr[i]}</option>`;
//         }
//     }).catch(err => console.log(err));
// }


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
                <label for="">UPDATE EXAM</label>
            </div>
            <form action="/edit" method="post" onsubmit="return validateform()">
                <input type="text" name="exam_id" value="${data[0].exam_id}" id="exam_id" hidden>
    
                <div class="two">
                    <div class="input_taker">
    
                        <label for="exam_name" class="labelofInput"> exam name: </label>
                        <input type="text" name="exam_name" value="${data[0].exam_name}"
                            placeholder="enter exam name" class="input_tag"  required >
    
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
                            value="${(new Date(data[0].exam_date).toLocaleDateString())}" class="input_tag" required>
    
                    </div>
    
    
                </div>
                <div class="save_div">
    
                    <input type="submit" id="save_btn" value="UPDATE" style="cursor:pointer">
                    <a href='/examlist'>cancel</a>
    
    
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
   
    

    async function selectedcategory() {
     
        let category_name = [];
        let exam_id = document.getElementById('exam_id').value;

        await fetch(`/selected/category?exam_id=${exam_id}`).then(res => res.json()).then(data => {
     
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
          
            let checker;
            for (let i = 0; i < data.arr.length; i++) {
          
                for (j = 0; j < arat.length; j++) {
                   
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
                            placeholder="enter exam name" class="input_tag" oninput="checkexam(this.value)"  required>
                    </div>
                    <div class="input_taker">
                        <label for="" class="labelofInput"> category :</label>
                        <select name="category" id="category_select" multiple required>
                        </select>
                    </div>
                    <div class="input_taker">
                        <label for="question" class="labelofInput">no of questions: </label>
                        <input type="text" name="question" id="question"
                            placeholder="enter no of questions" class="input_tag" min="10" max="50"
                            value="10" required>
                    </div>
                    <div class="input_taker">
                        <label for="time" class="labelofInput"> time limit: </label>
                        <input type="text" name="time" id="time" placeholder="enter time limit"
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
                    <input type="submit" id="save_btn" value="SAVE" style="cursor: pointer;">
                    <a href='/examlist'>cancel</a>
                   
                </div>
            </form>
        </div>
    </div>`;
        return str;
    }

    change.innerHTML = await htmstring();


    

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
// validation for exam add and edit
function validateform() {
    
    let exam_name = document.getElementById('exam_name').value;
    let question = document.getElementById('question').value ;
    let start_date = document.getElementById('start_date').value
    let time = document.getElementById('time').value;
    let symbol = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '<', '>', '?', '/', ',', '.', '"', ':', ';', '+', '-', '`', '~', '=', '[', ']', '{', '}','1','2','3','4','5','6','7','8','9','0'];
    
    
    if (exam_name == '' || question == '' || start_date == '' || time == '') {
        alert(`field can't be empty`);
        return false;
    }
    for (i = 0; i < symbol.length; i++) {
        if (exam_name.includes(symbol[i])) {
            alert('only alphabetic exam name is allowed')
            return false;
        }
    }
    if(isNaN(question) || isNaN(time)){
        alert("only numbers is allowed");
        return false;
    
    }
    if(parseInt(question) <10 || parseInt(question)>50){
        alert('enter 5 to 50 between')
        return false ;
    }
    if(parseInt(time)<10 || parseInt(time)>180){
        alert('enter 5 to 50 between');
        return false ;
    }
    if(question.includes(".")){
        alert("point in not allowed in question")
        return false ;
    }
    if(time.includes(".")){
        alert("point in not allowed in time");
        return false ;

    }


}
//exam search code
function examSearch(curpage) {
    let tbody = document.getElementById('tbody');

    let search = document.getElementById('search').value;
    let exam_search = document.getElementById('exam_search');

    fetch(`/exam/search?exam_name=${search}&&num=${curpage}`).then(res => res.json()).then(data => {
       
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
        if (data.data1.length !=0) {
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
                                            ${data.data1[i].category_name}
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
                                            ${(new Date(data.data1[i].exam_date).toLocaleDateString())}
                                       
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
        }
        else
        {
            str += `<tr><td colspan="8">No record found</td></tr>`;
        }
        
        let count = data.data5.length/data.limit ;
 
          
        if(count <= 1){
            count = 1 ;
        }else{
           count = Math.ceil(data.data5.length/data.limit);  
           
        }
       

        tbody.innerHTML = str;
        togglecolorchnage();

        let pageid = document.getElementById('page');
       

        let newstr = '';
        pageid.innerHTML = "";

        if(search.length == 0){
            if (data.curpage == 1) {

                pageid.innerHTML += `<p onclick="examSearch(1)" class="p">prev</p>`;
    
            } else {
    
                pageid.innerHTML += `<p onclick="examSearch(${data.curpage}-1)" class="p">prev</p>`;
    
            }
    
            for (let i = 1; i <= data.count1; i++) {
                if (i == data.curpage) {
                    pageid.innerHTML += `<p onclick="examSearch(${i})" class="p">
                <b>${i}</b>
            </p>`;
                } else {
                    pageid.innerHTML += `<p onclick="examSearch(${i})" class="p">
                ${i}
            </p>`;
                }
    
            }
            if (data.curpage == data.count1) {
                pageid.innerHTML += `<p onclick="examSearch(${data.count1})" class="p">next</p>`;
    
            } else {
                pageid.innerHTML += `<p onclick="examSearch(${data.curpage} + 1)" class="p">next</p>`;
            }
        }else{
            if (data.curpage == 1) {

                pageid.innerHTML += `<p onclick="examSearch(1)" class="p">prev</p>`;
    
            } else {
    
                pageid.innerHTML += `<p onclick="examSearch(${data.curpage}-1)" class="p">prev</p>`;
    
            }
    
            for (let i = 1; i <= count; i++) {
                if (i == data.curpage) {
                    pageid.innerHTML += `<p onclick="examSearch(${i})" class="p">
                <b>${i}</b>
            </p>`;
                } else {
                    pageid.innerHTML += `<p onclick="examSearch(${i})" class="p">
                ${i}
            </p>`;
                }
    
            }
            if (data.curpage == count) {
                pageid.innerHTML += `<p onclick="examSearch(${count})" class="p">next</p>`;
    
            } else {
                pageid.innerHTML += `<p onclick="examSearch(${data.curpage} + 1)" class="p">next</p>`;
            }
        }
         
     

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
                            ${data.data1[i].category_name}
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
                                ${(new Date(data.data1[i].exam_date).toLocaleDateString())}
                           
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
    togglecolorchnage();
    let pageid = document.getElementById('page');
   

    let newstr = '';
    pageid.innerHTML = "";

    if (num == 1) {

        pageid.innerHTML += `<p onclick="page(1,${count})" class="p">prev</p>`;

    } else {

        pageid.innerHTML += `<p onclick="page(${num}-1,${count})" class="p">prev</p>`;

    }
    
    for (let i = 1; i <= data.count; i++) {
        
        if (i == num) {
            pageid.innerHTML += `<p onclick="page(${i},${count})" class="p">
            <b>${i}</b>
        </p>`;
        } else {
            pageid.innerHTML += `<p onclick="page(${i},${count})" class="p">
            ${i}
        </p>`;
        }

    }

    if (num == count) {
        
        pageid.innerHTML += `<p onclick="page(${count} ,${count})" class="p">next</p>`;

    } else if(num < count){
        
        pageid.innerHTML += `<p onclick="page(eval(${num}+1) ,${count})" class="p">next</p>`;
    }

    let pclass = document.querySelectorAll('.p');
    

}