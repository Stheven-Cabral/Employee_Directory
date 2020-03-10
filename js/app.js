const randUserUrl = 'https://randomuser.me/api/?results=12';
const employeeSection = document.querySelector('.employees');

/*Code for Requesting Random User Data*/
async function getStartupDirectory(url) {
    const directoryResponse = await fetch(url);
    const directoryJSON = await directoryResponse.json();
    console.log(directoryJSON.results);
    return directoryJSON.results;
}

function createHTML(data) {
    data.map(employee => {
        const newDiv = document.createElement('div');
        employeeSection.appendChild(newDiv);
        newDiv.innerHTML =`
        <img src=${employee.picture.medium}>
        <h2>${employee.name.first} ${employee.name.last}</h2>
        <p>${employee.email}</p>
        <p>${employee.location.state}</p>
        `;
    });
}

getStartupDirectory(randUserUrl)
    .then(createHTML)
;

// // /*Example code to go off by*/
// const astrosUrl = 'http://api.open-notify.org/astros.json';
// const wikiUrl = 'https://en.wikipedia.org/api/rest_v1/page/summary/';
// const peopleList = document.getElementById('people');
// const btn = document.querySelector('button');

// // Handle all fetch requests
// async function getPeopleInSpace(url) {
//   const peopleResponse = await fetch(url);
//   const peopleJSON = await peopleResponse.json();
//   console.log(peopleJSON);
//   const profiles = peopleJSON.people.map( async (person) => {
//     const craft = person.craft;
//     const profileResponse = await fetch(wikiUrl + person.name);
//     const profileJSON = await profileResponse.json();

//     return { ...profileJSON, craft };
//   });

//   return Promise.all(profiles);
// }

// getPeopleInSpace(astrosUrl);

// // Generate the markup for each profile
// function generateHTML(data) {
//   data.map( person => {
//     const section = document.createElement('section');
//     peopleList.appendChild(section);
//     section.innerHTML = `
//       <img src=${person.thumbnail.source}>
//       <span>${person.craft}</span>
//       <h2>${person.title}</h2>
//       <p>${person.description}</p>
//       <p>${person.extract}</p>
//     `;
//   });
// }

// btn.addEventListener('click', (event) => {
//   event.target.textContent = 'Loading...';

//   getPeopleInSpace(astrosUrl)
//     .then(generateHTML)
//     .finally( () => event.target.remove() )
// });
    