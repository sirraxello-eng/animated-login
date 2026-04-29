const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const path = require('path');

const app = express();
app.use(express.json());

// ======================
// SERVE FRONTEND
// ======================
app.use(express.static(path.join(__dirname, 'public')));

// ======================
// DATABASE
// ======================
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'login_db'
});

db.connect((err) => {
  if (err) {
    console.error('Database error:', err);
    return;
  }
  console.log('Database connected');
});

// ======================
// DEFAULT ROUTE
// ======================
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ======================
// REGISTER (ADD USER)
// ======================
app.post('/users', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).send('Semua field wajib diisi');
    }

    const hashed = await bcrypt.hash(password, 10);

    db.query(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashed],
      (err) => {
        if (err) return res.status(400).send('Gagal register');
        res.send('Register berhasil');
      }
    );
  } catch (err) {
    res.status(500).send(err);
  }
});

// ======================
// LOGIN
// ======================
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send('Email & password wajib diisi');
  }

  db.query(
    'SELECT * FROM users WHERE email = ?',
    [email],
    async (err, results) => {
      if (err) return res.status(500).send(err);

      if (results.length === 0) {
        return res.status(404).send('User tidak ditemukan');
      }

      const user = results[0];

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        return res.status(401).send('Password salah');
      }

      // LOGIN BERHASIL
      res.json({
        message: 'Login berhasil',
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        }
      });
    }
  );
});

// ======================
// GET USERS
// ======================
app.get('/users', (req, res) => {
  db.query('SELECT id, name, email FROM users', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// ======================
// UPDATE USER
// ======================
app.put('/users/:id', (req, res) => {
  const { name, email } = req.body;

  db.query(
    'UPDATE users SET name=?, email=? WHERE id=?',
    [name, email, req.params.id],
    (err) => {
      if (err) return res.status(400).send('Gagal update');
      res.send('User berhasil diupdate');
    }
  );
});

// ======================
// DELETE USER
// ======================
app.delete('/users/:id', (req, res) => {
  db.query(
    'DELETE FROM users WHERE id=?',
    [req.params.id],
    (err) => {
      if (err) return res.status(400).send('Gagal hapus');
      res.send('User berhasil dihapus');
    }
  );
});

// ======================
// RUN SERVER
// ======================
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server jalan di http://localhost:${PORT}`);
});