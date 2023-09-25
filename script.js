
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
