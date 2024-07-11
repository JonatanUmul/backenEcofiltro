import { pool } from '../../src/db.js';

export const getTablaOT = async (req, res) => {
    try {
        // Consulta SQL para seleccionar los estados
        const consulta = `
       
 SELECT 'othp' AS encabezado, 'Humedad en Patios' AS EncName, id, fecha_creacion, id_creador
 FROM othp 
 WHERE id_est = 2
 
 UNION all
 
 SELECT 'otsa' AS encabezado, 'Secado de Aserrín' AS EncName,id, fecha_creacion, id_creador
 FROM otsa 
 WHERE id_est = 2

 UNION all

 SELECT 'otca1' AS encabezado, 'Cernido 1' AS EncName, id, fecha_creacion, id_creador
 FROM otca1 
 WHERE id_est = 2

 UNION all

 SELECT 'otca2' AS encabezado, 'Cernido 2' AS EncName, id, fecha_creacion, id_creador
 FROM otca2 
 WHERE id_est = 2

 UNION all

 SELECT 'otpv' AS encabezado, 'Pulverizado de materia prima' AS EncName, id, fecha_creacion, id_creador
 FROM otpv 
 WHERE id_est = 2

 UNION all

 SELECT 'otfm' AS encabezado, 'Formulación' AS EncName, id, fecha_creacion, id_creador
 FROM otfm 
 WHERE id_est = 2

 UNION all

 SELECT 'otp' AS encabezado, 'Producción' AS EncName, id, fecha_creacion, id_creador
 FROM otp 
 WHERE id_est = 2

 
 UNION all

 SELECT 'othh' AS encabezado, 'Horneados' AS EncName, id, fecha_creacion, id_creador
 FROM othh 
 WHERE id_est = 2

 UNION all

 SELECT 'otip' AS encabezado, 'Impregnación' AS EncName, id, fecha_creacion, id_creador
 FROM otip 
 WHERE id_est = 2
 
 UNION all

 SELECT 'otcc' AS encabezado, 'Control de Calidad' AS EncName, id, fecha_creacion, id_creador
 FROM otcc 
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
