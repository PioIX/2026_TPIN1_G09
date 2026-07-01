// Ruta para el Login
app.post('/api/login', (req, res) => {
    // Datos enviados desde el formulario
    const { usuario, password } = req.body;

    // Validar que no estén vacíos
    if (!usuario || !password) {
        return res.status(400).json({
            mensaje: "Debe completar usuario y contraseña."
        });
    }

    // Consulta SQL
    // Cambiá 'usuarios', 'nombre' y 'clave' por los nombres de tu tabla
    const sql = "SELECT * FROM usuarios WHERE nombre = ? AND clave = ?";

    // Ejecutar la consulta
    conexion.query(sql, [usuario, password], (error, resultados) => {
        if (error) {
            console.error("Error en la base de datos:", error);
            return res.status(500).json({
                mensaje: "Error del servidor."
            });
        }

        // Si encontró un usuario
        if (resultados.length > 0) {
            return res.status(200).json({
                mensaje: "¡Bienvenido!"
            });
        }

        // Usuario o contraseña incorrectos
        return res.status(401).json({
            mensaje: "Usuario o contraseña incorrectos."
        });
    });
});