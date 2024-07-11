import { pool } from "../../../src/db.js";

export const postDTCA1 = async (req, res) => {

    const { id_OTCA1,id_MP, id_aserradero, id_tipoCernido, CantidadInicial, CantidadFinal, id_creador} = req.body;
    try {
        if (id_OTCA1 === '' ||id_MP===''|| id_aserradero === '' || CantidadInicial === '' || CantidadFinal === '' ||id_creador==='') {
        } else {
            const consulta = 'INSERT INTO dtca1 (id_OTCA1,id_MP, id_aserradero, id_tipoCernido, CantidadInicial, CantidadFinal, id_creador) VALUES (?, ?, ?, ?,?,?,?)';
            const [rows] = await pool.query(consulta, [ id_OTCA1, id_MP, id_aserradero, id_tipoCernido, CantidadInicial, CantidadFinal, id_creador]);
            res.send({ rows });
        }
    } catch (err) {
        console.log('Error al guardar los datos', err);
    }
};




export const getDTCA1 = async (req, res) => {
    const id= req.params.id;
    try {
      // Consulta SQL para obtener todos los registros de la tabla dtp
      const consulta = `
      SELECT 
    d.id,
    d.id_creador,
    d.id_OTCA1,
    d.CantidadInicial,
    (d.CantidadInicial - d.CantidadFinal) AS merma,
    d.CantidadFinal,
    d.hora_creacion,
    d.fecha_creacion,
    enc_matprima.nom_matPrima AS matPrima,
    aserradero.nombre_aserradero AS aserradero,
    user.firmaUsr AS firmaEncargado,
    operarios.Nombre AS NombreCreador,
    user2.firmaUsr AS firmaJefe,
    user1.nombre AS idJefe,
    operarios3.Nombre AS JefeMateriaPrim

    
FROM 
    dtca1 d
LEFT JOIN
    enc_matprima ON d.id_MP = enc_matprima.id_enc

LEFT JOIN
    aserradero ON d.id_aserradero = aserradero.id

LEFT JOIN
    otca1 ON d.id_OTCA1 = otca1.id

LEFT JOIN
    user ON d.id_creador = user.id  

LEFT JOIN 
	operarios ON user.nombre = operarios.id
	
left JOIN
	user AS user2 on otca1.id_creador =user2.id
	
LEFT JOIN
	user AS user1 ON otca1.id_creador=user1.id

LEFT JOIN 
	operarios AS operarios3 ON user1.nombre =operarios3.id
      where otca1.id=?
  
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
  
  
  
  

export const getDTCAA1 = async (req, res) => {
    const { id_aserradero, fecha_creacion_inicio, fecha_creacion_fin } = req.params; // Obtener los parámetros de la URL
  
    try {
        let consulta = `
       SELECT 
    d.id,
    d.id_creador,
    d.id_OTCA1,
    d.CantidadInicial,
    (d.CantidadInicial - d.CantidadFinal) AS merma,
    d.CantidadFinal,
    d.hora_creacion,
    d.fecha_creacion,
    enc_matprima.nom_matPrima AS matPrima,
    aserradero.nombre_aserradero AS aserradero,
    user.firmaUsr AS firmaEncargado,
    operarios.Nombre AS NombreCreador,
    user2.firmaUsr AS firmaJefe,
    user1.nombre AS idJefe,
    operarios3.Nombre AS JefeMateriaPrim

    
FROM 
    dtca1 d
LEFT JOIN
    enc_matprima ON d.id_MP = enc_matprima.id_enc

LEFT JOIN
    aserradero ON d.id_aserradero = aserradero.id

LEFT JOIN
    otca1 ON d.id_OTCA1 = otca1.id

LEFT JOIN
    user ON d.id_creador = user.id  

LEFT JOIN 
	operarios ON user.nombre = operarios.id
	
left JOIN
	user AS user2 on otca1.id_creador =user2.id
	
LEFT JOIN
	user AS user1 ON otca1.id_creador=user1.id

LEFT JOIN 
	operarios AS operarios3 ON user1.nombre =operarios3.id
        
    WHERE 1=1`;
  
        const params = [];
  
        if (id_aserradero !== 'null') {
            consulta += ' AND (d.id_aserradero IS NULL OR d.id_aserradero = ?)';
            params.push(id_aserradero);
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
  