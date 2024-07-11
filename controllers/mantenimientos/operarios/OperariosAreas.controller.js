import { pool } from "../../../src/db.js";


export const getOperarioss = async (req, res) => {
    const id_area = req.params.id_area;


    try {
        // Consulta SQL para seleccionar los operarios por id_area
        const [rows] = await pool.query("SELECT * FROM operarios WHERE id_area = ? ", [id_area]);
        
        // Verifica si se encontraron operarios
        if (rows.length === 0) {
      
            console.log("Datos no encontrados");
            return res.status(404).send("Datos no encontrados"); 
        }

        // Envía la respuesta con los operarios encontrados
        res.send({ rows });
    } catch (error) {
        console.error("Error al ejecutar la consulta:", error);
        res.status(500).send("Error del servidor");
    }
}


export const getOperarios = async (req, res) => {
    const id_area = req.params.id_area;
    const id_area2 = req.params.id_area2;

    try {
        // Consulta SQL para seleccionar los operarios por id_area
        const [rows] = await pool.query("SELECT * FROM operarios WHERE id_area = ? or id_area = ? ", [id_area, id_area2]);
        
        // Verifica si se encontraron operarios
        if (rows.length === 0) {
            console.log(id_area2)
            console.log("Datos no encontrados");
            return res.status(404).send("Datos no encontrados"); 
        }

        // Envía la respuesta con los operarios encontrados
        res.send({ rows });
    } catch (error) {
        console.error("Error al ejecutar la consulta:", error);
        res.status(500).send("Error del servidor");
    }
}
export const getOperarioUser = async (req, res) => {
  
    try {
        // Consulta SQL para seleccionar los operarios por id_area
        const [rows] = await pool.query("SELECT * FROM operarios ");
        
        // // Verifica si se encontraron operarios
        // if (rows.length === 0) {
         
        //     console.log("Datos no encontrados");
        //     return res.status(404).send("Datos no encontrados"); 
        // }

        // Envía la respuesta con los operarios encontrados
        res.send({ rows });
    } catch (error) {
        console.error("Error al ejecutar la consulta:", error);
        res.status(500).send("Error del servidor");
    }
}



export const PostOperarios = async (req, res) => {
    try {
        const { rol, descripcion } = req.body;
        
        // Verifica si uno o ambos campos están vacíos
        if (!rol || descripcion === "") {
            console.log('Uno o ambos datos están vacíos');
            return res.status(400).send({ error: 'Uno o ambos datos están vacíos' });
        }

        // Realiza la consulta SQL
        const consulta1 = 'INSERT INTO roles(rol, descripcion) VALUES (?, ?)';
        const [rows] = await pool.query(consulta1, [rol, descripcion]);

        console.log('Datos guardados correctamente');
        res.status(201).send({ success: true, message: 'Datos guardados correctamente', data: rows });
    } catch (error) {
        console.error('Error al almacenar los datos:', error);
        res.status(500).send({ error: 'Error al almacenar los datos' });
    }
};

    