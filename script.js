const users = [];

const idEl = document.getElementById('id');
const nameEl = document.getElementById('name');
const ageEl = document.getElementById('age');
const phoneEl = document.getElementById('phone');
const saveButton = document.querySelector('.save-btn');
const tbody = document.getElementById('tbody');

let idCounter = 1;
let currentRow = null;

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
    const row = document.createElement('tr');
    const userId = idCounter++;

    const newUser = {
        id: userId,
        name: nameEl.value,
        age: ageEl.value,
        phone: phoneEl.value
    };

    const cells = [
        createCell(userId, 'grid-item'),
        createCell(newUser.name, 'grid-item'),
        createCell(newUser.age, 'grid-item'),
        createCell(newUser.phone, 'grid-item'),
        createButtonCell()
    ];

    cells.forEach(cell => row.appendChild(cell));
    tbody.appendChild(row);

    users.push(newUser);
    console.log(users)

    const editButton = row.querySelector('.edit-btn');
    editButton.addEventListener('click', () => {
        editRow(row, newUser);
    })

    const removeBtn = row.querySelector('.remove-btn');
    removeBtn.addEventListener('click', () => {
        removeRow(row, userId);
    })

    clearInputFields()
};


function editRow(row, newUser) {
    const cells = row.querySelectorAll('.grid-item');

    nameEl.value = cells[1].textContent;
    ageEl.value = cells[2].textContent;
    phoneEl.value = cells[3].textContent;

    currentRow = row;
    currentRow.newUser = newUser;
};


function removeRow(row, userId) {
    const tbody = document.getElementById('tbody');
    tbody.removeChild(row);

    const index = users.findIndex((user) => user.id === userId);
    if (index !== -1) {
        users.splice(index, 1);
    }

    console.log(users)
}

function saveRow() {
    if (!currentRow) return;
    const cells = currentRow.querySelectorAll('.grid-item');

    cells[1].textContent = nameEl.value;
    cells[2].textContent = ageEl.value;
    cells[3].textContent = phoneEl.value;

    updateNewUsers()
    clearInputFields()
    fetchApi()
    console.log(users);
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
        method: 'POST',
        headers: {
            'Content-Type': 'aplication/json'
        },
        body: JSON.stringify(users)
    }).then(res => res.json())
        .then(data => console.log(data))
        .catch(error => console.error(error))
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
