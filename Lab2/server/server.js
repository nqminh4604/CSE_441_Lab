const express = require('express');
const mysql = require('mysql2');
const { error } = require('console');

//Initialize the Express application
const app = express();
const port = 3000;

//MySQL connection configuration
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Tranminhcuchuoi1@',
    database: 'nodejs_demo'
});

//Connect to MySQL database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database', err);
        return;
    }
    console.log('Connect to the MySQL database');
});

//CRUD Operations

//1.New user (POST request)
app.post('/api/users', (req, res) => {
    const { name, email } = req.body;
    const sql = 'INSERT INTO users (name, email) VALUES (?, ?)';
    
    db.query(sql, [name, email], (err, result) => {
        if (err) {
            res.status(500).json({ message: 'Error creating user', error: err});
        } else {
            res.status(201).json({ message: 'USer created', userId: result.insertId});
        }
    });
});

//2.Get all users (GET request)
app.get('/api/users', (req, res) => {
    const sql = 'SELECT * FROM users';

    db.query(sql, (err, results) => {
        if (err) {
            res.status(500).json({ message: 'Error fetching users', error: err});
        } else {
            res.json(results);
        }
    });
});

//3.Get a specific user by ID (GET request)
app.get('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    const sql = 'SELECT * FROM users WHERE id = ?';

    db.query(sql, [userId], (err, results) => {
        if (err) {
            res.status(500).json({ message: 'Error fetching user', error: err});
        } else if (results.length === 0) {
            res.status(500).json({ message: 'User not found'});
        } else {
            res.json(results[0]);
        }
    });
});

//4. Update a user by ID (PUT request)
app.put('/api/user/:id', (req, res) => {
    const userId = req.params.id;
    const sql = 'UPDATE users SET name = ?, email = ? WHERE id = ?';

    db.query(sql, [name, email, userId], (err, result) => {
        if (err) {
            res.status(500).json({ massage: 'Error updating user', error: err});
        } else if (condition) {
            res.status(404).json({ message: 'User not found' });
        } else {
            res.json({ message: 'User updated'});
        }
    });
});

//5. Delete a user by ID (DELETE request)
app.delete('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    const sql = 'DELETE FROM users WHERE id = ?';

    db.query(sql, [userId], (err, result) => {
        if (err) {
            res.status(500).json({ message: 'Error delete user', error: err});
        } else if (result.affectedRow === 0) {
            res.status(404).json({ message: 'User not found'});
        } else {
            res.json({ message: 'User deleted'});
        }
    });
});

//Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});