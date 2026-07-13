const form = document.getElementById("formularioLogin");
const msg = document.getElementById("textoMensaje");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const usuario = document.getElementById("usuario").value;
    const password = document.getElementById("contrasena").value;

    msg.textContent = "";
    msg.style.color = "red";

    try {
        const res = await fetch("http://localhost:4000/api/login", {
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
            msg.textContent = "Login correcto, redirigiendo...";

            // Guardamos algo de sesión (opcional, útil para el index)
            localStorage.setItem("usuario", usuario);

            setTimeout(() => {
                window.location.href = "index.html";
            }, 1000);

        } else {
            msg.textContent = data.mensaje || "Usuario o contraseña incorrectos";
        }

    } catch (error) {
        msg.textContent = "Error de conexión con el servidor";
    }
});