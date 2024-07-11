
import { createPool } from "mysql2/promise";
import dotenv from 'dotenv';

// Carga las variables de entorno desde el archivo .env
   dotenv.config();
   const BD =  process.env.DB_URL;


export const pool= createPool({
    host: BD,
    user:'admin',
    password: 'Controldedatos12',
    port:3306,
    database:'produccioneco',
    
})


pool.getConnection()
    .then(connection => {
        console.log('Conectado a la base de datos');
        connection.release(); // Liberar la conexión una vez que haya terminado
    })
    .catch(error => {
        console.error('Error al conectar a la base de datos:', error);
    });

    