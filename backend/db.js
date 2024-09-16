import mysql from 'mysql2';

// Crear una conexión a la base de datos
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'sotelo10',
  password: 'sotelo10',
  database: 'myapp'
});

// Conectar a la base de datos
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Exportar la conexión para que pueda ser utilizada en otros módulos
export default connection;