import { pool } from "../../src/db.js";

export const getTablaOT = async (req, res) => {
  console.log(req.query.materiaPrim);
  const materiaPrima = req.query.materiaPrim;
  let consulta = null;

  switch (materiaPrima) {
    case "Aserrin":
      consulta = `SELECT 'otfm' AS encabezado, 'Formulación' AS EncName, id, fecha_creacion, id_creador, correlativo
 FROM otfm 
 WHERE id_est = 2`;
      break;

    case "InventarioOtfmProduccion":
      consulta = `

SELECT 
'otfm' AS encabezado,
    om.id,
    om.correlativo,
    om.fecha_creacion,
    COALESCE(dm.cantidad, 0) AS total_bolsas,
    dm.peso AS peso_formulas,
    COALESCE(dm.cantidad, 0)-sub.formulas_usadas as bolsas_disponibles,
    COALESCE(dm.peso_libras, 0) AS total_libras,
     COALESCE(sub.total_lb_aserrin, 0) AS total_consumido,
    COALESCE(dm.peso_libras, 0) - COALESCE(sub.total_lb_aserrin, 0) AS LibrasDisponibles
FROM otfm om
LEFT JOIN dtfm dm 
    ON om.id = dm.id_OTFM
LEFT JOIN (
    SELECT 
        d.id_otfm,
        SUM(d.formulas_usadas) AS formulas_usadas,
        SUM(d.total_lb_aserrin) AS total_lb_aserrin
    FROM dtp d
    GROUP BY d.id_otfm
) sub 
    ON om.id = sub.id_otfm
    
    where om.estado_para_produccion=2 and om.id_est=3

            `;
      break;

    default:
      consulta = `

 SELECT 'othp' AS encabezado, 'Humedad en Patios' AS EncName, id, fecha_creacion, id_creador
 FROM othp 
 WHERE id_est = 2
 
 UNION all
 
 SELECT 'otsa' AS encabezado, 'Secado de Aserrín' AS EncName,id, fecha_creacion, id_creador
 FROM otsa 
 WHERE id_est = 2

 UNION all

 SELECT 'otca1' AS encabezado, 'Cernido 1' AS EncName, id, fecha_creacion, id_creador
 FROM otca1 
 WHERE id_est = 2

 UNION all

 SELECT 'otca2' AS encabezado, 'Cernido 2' AS EncName, id, fecha_creacion, id_creador
 FROM otca2 
 WHERE id_est = 2

 UNION all

 SELECT 'otpv' AS encabezado, 'Pulverizado de materia prima' AS EncName, id, fecha_creacion, id_creador
 FROM otpv 
 WHERE id_est = 2

 UNION all

 SELECT 'otp' AS encabezado, 'Producción' AS EncName, id, fecha_creacion, id_creador
 FROM otp 
 WHERE id_est = 2

 
 UNION all

 SELECT 'othh' AS encabezado, 'Horneados' AS EncName, id, fecha_creacion, id_creador
 FROM othh 
 WHERE id_est = 2

 UNION all

 SELECT 'otip' AS encabezado, 'Impregnación' AS EncName, id, fecha_creacion, id_creador
 FROM otip 
 WHERE id_est = 2
 
 UNION all

 SELECT 'otcc' AS encabezado, 'Control de Calidad' AS EncName, id, fecha_creacion, id_creador
 FROM otcc 
 WHERE id_est = 2
        `
        break;
  }

  try {
    const [rows] = await pool.query(consulta);
    console.log("consulta", rows);
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
