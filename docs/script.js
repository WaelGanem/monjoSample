// const baseURL = 'http://localhost:1234';

const baseURL = 'https://student-management-api-n0lp.onrender.com';  // New Render URL


// Add Student
function addStudent() {
    const name = document.getElementById('addName').value;
    const age = document.getElementById('addAge').value;

    fetch(`${baseURL}/students`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, age }),
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        fetchAllStudents();
    })
    .catch(error => console.error('Error:', error));
}

// Update Student
function updateStudent() {
    const id = document.getElementById('updateId').value;
    const name = document.getElementById('updateName').value;
    const age = document.getElementById('updateAge').value;

    fetch(`${baseURL}/students/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, age }),
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        fetchAllStudents();
    })
    .catch(error => console.error('Error:', error));
}

// Delete Student
function deleteStudent() {
    const id = document.getElementById('deleteId').value;

    fetch(`${baseURL}/students/${id}`, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        fetchAllStudents();
    })
    .catch(error => console.error('Error:', error));
}

// Fetch All Students
function fetchAllStudents() {
    fetch(`${baseURL}/allstudents`)
    .then(response => response.json())
    .then(data => {
        const studentsBody = document.getElementById('studentsBody');
        studentsBody.innerHTML = '';  // Clear previous rows
        data.forEach(student => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${student._id}</td>
                <td>${student.name}</td>
                <td>${student.age}</td>
            `;
            studentsBody.appendChild(row);
        });
    })
    .catch(error => console.error('Error:', error));
}
