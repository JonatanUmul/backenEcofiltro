import { pool } from "../../../src/db.js";


export const getRespuestas = async (req, res) => {
   
    try {
        // Consulta SQL para seleccionar los estados
        const [rows] = await pool.query("SELECT * FROM respuestas");
        
        // Verifica si se encontraron estados
        if (rows.length === 0) {
            console.log("Datos no encontrados");
            return res.status(404).send("Datos no encontrados");
        }

        // Envía los estados encontrados al cliente
        res.send({ rows }); // <- Aquí se envía la respuesta al cliente

        // Si el código continúa después de enviar la respuesta, es probable que ocurra un error
        console.log("Datos obtenidos correctamente");
    } catch (error) {
        console.error("Error al ejecutar la consulta:", error);
        res.status(500).send("Error del servidor");
    }
};

