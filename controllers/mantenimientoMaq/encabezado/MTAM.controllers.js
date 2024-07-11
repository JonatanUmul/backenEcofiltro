import { pool } from "../../../src/db.js";



export const postCKTAM = async(req, res)=>{
    const id_estado= 2;
    const id_creador= req.body.id_creador;
    const id_maquina= req.body.id_maq
   

    try{
    
       const consulta='INSERT INTO ckctam (id_maquina, id_creador, id_estado)Values(?, ?, ?)';
        const [rows]= await pool.query(consulta,[id_maquina, id_creador, id_estado])
        res.send({rows});
        
        
    }catch(err){
        console.log('Error al guardar los datos', err)
    }
}