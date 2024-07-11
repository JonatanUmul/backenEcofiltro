import { pool } from '../../src/db.js';

export const getMantenimientoMaq = async (req, res) => {
    try {
        // Consulta SQL para seleccionar los estados
        const consulta = `
       
        SELECT 'mta' AS encabezado, 'Tanque de Agua 2.0' AS EncName, id, fechaCreacion, id_creador, id_maquina
        FROM mta 
         WHERE id_estado = 2
        
        UNION all
        
        SELECT 'mext' AS encabezado, 'Extrusora 2.0' AS EncName,id, fechaCreacion, id_creador, id_maquina
        FROM mext 
        WHERE id_estado = 2
       
        UNION all
       
        SELECT 'mbt' AS encabezado, 'Banda Transportadora 2.0' AS EncName, id, fechaCreacion, id_creador, id_maquina
        FROM mbt 
         WHERE id_estado = 2
       
        UNION all
       
        SELECT 'mcta' AS encabezado, 'Cortador Automatico 2.0' AS EncName, id, fechaCreacion, id_creador, id_maquina
        FROM mcta   
         WHERE id_estado = 2
       
        UNION all
       
        SELECT 'mtam' AS encabezado, 'Tanque de Agua Mini' AS EncName, id, fechaCreacion, id_creador, id_maquina
        FROM mtam 
         WHERE id_estado = 2
       
        UNION all
       
        SELECT 'mm2' AS encabezado, 'Mezcladora 2.0' AS EncName, id, fechaCreacion, id_creador, id_maquina
        FROM mm2 
        WHERE id_estado = 2
       
        UNION all
       
        SELECT 'mmm' AS encabezado, 'Mezcladora Mini' AS EncName, id, fechaCreacion, id_creador, id_maquina
        FROM mmm 
         WHERE id_estado = 2
       
        
        UNION all
       
        SELECT 'mph2' AS encabezado, 'Prensa Hidraulica 2.0' AS EncName, id, fechaCreacion, id_creador, id_maquina
        FROM mph2 
        WHERE id_estado = 2
        
         UNION all
       
        SELECT 'mphm' AS encabezado, 'Prensa Hidraulica Mini' AS EncName, id, fechaCreacion, id_creador, id_maquina
        FROM mphm 
         WHERE id_estado = 2

         UNION all
       
         SELECT 'mpm' AS encabezado, 'Prensa Hidraulica Manual' AS EncName, id, fechaCreacion, id_creador, id_maquina
         FROM mpm 
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
