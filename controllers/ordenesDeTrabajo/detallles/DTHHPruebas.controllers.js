import { pool } from "../../../src/db.js";


export const getSSDTH = async(req, res)=>{

    const {fecha_creacion_inicio,fecha_creacion_fin,modeloUF,turn,horno,id_est, fecha_CC}= req.params
    console.log(fecha_creacion_inicio,fecha_creacion_fin,modeloUF,turn,horno,id_est, fecha_CC)
    try {
    let consulta = 
    ` select * from tablaPrueba d
    WHERE 1= 1`;
    
    const params=[]

 
    if (modeloUF !== 'null') {
        consulta += ' AND (d.id_modelo IS NULL OR d.id_modelo = ?)';
        params.push(modeloUF)}
    
    if (horno !== 'null') {
      consulta += ' AND (d.id_horno IS NULL OR d.id_horno = ?)';
      params.push(horno)}
    
    if (turn !== 'null') {
      consulta += ' AND (d.id_turno IS NULL OR d.id_turno = ?)';
      params.push(turn);
    }

    if (id_est !== 'null') {
        consulta += ' AND ( d.id_est = ?)';
        params.push(id_est);
      }
    
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

        if (fecha_CC !== 'null' && fecha_CC !== 'null') {
          consulta += ' AND (dtcc.fecha_creacion BETWEEN ? AND ?)';
          params.push(fecha_CC, fecha_CC);
        } else if (fecha_CC !== 'null') {
          consulta += ' AND dtcc.fecha_creacion >= ?';
          params.push(fecha_CC);
        } else if (fecha_CC !== 'null') {
          consulta += ' AND dtcc.fecha_creacion <= ?';
          params.push(fecha_CC);
        }
    

    const [rows]= await pool.query(consulta, params)
    // Enviar los datos obtenidos al cliente
    res.status(200).json({ data: rows });

    } catch (error) {
        console.error("Error al obtener los datos de la tabla dtp:", error);
      res.status(500).json({ error: "Error al obtener los datos de la tabla dtp" });
    }
    
}



export const putDTHH = async(req, res)=>{
    const id =req.body.id;
    const id_est=req.body.id_est;
    
    try {
        const consulta =`UPDATE dthh SET id_est = ? WHERE id = ?`

        const [rows]= await pool.query(consulta,[id_est, id])
        res.status(200).json({data:rows})
    } catch (error) {
        console.log(error)
        res.status(500).json({error:'Error al obtene los datoe de la tabla DTHH'})
    }

}
