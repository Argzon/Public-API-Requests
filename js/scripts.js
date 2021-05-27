// Variables Declared
const url = 'https://randomuser.me/api/?results=12&nat=us';
const gallery = document.getElementById('gallery');
const search = document.querySelector('.search-container');
let usersList = [];
let currentModal;

// Create and insert Modal Window on DOM
const modalWindow = document.createElement('div');
modalWindow.className = 'modal-container';
document.querySelector('body').appendChild(modalWindow);


// Fetch Request
fetch(url)
    .then(res => res.json())
    .then(data => {
        usersList = data.results;
        generateUser(usersList);
    })

/**
 * Generate users and insert them to gallery div
 * @param {data} data from api request
 */
function generateUser(data) {
    let users = [];
    for (let i = 0; i < data.length; i++) {
        const user = data[i];
        const person =`
        <div class="card" onClick="openModal(${i})">
            <div class="card-img-container">
                <img class="card-img" src="${user.picture.large}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${user.name.first} ${user.name.last}</h3>
                <p class="card-text">${user.email}</p>
                <p class="card-text cap">${user.location.city}, ${user.location.state}</p>
            </div>
        </div>
        `;
        users.push(person);
    }
    gallery.innerHTML = users.join('');
}

/**
 * Display modal view of singular user
 */
function returnUser (user) {
    const userInfo = `
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn" onclick="closeModal()"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${user.picture.large}" alt="profile picture">
                <h3 id="name" class="modal-name cap">${user.name.first} ${user.name.last}</h3>
                <p class="modal-text">${user.email}</p>
                <p class="modal-text cap">${user.location.city}</p>
                <hr>
                <p class="modal-text">${formatPhoneNumber(user.cell)}</p>
                <p class="modal-text">${+user.location.street.number} ${user.location.street.name}, ${user.location.country}, ${user.location.postcode}</p>
                <p class="modal-text">Birthday: ${user.dob.date.slice(5, 7)}/${user.dob.date.slice(8, 10)}/${user.dob.date.slice(0, 4)}</p>
            </div>
        </div>
        
        <div class="modal-btn-container">
            <button type="button" id="modal-prev" class="modal-prev btn" onclick="prevUser()">Prev</button>
            <button type="button" id="modal-next" class="modal-next btn" onclick="nextUser()">Next</button>
        </div>
    `

    return userInfo
}

/**
 * Open modal
 * @param {index} index of current user
 */
function openModal (index) {
    currentModal = index;
    const currentUser = usersList[currentModal];
    modalWindow.style.display = 'block';
    modalWindow.innerHTML = returnUser(currentUser);
}

// Close Modal Function
function closeModal () {
    modalWindow.style.display = 'none';
    modalWindow.innerHTML = "";
}

// Next User Function
function nextUser () {
    if(currentModal === usersList.length - 1) return;
    currentModal++;
    const currentUser = usersList[currentModal];
    modalWindow.style.display = 'block';
    modalWindow.innerHTML = returnUser(currentUser);
}

// Previous User Function
function prevUser () {
    if(currentModal === 0) return;
    currentModal--;
    const currentUser = usersList[currentModal];
    modalWindow.style.display = 'block';
    modalWindow.innerHTML = returnUser(currentUser);
}

// Search input created and added to the document
function searchInput() {
    const searchInput = `
        <form action="#" method="get">
            <input type="search" id="search-input" class="search-input" placeholder="Search...">
            <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
        </form>
    `;
    search.innerHTML = searchInput;
}
searchInput();

// Format phone number
function formatPhoneNumber(phoneNumberString) {
    const cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return null;
  }


  
/**
 * Event Listeners
 */

search.addEventListener('keyup', (e) => {
    e.preventDefault();
    const searchInput = document.getElementById('search-input');
    const inputValue = searchInput.value.toLowerCase();
    if(inputValue) {
        const newList = usersList.filter(user => user.name.first.toLowerCase().includes(inputValue) || user.name.last.toLowerCase().includes(inputValue));
        if(newList.length > 0) {
            generateUser(newList);
        } else {
            gallery.innerHTML = `<h1>Nothing found</h1>`;
        }
    } else {
        generateUser(usersList);
    }
})