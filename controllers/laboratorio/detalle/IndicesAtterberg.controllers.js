import { pool } from "../../../src/db.js";

export const IndicesAtterberg = async(req, res)=>{
  const {
    fechaEnsayo,
    limite_liquido,
    limite_plastico,
    indice_plastico
    }= req.body
   
   console.log('Datos reciubidos',
    fechaEnsayo,
    limite_liquido,
    limite_plastico,
    indice_plastico)
    try{
    
       const consulta=`INSERT INTO Limites_Atterberg_Barro(
    fecha_produccion,
    limite_liquido,
    limite_plastico,
    indice_plastico
    ) Values(?,?,?,?)`;
        const [rows]= await pool.query(consulta,[
          fechaEnsayo,
          limite_liquido,
          limite_plastico,
          indice_plastico
        ])
        res.send({rows});
        
        
    }catch(err){
        console.log('Error al guardar los datos', err)
    }
}


export const GetIndicesAtterberg = async (req, res) => {
  const fecha = req.params.fecha;
  console.log('Fecha en el backend:', fecha);

  try {
    const consulta = `SELECT * FROM Limites_Atterberg_Barro WHERE DATE(fecha_produccion) = ?`;
    const [rows] = await pool.query(consulta, [fecha]);

    console.log('Filas encontradas:', rows);
    res.status(200).json({ data: rows });
  } catch (err) {
    console.error("Error al obtener los datos de la tabla dtp:", err);
    res.status(500).json({ error: "Error al obtener los datos de la tabla dtp" });
  }
};
