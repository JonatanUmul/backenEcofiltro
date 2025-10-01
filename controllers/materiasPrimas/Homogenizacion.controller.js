import { pool } from "../../src/db.js";

export const putetapas_barro = async (req, res) => {

  const muestra_id= req.body.datosApi.muestra_id
  const id= req.body.datosApi.id
  const id_creador= req.body.id_creador
  const fase_aprobacion_mp= req.body.fase_aprobacion_mp
  const proc_estado=3
  const proc_estadoInicial=2
console.log('id_muestra',muestra_id)
  const consulta = `
    INSERT INTO etapas_barro(muestra_id, id_creador, id_fase_aprobacion, id_estado)
    VALUES(?, ?, ?, ?)
  `;
  const actualizar = `
  UPDATE etapas_barro SET id_estado=${proc_estado} WHERE id=${id}
  `;

  try {
    const [rows] = await pool.query(consulta, [
      muestra_id,
      id_creador,
      fase_aprobacion_mp,
      proc_estadoInicial
    ]);
    // await pool.query(actualizar, [muestra_id]);
    await pool.query(actualizar, [muestra_id]);
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ mensaje: "Error del servidor", error: error.message });
    console.log(error)
  }
};

export const getEtapas_barro = async (req, res) => {
  const id_fase_aprobacion = req.query.id_fase_aprobacion;
  const estado_proceso = req.query.estado_proceso;

  console.log('fases de aprobacion',id_fase_aprobacion,estado_proceso)
  const consulta = `
  SELECT 
  hm.id,
  m.id as ID_muestra,
  hm.muestra_id,
  sum(pv.cantidad) as cant_sacos,
  sum(pv.peso_total_libras) as cant_lib,
	hm.fecha AS fechaHomogenizacion,
	m.codigo_lote,
  m.fecha,
	lm.limite_liquido,
	lm.limite_plastico,
	lm.indice_plastico,
	lm.arcilla,
	lm.arena,
	lm.limo
 FROM etapas_barro hm
 LEFT JOIN muestras m ON m.id=hm.muestra_id
 LEFT JOIN limites_atterberg_barro lm ON lm.codigo_lote=m.codigo_lote
 LEFT JOIN dtpv pv on hm.id=pv.id_camionada
 WHERE hm.id_fase_aprobacion= ? AND hm.id_estado=? AND m.estado=2
 group by hm.muestra_id, hm.id, hm.fecha, m.codigo_lote, m.fecha
 `;
  try {
    const [rows] = await pool.query(consulta, [
      id_fase_aprobacion,
      estado_proceso,
    ]);
    res.send({ rows });
  } catch (error) {
    res.status(500).send("Error del servidor", error);
  }
};


export const getEtapas_barro_lote = async (req, res) => {
  const id_fase_aprobacion= req.query.id_fase_aprobacion
  console.log(req)
  /*const consulta = `
  SELECT 
  hm.id,
  hm.muestra_id,
	hm.fecha AS fechaHomogenizacion,
	m.codigo_lote,
  m.fecha,
	lm.limite_liquido,
	lm.limite_plastico,
	lm.indice_plastico,
	lm.arcilla,
	lm.arena,
	lm.limo
 FROM etapas_barro hm
 LEFT JOIN muestras m ON m.id=hm.muestra_id
 LEFT JOIN limites_atterberg_barro lm ON lm.codigo_lote=m.codigo_lote
	WHERE hm.id_fase_aprobacion=4
 group by hm.muestra_id, hm.id, hm.fecha, m.codigo_lote, m.fecha
 `;*/
 const consulta= `
  SELECT 
  hm.id,
  hm.muestra_id,
	hm.fecha AS fechaHomogenizacion,
	m.codigo_lote,
  m.fecha,
	lm.limite_liquido,
	lm.limite_plastico,
	lm.indice_plastico,
	lm.arcilla,
	lm.arena,
	lm.limo
 FROM etapas_barro hm
 LEFT JOIN muestras m ON m.id=hm.muestra_id
 LEFT JOIN limites_atterberg_barro lm ON lm.codigo_lote=m.codigo_lote
	WHERE hm.id_fase_aprobacion=? and m.estado=2
 group by hm.muestra_id, hm.id, hm.fecha, m.codigo_lote, m.fecha`

  try {
    const [rows] = await pool.query(consulta, [id_fase_aprobacion]);
    res.send({ rows });
  } catch (error) {
    res.status(500).send("Error del servidor", error);
  }
};



export const getBarro_inventario = async (req, res) => {
const loteSelect=req.params.idSelect
console.log(loteSelect)
  const consulta = `
  SELECT 
  eb.id,
  eb.id_fase_aprobacion,
  m.codigo_lote,
  COALESCE(SUM(dtpv.peso_total_libras),0) - COALESCE(SUM(dtp.total_lb_barro), 0) AS peso_total_libras
FROM etapas_barro eb
LEFT JOIN muestras m 
  ON eb.muestra_id = m.id
LEFT JOIN dtpv 
  ON dtpv.id_camionada = eb.id
LEFT JOIN dtp 
  ON dtp.id_lote_camionada = eb.id
WHERE eb.id_fase_aprobacion = 4 
  AND m.codigo_lote = ?
GROUP BY 
  eb.id,
  eb.id_fase_aprobacion,
  m.codigo_lote;


 `;
  try {
    const [rows] = await pool.query(consulta, [loteSelect]);
    res.send({ rows });
  } catch (error) {
    res.status(500).send("Error del servidor", error);
  }
};


export const getAserrinInventario = async (req, res) => {
const loteSelect=parseInt(req.params.idSelect) 
console.log('loteSelect',loteSelect)
  const consulta = `
select 
m.id,
m.codigo_lote,
m.fecha,
m.id_materia_prima,
m.sacos as sacosMuestras,
ma.sacos as sacosDtmezclaAserrin,
m.sacos-COALESCE(SUM(ma.sacos), 0) as SacosDisponibles

 from muestras m
 left join DT_mezclado_aserrin ma on m.id=ma.id_camionada_aserrin 
 where m.id=? and m.estado=2

 group by
 m.id,
 m.codigo_lote,
 m.fecha,
 m.id_materia_prima

 `;
  try {
    const [rows] = await pool.query(consulta, [loteSelect]);
    res.send({ rows });
  } catch (error) {
    res.status(500).send("Error del servidor", error);
  }
};