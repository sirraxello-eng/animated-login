// ======================
// SWITCH FORM
// ======================
function showRegister() {
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');

  if (loginForm && registerForm) {
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
  }
}

function showLogin() {
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');

  if (loginForm && registerForm) {
    registerForm.style.display = 'none';
    loginForm.style.display = 'block';
  }
}

// ======================
// REGISTER → DASHBOARD
// ======================
async function register() {
  try {
    const name = document.getElementById('name')?.value;
    const email = document.getElementById('registerEmail')?.value;
    const password = document.getElementById('registerPassword')?.value;

    if (!name || !email || !password) {
      return alert("Isi semua field!");
    }

    const res = await fetch('/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });

    const text = await res.text();

    try {
      const data = JSON.parse(text);

      localStorage.setItem('token', data.token);
      localStorage.setItem('name', data.name);

      // 🔥 redirect ke dashboard
      window.location.href = "dashboard.html";

    } catch {
      alert(text);
    }

  } catch (err) {
    console.error(err);
    alert("Register error!");
  }
}

// ======================
// LOGIN → DASHBOARD
// ======================
async function login() {
  try {
    const email = document.getElementById('loginEmail')?.value;
    const password = document.getElementById('loginPassword')?.value;

    if (!email || !password) {
      return alert("Isi email & password!");
    }

    const res = await fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const text = await res.text();

    try {
      const data = JSON.parse(text);

      localStorage.setItem('token', data.token);
      localStorage.setItem('name', data.name);

      // 🔥 redirect ke dashboard
      window.location.href = "dashboard.html";

    } catch {
      alert(text);
    }

  } catch (err) {
    console.error(err);
    alert("Login error!");
  }
}

// ======================
// CRUD USER (DASHBOARD)
// ======================

// LOAD USERS
async function loadUsers() {
  try {
    const res = await fetch('/users');
    const users = await res.json();

    const table = document.getElementById('userTable');
    if (!table) return;

    let html = '';

    users.forEach(user => {
      html += `
        <tr>
          <td>${user.id}</td>
          <td><input value="${user.name}" id="name-${user.id}"></td>
          <td><input value="${user.email}" id="email-${user.id}"></td>
          <td>
            <button onclick="updateUser(${user.id})">Update</button>
            <button onclick="deleteUser(${user.id})">Delete</button>
          </td>
        </tr>
      `;
    });

    table.innerHTML = html;

  } catch (err) {
    console.error(err);
  }
}

// ADD USER
async function addUser() {
  try {
    const name = document.getElementById('newName')?.value;
    const email = document.getElementById('newEmail')?.value;
    const password = document.getElementById('newPassword')?.value;

    if (!name || !email || !password) {
      return alert("Isi semua field!");
    }

    await fetch('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });

    loadUsers();

  } catch (err) {
    console.error(err);
  }
}

// UPDATE USER
async function updateUser(id) {
  try {
    const name = document.getElementById(`name-${id}`).value;
    const email = document.getElementById(`email-${id}`).value;

    await fetch(`/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email })
    });

    loadUsers();

  } catch (err) {
    console.error(err);
  }
}

// DELETE USER
async function deleteUser(id) {
  try {
    await fetch(`/users/${id}`, {
      method: 'DELETE'
    });

    loadUsers();

  } catch (err) {
    console.error(err);
  }
}

// ======================
// AUTO LOAD USERS
// ======================
window.onload = function () {
  if (window.location.pathname.includes("dashboard")) {
    loadUsers();
  }
};