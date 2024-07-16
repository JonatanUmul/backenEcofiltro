import { pool } from "../../../src/db.js";

      


export const postDOTDMP = async(req, res)=>{
  const {
    id_OTDMP,
    id_creador,
    id_aserradero,
    id_aserradero2,
    id_cernidodetalle,
    id_cernidodetalle2,
    lbaserrin,
    lbaserrin2
    }= req.body
   
   
    try{
    
       const consulta=`INSERT INTO dotdmp(
        id_OTDMP,
    id_creador,
    id_aserradero,
    id_aserradero2,
    id_cernidodetalle,
    id_cernidodetalle2,
    lbaserrin,
    lbaserrin2) Values(?,?,?,?,?,?,?,?)`;
        const [rows]= await pool.query(consulta,[
          id_OTDMP,
          id_creador,
          id_aserradero,
          id_aserradero2,
          id_cernidodetalle,
          id_cernidodetalle2,
          lbaserrin,
          lbaserrin2
        ])
        res.send({rows});
        
        
    }catch(err){
        console.log('Error al guardar los datos', err)
    }
}




export const getDOTDMP= async(req, res)=>{
  const id= req.params.id;
  
  try {
    const consulta= `
    
SELECT
dotdmp as encabezado,
d.id_OTDMP,
d.lbaserrin,
d.lbaserrin2,
user.nombre AS id_creador,
operarios.Nombre AS creador,
aserradero.nombre_aserradero AS aserradero1,
aserradero2.nombre_aserradero AS aserradero2,
tipocernido.tipoCernido AS tipocernido1,
tipocernido2.tipoCernido AS tipocernido1,
d.fecha_creacion
FROM dotdmp d

LEFT JOIN 
user ON d.id_creador= user.id
LEFT JOIN 
operarios ON user.nombre =operarios.id
LEFT JOIN 
aserradero ON d.id_aserradero =aserradero.id
LEFT JOIN 
aserradero AS aserradero2 ON d.id_aserradero= aserradero2.id
LEFT JOIN 
tipocernido ON d.id_cernidodetalle=tipocernido.id
LEFT JOIN
tipocernido AS tipocernido2 ON d.id_cernidodetalle2=tipocernido2.id

    where d.id_OTDMP=?;
    
    `
    const [rows]= await pool.query(consulta, [id])
    res.status(200).json({ data: rows });
    
  } catch (error) {
    console.error("Error al obtener los datos de la tabla dtp:", error);
    res.status(500).json({ error: "Error al obtener los datos de la tabla dtp" });
  }
  
  } 