import { pool } from "../../../src/db.js";


export const postDTIP = async (req, res) => {

    const { id_OTIP, TipoPlata, TipoPlata2, fecha_real, id_modelo, codigoInicio, codigoFinal, impregnados, mermas, id_creador } = req.body;
   console.log('Tipo de plata 2',TipoPlata2)
    try {
            const consulta = 'INSERT INTO dtip (id_OTIP,TipoPlata,TipoPlata2,fecha_real, id_modelo,  codigoInicio, codigoFinal, impregnados, mermas, id_creador) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
            const [rows] = await pool.query(consulta, [id_OTIP, TipoPlata, TipoPlata2, fecha_real,id_modelo,  codigoInicio, codigoFinal, impregnados, mermas, id_creador]);
            res.send({ rows });
    
    } catch (err) {
        console.log('Error al guardar los datos', err);
    }
};


export const getDTIP = async (req, res) => {
    const id= req.params.id;
    try {
      // Consulta SQL para obtener todos los registros de la tabla dtp
      const consulta = `
      select 
      d.id,
      d.id_otip,
      d.codigoInicio,
      d.codigoFinal,
      d.impregnados,
      d.mermas,
      d.fechaCreacion,
      d.horaCreacion,
      insumos.insumo as TipoPlata,
      insumos2.insumo as TipoPlata2,
      ufmodelo.nombre_modelo as modelo,
      d.id_creador,
      user.nombre AS id_encargado,
      operarios.Nombre AS Encargado
  FROM 
      dtip d

   LEFT JOIN 
      ufmodelo ON d.id_modelo = ufmodelo.id_mod
   LEFT JOIN 
      insumos ON d.TipoPlata = insumos.id
   LEFT JOIN
      insumos AS insumos2 on d.TipoPLata2= insumos2.id
   LEFT JOIN 
   	user ON d.id_creador= user.id
   LEFT JOIN 
   	operarios ON  user.nombre = operarios.id
      WHERE d.id_otip= ?
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


  export const getSDTIP = async (req, res) => {
    const { fecha_creacion_inicio, fecha_creacion_fin } = req.params; // Obtener los parámetros de la URL

    try {
        let consulta = `
        select 
      d.id,
      d.id_otip,
      d.codigoInicio,
      d.codigoFinal,
      d.impregnados,
      d.mermas,
      d.fechaCreacion,
      d.horaCreacion,
      insumos.insumo as TipoPlata,
      ufmodelo.nombre_modelo as modelo,
      d.id_creador,
      user.nombre AS id_encargado,
      operarios.Nombre AS Encargado
  FROM 
      dtip d

  LEFT JOIN 
      ufmodelo ON d.id_modelo = ufmodelo.id_mod
LEFT JOIN 
      insumos ON d.TipoPlata = insumos.id
   LEFT JOIN 
   	user ON d.id_creador= user.id
   	LEFT JOIN 
   	operarios ON  user.nombre = operarios.id
            WHERE 1 = 1`;

        const params = [];


        if (fecha_creacion_inicio !== 'null' && fecha_creacion_fin !== 'null') {
            consulta += ' AND (d.fechaCreacion BETWEEN ? AND ?)';
            params.push(fecha_creacion_inicio, fecha_creacion_fin);
          } else if (fecha_creacion_inicio !== 'null') {
            consulta += ' AND d.fechaCreacion >= ?';
            params.push(fecha_creacion_inicio);
          } else if (fecha_creacion_fin !== 'null') {
            consulta += ' AND d.fechaCreacion <= ?';
            params.push(fecha_creacion_fin);
          }

        const [rows] = await pool.query(consulta, params);

        res.status(200).json(rows);
    } catch (error) {
        console.error("Error al obtener los datos de la tabla dthp:", error);
        res.status(500).json({ error: "Error al obtener los datos de la tabla dthp" });
    }
};


export const getTIP = async (req, res) => {
  const { fecha_creacion_inicio, fecha_creacion_fin, id_ufmodelo } = req.params; // Obtener los parámetros de la URL
console.log('Datos en el back',fecha_creacion_inicio, fecha_creacion_fin, id_ufmodelo)
  try {
      let consulta = `
      select 
      d.id,
      d.id_otip,
      d.codigoInicio,
      d.codigoFinal,
      d.impregnados,
      d.mermas,
      d.fechaCreacion,
      d.horaCreacion,
      insumos.insumo as TipoPlata,
      ufmodelo.nombre_modelo as modelo,
      d.id_creador,
      user.nombre AS id_encargado,
      user.firmaUsr AS encargado,
      operarios.Nombre AS Encargado,
      otip.id_creador,
      us2.nombre,
      op2.Nombre,
      us2.firmaUsr AS jefe
  
     
  FROM 
      dtip d
  
     LEFT JOIN ufmodelo ON d.id_modelo = ufmodelo.id_mod
     LEFT JOIN insumos ON d.TipoPlata = insumos.id
     LEFT JOIN user ON d.id_creador= user.id
   
     LEFT JOIN operarios ON  user.nombre = operarios.id
     LEFT JOIN otip ON otip.id=d.id_otip
     LEFT JOIN user us2 ON us2.id=otip.id_creador
     LEFT JOIN operarios AS op2 ON op2.id=us2.nombre
          WHERE 1 = 1`;

      const params = [];
  

     
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
      consulta += ' OR d.id_modelo = ?' ;
  
      params.push(id_ufmodelo);
    }


       
      const [rows] = await pool.query(consulta, params);

      res.status(200).json(rows);
  } catch (error) {
      console.error("Error al obtener los datos de la tabla dthp:", error);
      res.status(500).json({ error: "Error al obtener los datos de la tabla dthp" });
  }
};