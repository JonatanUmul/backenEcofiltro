import { pool } from "../../../src/db.js";

export const getTipoMantenimiento = async (req, res) => {
    try {
        // Consulta SQL para seleccionar el usuario por nombre y contraseña
        const [rows] = await pool.query("SELECT * FROM tipomantenimiento");
        
        // Verifica si se encontró un usuario
        if (rows.length === 0) {
            console.log("Datos no encontrados");
            return res.status(404).send("Datos no encontrados");
        }

        // Si se encontraron datos, envía la respuesta al cliente
        res.send({ rows });
    } catch (error) {
        console.error("Error al ejecutar la consulta:", error);
        res.status(500).send("Error del servidor");
    }
}

// export const postRoles = async (req, res) => {
//     try {
//         const { rol, descripcion } = req.body;
        
//         // Verifica si uno o ambos campos están vacíos
//         if (!rol || descripcion === "") {
//             console.log('Uno o ambos datos están vacíos');
//             return res.status(400).send({ error: 'Uno o ambos datos están vacíos' });
//         }

//         // Realiza la consulta SQL
//         const consulta1 = 'INSERT INTO roles(rol, descripcion) VALUES (?, ?)';
//         const [rows] = await pool.query(consulta1, [rol, descripcion]);

//         console.log('Datos guardados correctamente');
//         res.status(201).send({ success: true, message: 'Datos guardados correctamente', data: rows });
//     } catch (error) {
//         console.error('Error al almacenar los datos:', error);
//         res.status(500).send({ error: 'Error al almacenar los datos' });
//     }
// };

    