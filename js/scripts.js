/**
 * Variables Declared
 */
const url = 'https://randomuser.me/api/?results=12';
const gallery = document.getElementById('gallery');
const search = document.querySelector('.search-container');

/**
 * Fetch Requests
 */
fetch(url)
    .then(res => res.json())
    .then(data => generateUser(data))
    


/**
 * Helper Functions
//  */
function generateUser(data) {
    for (let i = 0; i < data.results.length; i++) {
        const user = data.results[i];
        const person =`
        <div class="card">
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
        gallery.insertAdjacentHTML('beforeend', person);
    }
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

/**
 * Event Listeners
 */