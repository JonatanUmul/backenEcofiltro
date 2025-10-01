
import { pool } from "../../../src/db.js";

export const updateDTP=async(req,res)=>{

}

// export const postDTP = async (req, res) => {
//    const id_est=2;
//   const {
//     id_OTP,fecha_real,id_camionada, id_grupoproduccion, id_turno,id_cernidodetalle,id_cernidodetalle2, id_Aserradero, id_Aserradero2, librasAserrin2, id_ufmodelo, producido, codigoInicio, codigoFinal, librasBarro, librasAserrin, observacion, id_creador,id_mezcladora} = req.body;


// console.log(id_grupoproduccion)
//   try {
//     if(id_OTP===''|| id_turno===''|| id_grupoproduccion===''|| id_Aserradero===''|| id_ufmodelo===''|| producido===''|| codigoInicio===''|| codigoFinal===''|| librasBarro===''|| librasAserrin==='' || id_creador==='')
//     { console.log('Uno o varios datos están vacíos');
//     return res.status(400).json({ error: 'Uno o varios datos están vacíos' });
//   }else{
//       const consulta ="INSERT INTO dtp( id_OTP, fecha_real,id_grupoproduccion, id_turno, id_cernidodetalle,id_cernidodetalle2, id_Aserradero, id_Aserradero2, id_ufmodelo, producido, codigoInicio, codigoFinal, librasBarro, librasAserrin, librasAserrin2, observacion, id_creador, id_est, id_mezcladora) VALUES (?, ?, ?, ?,?,?,?, ?, ?,?, ?,?,?,?,?,?,?,?,?)";
//       const [rows] = await pool.query(consulta, [
//         id_OTP,
//         fecha_real,
//         id_grupoproduccion,
//     id_turno,
//     id_cernidodetalle,
//     id_cernidodetalle2,
//     id_Aserradero,
//     id_Aserradero2,
//     id_ufmodelo,
//     producido,
//     codigoInicio,
//     codigoFinal,
//     librasBarro,
//     librasAserrin,
//     librasAserrin2,
//     observacion, 
//     id_creador,
//     id_est,
//     id_mezcladora
//       ]);
//       res.send({ rows });
//     }
//     }
      
//    catch (err) {
//     console.log("Error al guardar los datos", err);
//     res.status(500).json({ error: "Error al guardar los datos" }); // Enviar un mensaje de error al frontend
//   }
// };


export const postDTP=async(req, res)=>{
  const {id_OTP,formData,fecha_creacion, id_creador, CodigoInicioNumber, CodigoFinalNumber}=req.body
  const total_lb_barro= formData.formulas_usadas*formData.librasBarro
  const total_lb_aserrin= formData.formulas_usadas*formData.librasAserrin
console.log(id_OTP,formData,fecha_creacion, id_creador, CodigoInicioNumber, CodigoFinalNumber)
  const id_est=2
  
  const consulta=
  `insert into dtp(
    id_OTP,
    id_lote_camionada,
    id_otfm,
    id_turno,
    id_ufmodelo,
    id_creador,
    producido,
    formulas_usadas,
    letra_inicio,
    codigoInicio,
    codigoFinal,
    letra_fin,
    librasBarro,
    total_lb_barro,
    observacion,
    fecha_real,
    id_grupoproduccion,
    id_est,
    id_mezcladora)
    VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
    `

    try {
     await pool.query(consulta,
        [id_OTP,
          formData.id_camionada_barro,
          formData.otfm_correlativo,
          formData.id_turno,
          formData.id_ufmodelo,
          id_creador,
          formData.producido,
          formData.formulas_usadas,
          formData.identificador.toUpperCase(),
          CodigoInicioNumber,
          CodigoFinalNumber,
          formData.identificador.toUpperCase(),
          formData.librasBarro,
          total_lb_barro,
          
          formData.observacion,
          fecha_creacion,
          formData.id_grupoproduccion,
          id_est,
          formData.id_mezcladora        
        ])
        res.status(200).json({mensaje:'Datos Guardados con Exito'})

    } catch (error) {
      console.log(error)
      res.status(501).json({mensaje:'Error del servidor', error})

    }

}


export const DTP_CodigosProduccion = async (req, res) => {


  const series = req.body.serialProduccion;
  const id_dtp = req.body.id_dtp;
  const id_proceso=req.body.id_proceso
  const id_modelo= req.body.id_modelo
  const estado = 'OK';

  console.log('datos en el post para guardar codigos nuevos',req.body)
  // Armar array de valores: [ [id_dtp, codigo1, estado], [id_dtp, codigo2, estado], ... ]
  const valores = series.map(codigo => [id_dtp, id_proceso, id_modelo, codigo, estado, 'disponible']);

  const consulta = 'INSERT INTO seriesEcofiltro (id_dtp, id_proceso, id_ufmodelo, serie, estado, disponibilidad) VALUES ?';

  try {
    await pool.query(consulta, [valores]); 
    res.status(200).json({ mensaje: 'Datos guardados exitosamente' });
    console.log('Guardado exitosamente')
  } catch (error) {
    console.error('Error del servidor:', error); 
  res.status(500).json({ mensaje: 'Error del servidor', error });
  }
};

export const UPDATE_DTP_CodigosProduccion = async (req, res) => {

  const datos = req.body.NuevoEstadoSerir;
  console.log('estados serie',datos)
  const fechaUpdate= new Date()

  const serie = datos[0]; 
  const id_proceso = datos[1];
  const estado = datos[2];

  const consulta = `
    UPDATE seriesecofiltro
    SET estado = ?, fecha_actualizacion = ?
    WHERE id_proceso = ? AND serie = ?;
  `;


  try {
    const response = await pool.query(consulta, [estado,fechaUpdate, id_proceso, serie]);
   
    res.status(200).json({
      mensaje: `Número de serie: ${serie} actualizado correctamente a: ${estado}`
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error del servidor: ' + error });
  }
};

export const Update_SerieEcofiltroTasa = async (req, res) => {
  const datos = req.body.NuevoEstadoSerirTasa;
  const fechaUpdate = new Date();
  const serie = datos[0]; 
  const id_proceso = datos[1];
  const tasa = Number(datos[2]); // <- asegúrate de que sea número

  console.log(serie, id_proceso, tasa);

  const consulta = `
    UPDATE seriesecofiltro
    SET tasa = ?, fecha_actualizacion = ?
    WHERE id_proceso = ? AND serie = ?
  `;

  try {
    await pool.query(consulta, [tasa, fechaUpdate, id_proceso, serie]);

    res.status(200).json({
      mensaje: `Número de serie: ${serie} actualizado correctamente a: ${tasa}`
    });

    if (tasa <= 0) {
      const estadoSerie = "Bajo";
      await pool.query(
        `UPDATE seriesecofiltro
         SET estado = ?, fecha_actualizacion = ?
         WHERE id_proceso = ? AND serie = ?`,
        [estadoSerie, fechaUpdate, id_proceso, serie]
      );
    } else if (tasa <= 7) {
      const estadoSerie = "Bajo";
      await pool.query(
        `UPDATE seriesecofiltro
         SET estado = ?, fecha_actualizacion = ?
         WHERE id_proceso = ? AND serie = ?`,
        [estadoSerie, fechaUpdate, id_proceso, serie]
      );
    } else if (tasa >= 17) {
      const estadoSerie = "Alto";
      await pool.query(
        `UPDATE seriesecofiltro
         SET estado = ?, fecha_actualizacion = ?
         WHERE id_proceso = ? AND serie = ?`,
        [estadoSerie, fechaUpdate, id_proceso, serie]
      );
    }else{
      const estadoSerie = "OK";
      await pool.query(
        `UPDATE seriesecofiltro
         SET estado = ?, fecha_actualizacion = ?
         WHERE id_proceso = ? AND serie = ?`,
        [estadoSerie, fechaUpdate, id_proceso, serie]
      );
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error del servidor: " + error });
  }
};



export const Update_SerieEcofiltroTasaPunto = async (req, res) => {
  const datos = req.body.estadosPorSeriePunto;

  const serie = datos[0]; 
  const id_proceso = datos[1];
  const estado_punto = datos[2];
  
  console.log(serie,id_proceso,estado_punto)
  const consulta = `
  UPDATE seriesecofiltro
  SET estado_punto = ?
  WHERE id_proceso = ? AND serie = ?
`;

  try {
   
                     await pool.query(consulta, [ estado_punto, id_proceso, serie]);
    res.status(200).json({
      mensaje: `Número de serie: ${serie} actualizado correctamente a: ${estado_punto}`
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error del servidor: ' + error });
  }
};

export const UPDATE_CodigosProduccion = async (req, res) => {
  const {serialProduccion,  id_modelo, id_proceso, disponibilidad } = req.body;
  const fechaUpdate= new Date()
  console.log('Series para actualizar',serialProduccion, id_modelo, id_proceso, disponibilidad);

  const consulta = `
    UPDATE seriesecofiltro
    SET disponibilidad = ?, fecha_actualizacion = ?
    WHERE id_proceso = ? AND serie = ? AND id_ufmodelo = ?
  `;

  try {
    // Ejecutar todas las actualizaciones en paralelo
//     const updates = serialProduccion.map((serie) =>

//       pool.query(consulta, [disponibilidad, id_proceso, serie, id_modelo])
//     );
// console.log('actualizacion',updates)
for(let a=0; a<serialProduccion.length; a++){
  console.log('Datos para actualizar en el for',serialProduccion[a])
  await pool.query(consulta,[disponibilidad, fechaUpdate, id_proceso, serialProduccion[a], id_modelo])
}
    // const resultados = await Promise.all(updates);


    return res.status(200).json({
      message: `${serialProduccion.length} series actualizadas correctamente`,
    });

  } catch (error) {
    console.error("Error al actualizar series:", error);
    return res.status(500).json({ error: "Error al actualizar series" });
  }
};




export const getDTP = async (req, res) => {
  const id= req.params.id;
  try {
    // Consulta SQL para obtener todos los registros de la tabla dtp
    const consulta = `
       SELECT 
        d.id,
        d.id_ufmodelo,
        otfm.id,
        otfm.correlativo,
        dtfm.peso,
        d.producido,
        d.letra_inicio,
        d.letra_fin,
        d.codigoInicio,
        d.codigoFinal,
        d.librasBarro,
        ROUND(d.producido / 6) AS formulas,
        CASE 
    WHEN d.id_cernidodetalle = 1 AND d.id_cernidodetalle2 = 1 THEN 'B'
    WHEN d.id_ufmodelo = 2 OR d.id_ufmodelo = 3 THEN 'Mini/18LTS'
    ELSE 'A'
END AS formulaTipo,
        d.fecha_creacion,
        d.fecha_real,
        d.hora_creacion,
        otp.id AS id_OTP,
        turno.turno AS nombre_turno,
        grupodetrabajo.grupos AS grupoProd,
        ufmodelo.nombre_modelo AS nombre_ufmodelo,
        d.observacion,
        user.firmaUsr AS firmaJefe,
        operarios.Nombre AS NombreJefe,
        operarios1.Nombre AS NombreEncargadoP,
        user1.firmaUsr AS firmaEncargado
      FROM 
        dtp d
      LEFT JOIN 
        otp ON d.id_OTP = otp.id
      LEFT JOIN 
        turno ON d.id_turno = turno.id
      LEFT JOIN
        grupodetrabajo ON d.id_grupoproduccion = grupodetrabajo.id
      LEFT JOIN 
        ufmodelo ON d.id_ufmodelo = ufmodelo.id_mod
      LEFT JOIN 
        user ON otp.id_creador = user.id
      LEFT JOIN 
        operarios ON user.nombre = operarios.id
      LEFT JOIN 
        user AS user2 ON d.id_creador = user2.id
      LEFT JOIN 
        operarios AS operarios1 ON user2.nombre = operarios1.id
      LEFT JOIN 
        user AS user1 ON d.id_creador = user1.id
	LEFT JOIN
		otfm on d.id_otfm=otfm.id
	left JOIN
		dtfm on dtfm.id_OTFM=d.id_otfm

    where otp.id=?


`;
    const [rows] = await pool.query(consulta,[id]);

    // Enviar los datos obtenidos al cliente
    res.status(200).json({ data: rows });
  } catch (error) {
    // Manejar errores de manera adecuada
    console.error("Error al obtener los datos de la tabla dtp:", error);
    res.status(500).json({ error: "Error al obtener los datos de la tabla dtp" });
  }
};


export const getDTPPS = async (req, res) => {
  const { fecha_creacion_inicio, fecha_creacion_fin, id_ufmodelo, id_grupoproduccion } = req.params;
  
  try {
    let consulta = `
      SELECT 
        d.id,
        d.producido,
        d.id_ufmodelo,
        d.letra_fin,
        d.codigoInicio,
        d.codigoFinal,
        d.librasBarro,
        d.librasAserrin,
        d.librasAserrin2,
        COALESCE(d.librasAserrin, 0) + COALESCE(d.librasAserrin2, 0) as pesototal,
        ROUND(d.producido / 6) AS formulas,
        d.fecha_creacion,
        d.fecha_real,
        d.hora_creacion,
        otp.id AS id_OTP,
        turno.turno AS nombre_turno,
        grupodetrabajo.grupos AS grupoProd,
        ufmodelo.nombre_modelo AS nombre_ufmodelo,
        aserradero.nombre_aserradero AS aserradero1,
        aserradero2.nombre_aserradero AS aserradero2,
        d.observacion,
        cernidodetalle.detalle AS cernidodetalle,
        cernidodetalle2.detalle AS cernidodetalle2,
        user.firmaUsr AS firmaJefe,
        operarios.Nombre AS NombreJefe,
        operarios1.Nombre AS NombreEncargadoP,
        user1.firmaUsr AS firmaEncargado,
         COUNT(se.id) AS existencias

      FROM 
        dtp d
      LEFT JOIN 
        otp ON d.id_OTP = otp.id
      LEFT JOIN 
        turno ON d.id_turno = turno.id
      LEFT JOIN 
        aserradero ON d.id_Aserradero = aserradero.id
      LEFT JOIN 
        aserradero AS aserradero2 ON d.id_Aserradero2 = aserradero2.id
      LEFT JOIN
        grupodetrabajo ON d.id_grupoproduccion = grupodetrabajo.id
      LEFT JOIN 
        ufmodelo ON d.id_ufmodelo = ufmodelo.id_mod
      LEFT JOIN
        cernidodetalle ON d.id_cernidodetalle = cernidodetalle.id
      LEFT JOIN
        cernidodetalle AS cernidodetalle2 ON d.id_cernidodetalle2 = cernidodetalle2.id
      LEFT JOIN 
        user ON otp.id_creador = user.id
      LEFT JOIN 
        operarios ON user.nombre = operarios.id
      LEFT JOIN 
        user AS user2 ON d.id_creador = user2.id
      LEFT JOIN 
        operarios AS operarios1 ON user2.nombre = operarios1.id
      LEFT JOIN 
        user AS user1 ON d.id_creador = user1.id
          LEFT JOIN 
      	seriesEcofiltro AS se ON d.id= se.id_dtp

      WHERE 1 = 1
         	
     
    `;

    let params = [];
  
    if (fecha_creacion_inicio !== 'null' && fecha_creacion_fin !== 'null') {
      consulta += ' AND d.fecha_real BETWEEN ? AND ?';
      params.push(fecha_creacion_inicio, fecha_creacion_fin);
    } else if (fecha_creacion_inicio !== 'null') {
      consulta += ' AND d.fecha_real >= ?';
      params.push(fecha_creacion_inicio);
    } else if (fecha_creacion_fin !== 'null') {
      consulta += ' AND d.fecha_real <= ?';
      params.push(fecha_creacion_fin);
    }

    if (id_ufmodelo !== 'null') {
      consulta += ' AND d.id_ufmodelo = ?';
      params.push(id_ufmodelo);
    }


   


    if (id_grupoproduccion !== 'null') {
      consulta += ' AND d.id_grupoproduccion = ?';
      params.push(id_grupoproduccion);
    }

      consulta += ' GROUP BY d.id'

    const [rows] = await pool.query(consulta, params);

    res.status(200).json(rows);
    console.log('Datos recibidos del front:', id_ufmodelo, id_grupoproduccion, fecha_creacion_inicio, fecha_creacion_fin);
  } catch (error) {
    console.error("Error al obtener los datos de la tabla dtp:", error);
    res.status(500).json({ error: "Error al obtener los datos de la tabla dtp" });
  }
};



export const DtpUltimoCodigo=async(req, res)=>{
  const id_ufmodelo=req.params.modelo
  console.log(id_ufmodelo)
const consulta= `
  SELECT
  dtp.id,
  dtp.codigoInicio,
  sum(dtp.codigoFinal+1) AS codigoFinal
  FROM dtp
  WHERE id = (
    SELECT MAX(id)
    FROM dtp
  WHERE dtp.id_ufmodelo=?
  );`

try {
  const [response]= await pool.query(consulta,[id_ufmodelo] )
  res.send({response})
} catch (error) {
  res.status(500).json({mensaje:'Error en el Servidor', error})
  console.log(error)
}

}

export const DTP_CodigosProduccion_id_dtp=async(req, res)=>{

const id_dtp=parseInt(req.params.id_dtp)
const id_proceso=parseInt(req.params.id_proceso)

const consulta= 
`SELECT 
seriesecofiltro.id,
seriesecofiltro.id_proceso,
seriesecofiltro.serie,
seriesecofiltro.tasa,
seriesecofiltro.estado_punto,
seriesecofiltro.estado,
seriesecofiltro.fecha_creacion
 FROM seriesecofiltro
WHERE id_dtp=? AND id_proceso=?
`
 try {
  const [response]=await pool.query(consulta, [id_dtp, id_proceso])
  console.log(response)
  res.send({response})
 } catch (error) {
  res.status(201).json({mensaje: 'Error del servidor', error})
 }
 }


 
 export const DTP_CodigosAprobados=async(req, res)=>{

  const id_modelo=req.params.id_modelo
  const id_proceso=req.params.id_proceso
  
  const consulta= 
  `SELECT 
  seriesecofiltro.id,
  seriesecofiltro.id_proceso,
  seriesecofiltro.serie,
  seriesecofiltro.tasa,
  seriesecofiltro.estado,
  seriesecofiltro.fecha_creacion
   FROM seriesecofiltro
  WHERE id_ufmodelo=? AND id_proceso=? AND disponibilidad='disponible'
  `
   try {
    const [response]=await pool.query(consulta, [id_modelo, id_proceso])
    console.log(response)
    res.send({response})
   } catch (error) {
    res.status(201).json({mensaje: 'Error del servidor', error})
   }
   }

   export const DTP_MermasProduccion = async (req, res) => {

    const { fecha_inicio, fecha_fin, id_modelo, id_proceso } = req.query;
    console.log('Params recibidos:', fecha_inicio, fecha_fin, id_modelo, id_proceso );
    try {
      let consulta = `
        SELECT 
          d.id_dtp,
          d.id_proceso, 
          d.serie, 
          d.estado, 
          d.fecha_creacion, 
          d.fecha_actualizacion, 
          d.disponibilidad
        FROM seriesecofiltro d
        WHERE 1 = 1
      `;
  
      const params = [];
  
      if (fecha_inicio !== 'null' && fecha_fin !== 'null') {
        consulta += ' AND d.fecha_actualizacion BETWEEN ? AND ?';
        params.push(fecha_inicio, fecha_fin);
      } else if (fecha_inicio !== 'null') {
        consulta += ' AND d.fecha_actualizacion >= ?';
        params.push(fecha_inicio);
      } else if (fecha_fin !== 'null') {
        consulta += ' AND d.fecha_actualizacion <= ?';
        params.push(fecha_fin);
      }
  
      if (id_modelo !== 'null') {
        consulta += ' AND d.id_ufmodelo = ?';
        params.push(id_modelo);
      }
  
      if (id_proceso !== 'null') {
        consulta += ' AND d.id_proceso = ?';
        params.push(id_proceso);
      }
      consulta += "AND d.estado != 'OK'";
      consulta += ' ORDER BY d.fecha_actualizacion DESC';
  
      const [rows] = await pool.query(consulta, params);
      console.log(rows)
      res.status(200).json(rows);
  
     
    } catch (error) {
      console.error('Error al obtener los datos de seriesecofiltro:', error);
      res.status(500).json({ error: 'Error al obtener los datos de seriesecofiltro' });
    }
  };
  