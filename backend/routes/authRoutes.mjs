import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import connection from '../db.js';

const router = express.Router();

// registro de usuario
router.post('/register', (req, res) => {
  const { email, password, username } = req.body;

  connection.query('SELECT * FROM users WHERE email = ?', [email], (error, results) => {
    if (error) {
      console.error('Error checking user existence:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (results.length > 0) {
      return res.status(400).json({ error: 'User already exists' });
    }

    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        console.error('Error hashing password:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      const newUser = { email, password: hashedPassword, username };
      connection.query('INSERT INTO users SET ?', newUser, (error, results) => {
        if (error) {
          console.error('Error inserting user:', error);
          return res.status(500).json({ error: 'Internal Server Error' });
        }

        const token = jwt.sign({ email }, 'your_jwt_secret', { expiresIn: '1h' });
        res.status(201).json({ token });
      });
    });
  });
});

//autentiacion de usuario
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  connection.query('SELECT * FROM users WHERE email = ?', [email], (error, results) => {
    if (error) {
      console.error('Error fetching user:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const user = results[0];
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        console.error('Error comparing passwords:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      const token = jwt.sign({ email }, 'your_jwt_secret', { expiresIn: '1h' });
      res.json({ token });
    });
  });
});

export default router;
