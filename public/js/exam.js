
   function validateform(){
    let exam_name = document.getElementById('exam_name').value;
    let symbol = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '<', '>', '?', '/', ',', '.', '"', ':', ';', '+', '-', '`', '~','=','[',']','{','}'];

    if(exam_name==''){
      alert('name cant be empty')
      return false;
    }
     for(i=0;i<symbol.length;i++){
        if(exam_name.includes(symbol[i])){
            alert('special character is not allowed')
            return false;
        }
     }
     if(!isNaN(exam_name)){
        alert('only numbers are not allowed')
        return false;
     }
    

   }

   let exam_name = document.getElementById('exam_name').value;
    let question =  document.getElementById('question').value;
    let time = document.getElementById('time').value;
    let start_date = document.getElementById('start_date').value;
    let category_select = document.getElementById('category_select');


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

