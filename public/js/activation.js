async function activclick() {
    var email = '<%= email %>';
    var resultRandom = "<%= resultRandom %>";
    console.log(email);
    fetch(`/active/${resultRandom}`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                resultRandom
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data.UpdateStatus);

        })
}