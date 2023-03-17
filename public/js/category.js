let sts = document.querySelectorAll('#status');
sts.forEach(e => {
    if (e.innerHTML == '0') {
        e.innerHTML = 'DISABLE';
        e.style.color = 'white';
        e.style.backgroundColor = 'red';
    }
    else  if(e.innerHTML == '1')
    {
        e.innerHTML = 'ENABLE';
        e.style.color = 'white';
        e.style.backgroundColor = 'blue';
    }
})

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
            window.location.reload();
        }
        catch (err) {
            console.log(err);
        }
       
    }
    
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
            });
            noButton.addEventListener('click', function() {
                dialogues.style.display = 'none';
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
            });
            noButton.addEventListener('click', function() {
                dialogue.style.display = 'none';
            });
            dialogue.style.display = 'block';
        }
    }
    catch (err) 
    {
        console.log(err);
    }    
}