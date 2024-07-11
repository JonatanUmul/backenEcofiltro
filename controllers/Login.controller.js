import { pool } from "../src/db.js";
import jwt from 'jsonwebtoken';

// import bcrypt from 'bcrypt';

export const postUsuarios = async (req, res) => {
    const { username, password } = req.body;

console.log(username, password)
    try {
         
        // Realizar la consulta a la base de datos para obtener la contraseña almacenada
        const [rows] = await pool.query(`SELECT 
d.username,
d.id,
d.correo,
d.nombre,
d.password,
d.telefono,
d.firmaUsr,
operarios.Nombre AS nombres,
roles.rol AS rol

FROM user d

LEFT JOIN operarios ON d.nombre=operarios.id
LEFT JOIN roles ON d.id_rol=roles.id_rol

WHERE d.username=?
`, [username]);
        console.log(rows)
        if (rows.length === 0) {
            console.log("Usuario no encontrado");
            return res.status(401).send({ message: "Usuario no encontrado" });
        } 
   
        const id_rol=rows[0].id_rol;
        const rol= rows[0].rol;
        const usuario= rows[0].username;
        const nombre= rows[0].nombres
        const id_creador= rows[0].id;
        const storedPassword = rows[0].password;
        console.log('pas de la BD',storedPassword)
    console.log('Nombre capturado',nombre)
        const compararContraseña=(password===storedPassword)
        console.log('Verificar id de creador',id_creador)
        
        // Comparar la contraseña ingresada con la contraseña almacenada
        // const passwordMatch = await bcrypt.compare(password, storedPassword);

        if (!compararContraseña) {
            console.log("Contraseña incorrecta");
            return res.status(401).json({ message: "Contraseña incorrecta" });
        }
        

        console.log("Inicio de sesión exitoso");

        const token = jwt.sign({username, id_rol, nombre, usuario, id_creador, rol}, "Stack", {

            expiresIn: '24h' // expires in 24 hours

             });        res.status(200).json({ message: "Inicio de sesión exitoso", token, username, id_rol, usuario, nombre, id_creador, rol });
        console.log('Token',token)
    } catch (error) {
        console.error("Error al ejecutar la consulta:", error);
        res.status(500).json({ error: "Error del servidor" });
    }
};
