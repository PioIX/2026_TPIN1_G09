const form = document.getElementById("formularioRegistro");
const msg = document.getElementById("textoMensaje");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const usuario = document.getElementById("inputUsuario").value;
    const password = document.getElementById("inputPassword").value;
    const confirmPassword = document.getElementById("inputConfirmPassword").value;

    msg.textContent = "";
    msg.style.color = "red";

    if (password !== confirmPassword) {
        msg.textContent = "Las contraseñas no coinciden";
        return;
    }

    try {
        const res = await fetch("http://localhost:3000/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                usuario,
                password
            })
        });

        const data = await res.json();

        if (res.ok) {
            msg.style.color = "green";
            msg.textContent = "Usuario creado correctamente";

            setTimeout(() => {
                window.location.href = "login.html";
            }, 1500);

        } else {
            msg.textContent = data.mensaje || "Error al registrar";
        }

    } catch (error) {
        msg.textContent = "Error de conexión con el servidor";
    }
});