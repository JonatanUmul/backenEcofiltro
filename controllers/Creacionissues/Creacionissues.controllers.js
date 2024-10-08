import { pool } from "../../src/db.js";

export const postCreacionissues = async (req, res) => {

    const {id_planDiario,text, id_creador  }=req.body;

      const consulta =
        "INSERT INTO issues(id_planDiario,issue, id_creador) VALUES (?,?,?)";
      
      try {
        const [rows] = await pool.query(consulta, [
          id_planDiario,text, id_creador
          ]);
          res.send({ rows });
      } catch (error) {
        
        console.error(error)
      }
       
    }


    export const getCreacionissues = async (req, res) => {
      const { id } = req.params; // Extraer el ID de los parámetros de la solicitud
      console.log('ID recibido:', id); // Log más descriptivo
    
      const consulta = `SELECT * FROM issues WHERE id_planDiario = ?`; // Consulta SQL
    
      try {
        const [rows] = await pool.query(consulta, [id]); // Ejecutar la consulta
        res.send({ rows }); // Enviar respuesta con los resultados
      } catch (error) {
        console.error('Error al obtener los issues:', error); // Log del error
        res.status(500).send({ error: 'Error al obtener los datos' }); // Respuesta de error
      }
    };
    
