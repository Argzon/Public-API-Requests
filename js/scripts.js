/**
 * Variables Declared
 */
const url = 'https://randomuser.me/api/?results=12';
const gallery = document.getElementById('gallery');

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
        const person =`
        <div class="card">
            <div class="card-img-container">
                <img class="card-img" src="${data.results[i].picture.large}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${data.results[i].name.first} ${data.results[i].name.last}</h3>
                <p class="card-text">${data.results[i].email}</p>
                <p class="card-text cap">${data.results[i].location.city}, ${data.results[i].location.state}</p>
            </div>
        </div>
        `;
        gallery.insertAdjacentHTML('beforeend', person);
    }
}

/**
 * Event Listeners
 */