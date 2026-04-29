# 🚀 Animated Login Dashboard (Fullstack)

Project fullstack login system dengan tampilan **neon premium UI** dan fitur **admin dashboard + CRUD user**.

---

## 🔥 Features

* 🔐 Authentication (Login & Register)
* 👤 CRUD User (Create, Read, Update, Delete)
* 🧠 Password hashing dengan bcrypt
* 🗄️ Database MySQL
* 🎨 Neon animated UI (modern & responsive)
* 📊 Admin dashboard

---

## 🛠 Tech Stack

* ⚙️ Node.js
* 🚀 Express.js
* 🗄️ MySQL
* 💻 HTML, CSS, JavaScript

---

## 📸 Preview

![preview](preview.png)

---

## ⚙️ Installation & Setup

### 1. Clone project

```bash
git clone https://github.com/username/repo-name.git
cd repo-name
```

### 2. Install dependencies

```bash
npm install
```

Atau manual:

```bash
npm install express mysql bcrypt
```

---

### 3. Setup Database

Buat database di MySQL:

```sql
CREATE DATABASE test;
```

Buat tabel `users`:

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100),
  password VARCHAR(255)
);
```

---

### 4. Konfigurasi Database

Edit file `server.js`:

```js
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'test'
});
```

---

### 5. Jalankan server

```bash
node server.js
```

Server akan jalan di:

```
http://localhost:3000
```

---

## 📡 API Endpoints

| Method | Endpoint   | Description    |
| ------ | ---------- | -------------- |
| GET    | /users     | Get semua user |
| POST   | /users     | Tambah user    |
| PUT    | /users/:id | Update user    |
| DELETE | /users/:id | Hapus user     |

---

## 🧪 Testing API

Gunakan Postman atau Thunder Client (VS Code)

---

## ⚠️ Notes

* Pastikan MySQL server aktif
* Pastikan port `3000` tidak dipakai
* Jangan commit `node_modules`

---

## 📌 Future Improvements

* JWT Authentication
* Role-based access (admin/user)
* Upload profile image
* Pagination & search user
* Deploy ke VPS / cloud

---

## 👨‍💻 Author

Developed by **Xyz**
