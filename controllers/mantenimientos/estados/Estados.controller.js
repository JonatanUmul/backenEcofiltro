import {pool} from '../../../src/db.js'
export const getEstados = async (req, res) => {
   
    try {
        // Consulta SQL para seleccionar los estados
        const [rows] = await pool.query("SELECT * FROM est_proc");
        
        // Verifica si se encontraron estados
        if (rows.length === 0) {
            console.log("Datos no encontrados");
            return res.status(404).send("Datos no encontrados");
        }

        // Envía los estados encontrados al cliente
        res.status(200).json(rows); // <- Aquí se envía la respuesta al cliente
    } catch (error) {
        console.error("Error al ejecutar la consulta:", error);
        res.status(500).send("Error del servidor");
    }
};
