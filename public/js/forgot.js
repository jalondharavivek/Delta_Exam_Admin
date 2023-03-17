
		async function compare() {
		event.preventDefault();
		let email = document.getElementById('email').value;

		await fetch('http://localhost:8000/xyz', {
			method: 'post',
			headers: {
				"Content-type": 'application/json'
			},
			body: JSON.stringify({
				email
			})
		})
		.then(res => res.json())
		.then(data => {
			console.log(data);
			var pass=document.getElementById('email').value;
			if (data.ans[1] == pass && data.ans[0] == true) {
				document.getElementById('not_regi').style.display='none';
				document.getElementById('button').style.display='block';
				return true;
			}
			if (( data.ans[0] == false ) ) {	
				document.getElementById('not_regi').style.display='block';
				document.getElementById('button').style.display='none';
				return false;
			}	
		})
	}
