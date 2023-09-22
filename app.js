const express = require('express');
const pg = require('pg');
const path = require('path'); // Importa el módulo 'path' para trabajar con rutas de archivos

// Configura la conexión a la base de datos
const pool = new pg.Pool({
  user: 'postgres',
  password: 'gxdfrf',
  host: 'localhost',
  database: 'postgres',
  port: 5432, // El puerto predeterminado de PostgreSQL
});

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/inicio-sesion.html');
  });
  app.get("/a.html", (req, res) => {
    res.sendFile(__dirname + '/a.html');
  });
  app.get("/index.html", (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });

  app.get("/styles.css", (req, res) => {
    res.sendFile(path.join(__dirname, "styles.css"));
  });
  app.get('/script.js', (req, res) => {
    res.sendFile(__dirname + '/script.js', {
      headers: {
        'Content-Type': 'text/javascript'
      }
    });
  });
  // Ruta para validar las credenciales de inicio de sesión
app.post('/validar-inicio-sesion', (req, res) => {
  const { email, contrasena } = req.body; // Obtén el correo electrónico y la contraseña del cuerpo de la solicitud

  // Realiza una consulta a la base de datos para verificar las credenciales
  pool.query('SELECT * FROM usuarios WHERE correo = naimibarra@gmail.com AND contraseña = tuculito', [email, contrasena], (error, result) => {
      if (error) {
          console.error('Error al consultar la base de datos:', error);
          res.status(500).json({ error: 'Ocurrió un error al verificar las credenciales.' });
      } else {
          // Verifica si se encontró un usuario con las credenciales proporcionadas
          if (result.rows.length > 0) {
              res.json({ mensaje: 'Credenciales válidas. Inicio de sesión exitoso.' });
          } else {
              res.status(401).json({ error: 'Credenciales inválidas. Inicio de sesión fallido.' });
          }
      }
  });
});

// Ruta de prueba para consultar datos de la base de datos
app.get('/consultar-datos', (req, res) => {
  // Ejemplo de consulta a la base de datos
  pool.query('SELECT * FROM usuarios', (error, result) => {
    if (error) {
      console.error('Error al consultar la base de datos:', error);
      res.status(500).json({ error: 'Ocurrió un error al consultar la base de datos.' });
    } else {
      // Enviar los datos consultados como respuesta
      res.json(result.rows);
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor en funcionamiento en http://localhost:${port}`);
});
