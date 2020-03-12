const randUserUrl = 'https://randomuser.me/api/?results=12&nat=US';
const employeeSection = document.querySelector('.employees');
let employeeData = [];

/*Code for Requesting Random User Data*/
async function getStartupDirectory(url) {
    const directoryResponse = await fetch(url);
    const directoryJSON = await directoryResponse.json();
    const directoryData = directoryJSON.results;
    employeeData.push(directoryData);
    return directoryData;
}

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
    console.log(allEmployeeCards);

    allEmployeeCards.forEach((card, index) => {
        card.addEventListener('click', (e) => {
            console.log(employeeData[index]);
            generateModal(employeeData[index]);
        });
    });   
}

function generateModal(data) {
    const bodyOfPage = document.querySelector('body');
    const newModal = document.createElement('div');
    bodyOfPage.appendChild(newModal);
    newModal.classList.add('modal');
    newModal.innerHTML=`
        <div class="profile">
            <div class="imgX">
                <img src="">
            </div>
            <img>
            <h3></h3>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
        </div>
        `; 
}

getStartupDirectory(randUserUrl)
    .then(createHTML);