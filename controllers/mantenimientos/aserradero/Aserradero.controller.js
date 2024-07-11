import { pool } from "../../../src/db.js";

export const getAserradero = async (req, res) => {
    try {
        // Consulta SQL para seleccionar el usuario por nombre y contraseña
        const [rows] = await pool.query("select * from aserradero");

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



export const PostAserradero = async (req, res) => {
    const {nom_matPrima, id_prov, id_creador } = req.body;

    try {
        if (nom_matPrima==='' || id_prov==='' || id_creador==='') {
            console.log('Uno o varios datos están vacíos');
            return res.status(400).send('Uno o varios datos están vacíos');
        }

        const consulta = 'INSERT INTO enc_matprima(nom_matPrima, id_prov, id_creador) VALUES (?, ?, ?)';
        const [rows] = await pool.query(consulta, [nom_matPrima, id_prov, id_creador]);
        
        console.log('Datos insertados correctamente:', rows);
        res.status(201).send('Datos insertados correctamente');
    } catch (error) {
        console.error('Error al insertar datos:', error);
        res.status(500).send('Error al insertar datos');
    }
};

   
    
    

