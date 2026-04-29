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
  const { name, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);

  db.query(
    'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
    [name, email, hashed],
    (err) => {
      if (err) return res.status(400).send("Gagal tambah user");
      res.send("User berhasil ditambahkan");
    }
  );
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
      if (err) return res.status(400).send("Gagal update");
      res.send("User berhasil diupdate");
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
      if (err) return res.status(400).send("Gagal hapus");
      res.send("User berhasil dihapus");
    }
  );
});