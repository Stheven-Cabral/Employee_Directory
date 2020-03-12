const randUserUrl = 'https://randomuser.me/api/?results=12&nat=US';
const employeeSection = document.querySelector('.employees');
let employeeData = [];

/*Code for Requesting Random User Data*/
async function getStartupDirectory(url) {
    const directoryResponse = await fetch(url);
    const directoryJSON = await directoryResponse.json();
    const directoryData = directoryJSON.results;
    employeeData.push(directoryData);
    employeeData = employeeData[0];
    return directoryData;
}

/*Code for generating user cards and calling the generateModal function when a card is clicked*/
function createHTML(data) {
    data.map(employee => {
        const newDiv = document.createElement('div');
        newDiv.classList.add("employee-card");
        employeeSection.appendChild(newDiv);
        newDiv.innerHTML =`
        <img src=${employee.picture.large}>
        <div class="employee-text">
            <h2>${employee.name.first} ${employee.name.last}</h2>
            <p>${employee.email}</p>
            <p>${employee.location.city}</p>
        </div>
        `;
    });

    const allEmployeeCards = employeeSection.querySelectorAll('.employee-card');

    allEmployeeCards.forEach((card, index) => {
        card.addEventListener('click', (e) => {
            console.log(employeeData[index]);
            generateModal(employeeData[index]);
        });
    });   
}

/*Function for generating the modal*/
function generateModal(data) {
    let birthDate = data.dob.date.substring(0, 10);
    console.log(birthDate);
    const bodyOfPage = document.querySelector('body');
    const newModal = document.createElement('div');
    bodyOfPage.appendChild(newModal);
    newModal.classList.add('modal');
    newModal.innerHTML=`
        <div class="profile">
            <div class="imgX">
                <img src="icons/x-mark.png" class="x">
            </div>
            <img src="${data.picture.large}" class="modal-img" alt="close">
            <h2>${data.name.first} ${data.name.last}</h2>
            <p>${data.email}</p>
            <p>${data.phone}</p>
            <p>${data.location.street.number} ${data.location.street.name}</p>
            <p>${data.location.city}, ${data.location.state} ${data.location.postcode}</p>
            <p>Birthday: ${birthDate}</p>
        </div>
        `; 
}

/*Code for adding a click event listener to the x icon and outside the modal profile that will close the modal window*/


/*Code for fetching user data then calling the createHTML function*/
getStartupDirectory(randUserUrl)
    .then(createHTML);