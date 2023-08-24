let users = [];

const idEl = document.getElementById('id');
const nameEl = document.getElementById('name');
const ageEl = document.getElementById('lastName');
const phoneEl = document.getElementById('email');
const saveButton = document.querySelector('.save-btn');
const tbody = document.getElementById('tbody');

let idCounter = 1;
let currentRow = null;

fetchApi();

function createCell(content, classNames) {
    const cell = document.createElement('td');
    cell.innerHTML = content;
    cell.classList = classNames;
    return cell;
}

function createButtonCell() {
    return createCell("<button class='edit-btn'>Edit</button> <button class='remove-btn'>Remove</button>", 'grid-item')
};

function addRow() {
    const userId = idCounter++;

    const newUser = {
        id: userId,
        first_name: nameEl.value,
        last_name: ageEl.value,
        email: phoneEl.value
    };

    users.push(newUser);
    console.log(users)
    clearInputFields()
    showTable(users);
};


function showTable(users) {
    const table = document.getElementById("tbody");
    table.innerHTML = "";
    idCounter = 1;
    users.forEach(user => {
        const row = document.createElement('tr');
        const userId = idCounter++;


        const newUser = {
            id: user.id,
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email
        };

        const cells = [
            createCell(userId, 'grid-item'),
            createCell(newUser.firstName, 'grid-item'),
            createCell(newUser.lastName, 'grid-item'),
            createCell(newUser.email, 'grid-item'),
            createButtonCell()
        ];

        cells.forEach(cell => row.appendChild(cell));
        tbody.appendChild(row);


        const editButton = row.querySelector('.edit-btn');
        editButton.addEventListener('click', () => {
            editRow(row, newUser);
        })

        const removeBtn = row.querySelector('.remove-btn');
        removeBtn.addEventListener('click', () => {
            removeRow(row, userId);
        })

        clearInputFields()
    })

};

function editRow(row, newUser) {
    const cells = row.querySelectorAll('.grid-item');

    const id = row.querySelectorAll('.grid-item')[0].textContent;

    nameEl.value = cells[1].textContent;
    ageEl.value = cells[2].textContent;
    phoneEl.value = cells[3].textContent;

    currentRow = row;
    currentRow.newUser = newUser;
};


function removeRow(row, userId) {
    const index = users.findIndex((user) => user.id === userId);
    if (index !== -1) {
        users.splice(index, 1);
    }

    console.log(users)
    showTable(users)
}

function saveRow() {
    if (!currentRow) return;
    const cells = currentRow.querySelectorAll('.grid-item');


    console.log("CELLS:", cells)


    const id = currentRow.querySelectorAll('.grid-item')[0].textContent;

    let user = users[id - 1];

    const newFirstName = nameEl.value
    const newLastName = ageEl.value;
    const newEmail = phoneEl.value;


    console.log("firstName:", newFirstName)


    users[id - 1] = {
        id: users[id - 1].id,
        first_name: newFirstName,
        last_name: newLastName,
        email: newEmail
    };

    console.log("IDDDD:", id)

    console.log("USERSSS CLicked :", users[id - 1])
    console.log("userss", users)


    clearInputFields()
    console.log(users);

    showTable(users)
};


saveButton.addEventListener('click', () => {
    if (currentRow) {
        saveRow()
    } else {
        addRow()
    }
})

function fetchApi() {
    fetch('https://reqres.in/api/users', {
        method: 'GET',
        headers: {
            'Content-Type': 'aplication/json'
        }
    })
        .then(res => res.json())
        .then(data => {
            console.log(data.data)
            users = (data.data)
            console.log("USERS:", users)
            showTable(users)
        })

        .catch(error => console.error(error))

    console.log("usersssss")
    console.log("USERSssss:", users)
}

function clearInputFields() {
    nameEl.value = '';
    ageEl.value = '';
    phoneEl.value = '';
}

function updateNewUsers() {
    currentRow.newUser.name = nameEl.value;
    currentRow.newUser.age = ageEl.value;
    currentRow.newUser.phone = phoneEl.value;
    currentRow = null;
}

