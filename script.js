/*
// Obtén una referencia al formulario de inicio de sesión
const formularioInicioSesion = document.getElementById('formularioInicioSesion');

// Agrega un evento de envío al formulario
formularioInicioSesion.addEventListener('submit', function (event) {
    event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada

    // Obtiene los valores de correo electrónico y contraseña ingresados por el usuario
    const email = document.getElementById('email').value;
    const contrasena = document.getElementById('contrasena').value;

    // Realiza una solicitud al servidor para validar las credenciales
    validarCredenciales(email, contrasena);
});

function validarCredenciales(email, contrasena) {
    // Realiza una solicitud POST al servidor para validar las credenciales
    fetch('/validar-inicio-sesion', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, contrasena }), // Envía los datos al servidor en formato JSON
    })
        .then(response => response.json())
        .then(data => {
            // Muestra un mensaje al usuario
            alert(data.mensaje);
            // Puedes redirigir al usuario a otra página aquí si lo deseas
        })
        .catch(error => {
            console.error('Error al validar credenciales:', error);
            alert('Ocurrió un error al iniciar sesión.');
        });
} */

// Obtener una referencia a la tabla en tu HTML
const tablaDatos = document.getElementById('tablaDatos');

// Realizar una solicitud GET al servidor para obtener datos de usuarios
fetch('/consultar-datos') // Asegúrate de que la ruta coincida con la configuración de tu servidor
  .then(response => response.json())
  .then(data => {

    // Crear filas de la tabla y llenarlas con los datos de los usuarios
    data.forEach(usuarios => {
      const fila = document.createElement('tr');
      fila.innerHTML = `
        <td>${usuarios.id}</td>
        <td>${usuarios.nombre}</td>
        <td>${usuarios.correo}</td>
        <td>${usuarios.contraseña}</td>
        <td>${usuarios.tipo_usuario}</td>
      `;
      tablaDatos.appendChild(fila);
    });
  })
  .catch(error => {
    console.error('Error al obtener datos de usuarios:', error);
  });
