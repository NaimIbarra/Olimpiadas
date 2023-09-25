
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
            if (data.mensaje) {
                alert(data.mensaje);
            } else {
                alert('Credenciales inválidas. Inicio de sesión fallido.');
            }
        
            // Cuando las credenciales son válidas, redirige al usuario a index.html
            if (data.mensaje === 'Credenciales válidas. Inicio de sesión exitoso.') {
                window.location.href = '/index.html';
            }
        })
        
            // Puedes redirigir al usuario a otra página aquí si lo deseas

        .catch(error => {
            console.error('Error al validar credenciales:', error);
            alert('Ocurrió un error al iniciar sesión.');
        });
} 