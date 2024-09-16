import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { connection } from '../db.js'; 

export const registerHandler = (req, res) => {
  const { email, password, username } = req.body;

  //verificacion si el usuario ya existe
  connection.query('SELECT * FROM users WHERE email = ?', [email], (error, results) => {
    if (error) {
      console.error('Error checking user existence:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (results.length > 0) {
      return res.status(400).json({ error: 'User already exists' });
    }

    //contraseña
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        console.error('Error hashing password:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      //creacion de  usuario
      const newUser = { email, password: hashedPassword, username };
      connection.query('INSERT INTO users SET ?', newUser, (error, results) => {
        if (error) {
          console.error('Error inserting user:', error);
          return res.status(500).json({ error: 'Internal Server Error' });
        }

        //token
        const token = jwt.sign({ email }, 'your_jwt_secret', { expiresIn: '1h' });
        res.status(201).json({ token });
      });
    });
  });
};