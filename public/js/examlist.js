let category_select = document.getElementById('category_select');

//categoty fetch on ajax 
categortFetch();
function categortFetch() {
    fetch('/categories').then(res => res.json()).then(data => {
        // console.log("data", data)
        // console.log(data.arr.length);
        // console.log(data.arr2.length);

        for (let i = 0; i < data.arr.length; i++) {
            // console.log(data.arr[i])
            // console.log(data.arr2[i])
            category_select.innerHTML += ` <option value="${data.arr2[i]}">${data.arr[i]}</option>`;

        }

    }).catch(err => console.log(err));
}
// ..exam search 
function examSearch() {
    console.log("examsearch")
    let search = document.getElementById('search').value;
    let exam_search = document.getElementById('exam_search');
    console.log(search);
    console.log(exam_search);
    fetch(`/examlist?exam_name=${search}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.length == 0){
                tbody.innerHTML = "there is no found data";
            }
            let tbody = document.getElementById('tbody');
            tbody.innerHTML = "" ;
            let str=  "" ;
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
                        for(i=0 ;i<data.length ;i++){
                           str += `<tr>
                                <td>
                                    <div class="td">
                                        ${(i+1)}

                                    </div>
                                </td>
                                <td>
                                    <div class="td">
                                        ${data[i].exam_name}

                                    </div>

                                </td>
                                <td>
                                    <div class="td">

                                        ${data[i].category}

                                    </div>

                                </td>
                                <td>
                                    <div class="td">
                                        ${data[i].total_questions}
                                       

                                    </div>

                                </td>
                                <td>
                                    <div class="td">
                                        ${data[i].exam_time}
                                       

                                    </div>

                                </td>
                                <td>
                                    <div class="td">
                                        ${data[i].exam_date}
                                   

                                    </div>

                                </td>
                                <td>


                                    <div id="toggle${data[i].exam_id}">
                                        <p class="btn" id="${data[i].exam_id}" onclick="toggle('${data[i].exam_status}','${data[i].exam_id}')" style="color: red;cursor:pointer">${data[i].exam_status}</p>
                                    
                                    </div>
                                </td>
                                <td>


                                    <div class="edit">
                                        <a href="/edit?exam_id=${data[i].exam_id}">edit</a>

                                    </div>
                                </td>
                               
                            </tr>
                           `;
                        }
          
                        tbody.innerHTML = str ;
            console.log(data)   
        })
        .catch(err => console, log(err));

}


togglecolorchnage();
function togglecolorchnage(){
    let btn = document.querySelectorAll('.btn');
    btn.forEach(e => {

    console.log(e);
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


function toggle(status,id){
    let togglediv = document.getElementById(`toggle${id}`);
    let toggle_id =document.getElementById(`${id}`);

    fetch(`/exam/status?status=${status}&id=${id}`).then(res=>res.json()).then(data=>{
       if(data.info = 'rows matched: 1 changed: 1 Warnings: 0'){
        if(status == '1'){
            togglediv.innerHTML = ` <p class="btn" id="${id}" onclick="toggle('0','${id}')" style="color: red;cursor:pointer">DISABLE</p>`;
        }else if(status = '0'){
            togglediv.innerHTML = ` <p class="btn" id="${id}" onclick="toggle('1','${id}')" style="color: blue;cursor:pointer">ENABLE</p>`;
        }
       }
    }).catch(err=>console.log(err));
}


