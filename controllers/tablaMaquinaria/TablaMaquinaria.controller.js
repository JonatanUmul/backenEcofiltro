import { pool } from '../../src/db.js';

export const getTablaMaquinaria = async (req, res) => {
    try {
        // Consulta SQL para seleccionar los estados
        const consulta = `
       
        SELECT 'ckta' AS encabezado, 'Tanque de Agua 2.0' AS EncName, id, fecha_creacion, id_creador, id_maquina
        FROM ckta 
         WHERE id_estado = 2
        
        UNION all
        
        SELECT 'ckext' AS encabezado, 'Extrusora 2.0' AS EncName,id, fecha_creacion, id_creador, id_maquina
        FROM ckext 
        WHERE id_estado = 2
       
        UNION all
       
        SELECT 'ckbt' AS encabezado, 'Banda Transportadora 2.0' AS EncName, id, fecha_creacion, id_creador, id_maquina
        FROM ckbt 
         WHERE id_estado = 2
       
        UNION all
       
        SELECT 'ckcta' AS encabezado, 'Cortador Automatico 2.0' AS EncName, id, fecha_creacion, id_creador, id_maquina
        FROM ckcta   
         WHERE id_estado = 2
       
        UNION all
       
        SELECT 'ckctam' AS encabezado, 'Tanque de Agua Mini' AS EncName, id, fecha_creacion, id_creador, id_maquina
        FROM ckctam 
         WHERE id_estado = 2
       
        UNION all
       
        SELECT 'ckm2' AS encabezado, 'Mezcladora 2.0' AS EncName, id, fecha_creacion, id_creador, id_maquina
        FROM ckm2 
        WHERE id_estado = 2
       
        UNION all
       
        SELECT 'ckmm' AS encabezado, 'Mezcladora Mini' AS EncName, id, fecha_creacion, id_creador, id_maquina
        FROM ckmm 
         WHERE id_estado = 2
       
        
        UNION all
       
        SELECT 'ckph2' AS encabezado, 'Prensa Hidraulica 2.0' AS EncName, id, fecha_creacion, id_creador, id_maquina
        FROM ckph2 
        WHERE id_estado = 2
        
         UNION all
       
        SELECT 'ckphm' AS encabezado, 'Prensa Hidraulica Mini' AS EncName, id, fecha_creacion, id_creador, id_maquina
        FROM ckphm 
         WHERE id_estado = 2

         UNION all
       
         SELECT 'ckpm' AS encabezado, 'Prensa Hidraulica Manual' AS EncName, id, fecha_creacion, id_creador, id_maquina
         FROM ckpm 
          WHERE id_estado = 2
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
