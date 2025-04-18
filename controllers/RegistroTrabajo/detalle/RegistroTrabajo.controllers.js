import { pool } from "../../../src/db.js";

      

export const postDCKBT = async (req, res) => {
  const {
    id_grupoProduccion,
    id_CKBT,
    id_limpiezaBandaYRodillos,
    id_lubricacionChumaceras,
    id_accionamientoCorrectoDeMotor,
    id_creador,
    observacion1,
    observacion2,
    observacion3,
  } = req.body;

  try {
    const camposVacios = [];
    
    if (id_grupoProduccion === '') camposVacios.push('Grupo de Producción');
    if (id_CKBT === '') camposVacios.push('CKBT');
    if (id_limpiezaBandaYRodillos === '') camposVacios.push('Limpieza de Banda y Rodillos');
    if (id_lubricacionChumaceras === '') camposVacios.push('Lubricación de Chumaceras');
    if (id_accionamientoCorrectoDeMotor === '') camposVacios.push('Accionamiento Correcto de Motor');

    if (camposVacios.length > 0) {
      const mensaje = `Los siguientes campos están vacíos: ${camposVacios.join(', ')}`;
      console.log(mensaje);
      res.status(400).send({ error: mensaje });
    } else {
      const consulta = `INSERT INTO dckbt(
        id_grupoProduccion,
        id_CKBT,
        id_limpiezaBandaYRodillos,
        id_lubricacionChumaceras,
        id_accionamientoCorrectoDeMotor,
        id_creador,
        observacion1,
        observacion2,
        observacion3
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      const [rows] = await pool.query(consulta, [
        id_grupoProduccion,
        id_CKBT,
        id_limpiezaBandaYRodillos,
        id_lubricacionChumaceras,
        id_accionamientoCorrectoDeMotor,
        id_creador,
        observacion1,
        observacion2,
        observacion3,
      ]);
      res.status(200).send({ success: true, message: 'Datos guardados correctamente' });
    }
  } catch (err) {
    console.error('Error al guardar los datos:', err);
    res.status(500).send({ error: 'Error al guardar los datos' });
  }
};





export const GetRegistroTrabajo = async(req, res)=>{
// const id= req.params.id;

try {
  const consulta= `
  SELECT 
  op.Nombre,
  etP.estado,
  ar.Area
   FROM operarios op
   LEFT JOIN est_personal AS etP ON op.id_est_perNal=etP.id
   JOIN area ar ON op.id_area=ar.id
   
   WHERE op.id_area IN (1,2,3,4,5,6,7,8,9,10)
  `
  const [rows]= await pool.query(consulta)
  res.status(200).json({ data: rows });
  
} catch (error) {
  console.error("Error al obtener los datos de la tabla dtp:", error);
  res.status(500).json({ error: "Error al obtener los datos de la tabla dtp" });
}

} 