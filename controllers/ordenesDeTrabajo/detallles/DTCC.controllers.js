import { pool } from "../../../src/db.js";



export const postDTCC = async(req, res)=>{
    const estado= 2;
    
    const {
      id_dthh,
        horneados,
        fecha_real,
        codigoInicio,
        codigoFin,
        id_operarioCC,
        id_auditor,
        modelo,
        id_horno,
        turnoCC,
        fechaHorneado,
        turnoHorneado,
        aprobados,
        altos,
        bajos,
        mermas_hornos,
        rajadosCC,
        crudoCC,
        quemados,
        ahumados,
        id_creador
        } = req.body;
    

    try{
        if(estado===''){
            console.log('Uno o varios datos estan vacios')
        }
        else{
            const consulta=`INSERT INTO dtcc(  
                id_dthh,
                horneados,
                fecha_real,
                codigoInicio,
                codigoFin,
                id_operarioCC,
                id_auditor,
                modelo,
                id_horno,
                turnoCC,
                fechaHorneado,
                turnoHorneado,
                aprobados,
                altos,
                bajos,
                mermas_hornos,
                rajadosCC,
                crudoCC,
                quemados,
                ahumados,
                id_creador)Values(?,?, ?,?, ?,?,?,?, ?,?, ?,?, ?,?, ?,?,?,?,?,?,?)`;
        const [rows]= await pool.query(consulta,[  
          id_dthh,
            horneados,
            fecha_real,
            codigoInicio,
            codigoFin,
            id_operarioCC,
            id_auditor,
            modelo,
            id_horno,
            turnoCC,
            fechaHorneado,
            turnoHorneado,
            aprobados,
            altos,
            bajos,
            mermas_hornos,
            rajadosCC,
            crudoCC,
            quemados,
            ahumados,
            id_creador])
        res.send({rows});
        }
        
    }catch(err){
        console.log('Error al guardar los datos', err)
    }
}

export const getDTCC = async(req, res)=>{

    const id= req.params.id
    console.log('id recibido', id)
    try {
    const consulta = 
    `SELECT
    d.id_OTCC,
    d.id,
    d.fecha_real,
    d.fecha_creacion,
    d.codigoInicio,
    d.codigoFin,
    d.fechaHorneado,
    d.aprobados,
    d.altos,
    d.bajos,
    d.id_horno,
    d.rajadosCC,
    d.crudoCC,
    d.quemados,
    d.ahumados,
    d.id_dthh,
    operario_encargado.Nombre AS encargadoCC,
    operario_auditor.Nombre AS Aditor,
    ufmodelo.nombre_modelo AS modeloUF,
    turnoCC.turno AS turnoCC, 
    turnoHorneado.turno AS turnoHorneado  
FROM dtcc d
LEFT JOIN operarios AS operario_encargado ON d.id_operarioCC = operario_encargado.id
LEFT JOIN operarios AS operario_auditor ON d.id_auditor = operario_auditor.id
LEFT JOIN ufmodelo ON d.modelo = ufmodelo.id_mod
LEFT JOIN turno AS turnoCC ON d.turnoCC = turnoCC.id  
LEFT JOIN turno AS turnoHorneado ON d.turnoHorneado = turnoHorneado.id

where d.id_dthh = ?`
    const [rows]= await pool.query(consulta, [id])
    // Enviar los datos obtenidos al cliente
    res.status(200).json({ data: rows });

    } catch (error) {
        console.error("Error al obtener los datos de la tabla dtp:", error);
      res.status(500).json({ error: "Error al obtener los datos de la tabla dtp" });
    }
    
}



export const getsDTCCC = async(req, res)=>{

    const {fecha_creacion_inicio, fecha_creacion_fin, turnoHorno, horno, modelo, id_dthh}= req.params
    console.log('datos backend',fecha_creacion_inicio, fecha_creacion_fin, turnoHorno, horno, modelo, id_dthh)
    try {
    let consulta = 
    `SELECT
    d.id_OTCC,
    d.id,
    d.fecha_real,
    d.fecha_creacion,
    d.codigoInicio,
    d.codigoFin,
    dthh.codigoInicio AS CIdthh,
    dthh.CodigoFin AS CFdthh,
    
    d.fechaHorneado,
    d.aprobados,
    d.altos,
    d.bajos,
    d.id_horno,
    d.rajadosCC,
    d.crudoCC,
    d.quemados,
    d.ahumados,
    d.id_dthh,
    operario_encargado.Nombre AS encargadoCC,
    operario_auditor.Nombre AS Aditor,
    ufmodelo.nombre_modelo AS modeloUF,
    turnoCC.turno AS turnoCC, 
    turnoHorneado.turno AS turnoHorneado,
    dthh.horneado as horneados,
    ROUND( (d.aprobados/dthh.horneado)*100)AS porcentaje
    
FROM dtcc d
LEFT JOIN operarios AS operario_encargado ON d.id_operarioCC = operario_encargado.id
LEFT JOIN operarios AS operario_auditor ON d.id_auditor = operario_auditor.id
LEFT JOIN ufmodelo ON d.modelo = ufmodelo.id_mod
LEFT JOIN turno AS turnoCC ON d.turnoCC = turnoCC.id  
LEFT JOIN turno AS turnoHorneado ON d.turnoHorneado = turnoHorneado.id
LEFT JOIN dthh ON  dthh.fecha_creacion = d.fechaHorneado AND dthh.id_turno=d.turnoHorneado AND dthh.id_horno=d.id_horno AND dthh.id_modelo=d.modelo
where 1= 1`

const params=[]


    
    if (turnoHorno !== 'null') {
      consulta += ' AND (d.turnoHorneado IS NULL OR d.turnoHorneado = ?)';
      params.push(turnoHorno);
    }
    if (horno !== 'null') {
        consulta += ' AND (d.id_horno IS NULL OR d.id_horno = ?)';
        params.push(horno);
      }
      if (modelo !== 'null') {
        consulta += ' AND (d.modelo IS NULL OR d.modelo = ?)';
        params.push(modelo);
      }
      if (id_dthh !== 'null') {
        consulta += ' AND (d.id_dthh IS NULL OR d.id_dthh = ?)';
        params.push(id_dthh);
      }
    
     if (fecha_creacion_inicio !== 'null' && fecha_creacion_fin !== 'null') {
          consulta += ' AND (d.fechaHorneado BETWEEN ? AND ?)';
          params.push(fecha_creacion_inicio, fecha_creacion_fin);
        } else if (fecha_creacion_inicio !== 'null') {
          consulta += ' AND d.fechaHorneado >= ?';
          params.push(fecha_creacion_inicio);
        } else if (fecha_creacion_fin !== 'null') {
          consulta += ' AND d.fechaHorneado <= ?';
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