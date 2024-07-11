import { pool } from "../../../src/db.js";

export const getTipoProv = async (req, res) => {
    try {
        // Consulta SQL para seleccionar el usuario por nombre y contraseña
        const [rows] = await pool.query("select * from tipo_prov");

        // Verifica si se encontró algún dato
        if (rows.length === 0) {
            console.log("No se encontraron datos");
            return res.status(404).send("Datos no encontrados");
        }

        // Envía los datos al cliente
        res.status(200).json({ rows });
        console.log('Datos obtenidos correctamente');
    } catch (error) {
        console.error("Error al ejecutar la consulta:", error);
        res.status(500).send("Error del servidor");
    }
};

export const postTipoProv= async(req, res)=>{
    const nombre= req.body.nombre;
    const descripcion= req.body.descripcion;
    
    try{
        if(nombre && descripcion===''){
            console.log('uno o varios datos estan vacios');
        }
        else{
            const consulta= 'INSERT INTO tipo_prov(nombre, descripcion) valueS (?,?)'
            const [rows]= await pool.query(consulta, [nombre, descripcion])
            res.send({rows})
        }
       

    }
    catch(err){
        console.log('error', err)
    }
}
