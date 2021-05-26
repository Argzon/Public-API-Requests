/**
 * Variables Declared
 */
const url = 'https://randomuser.me/api/?results=12';
const gallery = document.getElementById('gallery');
const search = document.querySelector('.search-container');
let usersList = [];
let currentModal;

/**
 * Fetch Requests
 */
fetch(url)
    .then(res => res.json())
    .then(data => {
        usersList = data.results;
        generateUser();
    })

function openModal (index) {
    currentModal = index;
    const currentUser = usersList[currentModal];
    console.log("user", currentUser);
    const userInfo = `
    <div class="modal-container" onclick="closeModal()">
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${currentUser.picture.large}" alt="profile picture">
                <h3 id="name" class="modal-name cap">${currentUser.name.first} ${currentUser.name.last}</h3>
                <p class="modal-text">${currentUser.email}</p>
                <p class="modal-text cap">city</p>
                <hr>
                <p class="modal-text">(555) 555-5555</p>
                <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
                <p class="modal-text">Birthday: ${currentUser.dob.date}</p>
            </div>
        </div>
        
        <div class="modal-btn-container">
            <button type="button" id="modal-prev" class="modal-prev btn" onclick="prevUser()">Prev</button>
            <button type="button" id="modal-next" class="modal-next btn" onclick="nextUser()">Next</button>
        </div>
    </div>
    `
    
    document.querySelector('body').insertAdjacentHTML("beforeend", userInfo)
}

function closeModal () {
    const modal = document.querySelector(".modal-container");

    document.querySelector('body').removeChild(modal)
}

/**
 * Helper Functions
//  */
function generateUser() {
    for (let i = 0; i < usersList.length; i++) {
        const user = usersList[i];
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
        gallery.innerHTML += person;
    }
}

function nextUser () {
    currentModal++;
    openModal(currentModal);
}

function prevUser () {
    currentModal--;
    openModal(currentModal);
}


// Search input
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

search.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchInput = document.getElementById('search-input');
    console.log("submit", searchInput.value);
    usersList = usersList.filter(user => user.name.first === searchInput.value);
    gallery.innerHTML = ``;
    generateUser();
    console.log("", usersList[0].name.first);
    
})

/**
 * Event Listeners
 */
