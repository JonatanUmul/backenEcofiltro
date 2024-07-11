import { pool } from "../../../src/db.js";



export const postCTH = async(req, res)=>{
    const id_est= 2;
    const id_creador= req.body.id_creador;
   

    try{
    
       const consulta='INSERT INTO cth(id_est,id_creador)Values(?, ?)';
        const [rows]= await pool.query(consulta,[id_est, id_creador])
        res.send({rows});
        
        
    }catch(err){
        console.log('Error al guardar los datos', err)
    }
}


export const putCTH = async (req, res) => {
    const estado = req.body.id_est;
    const id = req.body.id;
    const fechaCierre = new Date().toISOString().split('T')[0]; // Fecha actual del sistema en formato: YYYY-MM-DD
    const horaCierre = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}); // Hora actual del sistema en formato: HH:MM

    try {
        if (estado === '' || id === '') {
            console.log('Uno o varios datos están vacíos');
        } else {
            const consulta = 'UPDATE cth SET id_est = ?, fechaCierre = ?, horaCierre = ? WHERE id = ?';
            const [rows] = await pool.query(consulta, [estado, fechaCierre, horaCierre, id]);
            res.send({ rows });
        }
    } catch (err) {
        console.log('Error al guardar los datos', err);
    }
};


export const getCTH= async (req, res)=>{
    const {fecha_creacion_inicio, fecha_creacion_fin} = req.params;
   try {
      let consulta = `
 
SELECT 
d.id,
'cth' AS tabla,
d.fecha_creacion,
d.hora_creacion,
d.horaCierre,
d.hora_creacion,
  IF(
          TIME(d.hora_creacion) >= '05:00:00' AND TIME(d.hora_creacion) <= '17:00:00',
          'Día',
          IF(
              TIME(d.hora_creacion) >= '17:01:00' AND TIME(d.hora_creacion) <= '23:59:59',
              'Noche',
              IF(
                  TIME(d.hora_creacion) >= '00:00:00' AND TIME(d.hora_creacion) <= '02:00:0',
                  'Noche',
                  NULL
              )
          )
      ) AS turnos,
d.fechaCierre,
est_proc.estado AS estadoOrden

FROM cth d

LEFT JOIN est_proc ON d.id_est=est_proc.id_est

      WHERE 1 = 1`;
  
      const params = [];
  
      if (fecha_creacion_inicio !== 'null' && fecha_creacion_fin !== 'null') {
       consulta += ' AND (d.fecha_creacion BETWEEN ? AND ?)';
      params.push(fecha_creacion_inicio, fecha_creacion_fin);
      } else if (fecha_creacion_inicio !== 'null') {
       consulta += ' AND d.fecha_creacion >= ?';
       params.push(fecha_creacion_inicio);
      } else if (fecha_creacion_fin !== 'null') {
        consulta += ' AND d.fecha_creacion <= ?';
        params.push(fecha_creacion_fin);
       }
  
      const [rows] = await pool.query(consulta, params);
  
      res.status(200).json(rows);
    } catch (error) {
      console.error("Error al obtener los datos de la tabla dthp:", error);
      res.status(500).json({ error: "Error al obtener los datos de la tabla dthp" });
    }
  };
  