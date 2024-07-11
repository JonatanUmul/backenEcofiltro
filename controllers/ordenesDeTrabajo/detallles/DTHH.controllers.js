import { pool } from "../../../src/db.js";



export const postDTHH = async(req, res)=>{
    
    const {
        id_OTHH, id_turno, id_aserradero, id_cernidodetalle, id_cernidodetalle2, id_modelo, id_horno, id_hornero, horneado, mermasCrudas, codigoInicio, codigoFin, librasBarro, librasAserrin, librasAserrin2, id_aserradero2,id_creador, id_est
     } = req.body;
    

    try{
       
            const consulta='INSERT INTO dthh(id_OTHH, id_turno, id_aserradero, id_cernidodetalle, id_cernidodetalle2, id_modelo, id_horno, id_hornero, horneado, mermasCrudas, codigoInicio, codigoFin, librasBarro, librasAserrin, librasAserrin2, id_aserradero2, id_creador, id_est)Values(?, ?,?,?, ?,?, ?,?, ?,?, ?,?, ?,?,?,?,?,?)';
        const [rows]= await pool.query(consulta,[  id_OTHH, id_turno, id_aserradero, id_cernidodetalle, id_cernidodetalle2, id_modelo, id_horno, id_hornero, horneado, mermasCrudas, codigoInicio, codigoFin, librasBarro, librasAserrin, librasAserrin2, id_aserradero2, id_creador, id_est])
        res.send({rows});
        
        
    }catch(err){
        console.log('Error al guardar los datos', err)
    }
}

export const getDTHH = async(req, res)=>{

    const id= req.params.id
    try {
    const consulta = 
    `SELECT 
    d.id,
    'cthh' as tabla,
    d.codigoInicio,
    d.id_OTHH,
    d.codigoFin,
    d.horneado,
    d.mermasCrudas,
    d.librasBarro,
    d.librasAserrin,
    d.fecha_creacion AS fechaHorneado,
    turno.turno AS turnoHorneado,
    aserradero.nombre_aserradero AS aserradero,
    tipocernido.tipoCernido AS tipocernido1,
    tipocernido2.tipoCernido AS tipocernido2,
    d.librasAserrin2,
    ufmodelo.nombre_modelo AS ModeloEco,
    COALESCE(d.librasAserrin, 0) + COALESCE(d.librasAserrin2, 0) AS formula,
    enc_maq.nombre_maq AS Horno,
    operarios.Nombre AS Hornero,
    dtcc.aprobados,
    dtcc.altos,
    dtcc.bajos,
    dtcc.rajadosCC,
    dtcc.crudoCC,
    dtcc.quemados,
    dtcc.ahumados,
    dtcc.mermas_hornos,
     dtcc.fecha_creacion AS fechaCC,
    COALESCE(dtcc.aprobados+dtcc.altos+dtcc.bajos+dtcc.rajadosCC+dtcc.crudoCC+dtcc.quemados+dtcc.ahumados+dtcc.mermas_hornos) AS total,
    operarios1.Nombre AS EncargadoCC,
     CONCAT(ROUND((dtcc.aprobados / d.horneado * 100), 0), '%') AS porcentaje,
   othh.id_creador AS idjefe,
   user.nombre AS idJefe,
   operarios2.Nombre AS NobreJefe,
   userFirma.firmaUsr AS firmaJefe,
	userFEncargado.nombre AS idEncargado,
	operariosFencargado.Nombre AS NombreEncargado,
	userEfirma.firmaUsr AS FirmaEncargado
    
FROM dthh d
LEFT JOIN turno ON d.id_turno = turno.id
LEFT JOIN aserradero ON d.id_aserradero = aserradero.id
LEFT JOIN tipocernido ON d.id_cernidodetalle = tipocernido.id
LEFT JOIN tipocernido AS tipocernido2 ON d.id_cernidodetalle2 = tipocernido2.id
LEFT JOIN ufmodelo ON d.id_modelo = ufmodelo.id_mod
LEFT JOIN enc_maq ON d.id_horno = enc_maq.id_maq
LEFT JOIN operarios ON d.id_hornero = operarios.id
LEFT JOIN dtcc ON d.id = dtcc.id_dthh
LEFT JOIN operarios as operarios1 ON dtcc.id_operarioCC=operarios1.id
LEFT JOIN othh ON d.id_OTHH= othh.id
LEFT JOIN user ON othh.id_creador=user.id
LEFT JOIN operarios AS operarios2 ON user.nombre =operarios2.id
LEFT JOIN user AS userFirma ON othh.id_creador=userFirma.id
LEFT JOIN user as userFEncargado ON d.id_creador= userFEncargado.id
LEFT JOIN operarios AS operariosFencargado ON userFEncargado.nombre= operariosFencargado.id
LEFT JOIN user AS userEfirma ON userFEncargado.nombre= userEfirma.nombre


    where d.id_OTHH = ?`
    const [rows]= await pool.query(consulta, [id])
    // Enviar los datos obtenidos al cliente
    res.status(200).json({ data: rows });

    } catch (error) {
        console.error("Error al obtener los datos de la tabla dtp:", error);
      res.status(500).json({ error: "Error al obtener los datos de la tabla dtp" });
    }
    
}

export const getSSDTH = async(req, res)=>{

    const {fecha_creacion_inicio,fecha_creacion_fin,modeloUF,turn,horno,id_est}= req.params
    try {
    let consulta = 
    `SELECT 
    'cthh' as tabla,
    d.id,
    d.id_modelo,
    d.id_turno,
    d.id_horno,
    d.codigoInicio,
    d.id_OTHH,
    d.codigoFin,
    d.horneado,
    d.mermasCrudas,
    d.librasBarro,
    d.librasAserrin,
    d.fecha_creacion AS fechaHorneado,
     dtcc.fecha_creacion AS fechaCC,
    turno.turno AS turnoHorneado,
    aserradero.nombre_aserradero AS aserradero,
    tipocernido.tipoCernido AS tipocernido1,
    tipocernido2.tipoCernido AS tipocernido2,
    d.librasAserrin2,
    ufmodelo.nombre_modelo AS ModeloEco,
    COALESCE(d.librasAserrin, 0) + COALESCE(d.librasAserrin2, 0) AS formula,
    enc_maq.nombre_maq AS Horno,
    operarios.Nombre AS Hornero,
    dtcc.aprobados,
    dtcc.altos,
    dtcc.bajos,
    dtcc.rajadosCC,
    dtcc.crudoCC,
    dtcc.quemados,
    dtcc.ahumados,
    dtcc.mermas_hornos,
    COALESCE(dtcc.aprobados+dtcc.altos+dtcc.bajos+dtcc.rajadosCC+dtcc.crudoCC+dtcc.quemados+dtcc.ahumados+dtcc.mermas_hornos) AS total,
    operarios1.Nombre AS EncargadoCC,
     CONCAT(ROUND((dtcc.aprobados / d.horneado * 100), 0), '%') AS porcentaje,
   othh.id_creador AS idjefe,
   user.nombre AS idJefe,
   operarios2.Nombre AS NobreJefe,
   userFirma.firmaUsr AS firmaJefe,
	userFEncargado.nombre AS idEncargado,
	operariosFencargado.Nombre AS NombreEncargado,
	userEfirma.firmaUsr AS FirmaEncargado
    
FROM dthh d
LEFT JOIN turno ON d.id_turno = turno.id
LEFT JOIN aserradero ON d.id_aserradero = aserradero.id
LEFT JOIN tipocernido ON d.id_cernidodetalle = tipocernido.id
LEFT JOIN tipocernido AS tipocernido2 ON d.id_cernidodetalle2 = tipocernido2.id
LEFT JOIN ufmodelo ON d.id_modelo = ufmodelo.id_mod
LEFT JOIN enc_maq ON d.id_horno = enc_maq.id_maq
LEFT JOIN operarios ON d.id_hornero = operarios.id
LEFT JOIN dtcc ON d.id = dtcc.id_dthh
LEFT JOIN operarios as operarios1 ON dtcc.id_operarioCC=operarios1.id
LEFT JOIN othh ON d.id_OTHH= othh.id
LEFT JOIN user ON othh.id_creador=user.id
LEFT JOIN operarios AS operarios2 ON user.nombre =operarios2.id
LEFT JOIN user AS userFirma ON othh.id_creador=userFirma.id
LEFT JOIN user as userFEncargado ON d.id_creador= userFEncargado.id
LEFT JOIN operarios AS operariosFencargado ON userFEncargado.nombre= operariosFencargado.id
LEFT JOIN user AS userEfirma ON userFEncargado.nombre= userEfirma.nombre


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
