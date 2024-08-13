import { pool } from '../../src/db.js';

export const getTablaLab = async (req, res) => {
    try {
        // Consulta SQL para seleccionar los estados
        const consulta = `
       
        SELECT 
    'otdmp' AS encabezado,
   'Producciòn' AS EncName,
	d.id,
	d.fecha_creacion, 
	d.producido,
	d.codigoInicio,
	d.codigoFinal, 
	d.librasBarro,
	d.LibrasAserrin,
	d.librasAserrin2,
   COALESCE(d.LibrasAserrin, 0) + COALESCE(d.librasAserrin2, 0) AS formulaTot,
	aserradero.nombre_aserradero as nombre_aserradero,
	aserradero2.nombre_aserradero as nombre_aserradero2,
	tipocernido.tipoCernido AS tipocernido1,
	tipocernido2.tipoCernido AS tipocernido2,
	ufmodelo.nombre_modelo AS modelo
   FROM dtp d 
   
   left JOIN aserradero ON d.id_Aserradero=aserradero.id
   left JOIN aserradero AS aserradero2 ON d.id_Aserradero2=aserradero2.id
   left JOIN tipocernido ON d.id_cernidodetalle= tipocernido.id
   left JOIN tipocernido AS tipocernido2 ON  d.id_cernidodetalle2= tipocernido2.id
   LEFT JOIN ufmodelo ON  d.id_ufmodelo=ufmodelo.id_mod
   WHERE d.id_est = 2


    

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

export const putTablaLab=async(req,res)=>{
    try{
    const id_est=req.body.id_est
    const id=req.body.id 
    console.log('datos recibidos',id_est,id)
    const consulta='UPDATE dtp set id_est=? WHERE id=?'

    const [rows]=await pool.query(consulta, [id_est,id])
    res.send({ rows });
 
} catch (error) {
console.error("Error al ejecutar la consulta:", error);
res.status(500).send("Error del servidor");
}
    
    
}