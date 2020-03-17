const randUserUrl = 'https://fsjs-public-api-backup.herokuapp.com/api/';
const employeeSection = document.querySelector('.employees');
let employeeData = [];

/*Code for requesting random user data.*/
async function getStartupDirectory(url) {
    const directoryResponse = await fetch(url);
    const directoryJSON = await directoryResponse.json();
    const directoryData = directoryJSON.results;
    employeeData.push(directoryData);
    employeeData = employeeData[0];
    console.log(employeeData);
    return directoryData;
}

/*Code for generating user cards and calling the generateModal function when a card is clicked.*/
function createEmployee(data) {
    data.map(employee => {
        const newDiv = document.createElement('div');
        newDiv.classList.add("employee-card");
        employeeSection.appendChild(newDiv);
        newDiv.innerHTML =`
        <img src=${employee.picture.large} alt="Employee Image">
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
            generateModal(employeeData[index]);
        });
    });
}

/*Code for fetching user data then calling the createEmployee function.*/
getStartupDirectory(randUserUrl)
    .then(createEmployee);

/*Function for generating the modal overlay when an employee card is clicked.*/
function generateModal(data) {
    let birthDate = data.dob.date.substring(0, 10);
    const bodyOfPage = document.querySelector('body');
    const newModal = document.createElement('div');
    bodyOfPage.appendChild(newModal);
    newModal.classList.add('modal');
    newModal.style.display = 'block';
    newModal.innerHTML=`
        <div class="profile">
            <div class="imgX">
                <img src="icons/x-mark.png" class="x" alt="close">
            </div>
            <img src="${data.picture.large}" class="modal-img" alt="Employee Image">
            <h2>${data.name.first} ${data.name.last}</h2>
            <p>${data.email}</p>
            <p>${data.phone}</p>
            <p>${data.location.street.number} ${data.location.street.name}</p>
            <p>${data.location.city}, ${data.location.state} ${data.location.postcode}</p>
            <p>Birthday: ${birthDate}</p>
        </div>
        `;
     
    /*Code for adding a click event listener to the x icon and outside profile area that will close the modal window.*/
    const modalContainer = document.querySelector('.modal');    
    modalContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('x') || event.target.classList.contains('modal')) {
            modalContainer.parentNode.removeChild(modalContainer);
        }
    });
}
