import { pool } from "../../../src/db.js";

export const postDTCA2 = async (req, res) => {

    const { id_OTCA2,id_MP, id_aserradero, cantidad_inicial, cernido_fino, cernido_grueso, id_creador} = req.body;
    try {
    
        if (id_OTCA2 === '' ||id_MP===''|| id_aserradero === '' || cantidad_inicial === '' || cernido_fino === '' ||cernido_grueso===''||id_creador==='' ) {
            console.log('Uno o varios datos están vacíos');
        } else {
            const consulta = 'INSERT INTO dtca2(id_OTCA2, id_MP, id_aserradero, cantidad_inicial, cernido_fino, cernido_grueso, id_creador) VALUES (?, ?, ?, ?,?,?,?)';
            const [rows] = await pool.query(consulta, [ id_OTCA2, id_MP, id_aserradero, cantidad_inicial, cernido_fino, cernido_grueso, id_creador]);
            res.send({ rows });
        }
    } catch (err) {
        console.log('Error al guardar los datos', err);
    }
};



export const getDTCA2 = async (req, res) => {
    const id= req.params.id;
    try {
      // Consulta SQL para obtener todos los registros de la tabla dtp
      const consulta = `
       SELECT 
		d.id,
		d.id_OTCA2,
		d.id_creador,
		d.cantidad_inicial,
		d.fecha_creacion,
		d.hora_creacion,
		d.cernido_fino,
		d.cernido_grueso,
      (cantidad_inicial-(cernido_fino+cernido_grueso)) as merma,
		d.hora_creacion,
		d.fecha_creacion,
      enc_matprima.nom_matPrima as matPrima,
		aserradero.nombre_aserradero AS aserradero,
		otca2.id_creador,
		user.nombre AS creador,
		user1.firmaUsr AS JefeMateriaPrim,
		user2.firmaUsr AS FirmaJefeProdu,
		operarios.Nombre AS NombreJefeMP,
		user3.nombre AS idEcargado,
		operarios1.Nombre AS NombreEncargadoMP
		
	FROM 
		dtca2 d
      LEFT JOIN 
      enc_matprima ON d.id_MP = enc_matprima.id_enc

      LEFT JOIN 
		aserradero ON d.id_aserradero = aserradero.id	
		
		LEFT join
		otca2 ON d.id_OTCA2=otca2.id
		
		LEFT join
		user ON otca2.id_creador=user.id
		
		LEFT JOIN 
		user AS user1 ON d.id_creador =user1.id
		
		LEFT JOIN 
		user AS user2 ON user.nombre =user2.nombre
		
		LEFT join
		operarios ON user.nombre =operarios.id
		
		LEFT JOIN 
		user AS user3 ON d.id_creador= user3.id
		
	   LEFT join
		operarios as operarios1 ON user3.nombre =operarios1.id
		
      where otca2.id=?
  
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
  

  

export const getDTCAA2 = async (req, res) => {
    const { id_aserradero, fecha_creacion_inicio,fecha_creacion_fin } = req.params; // Obtener los parámetros de la URL
  
    try {
        let consulta = `
       SELECT 
		d.id,
		d.id_OTCA2,
		d.id_creador,
		d.cantidad_inicial,
		d.fecha_creacion,
		d.hora_creacion,
		d.cernido_fino,
		d.cernido_grueso,
      (cantidad_inicial-(cernido_fino+cernido_grueso)) as merma,
		d.hora_creacion,
		d.fecha_creacion,
      enc_matprima.nom_matPrima as matPrima,
		aserradero.nombre_aserradero AS aserradero,
		otca2.id_creador,
		user.nombre AS creador,
		user1.firmaUsr AS JefeMateriaPrim,
		user2.firmaUsr AS FirmaJefeProdu,
		operarios.Nombre AS NombreJefeMP,
		user3.nombre AS idEcargado,
		operarios1.Nombre AS NombreEncargadoMP
		
	FROM 
		dtca2 d
      LEFT JOIN 
      enc_matprima ON d.id_MP = enc_matprima.id_enc

      LEFT JOIN 
		aserradero ON d.id_aserradero = aserradero.id	
		
		LEFT join
		otca2 ON d.id_OTCA2=otca2.id
		
		LEFT join
		user ON otca2.id_creador=user.id
		
		LEFT JOIN 
		user AS user1 ON d.id_creador =user1.id
		
		LEFT JOIN 
		user AS user2 ON user.nombre =user2.nombre
		
		LEFT join
		operarios ON user.nombre =operarios.id
		
		LEFT JOIN 
		user AS user3 ON d.id_creador= user3.id
		
	   LEFT join
		operarios as operarios1 ON user3.nombre =operarios1.id
		
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
  
  
  
