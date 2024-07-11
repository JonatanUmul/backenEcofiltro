import { pool } from "../../../src/db.js";



export const postDTT = async (req, res) => {
  const { id_CTT,id_tunel,id_estadouf, id_modelo,id_modelo2,cabezaDerecha1, pieDerecho1, cabezaDerecha2,pieDerecho2, cabezaDerecha3,pieIzquierdo1,cabezaizquierda1, pieIzquierdo2, id_creador  } = req.body;
  
  try {
    const consulta = 'INSERT INTO dtt (id_CTT, id_tunel,id_estadouf, id_modelo, id_modelo2,cabezaDerecha1, pieDerecho1, cabezaDerecha2,pieDerecho2, cabezaDerecha3,pieIzquierdo1,cabezaizquierda1, pieIzquierdo2 , id_creador ) VALUES (?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?,?,?)';
    const [rows] = await pool.query(consulta, [id_CTT,id_tunel, id_estadouf, id_modelo,id_modelo2,cabezaDerecha1, pieDerecho1, cabezaDerecha2,pieDerecho2, cabezaDerecha3,pieIzquierdo1,cabezaizquierda1, pieIzquierdo2 ,id_creador ]);
    res.send({ rows });
  } catch (err) {
    console.log('Error al guardar los datos', err);
    res.status(500).send('Error al guardar los datos');
  }
}

export const getDTT= async (req, res)=>{
const id= req.params.id;

try {
  const consulta= `
  SELECT 
    d.id,
    d.fecha_creacion,
    d.hora_creacion,
    d.cabezaDerecha1,
    d.pieDerecho1,
    d.cabezaDerecha2,
    d.pieDerecho2,
    d.cabezaDerecha3,
    d.pieIzquierdo1,
    d.cabezaizquierda1,
    d.pieIzquierdo2,
    ROUND((
        d.cabezaDerecha1 + d.pieDerecho1 + d.cabezaDerecha2 + d.pieDerecho2 + 
        d.cabezaDerecha3 + d.pieIzquierdo1 + d.cabezaizquierda1 + d.pieIzquierdo2
    ) / 8) AS promedio,
    ctt.id AS id_ctt,
    ufmodelo.nombre_modelo AS modelo,
    ufmodelo2.nombre_modelo AS modelo2,
    enc_maq.nombre_maq AS tunel 
FROM 
    dtt d
LEFT JOIN 
    ctt ON d.id_CTT = ctt.id
LEFT JOIN 
    ufmodelo ON d.id_modelo = ufmodelo.id_mod
LEFT JOIN 
    ufmodelo AS ufmodelo2 ON d.id_modelo2 = ufmodelo2.id_mod
LEFT JOIN 
    enc_maq ON d.id_tunel = enc_maq.id_maq
where d.id_CTT=?
`

  const [rows]= await pool.query(consulta, [id])
  res.status(200).json({ data: rows });

    } catch (error) {
        console.error("Error al obtener los datos de la tabla dtp:", error);
      res.status(500).json({ error: "Error al obtener los datos de la tabla dtp" });
    }
    
}

// export const getDTTT= async (req, res)=>{
//   const {id,fecha_creacion_inicio, fecha_creacion_fin, ufmodelo, turnoProd, tunelNum} = req.params;
//   console.log('Datos de tunel',fecha_creacion_inicio, fecha_creacion_fin, ufmodelo, turnoProd, tunelNum);
//   try {
//     let consulta = `
//     SELECT 
//     d.id_CTT,
//       d.cabezaDerecha1,
//       d.pieDerecho1,
//       d.cabezaDerecha2,
//       d.pieDerecho2,
//       d.cabezaDerecha3,
//       d.pieIzquierdo1,
//       d.cabezaizquierda1,
//       d.pieIzquierdo2,
//       ROUND((
//         d.cabezaDerecha1 + d.pieDerecho1 + d.cabezaDerecha2 + d.pieDerecho2 + 
//         d.cabezaDerecha3 + d.pieIzquierdo1 + d.cabezaizquierda1 + d.pieIzquierdo2
//     ) / 8) AS promedio,
//       d.fecha_creacion,
//       d.hora_creacion,
//       IF(
//         TIME(d.hora_creacion) >= '05:00:00' AND TIME(d.hora_creacion) <= '17:00:00',
//         'Día',
//         IF(
//             TIME(d.hora_creacion) >= '17:01:00' AND TIME(d.hora_creacion) <= '23:59:59',
//             'Noche',
//             IF(
//                 TIME(d.hora_creacion) >= '00:00:00' AND TIME(d.hora_creacion) <= '02:00:0',
//                 'Noche',
//                 NULL
//             )
//         )
//     ) AS turnos,
//       ufmodelo.nombre_modelo AS modelo1,
//       ufmodelo2.nombre_modelo AS modelo2,
//       enc_maq.nombre_maq AS tunel,
//       estadouf.estado AS estadouf

    

//     FROM dtt d
//     LEFT JOIN ufmodelo ON d.id_modelo = ufmodelo.id_mod
//     LEFT JOIN ufmodelo AS ufmodelo2 ON d.id_modelo2 = ufmodelo2.id_mod
//     LEFT JOIN enc_maq ON d.id_tunel = enc_maq.id_maq
//     LEFT JOIN estadouf ON d.id_estadouf = estadouf.id
   
//     WHERE 1 = 1`;

//     const params = [];


//     if (id !== 'null') {
//       consulta += ' AND (d.id_CTT IS NULL OR d.id_CTT = ?)';
//       params.push(id);
//     }

//     if (ufmodelo !== 'null') {
//       consulta += ' AND (d.id_modelo IS NULL OR d.id_modelo = ?)';
//       params.push(ufmodelo);
//     }

//     if (turnoProd !== 'null') {
//       consulta += `
//         AND (
//           TIME(d.hora_creacion) >= '05:00:00' AND TIME(d.hora_creacion) <= '17:00:00' AND ? = 'Día'
//           OR
//           TIME(d.hora_creacion) >= '17:01:00' AND TIME(d.hora_creacion) <= '23:59:59' AND ? = 'Noche'
//           OR
//           TIME(d.hora_creacion) >= '00:00:00' AND TIME(d.hora_creacion) <= '02:00:0' AND ? = 'Noche'
//         )`;
//       params.push(turnoProd, turnoProd, turnoProd);
//     }

//     if (tunelNum !== 'null') {
//       consulta += ' AND (d.id_tunel IS NULL OR d.id_tunel = ?)';
//       params.push(tunelNum);
//     }

//     if (fecha_creacion_inicio !== 'null' && fecha_creacion_fin !== 'null') {
//       consulta += ' AND (d.fecha_real BETWEEN ? AND ?)';
//       params.push(fecha_creacion_inicio, fecha_creacion_fin);
//     } else if (fecha_creacion_inicio !== 'null') {
//       consulta += ' AND d.fecha_real >= ?';
//       params.push(fecha_creacion_inicio);
//     } else if (fecha_creacion_fin !== 'null') {
//       consulta += ' AND d.fecha_real <= ?';
//       params.push(fecha_creacion_fin);
//     }

//     const [rows] = await pool.query(consulta, params);

//     res.status(200).json(rows);
//   } catch (error) {
//     console.error("Error al obtener los datos de la tabla dthp:", error);
//     res.status(500).json({ error: "Error al obtener los datos de la tabla dthp" });
//   }
// };
export const getDTTT = async (req, res) => {
  const { id,ufmodelo,turnoProd,tunelNum,fecha_creacion_inicio,fecha_creacion_fin } = req.params;
  console.log('Datos de tunel', id,ufmodelo,turnoProd,tunelNum,fecha_creacion_inicio,fecha_creacion_fin);

  try {
    let consulta = `
         
    SELECT 
    d.id_CTT,
    d.cabezaDerecha1,
    d.pieDerecho1,
    d.cabezaDerecha2,
    d.pieDerecho2,
    d.cabezaDerecha3,
    d.pieIzquierdo1,
    d.cabezaizquierda1,
    d.pieIzquierdo2,
    ROUND((
      d.cabezaDerecha1 + d.pieDerecho1 + d.cabezaDerecha2 + d.pieDerecho2 + 
      d.cabezaDerecha3 + d.pieIzquierdo1 + d.cabezaizquierda1 + d.pieIzquierdo2
    ) / 8) AS promedio,
    d.fecha_creacion,
    d.hora_creacion,
    turnos,
    ufmodelo.nombre_modelo AS modelo1,
    ufmodelo2.nombre_modelo AS modelo2,
    enc_maq.nombre_maq AS tunel,
    estadouf.estado AS estadouf
FROM (
    SELECT 
        d.*,
        IF(
            TIME(d.hora_creacion) >= '05:00:00' AND TIME(d.hora_creacion) <= '17:00:00',
            'Día',
            IF(
                TIME(d.hora_creacion) >= '17:01:00' AND TIME(d.hora_creacion) <= '23:59:59',
                'Noche',
                IF(
                    TIME(d.hora_creacion) >= '00:00:00' AND TIME(d.hora_creacion) <= '02:00:00',
                    'Noche',
                    NULL
                )
            )
        ) AS turnos
    FROM dtt d
) d
LEFT JOIN ufmodelo ON d.id_modelo = ufmodelo.id_mod
LEFT JOIN ufmodelo AS ufmodelo2 ON d.id_modelo2 = ufmodelo2.id_mod
LEFT JOIN enc_maq ON d.id_tunel = enc_maq.id_maq
LEFT JOIN estadouf ON d.id_estadouf = estadouf.id


      WHERE 1 = 1`;

    const params = [];

    if (id !== 'null') {
      consulta += ' AND (d.id_CTT IS NULL OR d.id_CTT = ?)';
      params.push(id);
    }

    if (ufmodelo !== 'null') {
      consulta += ' AND (d.id_modelo IS NULL OR d.id_modelo = ?)';
      params.push(ufmodelo);
    }
    if (turnoProd !== 'null') {
      consulta += ' AND (d.turnos IS NULL OR d.turnos = ?)';
      params.push(turnoProd);
    }
   

    if (tunelNum !== 'null') {
      consulta += ' AND (d.id_tunel IS NULL OR d.id_tunel = ?)';
      params.push(tunelNum);
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


    const [rows] = await pool.query(consulta, params);

    res.status(200).json(rows);
  } catch (error) {
    console.error("Error al obtener los datos de la tabla dthp:", error);
    res.status(500).json({ error: "Error al obtener los datos de la tabla dthp" });
  }
};
