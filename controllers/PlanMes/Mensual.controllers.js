import { pool } from "../../src/db.js";

export const postPlanMes = async (req, res) => {

    const {fecha_inicio,fecha_fin , planificado, proceso_id,id_creador   }=req.body;

      const consulta =
        "INSERT INTO planificaciones_mensuales(fecha_inicio,fecha_fin, cantidad_planificada, proceso_id,id_creador) VALUES (?,?,?,?,?)";
      
      try {
        const [rows] = await pool.query(consulta, [
            fecha_inicio,
            fecha_fin,
            planificado,
            proceso_id,
            id_creador
          ]);
          res.send({ rows });
      } catch (error) {
        
        console.error(error)
      }
       
    }



    // export const getPlanMes = async (req, res) => {

    //     // const {fecha_inicio,fecha_fin , planificado, proceso_id,id_creador   }=req.body;
    
    //       const consulta =
    //         `SELECT 
    //             planM.fecha_inicio,
    //             planM.fecha_fin,
    //             planM.cantidad_planificada,
    //             procesos.proceso,
    //             operarios.Nombre AS CreadordePlan

    //             FROM planificaciones_mensuales planM

    //             left JOIN procesos ON planM.proceso_id= procesos.id
    //             left JOIN user ON planM.id_creador=user.id
    //             left JOIN operarios ON user.Nombre = operarios.id`          
    //       try {
    //         const [rows] = await pool.query(consulta);
    //           res.send({ rows });
    //       } catch (error) {
            
    //         console.error(error)
    //       }
           
    //     }
    
    





    export const postPlanDay = async (req, res) => {

        const {fecha, cantidad_planificada, proceso_id, id_creador}=req.body;
    
          const consulta =
            "INSERT INTO planificaciones_diarias(fecha, cantidad_planificada, proceso_id, id_creador) VALUES (?,?,?,?)";
          
          try {
            const [rows] = await pool.query(consulta, [
                fecha,
                cantidad_planificada,
                proceso_id,
                id_creador
              ]);
              res.send({ rows });
          } catch (error) {
            
            console.error(error)
          }
           
        }
    
    

        export const getPlanDay = async (req, res) => {

            // const {fecha_inicio,fecha_fin , planificado, proceso_id,id_creador   }=req.body;
        
              const consulta =
                `
                SELECT 
                pland.fecha,
                pland.cantidad_planificada,
                procesos.proceso,
                operarios.Nombre AS CreadordePlan

                FROM planificaciones_diarias pland
 
                JOIN procesos ON pland.proceso_id= procesos.id
                JOIN user ON pland.id_creador=user.id
                JOIN operarios ON user.Nombre = operarios.id
                `          
              try {
                const [rows] = await pool.query(consulta);
                  res.send({ rows });
              } catch (error) {
                
                console.error(error)
              }
               
            }


            export const getPlanCumplido = async (req, res) => {
                const hoy = req.params.hoy;
            
                // Validar la fecha recibida
                if (!hoy) {
                    return res.status(400).send({ error: 'La fecha es requerida.' });
                }
            
                console.log(hoy);
            
                const consulta =
              `
               SELECT
              pld.id,
    pld.fecha,
    procesos.proceso AS procesosBuscar,
    pld.cantidad_planificada,
    operarios.Nombre,
    planificaciones_mensuales.id_responsable,
    operariosResponsable.Nombre,
    (CASE
        WHEN procesos.proceso = 'Aserrin Seco' THEN  'Materia Prima'
        WHEN procesos.proceso = 'Aserrin Cernido 1' THEN 'Materia Prima'
        WHEN procesos.proceso = 'Aserrin Cernido 2' THEN 'Materia Prima'
        WHEN procesos.proceso = 'Produccion Mini' THEN  'Producción'
        WHEN procesos.proceso = 'Produccion 20lts' THEN  'Producción'
        WHEN procesos.proceso = 'Produccion 18lts' THEN  'Producción'
        WHEN procesos.proceso = 'Barro pulverizado' THEN  'Materia Prima'
        WHEN procesos.proceso = 'Pulido Base' THEN  'Producción'
    	  WHEN procesos.proceso = 'Horneados 20lts' THEN  'Hornos'
        WHEN procesos.proceso = 'Horneados 18lts' THEN 'Hornos'
        WHEN procesos.proceso = 'Horneados Mini' THEN 'Hornos'
        WHEN procesos.proceso = 'CC 20 litros' THEN 'Control de Calidad'
        WHEN procesos.proceso = 'CC 18 litros' THEN  'Control de Calidad'
        WHEN procesos.proceso = 'CC Mini' THEN 'Control de Calidad'
        WHEN procesos.proceso = 'Impregnados' THEN  'Impregnación'
        WHEN procesos.proceso = 'Empaque' THEN 'Empaque'
        ELSE ''
    END) AS Area,
    SUM(DISTINCT CASE 
   WHEN procesos.proceso = 'Aserrin Seco' THEN COALESCE(daserrin.cantidad_inicial, 0)
        WHEN procesos.proceso = 'Aserrin Cernido 1' THEN COALESCE(dtca1.CantidadInicial, 0)
        WHEN procesos.proceso = 'Aserrin Cernido 2' THEN COALESCE(dtca2.cantidad_inicial, 0)
        WHEN procesos.proceso = 'Produccion Mini' THEN COALESCE(dtp.producido, 0)
        WHEN procesos.proceso = 'Produccion 20lts' THEN COALESCE(dtp20lt.producido, 0)
        WHEN procesos.proceso = 'Produccion 18lts' THEN COALESCE(dtp18lt.producido, 0)
        WHEN procesos.proceso = 'Barro pulverizado' THEN COALESCE(dtpv.cantidad, 0)
        WHEN procesos.proceso = 'Pulido Base' THEN COALESCE(dcpb.pulido, 0)
        WHEN procesos.proceso = 'Horneados 20lts' THEN COALESCE(dthh.horneado, 0)
        WHEN procesos.proceso = 'Horneados 18lts' THEN COALESCE(dthh18lts.horneado, 0)
        WHEN procesos.proceso = 'Horneados Mini' THEN COALESCE(dthhMini.horneado, 0)
        WHEN procesos.proceso = 'CC 20 litros' THEN COALESCE(Cc20.Cc20Lts, 0)  
        WHEN procesos.proceso = 'CC 18 litros' THEN COALESCE(Cc18.Cc18Lts, 0)    
        WHEN procesos.proceso = 'CC Mini' THEN COALESCE(CcMini.CcMini, 0)
        WHEN procesos.proceso = 'Impregnados' THEN COALESCE(dtip.impregnados,0)  
        WHEN procesos.proceso = 'Empaque' THEN COALESCE(empaqueproducido.empacado, 0)
        ELSE 0 
    END) AS producido,
        SUM(DISTINCT CASE 
        WHEN procesos.proceso = 'Aserrin Seco' THEN COALESCE(daserrin.cantidad_inicial, 0)
        WHEN procesos.proceso = 'Aserrin Cernido 1' THEN COALESCE(dtca1.CantidadInicial, 0)
        WHEN procesos.proceso = 'Aserrin Cernido 2' THEN COALESCE(dtca2.cantidad_inicial, 0)
        WHEN procesos.proceso = 'Produccion Mini' THEN COALESCE(dtp.producido, 0)
        WHEN procesos.proceso = 'Produccion 20lts' THEN COALESCE(dtp20lt.producido, 0)
        WHEN procesos.proceso = 'Produccion 18lts' THEN COALESCE(dtp18lt.producido, 0)
        WHEN procesos.proceso = 'Barro pulverizado' THEN COALESCE(dtpv.cantidad, 0)
        WHEN procesos.proceso = 'Pulido Base' THEN COALESCE(dcpb.pulido, 0)
        WHEN procesos.proceso = 'Horneados 20lts' THEN COALESCE(dthh.horneado, 0)
        WHEN procesos.proceso = 'Horneados 18lts' THEN COALESCE(dthh18lts.horneado, 0)
        WHEN procesos.proceso = 'Horneados Mini' THEN COALESCE(dthhMini.horneado, 0)
        WHEN procesos.proceso = 'CC 20 litros' THEN COALESCE(Cc20.Cc20Lts, 0)
        WHEN procesos.proceso = 'CC 18 litros' THEN COALESCE(Cc18.Cc18Lts, 0)
        WHEN procesos.proceso = 'CC Mini' THEN COALESCE(CcMini.CcMini, 0)
        WHEN procesos.proceso = 'Impregnados' THEN COALESCE(dtip.impregnados,0)
        WHEN procesos.proceso = 'Empaque' THEN COALESCE(empaqueproducido.empacado, 0)
        ELSE 0 
    END) -pld.cantidad_planificada AS residuo,
    issues.id_planDiario,
    issuesTxt.issue
FROM planificaciones_diarias pld
LEFT JOIN user ON pld.id_creador = user.id
LEFT JOIN operarios ON user.nombre = operarios.id
LEFT JOIN procesos ON pld.proceso_id = procesos.id
LEFT JOIN daserrin ON pld.fecha = daserrin.fecha_creacion
LEFT JOIN dtca1 ON pld.fecha = dtca1.fecha_creacion
LEFT JOIN dtca2 ON pld.fecha = dtca2.fecha_creacion
LEFT JOIN dtp ON pld.fecha = dtp.fecha_real AND dtp.id_ufmodelo=3
LEFT JOIN dtp AS dtp20lt ON pld.fecha = dtp20lt.fecha_real AND dtp20lt.id_ufmodelo=1
LEFT JOIN dtp AS dtp18lt ON pld.fecha = dtp18lt.fecha_real AND dtp20lt.id_ufmodelo=2
LEFT JOIN dcpb ON pld.fecha = dcpb.fecha_creacion
LEFT JOIN dthh ON pld.fecha = dthh.fecha_creacion AND dthh.id_modelo=1
LEFT JOIN dthh AS dthh18lts ON pld.fecha = dthh18lts.fecha_creacion AND dthh18lts.id_modelo=2
LEFT JOIN dthh AS dthhMini ON pld.fecha = dthhMini.fecha_creacion AND dthhMini.id_modelo=3
LEFT JOIN (
    SELECT Cc.fecha_real, dthh.id_modelo, SUM(dthh.horneado) AS Cc20Lts
    FROM dtcc Cc
    LEFT JOIN dthh ON Cc.id_dthh = dthh.id
    WHERE dthh.id_modelo = 1
    GROUP BY Cc.fecha_real, dthh.id_modelo
) AS Cc20 ON Cc20.fecha_real = pld.fecha
LEFT JOIN (
    SELECT Cc.fecha_real, dthh.id_modelo, SUM(dthh.horneado) AS Cc18Lts
    FROM dtcc Cc
    LEFT JOIN dthh ON Cc.id_dthh = dthh.id
    WHERE dthh.id_modelo = 2
    GROUP BY Cc.fecha_real, dthh.id_modelo
) AS Cc18 ON Cc18.fecha_real = pld.fecha
LEFT JOIN (
    SELECT Cc.fecha_real, dthh.id_modelo, SUM(dthh.horneado) AS CcMini
    FROM dtcc Cc
    LEFT JOIN dthh ON Cc.id_dthh = dthh.id
    WHERE dthh.id_modelo = 3
    GROUP BY Cc.fecha_real, dthh.id_modelo
) AS CcMini ON CcMini.fecha_real = pld.fecha
LEFT JOIN dtip ON pld.fecha = dtip.fechaCreacion
LEFT JOIN dtpv ON pld.fecha=dtpv.fecha_creacion
LEFT JOIN planificaciones_mensuales ON pld.proceso_id=planificaciones_mensuales.proceso_id
LEFT JOIN operarios AS operariosResponsable ON planificaciones_mensuales.id_responsable=operariosResponsable.id
LEFT JOIN empaqueproducido ON pld.fecha = empaqueproducido.fecha_at
LEFT JOIN issues ON pld.id = issues.id_planDiario
LEFT JOIN issues AS issuesTxt ON pld.id = issuesTxt.id_planDiario
WHERE pld.fecha = '${hoy}'
GROUP BY pld.fecha, pld.cantidad_planificada, operarios.Nombre, procesos.proceso
ORDER BY pld.fecha
              `
            
                try {
                    const [rows] = await pool.query(consulta);
                      res.send({ rows });
                     
                  } catch (error) {
                    
                    console.error(error)
                  }
                   
                }
    

                export const getPlanMes = async (req, res) => {
                    const fechaInicial = req.params.fechaInicial;
                    const fechaFin = req.params.fechaFin;
                    
                    console.log('Fechas recibidas:', fechaInicial, fechaFin);
                
                    // Validar las fechas recibidas
                    if (!fechaInicial || !fechaFin) {
                        return res.status(400).send({ error: 'Ambas fechas son requeridas.' });
                    }
                
                    const consulta = 
                   `
                   SELECT
              pld.id,
    pld.fecha,
    procesos.proceso AS procesosBuscar,
    pld.cantidad_planificada,
    operarios.Nombre,
    planificaciones_mensuales.id_responsable,
    operariosResponsable.Nombre,
    (CASE
        WHEN procesos.proceso = 'Aserrin Seco' THEN  'Materia Prima'
        WHEN procesos.proceso = 'Aserrin Cernido 1' THEN 'Materia Prima'
        WHEN procesos.proceso = 'Aserrin Cernido 2' THEN 'Materia Prima'
        WHEN procesos.proceso = 'Produccion Mini' THEN  'Producción'
        WHEN procesos.proceso = 'Produccion 20lts' THEN  'Producción'
        WHEN procesos.proceso = 'Produccion 18lts' THEN  'Producción'
        WHEN procesos.proceso = 'Barro pulverizado' THEN  'Materia Prima'
        WHEN procesos.proceso = 'Pulido Base' THEN  'Producción'
    	  WHEN procesos.proceso = 'Horneados 20lts' THEN  'Hornos'
        WHEN procesos.proceso = 'Horneados 18lts' THEN 'Hornos'
        WHEN procesos.proceso = 'Horneados Mini' THEN 'Hornos'
        WHEN procesos.proceso = 'CC 20 litros' THEN 'Control de Calidad'
        WHEN procesos.proceso = 'CC 18 litros' THEN  'Control de Calidad'
        WHEN procesos.proceso = 'CC Mini' THEN 'Control de Calidad'
        WHEN procesos.proceso = 'Impregnados' THEN  'Impregnación'
        WHEN procesos.proceso = 'Empaque' THEN 'Empaque'
        ELSE ''
    END) AS Area,
    SUM(DISTINCT CASE 
   WHEN procesos.proceso = 'Aserrin Seco' THEN COALESCE(daserrin.cantidad_inicial, 0)
        WHEN procesos.proceso = 'Aserrin Cernido 1' THEN COALESCE(dtca1.CantidadInicial, 0)
        WHEN procesos.proceso = 'Aserrin Cernido 2' THEN COALESCE(dtca2.cantidad_inicial, 0)
        WHEN procesos.proceso = 'Produccion Mini' THEN COALESCE(dtp.producido, 0)
        WHEN procesos.proceso = 'Produccion 20lts' THEN COALESCE(dtp20lt.producido, 0)
        WHEN procesos.proceso = 'Produccion 18lts' THEN COALESCE(dtp18lt.producido, 0)
        WHEN procesos.proceso = 'Barro pulverizado' THEN COALESCE(dtpv.cantidad, 0)
        WHEN procesos.proceso = 'Pulido Base' THEN COALESCE(dcpb.pulido, 0)
        WHEN procesos.proceso = 'Horneados 20lts' THEN COALESCE(dthh.horneado, 0)
        WHEN procesos.proceso = 'Horneados 18lts' THEN COALESCE(dthh18lts.horneado, 0)
        WHEN procesos.proceso = 'Horneados Mini' THEN COALESCE(dthhMini.horneado, 0)
        WHEN procesos.proceso = 'CC 20 litros' THEN COALESCE(Cc20.Cc20Lts, 0)  
        WHEN procesos.proceso = 'CC 18 litros' THEN COALESCE(Cc18.Cc18Lts, 0)    
        WHEN procesos.proceso = 'CC Mini' THEN COALESCE(CcMini.CcMini, 0)
        WHEN procesos.proceso = 'Impregnados' THEN COALESCE(dtip.impregnados,0)  
        WHEN procesos.proceso = 'Empaque' THEN COALESCE(empaqueproducido.empacado, 0)
        ELSE 0 
    END) AS producido,
        SUM(DISTINCT CASE 
        WHEN procesos.proceso = 'Aserrin Seco' THEN COALESCE(daserrin.cantidad_inicial, 0)
        WHEN procesos.proceso = 'Aserrin Cernido 1' THEN COALESCE(dtca1.CantidadInicial, 0)
        WHEN procesos.proceso = 'Aserrin Cernido 2' THEN COALESCE(dtca2.cantidad_inicial, 0)
        WHEN procesos.proceso = 'Produccion Mini' THEN COALESCE(dtp.producido, 0)
        WHEN procesos.proceso = 'Produccion 20lts' THEN COALESCE(dtp20lt.producido, 0)
        WHEN procesos.proceso = 'Produccion 18lts' THEN COALESCE(dtp18lt.producido, 0)
        WHEN procesos.proceso = 'Barro pulverizado' THEN COALESCE(dtpv.cantidad, 0)
        WHEN procesos.proceso = 'Pulido Base' THEN COALESCE(dcpb.pulido, 0)
        WHEN procesos.proceso = 'Horneados 20lts' THEN COALESCE(dthh.horneado, 0)
        WHEN procesos.proceso = 'Horneados 18lts' THEN COALESCE(dthh18lts.horneado, 0)
        WHEN procesos.proceso = 'Horneados Mini' THEN COALESCE(dthhMini.horneado, 0)
        WHEN procesos.proceso = 'CC 20 litros' THEN COALESCE(Cc20.Cc20Lts, 0)
        WHEN procesos.proceso = 'CC 18 litros' THEN COALESCE(Cc18.Cc18Lts, 0)
        WHEN procesos.proceso = 'CC Mini' THEN COALESCE(CcMini.CcMini, 0)
        WHEN procesos.proceso = 'Impregnados' THEN COALESCE(dtip.impregnados,0)
        WHEN procesos.proceso = 'Empaque' THEN COALESCE(empaqueproducido.empacado, 0)
        ELSE 0 
    END) -pld.cantidad_planificada AS residuo,
    issues.id_planDiario,
    issuesTxt.issue
FROM planificaciones_diarias pld
LEFT JOIN user ON pld.id_creador = user.id
LEFT JOIN operarios ON user.nombre = operarios.id
LEFT JOIN procesos ON pld.proceso_id = procesos.id
LEFT JOIN daserrin ON pld.fecha = daserrin.fecha_creacion
LEFT JOIN dtca1 ON pld.fecha = dtca1.fecha_creacion
LEFT JOIN dtca2 ON pld.fecha = dtca2.fecha_creacion
LEFT JOIN dtp ON pld.fecha = dtp.fecha_real AND dtp.id_ufmodelo=3
LEFT JOIN dtp AS dtp20lt ON pld.fecha = dtp20lt.fecha_real AND dtp20lt.id_ufmodelo=1
LEFT JOIN dtp AS dtp18lt ON pld.fecha = dtp18lt.fecha_real AND dtp20lt.id_ufmodelo=2
LEFT JOIN dcpb ON pld.fecha = dcpb.fecha_creacion
LEFT JOIN dthh ON pld.fecha = dthh.fecha_creacion AND dthh.id_modelo=1
LEFT JOIN dthh AS dthh18lts ON pld.fecha = dthh18lts.fecha_creacion AND dthh18lts.id_modelo=2
LEFT JOIN dthh AS dthhMini ON pld.fecha = dthhMini.fecha_creacion AND dthhMini.id_modelo=3
LEFT JOIN (
    SELECT Cc.fecha_real, dthh.id_modelo, SUM(dthh.horneado) AS Cc20Lts
    FROM dtcc Cc
    LEFT JOIN dthh ON Cc.id_dthh = dthh.id
    WHERE dthh.id_modelo = 1
    GROUP BY Cc.fecha_real, dthh.id_modelo
) AS Cc20 ON Cc20.fecha_real = pld.fecha
LEFT JOIN (
    SELECT Cc.fecha_real, dthh.id_modelo, SUM(dthh.horneado) AS Cc18Lts
    FROM dtcc Cc
    LEFT JOIN dthh ON Cc.id_dthh = dthh.id
    WHERE dthh.id_modelo = 2
    GROUP BY Cc.fecha_real, dthh.id_modelo
) AS Cc18 ON Cc18.fecha_real = pld.fecha
LEFT JOIN (
    SELECT Cc.fecha_real, dthh.id_modelo, SUM(dthh.horneado) AS CcMini
    FROM dtcc Cc
    LEFT JOIN dthh ON Cc.id_dthh = dthh.id
    WHERE dthh.id_modelo = 3
    GROUP BY Cc.fecha_real, dthh.id_modelo
) AS CcMini ON CcMini.fecha_real = pld.fecha
LEFT JOIN dtip ON pld.fecha = dtip.fechaCreacion
LEFT JOIN dtpv ON pld.fecha=dtpv.fecha_creacion
LEFT JOIN planificaciones_mensuales ON pld.proceso_id=planificaciones_mensuales.proceso_id AND MONTH(pld.fecha)=MONTH(planificaciones_mensuales.fecha_inicio)
LEFT JOIN operarios AS operariosResponsable ON planificaciones_mensuales.id_responsable=operariosResponsable.id
LEFT JOIN empaqueproducido ON pld.fecha = empaqueproducido.fecha_at
LEFT JOIN issues ON pld.id = issues.id_planDiario
LEFT JOIN issues AS issuesTxt ON pld.id = issuesTxt.id_planDiario
WHERE pld.fecha BETWEEN '${fechaInicial}' AND '${fechaFin}'
GROUP BY pld.fecha, pld.cantidad_planificada, operarios.Nombre, procesos.proceso
ORDER BY pld.fecha

`
                
                    try {
                        const [rows] = await pool.query(consulta);
                        res.send({ rows });
                        console.log('Plan Mes', rows);
                    } catch (error) {
                        console.error(error);
                        res.status(500).send({ error: 'Error en la consulta a la base de datos.' });
                    }
                };
                