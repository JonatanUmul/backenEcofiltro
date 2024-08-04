import { pool } from '../../src/db.js';

export const getTablaPorCodigos = async (req, res) => {
    const { fecha_creacion_inicio, fecha_creacion_fin } = req.params;
    
    try {
        // Consulta SQL para seleccionar los estados
        let consulta = `
           WITH MaxTemperaturas AS (
    SELECT
        dth.fecha_real,
        dth.id_horno,
        dth.id_modelo,
        dth.id_turno,
        MAX(dth.tempCabezaIZ) AS max_tempCabezaIZ,
        MAX(dth.tempPieIZ) AS max_tempPieIZ,
        MAX(dth.tempCabezaDR) AS max_tempCabezaDR,
        MAX(dth.tempPieDR) AS max_tempPieDR
    FROM
        dth
    GROUP BY
        dth.fecha_real,
        dth.id_horno,
        dth.id_modelo,
        dth.id_turno
)
SELECT 
    CASE
        WHEN LEFT(ufcrudos.codigo, 7) BETWEEN LEFT(d.codigoInicio, 7) AND LEFT(d.codigoFinal, 7)
        THEN ufcrudos.codigo
        ELSE 'Sin codigo'
    END AS codigos,
    ufcrudos.estadouf AS estadoCrudo,
    STR_TO_DATE(RIGHT(ufcrudos.codigo, 6), '%d%m%y') AS fecha_produccion,
    d.librasBarro,
    CONCAT(d.librasAserrin, '/', d.librasAserrin2) AS formulaC,
    (d.librasAserrin + d.librasAserrin2) AS formulatotal,
    CONCAT(aserradero.nombre_aserradero, '/', aserradero2.nombre_aserradero) AS Aserraderos,
    CONCAT(tipocernido.tipoCernido, '/', tipocernido2.tipoCernido) AS aserrintip,
    codigosHornos.fecha_creacion AS fechaCC,
    codigosHornos.fecha_horneado AS fechaHorneado,
    codigosHornos.horno AS Horno,
    codigosHornos.posicionHorno AS posicionHorno,
    codigosHornos.reduccionColor AS reduccionColor,
    codigosHornos.posicionHorno AS posicionHorno,
    codigosHornos.tasaFiltracion AS tasa,
    codigosHornos.estadouf AS estadouf,
    turno.turno AS turnoHorno,
    turno1.turno AS turnoCC,
    enc_maq.nombre_maq AS horno,
    ufmodelo.nombre_modelo AS ufmodelo,
    mt.max_tempCabezaIZ,
    mt.max_tempPieIZ,
    mt.max_tempCabezaDR,
    mt.max_tempPieDR,
    ROUND((mt.max_tempCabezaIZ + mt.max_tempPieIZ + mt.max_tempCabezaDR + mt.max_tempPieDR) / 4) AS promedio,
    impregnados.estado,
    insumos.insumo
FROM 
    dtp d
    LEFT JOIN ufcrudos ON LEFT(ufcrudos.codigo, 7) BETWEEN LEFT(d.codigoInicio, 7) AND LEFT(d.codigoFinal, 7)
    INNER JOIN aserradero ON d.id_Aserradero = aserradero.id
    INNER JOIN aserradero AS aserradero2 ON d.id_Aserradero2 = aserradero2.id
    INNER JOIN tipocernido ON d.id_cernidodetalle = tipocernido.id
    INNER JOIN tipocernido AS tipocernido2 ON d.id_cernidodetalle2 = tipocernido2.id
    INNER JOIN codigosHornos ON ufcrudos.codigo = codigosHornos.codigo
    INNER JOIN enc_maq ON codigosHornos.horno = enc_maq.id_maq
    INNER JOIN ufmodelo ON codigosHornos.modelo = ufmodelo.id_mod
    INNER JOIN turno ON codigosHornos.turnohorneado = turno.id
    INNER JOIN turno AS turno1 ON codigosHornos.turnocc = turno1.id
    LEFT JOIN MaxTemperaturas mt 
        ON codigosHornos.fecha_horneado = mt.fecha_real
        AND codigosHornos.horno = mt.id_horno
        AND codigosHornos.modelo = mt.id_modelo
        AND codigosHornos.turnohorneado = mt.id_turno
   LEFT JOIN impregnados ON codigosHornos.codigo=impregnados.codigo
   LEFT JOIN insumos ON impregnados.tipodeplata=insumos.id

            WHERE 1=1`;

        const params = [];

        // Agregar filtros de fechas si están presentes y no son 'null'
        if (fecha_creacion_inicio && fecha_creacion_inicio !== 'null') {
            if (fecha_creacion_fin && fecha_creacion_fin !== 'null') {
                consulta += ' AND (codigosHornos.fecha_produccion BETWEEN ? AND ?)';
                params.push(fecha_creacion_inicio, fecha_creacion_fin);
            } else {
                consulta += ' AND codigosHornos.fecha_produccion >= ? ';
                params.push(fecha_creacion_inicio);
            }
        }

        if (fecha_creacion_fin && fecha_creacion_fin !== 'null' && (!fecha_creacion_inicio || fecha_creacion_inicio === 'null')) {
            consulta += ' AND codigosHornos.fecha_produccion <= ?';
            params.push(fecha_creacion_fin);
        }
        consulta +='ORDER BY codigosHornos.codigo ASC'

        const [rows] = await pool.query(consulta, params);
        console.log('datos de lab', rows);

        // Verifica si se encontraron resultados
        if (rows.length === 0) {
            console.log("Datos no encontrados");
            return res.status(404).send("Datos no encontrados");
        }

        // Envía los resultados al cliente
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error al ejecutar la consulta:", error);
        res.status(500).send("Error del servidor");
    }
};
