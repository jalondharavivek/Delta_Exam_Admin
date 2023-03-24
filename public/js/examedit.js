let category_select = document.getElementById('category_select');


let category_id = [];
let category_name = [];

selectedcategory();

function selectedcategory() {
    let exam_id = document.getElementById('exam_id').value;
    console.log(exam_id);
    fetch(`/selected/category?exam_id=${exam_id}`).then(res => res.json()).then(data => {
        for (i = 0; i < data.length; i++) {

            category_id.push(data[i][0].category_id);

            category_name.push(data[i][0].category_name);
        }
    }
    ).catch(err => console.log(err));

}

console.log(category_name)
categortFetch();
function categortFetch() {
    fetch('/categories').then(res => res.json()).then(data => {
        console.log(data.arr.length)
        console.log(category_id.length)
        let checker;
        for (let i = 0; i < data.arr.length; i++) {

            for (j = 0; j < category_id.length; j++) {

                if (data.arr[i] == category_name[j]) {
                    console.log("if")
                    category_select.innerHTML += `<option value="${data.arr2[i]}" selected>${data.arr[i]}</option>`;
                    checker = i;
                    console.log("checker", checker)
                }
            }
            if (checker != i) {
                category_select.innerHTML += `<option value="${data.arr2[i]}">${data.arr[i]}</option>`;

            }

        }

    }).catch(err => console.log(err));
}



