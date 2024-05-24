document.getElementById('get-user').addEventListener('click', getUser);
document.getElementById('create-category').addEventListener('click', createCategory);
document.getElementById('add-user-to-category').addEventListener('click', addUserToCategory);
document.getElementById('fetch-categories').addEventListener('click', fetchCategories);

let categories = {};
let currentUser = null;

function getUser() {
    fetch('https://randomuser.me/api/')
        .then(response => response.json())
        .then(data => {
            currentUser = data.results[0];
            renderUser(currentUser);
        })
        .catch(error => console.error('Error fetching user:', error));
}

function renderUser(user) {
    const userDetails = document.getElementById('user-details');
    userDetails.innerHTML = `
        <img src="${user.picture.large}" alt="${user.name.first} ${user.name.last}">
        <table>
            <tr>
                <th>Name</th>
                <td>${user.name.title} ${user.name.first} ${user.name.last}</td>
            </tr>
            <tr>
                <th>Gender</th>
                <td>${user.gender}</td>
            </tr>
            <tr>
                <th>Email</th>
                <td>${user.email}</td>
            </tr>
            <tr>
                <th>Location</th>
                <td>${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state}, ${user.location.country}, ${user.location.postcode}</td>
            </tr>
            <tr>
                <th>Username</th>
                <td>${user.login.username}</td>
            </tr>
            <tr>
                <th>DOB</th>
                <td>${new Date(user.dob.date).toLocaleDateString()} (Age: ${user.dob.age})</td>
            </tr>
            <tr>
                <th>Phone</th>
                <td>${user.phone}</td>
            </tr>
            <tr>
                <th>Cell</th>
                <td>${user.cell}</td>
            </tr>
            <tr>
                <th>Nationality</th>
                <td>${user.nat}</td>
            </tr>
        </table>
    `;
}

function createCategory() {
    const categoryName = document.getElementById('category-name').value;
    if (categoryName) {
        if (!categories[categoryName]) {
            categories[categoryName] = [];
            updateCategorySelect();
            alert(`Category "${categoryName}" created.`);
        } else {
            alert(`Category "${categoryName}" already exists.`);
        }
    } else {
        alert('Please enter a category name.');
    }
}

function updateCategorySelect() {
    const categorySelect = document.getElementById('category-select');
    categorySelect.innerHTML = '';
    for (let category in categories) {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categorySelect.appendChild(option);
    }
}

function addUserToCategory() {
    const selectedCategory = document.getElementById('category-select').value;
    if (selectedCategory && currentUser) {
        categories[selectedCategory].push(currentUser);
        alert(`User added to category "${selectedCategory}".`);
    } else {
        alert('Please get a user and select a category first.');
    }
}

function fetchCategories() {
    const categoryDetails = document.getElementById('category-details');
    categoryDetails.innerHTML = '';

    for (let category in categories) {
        const categoryDiv = document.createElement('div');
        categoryDiv.innerHTML = `<h3>${category}</h3>`;

        if (categories[category].length > 0) {
            const userTable = document.createElement('table');
            userTable.classList.add('user-table'); // Add a class for styling
            userTable.innerHTML = `
                <tr>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>Email</th>
                    <th>Location</th>
                    <th>Username</th>
                    <th>DOB</th>
                    <th>Phone</th>
                    <th>Cell</th>
                    <th>Nationality</th>
                </tr>
            `;

            categories[category].forEach(user => {
                const userRow = document.createElement('tr');
                userRow.innerHTML = `
                    <td>${user.name.title} ${user.name.first} ${user.name.last}</td>
                    <td>${user.gender}</td>
                    <td>${user.email}</td>
                    <td>${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state}, ${user.location.country}, ${user.location.postcode}</td>
                    <td>${user.login.username}</td>
                    <td>${new Date(user.dob.date).toLocaleDateString()} (Age: ${user.dob.age})</td>
                    <td>${user.phone}</td>
                    <td>${user.cell}</td>
                    <td>${user.nat}</td>
                `;
                userTable.appendChild(userRow);
            });

            categoryDiv.appendChild(userTable);
        } else {
            categoryDiv.innerHTML += '<p>No users in this category.</p>';
        }

        categoryDetails.appendChild(categoryDiv);
    }
}
