import { pool } from "../../../src/db.js";

export const getEstadosuf = async (req, res) => {
    try {
        // Consulta SQL para seleccionar el usuario por nombre y contraseña
        const [rows] = await pool.query("select * from estadouf");

        // Verifica si se encontró algún dato
        if (rows.length === 0) {
            console.log("No se encontraron datos");
            return res.status(404).send("Datos no encontrados");
        }

        // Envía los datos al cliente
        res.send({ rows });
        console.log('Datos obtenidos correctamente');
    } catch (error) {
        console.error("Error al ejecutar la consulta:", error);
        res.status(500).send("Error del servidor");
    }
};

