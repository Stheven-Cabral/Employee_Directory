const randUserUrl = 'https://randomuser.me/api/?results=12&nat=US';
const employeeSection = document.querySelector('.employees');

/*Code for Requesting Random User Data*/
async function getStartupDirectory(url) {
    const directoryResponse = await fetch(url);
    const directoryJSON = await directoryResponse.json();
    return directoryJSON.results;
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
    return data;
}

getStartupDirectory(randUserUrl)
    .then(createHTML);

const bodyOfPage = document.querySelector('body');
const employeeCard = document.querySelector('.employee-card');
employeeCard.addEventListener('click', () => {
    const newModal = document.createElement('div');
    newModal.classList.add('.modal');
    bodyOfPage.appendChild(newModal);
});