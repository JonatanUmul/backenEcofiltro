import { pool } from "../../../src/db.js";


export const getEstProc = async (req, res) => {
   
    try {
        // Consulta SQL para seleccionar el usuario por nombre y contraseña

        const [rows] = await pool.query("SELECT * FROM est_proc");
        res.send({rows})
        // Verifica si se encontró un usuario
        if (rows.length === 0) {
            console.log("Datos Encontrados");
            return res.status(401).send("DAtos no encontrado"); 
        }
    } catch (error) {
        console.error("Error al ejecutar la consulta:", error);
        res.status(500).send("Error del servidor");
    }
};

export const postEstProc = async(req, res)=>{
    const estado= req.body.estado;
    const descripcion= req.body.descripcion;
 
    try{
        if(estado==='', descripcion===''){
            console.log('Uno o svarios datos estan vacios')
        }
        else{
            const consulta='INSERT INTO est_proc(estado,descripcion )Values(?, ?)';
        const [rows]= await pool.query(consulta,[estado, descripcion])
        res.send({rows});
        }
        
    }catch(err){
        console.log('Error al guardar los datos', err)
    }
}
