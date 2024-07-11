import { pool } from "../../../src/db.js";

export const getInsumos = async (req, res) => {
    const {insumo}= req.params;
    console.log('insumo',insumo)
    try {
        // Consulta SQL para seleccionar el usuario por nombre y contraseña
        const [rows] = await pool.query("SELECT * FROM insumos WHERE insumo LIKE ?",[`%${insumo}%`] );

        // Verifica si se encontró algún dato
        if (rows.length === 0) {
            console.log("No se encontraron datos");
            return res.status(404).send("Datos no encontrados");
        }

        // Envía los datos al cliente
        res.send({ rows });
        console.log('Datos obtenidos correctamente');
    } catch (error) {
        console.error("Error al ejecutar la consulta:", error);
        res.status(500).send("Error del servidor");
    }
};



export const PostInsumos = async (req, res) => {
    const {insumo } = req.body;

    try {
        if (insumo==='' ) {
            console.log('Uno o varios datos están vacíos');
            return res.status(400).send('Uno o varios datos están vacíos');
        }

        const consulta = 'INSERT INTO insumos(insumo) VALUES (?)';
        const [rows] = await pool.query(consulta, [insumo]);
        
        console.log('Datos insertados correctamente:', rows);
        res.status(201).send('Datos insertados correctamente');
    } catch (error) {
        console.error('Error al insertar datos:', error);
        res.status(500).send('Error al insertar datos');
    }
};

   
    
    

