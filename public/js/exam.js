console.log("milan chudasma espark")


let category_select = document.getElementById('category_select');
console.log(category_select);

categortFetch();
function categortFetch() {
    fetch('/category').then(res => res.json()).then(data => {
        console.log("data", data)
        console.log(data.arr.length);
        console.log(data.arr2.length);

        for (let i = 0; i < data.arr.length; i++) {
            console.log(data.arr[i])
            console.log(data.arr2[i])
            category_select.innerHTML += ` <option value="${data.arr2[i]}">${data.arr[i]}</option>`;
            console.log(category_select.innerHTML);

        }

    }).catch(err => console.log(err));
}

