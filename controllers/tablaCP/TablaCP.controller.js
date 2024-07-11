import { pool } from '../../src/db.js';

export const getTablaCP = async (req, res) => {
    try {
        // Consulta SQL para seleccionar los estados
        const consulta = `
       
        SELECT 'cps' AS encabezado, 'Pulida Superior' AS EncName, COALESCE(NULL, '-') AS codigoInicio,  COALESCE(NULL, '-') AS codigoFinal,  id, fecha_creacion, id_creador
        FROM cps 
        WHERE id_est = 2
        
        union all 
       
         SELECT 'cpb' AS encabezado, 'Pulida Base' AS EncName,  COALESCE(NULL, '-') AS codigoInicio,  COALESCE(NULL, '-') AS codigoFinal,  id, fecha_creacion, id_creador
        FROM cpb 
        WHERE id_est = 2
        
        union all 
        
       SELECT 'crm' AS encabezado, 'Reporte de Mermas' AS EncName, COALESCE(NULL, '-') AS codigoInicio,  COALESCE(NULL, '-') AS codigoFinal,  id, fecha_creacion, id_creador
        FROM crm 
        WHERE id_est = 2
        
        union all 
        
        SELECT 'ctt' AS encabezado, 'Temperatura Tunel' AS EncName, codigoInicio, codigoFinal,  id, fecha_creacion, id_creador
        FROM ctt 
        WHERE id_est = 2

        union all 

        SELECT 'cth' AS encabezado, 'Temperatura hornos' AS EncName, COALESCE(NULL, '-') AS codigoInicio, COALESCE(NULL, '-') AS codigoFinal,  id, fecha_creacion, id_creador
        FROM cth 
        WHERE id_est = 2

        union all 

        SELECT 'cpcd' AS encabezado, 'Calidad Producción Crudos' AS EncName, COALESCE(NULL, '-') AS codigoInicio, COALESCE(NULL, '-') AS codigoFinal,  id, fecha_creacion, id_creador
        FROM cpcd 
        WHERE id_est = 2

        union all 

        SELECT 'cfmp' AS encabezado, 'Control Formulacion Producciòn' AS EncName, COALESCE(NULL, '-') AS codigoInicio, COALESCE(NULL, '-') AS codigoFinal,  id, fecha_creacion, id_creador
        FROM cfmp 
        WHERE id_est = 2
        `;

        const [rows] = await pool.query(consulta);
        
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
