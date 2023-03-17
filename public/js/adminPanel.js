let userdata;
	async function compare() {
		event.preventDefault();
		let email = document.getElementById('username').value;
		let error = document.getElementById('error');

		await fetch('http://localhost:8000/abc', {
			method: 'post',
			headers: {
				"Content-type": 'application/json'
			},
			body: JSON.stringify({
				email,
				password
			})
		})
		.then(res => res.json())
		.then(data => {
			userdata = data;
			if (userdata.flg == false) {
				document.getElementById('forgot').style.display = 'none';
				document.getElementById('error').style.display = 'block';
				document.getElementById('password').style.display = 'none';
				document.getElementById('username').style.display = 'none';
				document.getElementById('btnn').style.display = 'none';
				document.getElementById('uname').style.display = 'none';
				document.getElementById('pass').style.display = 'none';
				return false;
			}
			if (userdata.flg == true) {
				console.log(email);
				location.assign("/login")
				return true;
			}
		})
	}