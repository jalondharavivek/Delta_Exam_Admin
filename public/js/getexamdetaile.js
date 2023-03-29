
let page1 = document.getElementById('page');
let tbody = document.getElementById('tbody');


async function page(num, count1,user) {
 
    fetch(`/getexamdetaile/page?num=${num}&id=${user}`).then(res => res.json()).then(data1 => {
        
   
        tbody.innerHTML = "";
 
        for (i = 0; i < data1.data.length; i++) {
            tbody.innerHTML += `<tr>
            <td>${data1.data[i].category_name}</td>
            <td><a href="/viewquestionresult?id=${data1.data[i].category_id}" id="${data1.data[i].category_name}">View</a></td>
            </tr>`;
        }
        page1.innerHTML = "";

        if (num == 1) {
            page1.innerHTML += `<p onclick="page(1,${count1},${user})">prev</p>`

        } else {
            page1.innerHTML += `<p onclick="page(${num}-1,${count1},${user})">prev</p>`

        }

        for (i = 1; i <= count1; i++) {
            if (i == num) {
                page1.innerHTML += `<p onclick="page(${i},${count1},${user})"><b>${i}</b></p>`
            } else {
                page1.innerHTML += `<p onclick="page(${i},${count1},${user})">${i}</p>`
            }
        }


        if (num == count1) {

            page1.innerHTML += `<p onclick="page(${count1},${count1},${user})">next</p>`

        } else if (num < count1) {

            page1.innerHTML += `<p onclick="page(${num}+1,${count1},${user})">next</p>`;
        }



    }).catch(err => console.log(err));

}

