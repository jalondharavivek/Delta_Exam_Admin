async function pagination(i){
    let arr=[];
    document.getElementById('xyz').innerHTML="";  
        var text=document.getElementById('serch').value;
        var i2=i*10;
        await fetch(`/page`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text,i,i2
            })
        })
        .then(res => res.json())
        .then(data => {
             arr=data.query;
            var tabl='<tr>';
            var offset=arr.length;
            for(var k=0;k<arr.length;k++){
                tabl+='<td>'+arr[k].user_id+'</td><td>'+arr[k].exam_name+'</td><td>'+arr[k].total_questions+'</td><td>'+arr[k].exam_time+'</td><td>'+arr[k].category_name+'</td></tr>';
                document.getElementById('xyz').innerHTML=tabl;
            }
            if(arr.length%2==0){
                for(var j=1;j<=arr.length/10;j++){
                    document.getElementById(j).style.color='black';
                }
            }else{
                for(var j=1;j<=arr.length/10+1;j++){
                    document.getElementById(j).style.color='black';
                }
            }
            
            document.getElementById(i).style.color='red';
        })

    }

   