import { pool } from "../../../src/db.js";

      


export const postDOTDMPB = async(req, res)=>{
  const {
    id_otdmpb,
    id_creador,
    lbbarro,
    carcilla,
    climo,
    carena,
    hbarro,
    iplastico
    }= req.body
   
   
    try{
    
       const consulta=`INSERT INTO dotdmpb(
        id_otdmpb,
    id_creador,
    lbbarro,
    carcilla,
    climo,
    carena,
    hbarro,
    iplastico) Values(?,?,?,?,?,?,?,?)`;
        const [rows]= await pool.query(consulta,[
          id_otdmpb,
    id_creador,
    lbbarro,
    carcilla,
    climo,
    carena,
    hbarro,
    iplastico
        ])
        res.send({rows});
        
        
    }catch(err){
        console.log('Error al guardar los datos', err)
    }
}




export const getDOTDMPB= async(req, res)=>{
  const id= req.params.id;
  
  try {
    const consulta= `
    

    SELECT 
    "dotdmpb" AS encabezado,
    lbbarro,
    carcilla,
    climo,
    carena,
    hbarro,
    iplastico,
    fecha_creacion
    
    FROM dotdmpb
    WHERE id_otdmpb=?
 
    
    `
    const [rows]= await pool.query(consulta, [id])
    res.status(200).json({ data: rows });
    
  } catch (error) {
    console.error("Error al obtener los datos de la tabla dtp:", error);
    res.status(500).json({ error: "Error al obtener los datos de la tabla dtp" });
  }
  
  } 