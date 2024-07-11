import { pool } from "../../../src/db.js";

export const postDASERRIN = async (req, res) => {
  const { id_OTSaserrin, id_MP, id_asrd, id_patio, cantidad_inicial, cantidad_final, id_creador  }=req.body;
  console.log(id_OTSaserrin);
  try {
    if (
      id_OTSaserrin===""||
      id_MP===""||
      id_asrd === "" ||
      id_patio === "" ||
      cantidad_inicial === "" ||
      cantidad_final === ""
    ) {
      console.log("Uno o varios datos están vacíos");
    } else {
      const consulta =
        "INSERT INTO daserrin(id_OTSaserrin, id_MP, id_asrdSMP, id_patio, cantidad_inicial, cantidad_final, id_creador) VALUES (?, ?, ?, ?, ?,?, ?)";
      const [rows] = await pool.query(consulta, [
      id_OTSaserrin,
      id_MP,
      id_asrd,
      id_patio,
      cantidad_inicial,
      cantidad_final,
      id_creador
      ]);
      res.send({ rows });
    }
  } catch (err) {
    console.log("Error al guardar los datos", err);
  }
};



export const getDASERRIN = async (req, res) => {
  const id = req.params.id;
  try {
    // Consulta SQL para obtener todos los registros de la tabla dtp
    const consulta = `
        SELECT 
    'daserrin' AS tabla,
    d.id,
    d.id_patio,
    d.cantidad_inicial,
    (d.cantidad_inicial - d.cantidad_final) AS merma,
    d.cantidad_final,
    d.hora_creacion,
    d.fecha_creacion,
    otsa.id AS id_OTSA,
    enc_matprima.nom_matPrima AS matPrima,
    aserradero.nombre_aserradero AS aserradero,
    patios.nombrePatio AS patio,
    user.firmaUsr AS firma,
    operarios.Nombre AS NombreCreador,
    user1.id AS idjefe,
    operarioJefe.Nombre AS NombreJefe,
   user2.firmaUsr AS firmaJefe
FROM 
    daserrin d
LEFT JOIN
    otsa ON d.id_OTSaserrin = otsa.id
LEFT JOIN
    enc_matprima ON d.id_MP = enc_matprima.id_enc
LEFT JOIN
    aserradero ON d.id_asrdSMP = aserradero.id
LEFT JOIN
    patios ON d.id_patio = patios.id
LEFT JOIN 
    user ON d.id_creador = user.id
LEFT JOIN
    operarios ON user.nombre = operarios.id
LEFT JOIN
    user AS user1 ON otsa.id_creador = user1.id
LEFT JOIN
    operarios AS operarioJefe ON user1.nombre = operarioJefe.id
LEFT JOIN
    user AS user2 ON user1.nombre = user2.id
    

    where otsa.id= ?

`;
    const [rows] = await pool.query(consulta, [id]);

    // Enviar los datos obtenidos al cliente
    res.status(200).json({ data: rows });
  } catch (error) {
    // Manejar errores de manera adecuada
    console.error("Error al obtener los datos de la tabla dtp:", error);
    res.status(500).json({ error: "Error al obtener los datos de la tabla dtp" });
  }
};




export const getDASERRI = async (req, res) => {
  const { id_asrdSMP, fecha_creacion_inicio,fecha_creacion_fin, id_patio } = req.params; // Obtener los parámetros de la URL

  try {
      let consulta = `
     SELECT 
    'daserrin' AS tabla,
    d.id,
    d.id_patio,
    d.cantidad_inicial,
    (d.cantidad_inicial - d.cantidad_final) AS merma,
    d.cantidad_final,
    d.hora_creacion,
    d.fecha_creacion,
    otsa.id AS id_OTSA,
    enc_matprima.nom_matPrima AS matPrima,
    aserradero.nombre_aserradero AS aserradero,
    patios.nombrePatio AS patio,
    user.firmaUsr AS firma,
    operarios.Nombre AS NombreCreador,
    user1.id AS idjefe,
    operarioJefe.Nombre AS NombreJefe,
   user2.firmaUsr AS firmaJefe
FROM 
    daserrin d
LEFT JOIN
    otsa ON d.id_OTSaserrin = otsa.id
LEFT JOIN
    enc_matprima ON d.id_MP = enc_matprima.id_enc
LEFT JOIN
    aserradero ON d.id_asrdSMP = aserradero.id
LEFT JOIN
    patios ON d.id_patio = patios.id
LEFT JOIN 
    user ON d.id_creador = user.id
LEFT JOIN
    operarios ON user.nombre = operarios.id
LEFT JOIN
    user AS user1 ON otsa.id_creador = user1.id
LEFT JOIN
    operarios AS operarioJefe ON user1.nombre = operarioJefe.id
LEFT JOIN
    user AS user2 ON user1.nombre = user2.id
    

  WHERE 1=1`;

      const params = [];

      if (id_patio !== 'null' && id_patio!=='null' ) {
          consulta += ' AND (d.id_patio IS NULL OR d.id_patio = ?)';
          params.push(id_patio);
      }

      if (id_asrdSMP !== 'null'&& id_asrdSMP!=='null' ) {
          consulta += ' AND (d.id_asrdSMP IS NULL OR d.id_asrdSMP = ?)';
          params.push(id_asrdSMP);
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
    else if (fecha_creacion_inicio !== 'null') {
      consulta += ' AND d.fecha_creacion = ?';
      params.push(fecha_creacion_inicio);
  }
   
    
     

      const [rows] = await pool.query(consulta, params);

      res.status(200).json(rows);
  } catch (error) {
      console.error("Error al obtener los datos de la tabla dthp:", error);
      res.status(500).json({ error: "Error al obtener los datos de la tabla dthp" });
  }
};
