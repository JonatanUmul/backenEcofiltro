import { pool } from '../../src/db.js';

export const getTablaLab = async (req, res) => {
    try {
        // Consulta SQL para seleccionar los estados
        const consulta = `
       
        SELECT 'otdmp' AS encabezado, 'Formulacion Aserrín' AS EncName, id, fecha_creacion, id_creador
        FROM otdmp 
        WHERE id_est = 2

        union all
     
        
        SELECT 'otdmpb' AS encabezado, 'Formulacion Barro' AS EncName, id, fecha_creacion, id_creador
        FROM otdmpb 
        WHERE id_est = 2

        `;

        const [rows] = await pool.query(consulta);
        console.log('datos de lab',rows)
        // Verifica si se encontraron resultados
        if (rows.length === 0) {
            console.log("Datos no encontrados");
            return res.status(404).send("Datos no encontrados");
        }

        // Envía los resultados al cliente
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error al ejecutar la consulta:", error);
        res.status(500).send("Error del servidor");
    }
};
