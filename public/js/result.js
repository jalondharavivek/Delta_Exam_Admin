
let page1 = document.getElementById('page');
let tbody = document.getElementById('tbody');


async function page(num, count1) {
 
    fetch(`/result/page?num=${num}`).then(res => res.json()).then(data => {
 
        tbody.innerHTML = "";
        for (i = 0; i < data.data.length; i++) {
            tbody.innerHTML += `<tr>
            <td>
                ${i + 1}
            </td>
            <td>
                ${data.data[i].name}
            </td>
            <td><a href="/companylist?id=${data.data[i].user_id}" id="${data.data[i].user_id}">View</a></td>
        </tr>`
        }
        page1.innerHTML = "";

        if (num == 1) {
            page1.innerHTML += `<p onclick="page(1,${count1})">prev</p>`

        } else {
            page1.innerHTML += `<p onclick="page(${num}-1,${count1})">prev</p>`

        }

        for (i = 1; i <= count1; i++) {
            if (i == num) {
                page1.innerHTML += `<p onclick="page(${i},${count1})"><b>${i}</b></p>`
            } else {
                page1.innerHTML += `<p onclick="page(${i},${count1})">${i}</p>`
            }
        }


        if (num == count1) {

            page1.innerHTML += `<p onclick="page(${count1},${count1})">next</p>`

        } else if (num < count1) {

            page1.innerHTML += `<p onclick="page(${num}+1,${count1})">next</p>`;
        }



    }).catch(err => console.log(err));

}

