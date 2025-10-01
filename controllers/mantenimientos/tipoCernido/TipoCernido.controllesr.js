import { pool } from "../../../src/db.js";

export const getTipoCernido = async (req, res) => {
    try {
      const [rows] = await pool.query("SELECT * FROM tipocernido");
  
      if (rows.length === 0) {
        console.log("No se encontraron datos");
        return res.status(404).json({ error: "Datos no encontrados" });
      }
  
      console.log("✅ Datos obtenidos correctamente");
      res.json(rows);
  
    } catch (error) {
      console.error(" Error al ejecutar la consulta:", error);
  
      res.status(500).json({
        error: "Error en el backend",
        message: error.message,
        code: error.code,
        errno: error.errno,
        sqlState: error.sqlState,
        sqlMessage: error.sqlMessage
      });
    }
  };
  

export const PostTipoCernido= async(req, res)=>{

    const id_tip= req.body.id;
    const nombre= req.body.nombre;
    const telefono= req.body.telefono;
    const correo= req.body.correo;
    const sitio_web= req.body.web;
    const id_creador= req.body.id_creador;

    
        try{
            if(
                 id_tip==='' ||
                 nombre==='' ||
                 telefono==='' ||
                 correo==='' ||
                 sitio_web===''
                
            ){
                console.log('uno o varios datos estan vacios');
            }
            else{
                const consulta= 'INSERT INTO enc_prov(id_tip, nombre, telefono, correo, sitio_web, id_creador) values (?,?,?,?,?,?)'
                const [rows]= await pool.query(consulta, [id_tip, nombre, telefono,correo,sitio_web, id_creador ])
                res.send({rows})
            }
           
    
        }
        catch(err){
            console.log('error', err)
        }
    }
   
    
    

