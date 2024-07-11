import { pool } from "../../../src/db.js";


export const getEstMaq = async (req, res) => {
   
    try {
        // Consulta SQL para seleccionar los estados
        const [rows] = await pool.query("SELECT * FROM est_maq");
        
        // Verifica si se encontraron estados
        if (rows.length === 0) {
            console.log("Datos no encontrados");
            return res.status(404).send("Datos no encontrados");
        }

        // Envía los estados encontrados al cliente
        res.send({ rows }); // <- Aquí se envía la respuesta al cliente

        // Si el código continúa después de enviar la respuesta, es probable que ocurra un error
        console.log("Datos obtenidos correctamente");
    } catch (error) {
        console.error("Error al ejecutar la consulta:", error);
        res.status(500).send("Error del servidor");
    }
};

export const postEstMaq = async(req, res)=>{
    const estado= req.body.estado;
    const descripcion= req.body.descripcion;
    const id_creador= req.body.id_creador;
    try{
        if(estado==='', descripcion==='', id_creador===''){
            console.log('Uno o svarios datos estan vacios')
        }
        else{
            const consulta='INSERT INTO est_maq(estado,descripcion,id_creador)Values(?, ?, ?)';
        const [rows]= await pool.query(consulta,[estado, descripcion, id_creador])
        res.send({rows});
        }
        
    }catch(err){
        console.log('Error al guardar los datos', err)
    }
}
