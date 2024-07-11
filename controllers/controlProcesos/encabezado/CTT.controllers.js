import { pool } from "../../../src/db.js";



export const postCTT = async(req, res)=>{
    const id_est= 2;
    const id_creador= req.body.id_creador
    const codigoInicio= req.body.codigoInicio;
    const codigoFinal= req.body.codigoFinal
    const cantidad=  req.body.cantidad
   
    try{
    
       const consulta='INSERT INTO ctt(id_est, codigoInicio, codigoFinal, cantidad, id_creador)Values(?,?, ?, ?, ?)';
        const [rows]= await pool.query(consulta,[id_est, codigoInicio, codigoFinal, cantidad, id_creador])
        res.send({rows});
        
        
    }catch(err){
        console.log('Error al guardar los datos', err)
    }
}


export const putCTT = async (req, res) => {
    const estado = req.body.id_est;
    const id = req.body.id;
    const fechaCierre = new Date().toISOString().split('T')[0]; // Fecha actual del sistema en formato: YYYY-MM-DD
    const horaCierre = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}); // Hora actual del sistema en formato: HH:MM

    try {
        if (estado === '' || id === '') {
            console.log('Uno o varios datos están vacíos');
        } else {
            const consulta = 'UPDATE ctt SET id_est = ?, fechaCierre = ?, horaCierre = ? WHERE id = ?';
            const [rows] = await pool.query(consulta, [estado, fechaCierre, horaCierre, id]);
            res.send({ rows });
        }
    } catch (err) {
        console.log('Error al guardar los datos', err);
    }
};

export const getCTT = async (req, res) => {
    const { fecha_creacion_inicio, fecha_creacion_fin } = req.params;
    console.log(fecha_creacion_inicio, fecha_creacion_fin);
    try {
        let consulta = `
        select 
        'ctt' AS tabla,
        d.id,
        d.fecha_creacion,
        d.hora_creacion,
        IF(
            TIME(d.hora_creacion) >= '05:00:00' AND TIME(d.hora_creacion) <= '17:00:00',
            'Día',
            IF(
                TIME(d.hora_creacion) >= '17:01:00' AND TIME(d.hora_creacion) <= '23:59:59',
                'Noche',
                IF(
                    TIME(d.hora_creacion) >= '00:00:00' AND TIME(d.hora_creacion) <= '02:00:0',
                    'Noche',
                    NULL
                )
            )
        ) AS turnos,
        d.fechaCierre,
        d.horaCierre,
        d.codigoInicio,
        d.codigoFinal,
        d.cantidad,
        est_proc.estado AS estadoOrden
        
        FROM ctt d
        
        LEFT JOIN est_proc ON d.id_est =est_proc.id_est
        
        
        WHERE 1=1`;

        const params = [];

        if (fecha_creacion_inicio !== 'null' && fecha_creacion_fin !== 'null') {
            consulta += ' AND d.fecha_creacion BETWEEN ? AND ?';
            params.push(fecha_creacion_inicio, fecha_creacion_fin);
        } else if (fecha_creacion_inicio !== 'null') {
            consulta += ' AND d.fecha_creacion >= ?';
            params.push(fecha_creacion_inicio);
        } else if (fecha_creacion_fin !== 'null') {
            consulta += ' AND d.fecha_creacion <= ?';
            params.push(fecha_creacion_fin);
        }

        const [rows] = await pool.query(consulta, params);
        res.send(rows);
    } catch (err) {
        console.log('Error al obtener los datos:', err);
        res.status(500).json({ error: 'Error al obtener los datos' });
    }
};
