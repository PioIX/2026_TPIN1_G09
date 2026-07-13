const formulario = document.getElementById("formRegistro");

formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const usuario = document.getElementById("usuario").value;
    const contrasena = document.getElementById("contrasena").value;

    fetch("http://localhost:4000/registro", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            nombre: nombre,
            usuario: usuario,
            contrasena: contrasena
        })

    })

    .then(function(respuesta) {
        return respuesta.json();
    })

    .then(function(datos) {

        alert(datos.mensaje);

        // Ir al login
        window.location.href = "login.html";

    })

    .catch(function(error) {

        console.log(error);
        alert("Error al registrar el usuario.");

    });

});