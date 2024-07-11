import { pool } from "../../../src/db.js";



export const postDCPS = async(req, res)=>{
  const {
    id_DCPS,id_auditor, codigo, id_prensador, id_prensa,id_mod, id_calificacion, id_creador
    }= req.body
   
    try{
    
       const consulta='INSERT INTO dcps(id_DCPS,id_auditor, codigo, id_prensador, id_prensa, id_mod, id_calificacion, id_creador)Values(?, ?,?,?,?,?,?,?)';
        const [rows]= await pool.query(consulta,[id_DCPS,id_auditor, codigo, id_prensador, id_prensa, id_mod, id_calificacion, id_creador])
        res.send({rows});
        
        
    }catch(err){
        console.log('Error al guardar los datos', err)
    }
}


export const getDCPS = async(req, res)=>{
  const id= req.params.id;

  try {
    const consulta=
    `SELECT 
    d.id,
    d.codigo,
    d.fecha_creacion,
    cps.id AS id_cps,
    operarios.Nombre AS prensador,
    enc_maq.nombre_maq AS prensa,
    ufmodelo.nombre_modelo AS modelo,
    calificaciones.calificacion AS calificacion
FROM 
    dcps d
LEFT JOIN cps ON d.id_DCPS = cps.id
LEFT JOIN operarios ON d.id_prensador = operarios.id
LEFT JOIN enc_maq ON d.id_prensa = enc_maq.id_maq
LEFT JOIN ufmodelo ON d.id_mod = ufmodelo.id_mod
LEFT JOIN calificaciones ON d.id_calificacion = calificaciones.id

where d.id_DCPS= ?`
    const [rows]= await pool.query(consulta, [id])
    // Enviar los datos obtenidos al cliente
    res.status(200).json({ data: rows });

  } catch (error) {
    console.error("Error al obtener los datos de la tabla dtp:", error);
    res.status(500).json({ error: "Error al obtener los datos de la tabla dtp" });
  }
}




export const getDCPSS = async (req, res) => {
  const { ufmodelo, id_prensador,turnoProd, fecha_creacion_inicio, fecha_creacion_fin } = req.params;

  console.log(fecha_creacion_inicio, fecha_creacion_fin, ufmodelo, id_prensador);

  try {
      let consulta = `
         
      SELECT 
      d.id AS numero_orden,
      d.codigo,
      d.fecha_creacion AS fecha_produccion,
      d.hora_creacion AS hora_produccion,
      IF(
          TIME(d.hora_creacion) >= '06:00:00' AND TIME(d.hora_creacion) <= '14:00:00',
          'Día',
          IF(
              TIME(d.hora_creacion) >= '14:01:00' AND TIME(d.hora_creacion) <= '22:00:00',
              'Noche',
              null
             
          )
      ) AS turnos,
      operarios.Nombre AS prensador,
      enc_maq.nombre_maq AS prensa,
      ufmodelo.nombre_modelo AS modeloUF,
      calificaciones.calificacion AS calificacion,
      d.id_auditor,
      operarios2.Nombre AS auditor
  FROM 
      dcps d
  LEFT JOIN 
      enc_maq ON d.id_prensa = enc_maq.id_maq
  LEFT JOIN 
      operarios ON d.id_prensador = operarios.id
  LEFT JOIN 
      ufmodelo ON d.id_mod = ufmodelo.id_mod
  LEFT JOIN 
      calificaciones ON d.id_calificacion = calificaciones.id
  LEFT JOIN 
      operarios AS operarios2 ON d.id_auditor = operarios2.id
  WHERE 1=1`;
      const params = [];

      if (ufmodelo !== 'null') {
          consulta += ' AND (d.id_mod IS NULL OR d.id_mod = ?)';
          params.push(ufmodelo);
      }
      if (id_prensador !== 'null') {
          consulta += ' AND (d.id_prensador IS NULL OR d.id_prensador = ?)';
          params.push(id_prensador);
      }
      if (turnoProd !== 'null') {
        consulta += ' AND (d.turnos IS NULL OR d.turnos = ?)';
        params.push(turnoProd);
    }

      if (fecha_creacion_inicio !== 'null' && fecha_creacion_fin !== 'null') {
          if (fecha_creacion_inicio !== 'null' && fecha_creacion_fin !== 'null') {
              consulta += ' AND (d.fecha_creacion BETWEEN ? AND ?)';
              params.push(fecha_creacion_inicio, fecha_creacion_fin);
          } else if (fecha_creacion_inicio !== 'null') {
              consulta += ' AND d.fecha_creacion >= ?';
              params.push(fecha_creacion_inicio);
          } else {
              consulta += ' AND d.fecha_creacion <= ?';
              params.push(fecha_creacion_fin);
          }
      }

      const [rows] = await pool.query(consulta, params);

      res.status(200).json(rows);
  } catch (error) {
      console.error("Error al obtener los datos de la tabla dthp:", error);
      res.status(500).json({ error: "Error al obtener los datos de la tabla dthp" });
  }
};
