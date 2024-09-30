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
              `SELECT
    pld.fecha,
    procesos.proceso AS procesosBuscar,
    pld.cantidad_planificada,
    operarios.Nombre,
    planificaciones_mensuales.id_responsable,
    operariosResponsable.Nombre,
    (CASE
        WHEN procesos.proceso = 'Aserrin Seco' THEN  'Materia Prima'
        WHEN procesos.proceso = 'Aserrin Cernido' THEN 'Materia Prima'
        WHEN procesos.proceso = 'Produccion Mini' THEN  'Producción'
        WHEN procesos.proceso = 'Produccion 20lts' THEN  'Producción'
        WHEN procesos.proceso = 'Produccion 18lts' THEN  'Producción'
        WHEN procesos.proceso = 'Barro pulverizado' THEN  'Materia Prima'
        WHEN procesos.proceso = 'Pulido Base' THEN  'Producción'
    	  WHEN procesos.proceso = 'Horneados 20lts' THEN  'Hornos'
        WHEN procesos.proceso = 'Horneados 18lts' THEN 'Hornos'
        WHEN procesos.proceso = 'Horneados Mini' THEN 'Hornos'
        WHEN procesos.proceso = 'CC 20 litros' THEN 'Control de Calidad'
        WHEN procesos.proceso = 'CC 20 litros' THEN  'Control de Calidad'
        WHEN procesos.proceso = 'CC 20 litros' THEN 'Control de Calidad'
        WHEN procesos.proceso = 'Impregnados 20lts' THEN  'Impregnación'
        WHEN procesos.proceso = 'Impregnados 18lts' THEN  'Impregnación'
        WHEN procesos.proceso = 'Impregnados Mini' THEN 'Impregnación'
        WHEN procesos.proceso = 'Empaque' THEN 'Empaque'
        ELSE 0 
    END) AS Area,
    SUM(DISTINCT CASE 
        WHEN procesos.proceso = 'Aserrin Seco' THEN daserrin.cantidad_inicial 
        WHEN procesos.proceso = 'Aserrin Cernido' THEN dtca1.CantidadInicial 
        WHEN procesos.proceso = 'Produccion Mini' THEN dtp.producido
        WHEN procesos.proceso = 'Produccion 20lts' THEN dtp20lt.producido
        WHEN procesos.proceso = 'Produccion 18lts' THEN dtp18lt.producido
        WHEN procesos.proceso = 'Barro pulverizado' THEN dtpv.cantidad
        WHEN procesos.proceso = 'Pulido Base' THEN dcpb.pulido
    	  WHEN procesos.proceso = 'Horneados 20lts' THEN dthh.horneado
        WHEN procesos.proceso = 'Horneados 18lts' THEN dthh18lts.horneado
        WHEN procesos.proceso = 'Horneados Mini' THEN dthhMini.horneado
        WHEN procesos.proceso = 'CC 20 litros' THEN Cc20.Cc20Lts
        WHEN procesos.proceso = 'CC 20 litros' THEN Cc18.Cc18Lts
        WHEN procesos.proceso = 'CC 20 litros' THEN CcMini.CcMini
        WHEN procesos.proceso = 'Impregnados 20lts' THEN dtip.impregnados
        WHEN procesos.proceso = 'Impregnados 18lts' THEN dtip18Lts.impregnados
        WHEN procesos.proceso = 'Impregnados Mini' THEN dtipMini.impregnados
        WHEN procesos.proceso = 'Empaque' THEN empaqueproducido.empacado
        ELSE 0 
    END) AS producido
FROM planificaciones_diarias pld
LEFT JOIN user ON pld.id_creador = user.id
LEFT JOIN operarios ON user.nombre = operarios.id
LEFT JOIN procesos ON pld.proceso_id = procesos.id
LEFT JOIN daserrin ON pld.fecha = daserrin.fecha_creacion
LEFT JOIN dtca1 ON pld.fecha = dtca1.fecha_creacion
LEFT JOIN dtp ON pld.fecha = dtp.fecha_real AND dtp.id_ufmodelo=3
LEFT JOIN dtp AS dtp20lt ON pld.fecha = dtp20lt.fecha_real AND dtp20lt.id_ufmodelo=1
LEFT JOIN dtp AS dtp18lt ON pld.fecha = dtp18lt.fecha_real AND dtp20lt.id_ufmodelo=2
LEFT JOIN dcpb ON pld.fecha = dcpb.fecha_creacion= dcpb.id
LEFT JOIN dthh ON pld.fecha = dthh.fecha_creacion AND dthh.id_modelo=1
LEFT JOIN dthh AS dthh18lts ON pld.fecha = dthh18lts.fecha_creacion AND dthh18lts.id_modelo=2
LEFT JOIN dthh AS dthhMini ON pld.fecha = dthhMini.fecha_creacion AND dthhMini.id_modelo=3
LEFT JOIN (
    SELECT Cc.fecha_creacion, dthh.id_modelo, SUM(dthh.horneado) AS Cc20Lts
    FROM dtcc Cc
    LEFT JOIN dthh ON Cc.id_dthh = dthh.id
    WHERE dthh.id_modelo = 1
    GROUP BY Cc.fecha_creacion, dthh.id_modelo
) AS Cc20 ON Cc20.fecha_creacion = pld.fecha
LEFT JOIN (
    SELECT Cc.fecha_creacion, dthh.id_modelo, SUM(dthh.horneado) AS Cc18Lts
    FROM dtcc Cc
    LEFT JOIN dthh ON Cc.id_dthh = dthh.id
    WHERE dthh.id_modelo = 2
    GROUP BY Cc.fecha_creacion, dthh.id_modelo
) AS Cc18 ON Cc18.fecha_creacion = pld.fecha
LEFT JOIN (
    SELECT Cc.fecha_creacion, dthh.id_modelo, SUM(dthh.horneado) AS CcMini
    FROM dtcc Cc
    LEFT JOIN dthh ON Cc.id_dthh = dthh.id
    WHERE dthh.id_modelo = 3
    GROUP BY Cc.fecha_creacion, dthh.id_modelo
) AS CcMini ON CcMini.fecha_creacion = pld.fecha
LEFT JOIN dtip ON pld.fecha = dtip.fechaCreacion AND dtip.id_modelo=1
LEFT JOIN dtip AS dtip18Lts ON pld.fecha = dtip18Lts.fechaCreacion AND dtip18Lts.id_modelo=2
LEFT JOIN dtip AS dtipMini ON pld.fecha = dtipMini.fechaCreacion AND dtipMini.id_modelo=3
LEFT JOIN dtpv ON pld.fecha=dtpv.fecha_creacion
LEFT JOIN planificaciones_mensuales ON pld.proceso_id=planificaciones_mensuales.proceso_id
LEFT JOIN operarios AS operariosResponsable ON planificaciones_mensuales.id_responsable=operariosResponsable.id
LEFT JOIN empaqueproducido ON pld.fecha = empaqueproducido.fecha_at
WHERE pld.fecha = '${hoy}'
GROUP BY pld.fecha, pld.cantidad_planificada, operarios.Nombre, procesos.proceso
ORDER BY pld.fecha`
            
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
                    `SELECT
    pld.fecha,
    procesos.proceso AS procesosBuscar,
    pld.cantidad_planificada,
    operarios.Nombre,
    planificaciones_mensuales.id_responsable,
    operariosResponsable.Nombre,
    (CASE
        WHEN procesos.proceso = 'Aserrin Seco' THEN  'Materia Prima'
        WHEN procesos.proceso = 'Aserrin Cernido' THEN 'Materia Prima'
        WHEN procesos.proceso = 'Produccion Mini' THEN  'Producción'
        WHEN procesos.proceso = 'Produccion 20lts' THEN  'Producción'
        WHEN procesos.proceso = 'Produccion 18lts' THEN  'Producción'
        WHEN procesos.proceso = 'Barro pulverizado' THEN  'Materia Prima'
        WHEN procesos.proceso = 'Pulido Base' THEN  'Producción'
    	  WHEN procesos.proceso = 'Horneados 20lts' THEN  'Hornos'
        WHEN procesos.proceso = 'Horneados 18lts' THEN 'Hornos'
        WHEN procesos.proceso = 'Horneados Mini' THEN 'Hornos'
        WHEN procesos.proceso = 'CC 20 litros' THEN 'Control de Calidad'
        WHEN procesos.proceso = 'CC 20 litros' THEN  'Control de Calidad'
        WHEN procesos.proceso = 'CC 20 litros' THEN 'Control de Calidad'
        WHEN procesos.proceso = 'Impregnados 20lts' THEN  'Impregnación'
        WHEN procesos.proceso = 'Impregnados 18lts' THEN  'Impregnación'
        WHEN procesos.proceso = 'Impregnados Mini' THEN 'Impregnación'
        WHEN procesos.proceso = 'Empaque' THEN 'Empaque'
        ELSE 0 
    END) AS Area,
    SUM(DISTINCT CASE 
        WHEN procesos.proceso = 'Aserrin Seco' THEN daserrin.cantidad_inicial 
        WHEN procesos.proceso = 'Aserrin Cernido' THEN dtca1.CantidadInicial 
        WHEN procesos.proceso = 'Produccion Mini' THEN dtp.producido
        WHEN procesos.proceso = 'Produccion 20lts' THEN dtp20lt.producido
        WHEN procesos.proceso = 'Produccion 18lts' THEN dtp18lt.producido
        WHEN procesos.proceso = 'Barro pulverizado' THEN dtpv.cantidad
        WHEN procesos.proceso = 'Pulido Base' THEN dcpb.pulido
    	  WHEN procesos.proceso = 'Horneados 20lts' THEN dthh.horneado
        WHEN procesos.proceso = 'Horneados 18lts' THEN dthh18lts.horneado
        WHEN procesos.proceso = 'Horneados Mini' THEN dthhMini.horneado
        WHEN procesos.proceso = 'CC 20 litros' THEN Cc20.Cc20Lts
        WHEN procesos.proceso = 'CC 20 litros' THEN Cc18.Cc18Lts
        WHEN procesos.proceso = 'CC 20 litros' THEN CcMini.CcMini
        WHEN procesos.proceso = 'Impregnados 20lts' THEN dtip.impregnados
        WHEN procesos.proceso = 'Impregnados 18lts' THEN dtip18Lts.impregnados
        WHEN procesos.proceso = 'Impregnados Mini' THEN dtipMini.impregnados
        WHEN procesos.proceso = 'Empaque' THEN empaqueproducido.empacado
        ELSE 0 
    END) AS producido
FROM planificaciones_diarias pld
LEFT JOIN user ON pld.id_creador = user.id
LEFT JOIN operarios ON user.nombre = operarios.id
LEFT JOIN procesos ON pld.proceso_id = procesos.id
LEFT JOIN daserrin ON pld.fecha = daserrin.fecha_creacion
LEFT JOIN dtca1 ON pld.fecha = dtca1.fecha_creacion
LEFT JOIN dtp ON pld.fecha = dtp.fecha_real AND dtp.id_ufmodelo=3
LEFT JOIN dtp AS dtp20lt ON pld.fecha = dtp20lt.fecha_real AND dtp20lt.id_ufmodelo=1
LEFT JOIN dtp AS dtp18lt ON pld.fecha = dtp18lt.fecha_real AND dtp20lt.id_ufmodelo=2
LEFT JOIN dcpb ON pld.fecha = dcpb.fecha_creacion= dcpb.id
LEFT JOIN dthh ON pld.fecha = dthh.fecha_creacion AND dthh.id_modelo=1
LEFT JOIN dthh AS dthh18lts ON pld.fecha = dthh18lts.fecha_creacion AND dthh18lts.id_modelo=2
LEFT JOIN dthh AS dthhMini ON pld.fecha = dthhMini.fecha_creacion AND dthhMini.id_modelo=3
LEFT JOIN (
    SELECT Cc.fecha_creacion, dthh.id_modelo, SUM(dthh.horneado) AS Cc20Lts
    FROM dtcc Cc
    LEFT JOIN dthh ON Cc.id_dthh = dthh.id
    WHERE dthh.id_modelo = 1
    GROUP BY Cc.fecha_creacion, dthh.id_modelo
) AS Cc20 ON Cc20.fecha_creacion = pld.fecha
LEFT JOIN (
    SELECT Cc.fecha_creacion, dthh.id_modelo, SUM(dthh.horneado) AS Cc18Lts
    FROM dtcc Cc
    LEFT JOIN dthh ON Cc.id_dthh = dthh.id
    WHERE dthh.id_modelo = 2
    GROUP BY Cc.fecha_creacion, dthh.id_modelo
) AS Cc18 ON Cc18.fecha_creacion = pld.fecha
LEFT JOIN (
    SELECT Cc.fecha_creacion, dthh.id_modelo, SUM(dthh.horneado) AS CcMini
    FROM dtcc Cc
    LEFT JOIN dthh ON Cc.id_dthh = dthh.id
    WHERE dthh.id_modelo = 3
    GROUP BY Cc.fecha_creacion, dthh.id_modelo
) AS CcMini ON CcMini.fecha_creacion = pld.fecha
LEFT JOIN dtip ON pld.fecha = dtip.fechaCreacion AND dtip.id_modelo=1
LEFT JOIN dtip AS dtip18Lts ON pld.fecha = dtip18Lts.fechaCreacion AND dtip18Lts.id_modelo=2
LEFT JOIN dtip AS dtipMini ON pld.fecha = dtipMini.fechaCreacion AND dtipMini.id_modelo=3
LEFT JOIN dtpv ON pld.fecha=dtpv.fecha_creacion
LEFT JOIN planificaciones_mensuales ON pld.proceso_id=planificaciones_mensuales.proceso_id
LEFT JOIN operarios AS operariosResponsable ON planificaciones_mensuales.id_responsable=operariosResponsable.id
LEFT JOIN empaqueproducido ON pld.fecha = empaqueproducido.fecha_at
WHERE pld.fecha BETWEEN '${fechaInicial}' AND '${fechaFin}'
GROUP BY pld.fecha, pld.cantidad_planificada, operarios.Nombre, procesos.proceso
ORDER BY pld.fecha`
                
                    try {
                        const [rows] = await pool.query(consulta);
                        res.send({ rows });
                        console.log('Plan Mes', rows);
                    } catch (error) {
                        console.error(error);
                        res.status(500).send({ error: 'Error en la consulta a la base de datos.' });
                    }
                };
                