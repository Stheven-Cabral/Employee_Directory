/*Code for Requesting Random User Data*/
fetch('https://randomuser.me/api/?results=12')
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log(data);
    });