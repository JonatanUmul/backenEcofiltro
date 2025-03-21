import { pool } from "../../../src/db.js";


export const getAreas = async (req, res) => {


    try {
        // Consulta SQL para seleccionar los operarios por id_area
        const [rows] = await pool.query(" SELECT * FROM area ");
        
        // Verifica si se encontraron operarios
        if (rows.length === 0) {
      
            console.log("Datos no encontrados");
            return res.status(404).send("Datos no encontrados"); 
        }

        // Envía la respuesta con los operarios encontrados
        res.send({ rows });
    } catch (error) {
        console.error("Error al ejecutar la consulta:", error);
        res.status(500).send("Error del servidor");
    }
}
