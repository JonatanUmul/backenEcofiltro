import { pool } from '../../src/db.js';

    export const getTablaCLP = async (req, res) => {
    try {
        // Consulta SQL para seleccionar los estados
        const consulta = `
       SELECT 
'CLP' AS encabezado,
id,
fecha_creacion

FROM clp WHERE id_est=2
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

export const putTablaCLP=async(req,res)=>{
    try{
    const id_est=req.body.id_est
    const id=req.body.id 
    console.log('datos recibidos',id_est,id)
    const consulta='UPDATE clp set id_est=? WHERE id=?'

    const [rows]=await pool.query(consulta, [id_est,id])
    res.send({ rows });
 
} catch (error) {
console.error("Error al ejecutar la consulta:", error);
res.status(500).send("Error del servidor");
}
    
    
}