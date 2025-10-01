import { pool } from "../../src/db.js";


export const getMateriaPriaBarro = async (req, res) => {
  const id_materia_prima= req.query.materiaPrima=='Aserrin'? 2:1
  const consulta = `
  SELECT 
  muestras.id,
'muestras' AS encabezado,
  muestras.codigo_lote,
  muestras.fecha,
  muestras.sacos,
  mp.nombre,
  op.Nombre
   FROM muestras
   LEFT JOIN fase_aprobacion_mp mp ON mp.id=muestras.estado
   LEFT JOIN user us ON muestras.id_creador = us.id
   LEFT JOIN operarios op ON op.id=us.nombre
    WHERE estado=1 AND id_materia_prima=?
    `;

  try {
    const [rows] = await pool.query(consulta,[id_materia_prima]);

    res.status(200).json(rows);
  } catch (error) {
    res.status(500).send("Error del servidor");
  }
};


export const get_Max_id_ot_mezclado_aserrin = async (req, res) => {

  const consulta = `
  select max(id) as id from ot_mezclado_aserrin
    `;

  try {
    const [rows] = await pool.query(consulta);
    const ultimo= rows[0]?.id||0
    const correlativo=ultimo+1
    const correlativoFormateado=`MA${correlativo.toString().padStart(6,'0')}`
    console.log('rowsrows',correlativoFormateado)
     res.json({ correlativo: correlativoFormateado });
  } catch (error) {
    res.status(500).send("Error del servidor");
    console.log(error)
  }
};

