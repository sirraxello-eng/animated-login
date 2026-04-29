const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json());

// ======================
// KONEKSI DATABASE
// ======================
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'test' // ganti sesuai database kamu
});

db.connect((err) => {
  if (err) throw err;
  console.log('Database connected');
});

// ======================
// GET ALL USERS
// ======================
app.get('/users', (req, res) => {
  db.query('SELECT id, name, email FROM users', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// ======================
// ADD USER
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
        if (err) return res.status(400).send('Gagal tambah user');
        res.send('User berhasil ditambahkan');
      }
    );
  } catch (err) {
    res.status(500).send(err);
  }
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
// JALANKAN SERVER
// ======================
app.listen(3000, () => {
  console.log('Server jalan di http://localhost:3000');
});