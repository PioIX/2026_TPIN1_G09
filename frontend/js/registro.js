const formulario = document.getElementById("formRegistro");
const msg = document.getElementById("textoMensaje");

formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    const dni = document.getElementById("dni").value;
    const nombre = document.getElementById("nombre").value;
    const usuario = document.getElementById("usuario").value;
    const contrasena = document.getElementById("contrasena").value;

    msg.textContent = "";
    msg.style.color = "red";

    fetch("http://localhost:4000/api/register", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            dni: dni,
            nombre: nombre,
            usuario: usuario,
            contrasena: contrasena
        })

    })

    .then(async function(respuesta) {
        const datos = await respuesta.json();
        return { ok: respuesta.ok, datos: datos };
    })

    .then(function(resultado) {

        if (resultado.ok) {

            msg.style.color = "green";
            msg.textContent = resultado.datos.mensaje;

            setTimeout(function() {
                window.location.href = "login.html";
            }, 1500);

        } else {

            msg.textContent = resultado.datos.mensaje || "No se pudo registrar";

        }

    })

    .catch(function(error) {

        console.log(error);
        msg.textContent = "Error de conexión con el servidor";

    });

});