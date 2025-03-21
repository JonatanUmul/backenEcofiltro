
    import express  from "express";
    import cors from 'cors'
    import bodyParser from "body-parser"
    import Loginroutes from './src/routes/Login.routes.js'
    // import Estadosroutes from './routes/mantenimientos/estados/Estados.routes.js'
    import Rolrouter from './src/routes/mantenimientos/roles/Roles.routes.js'
    import UsuariosR from './src/routes/mantenimientos/usuarios/Usuarios.routes.js'
    import TipoProv from './src/routes/mantenimientos/Tip_prov/Proveedores.routes.js'
    import EstadosMaq from './src/routes/mantenimientos/estados_maq/EstadosMaq.routes.js'
    import EstadosProc from './src/routes/mantenimientos/estados_proc/EstadosProc.routes.js'
    import Provedores from './src/routes/mantenimientos/proveedor/Proveedores.routes.js'
    import MateriaPrima from './src/routes/mantenimientos/materiaPrimas/MateriaPrimas.routes.js'
    import TablaOT from './src/routes/tablaOT/TablaOT.js'
    import TablaCp from './src/routes/tablaCP/TablaCP.js'
    import TablaMaquinaria from './src/routes/tablaMaquinaria/TablaMaquinaria.js'
    import OTHP from './src/routes/ordenesDeTrabajo/encabezados/OTHP.routes.js'
    import OTIP from './src/routes/ordenesDeTrabajo/encabezados/OTIP.routes.js'
    import OTSA from './src/routes/ordenesDeTrabajo/encabezados/OTSMP.routes.js'
    import OTCA1 from './src/routes/ordenesDeTrabajo/encabezados/OTCA1.routes.js'
    import OTPV from './src/routes/ordenesDeTrabajo/encabezados/OTPV.routes.js'
    import OTFM from './src/routes/ordenesDeTrabajo/encabezados/OTFM.routes.js'
    import ModelosUF from './src/routes/mantenimientos/modelosUF/Modelos.routes.js'
    import OTP from './src/routes/ordenesDeTrabajo/encabezados/OTP.routes.js'
    import DTHP from "./src/routes/ordenesDeTrabajo/detallados/DTHP.routes.js";
    import Aserradero from './src/routes/mantenimientos/aserradero/Aserradero.routes.js'
    import Patios from './src/routes/mantenimientos/patios/Patios.routes.js'
    import DASERRIN from './src/routes/ordenesDeTrabajo/detallados/DASERRIN.routes.js'
    import TipoCernido from './src/routes/mantenimientos/tipoCernido/TipoCernido.routes.js'
    import DTCA1 from './src/routes/ordenesDeTrabajo/detallados/DTCA1.routes.js' 
    import OTCA2 from './src/routes/ordenesDeTrabajo/encabezados/OTCA2.routes.js'
    import DTCA2 from "./src/routes/ordenesDeTrabajo/detallados/DTCA2.routes.js"
    import DTPV from './src/routes/ordenesDeTrabajo/detallados/DTPV.routes.js'
    import DTFM from './src/routes/ordenesDeTrabajo/detallados/DTFM.routes.js'
    import Turnos from './src/routes/mantenimientos/turnos/Turnos.routes.js'
    import DTP from './src/routes/ordenesDeTrabajo/detallados/DTP.routes.js'
   import DTIP from './src/routes/ordenesDeTrabajo/detallados/DTIP.routes.js'
    import OTHH from './src/routes/ordenesDeTrabajo/encabezados/OTHH.routes.js'
    import maquinaria from './src/routes/mantenimientos/maquinaria/Maquinaria.routes.js'
    import Estadouf from './src/routes/mantenimientos/estadosUF/EstadosUF.routes.js'
    import Operarios from './src/routes/mantenimientos/operarios/OperariosAreas.routes.js'
    import DCPCD from './src/routes/controlProcesos/detallados/DCPCD.routes.js'
    import DTHH from './src/routes/ordenesDeTrabajo/detallados/DTHH.routes.js'
    // import DTHHprueba from './src/routes/ordenesDeTrabajo/detallados/DTHHPrueba.routes.js'
    import CPS from './src/routes/controlProcesos/encabezados/CPS.routes.js'
    import CPB from './src/routes/controlProcesos/encabezados/CPB.routes.js'
    import CRM from './src/routes/controlProcesos/encabezados/CRM.routes.js'
    import CTT from './src/routes/controlProcesos/encabezados/CTT.routes.js'
    import CPCD from './src/routes/controlProcesos/encabezados/CPCD.routes.js' 
    import CTH from './src/routes/controlProcesos/encabezados/CTH.routes.js'
    import calificacion from './src/routes/mantenimientos/calificacion/calificacion.js'
    import DCPS from './src/routes/controlProcesos/detallados/DCPS.routes.js'
    import modulosTarimas from './src/routes/mantenimientos/modulosTarimas/ModulosTarimas.routes.js'
    import DCPB from './src/routes/controlProcesos/detallados/DCPB.routes.js'
    import tipoMermas from './src/routes/mantenimientos/tipoMerma/TipoMerma.routes.js'
    import DRM from './src/routes/controlProcesos/detallados/DRM.routes.js'
    import DTT from './src/routes/controlProcesos/detallados/DTT.routes.js'
    import DTH from './src/routes/controlProcesos/detallados/DTH.routes.js'
    import CKTA from './src/routes/maquinaria/encabezados/CKTA.routes.js'
    import CKEXT from './src/routes/maquinaria/encabezados/CKEXT.routes.js'
    import CKBT from './src/routes/maquinaria/encabezados/CKBT.routes.js'
    import CKCTA from './src/routes/maquinaria/encabezados/CKCTA.routes.js'
    import CKCTAM from './src/routes/maquinaria/encabezados/CKTAM.routes.js'
    import CKM2 from './src/routes/maquinaria/encabezados/CKM2.routes.js'
    import CKMM from './src/routes/maquinaria/encabezados/CKMM.routes.js'
    import CKPH2 from './src/routes/maquinaria/encabezados/CKPH2.routes.js'
    import CKPHM from './src/routes/maquinaria/encabezados/CKPHM.routes.js'
    import CKPM from './src/routes/maquinaria/encabezados/CKPM.routes.js'
    import respuestas from './src/routes/mantenimientos/respuestas/Respuestas.routes.js'
    import DCKBT from './src/routes/maquinaria/detallados/DCKBT.routes.js'
    import DCKM2 from './src/routes/maquinaria/detallados/DCKM2.routes.js'
    import DCKEXT from './src/routes/maquinaria/detallados/DCKEXT.routes.js'
    import DCKCTA from './src/routes/maquinaria/detallados/DCKCTA.routes.js'
    import DCKCTAM from './src/routes/maquinaria/detallados/DCKCTAM.routes.js'
    import DCKMM from './src/routes/maquinaria/detallados/DCKMM.routes.js'
    import DCKPH2 from './src/routes/maquinaria/detallados/DCKPH2.routes.js'
    import DCKPHM from './src/routes/maquinaria/detallados/DCKPHM.routes.js'
    import DCKPM from './src/routes/maquinaria/detallados/DCKPM.routes.js'
    import DCKTA from './src/routes/maquinaria/detallados/DCKTA.routes.js'
import DCPFM from './src/routes/controlProcesos/detallados/DCFMP.routes.js'
    import MTA from './src/routes/mantenimientoMaq/encabezados/MTA.routes.js'
    import MEXT from './src/routes/mantenimientoMaq/encabezados/MEXT.routes.js'
    import MBT from './src/routes/mantenimientoMaq/encabezados/MBT.routes.js'
    import MCTA from  './src/routes/mantenimientoMaq/encabezados/MCTA.routes.js'
    import MTAM from './src/routes/mantenimientoMaq/encabezados/MCTAM.routes.js'
    import MM2 from './src/routes/mantenimientoMaq/encabezados/MM2.routes.js'
    import MMM from './src/routes/mantenimientoMaq/encabezados/MMM.routes.js'
    import MPH2 from './src/routes/mantenimientoMaq/encabezados/MPH2.routes.js'
    import MPHM from './src/routes/mantenimientoMaq/encabezados/MPHM.routes.js'
    import MPM from './src/routes/mantenimientoMaq/encabezados/MPM.routes.js'
    import MantenimientoMaq from './src/routes/tablaMantenimientoMaq/MantenimientoMaq.js'
    import RevisionMaquinaria from './src/routes/mantenimientos/revisionMaq/RevisionMaq.routes.js'

    import DMTA from './src/routes/mantenimientoMaq/detallados/DMTA.routes.js'
    import DMEXT from './src/routes/mantenimientoMaq/detallados/DMEXT.routes.js'
    import DMBT from './src/routes/mantenimientoMaq/detallados/DMBT.routes.js'
    import DMCTA from './src/routes/mantenimientoMaq/detallados/DMCTA.routes.js'
    import DMTAM from './src/routes/mantenimientoMaq/detallados/DMTAM.routes.js'
    import DMM2 from './src/routes/mantenimientoMaq/detallados/DMM2.routes.js'
    import DMMM from './src/routes/mantenimientoMaq/detallados/DMMM.routes.js'
    import DMPH2 from './src/routes/mantenimientoMaq/detallados/DMPH2.routes.js'
    import DMPHM from './src/routes/mantenimientoMaq/detallados/DMPHM.routes.js'
    import DMPM from './src/routes/mantenimientoMaq/detallados/DMPM.routes.js'
    import TipoMantenimiento from './src/routes/mantenimientos/tipoMantenimiento/tipoMantenimiento.js'
    import Insumos from './src/routes/mantenimientos/insumos/Insumos.routes.js'
    import  OTCC from './src/routes/ordenesDeTrabajo/encabezados/OTCC.routes.js'
    import DTCC from './src/routes/ordenesDeTrabajo/detallados/DTCC.routes.js'
    import dotenv from 'dotenv';
    import CFMP from './src/routes/controlProcesos/encabezados/CFMP.routes.js'
    import CernidoDetalle from './src/routes/mantenimientos/CernidoDetalle/TipoCernido.routes.js'
  import GrupodeTrabajo from './src/routes/mantenimientos/grupodetrabajos/GrupodeTrabajo.js'
  // import {postSendEmail} from './Email/Email.router.js'
  // import OTDMP from './src/routes/laboratorio/encabezado/OTDMP.routes.js'
  import TablaLab from './src/routes/tablaLab/TablaLab.js'
  import granulometria from './src/routes/mantenimientos/granulometria/Granulometria.routes.js'
  import DOTDMP from './src/routes/laboratorio/detallado/DOTDMP.routes.js'
  // import OTDMPB from './src/routes/laboratorio/encabezado/OTDMPB.routes.js'
  import DOTDMPB from './src/routes/laboratorio/detallado/DOTDMPB.routes.js'
  import TablaPorCodigos from './src/routes/tablaLab/TablaLab.js'
  import Procesos from './src/routes/mantenimientos/procesos/procesos.js'
  // import PlanCumplido from './src/routes/PlanMes/Mensual.routes.js'
  import PlanDay from './src/routes/PlanMes/Mensual.routes.js'
  import PlanCumplido from './src/routes/PlanMes/Mensual.routes.js'
  import Creacionissues from './src/routes/Creacionissues/Creacionissues.routes.js'
  import CLP from './src/routes/controlLimiteLiquidoPlastico/encabezados/CLP.routes.js'
  import TablaCLP from './src/routes/tablaCLP/TablaCLP.js'
  import Cliquido from './src/routes/controlLimiteLiquidoPlastico/detallados/cliquido.routes.js'
  import RegistroTrabajo from './src/routes/RegistroTrabajo/RegistroTrabajol.routes.js'
  import Area from './src/routes/mantenimientos/areas/Areas.routes.js'
  // Carga las variables de entorno desde el archivo .env
   dotenv.config();
    
    // const Origen =  process.env.ALLOWED_ORIGIN;
    const allowedOrigins = [
      "http://localhost:3000",
      "https://www.eco-aplicaciones.com",
      "https://107.20.171.166:50013"
    ];
    const Origen="http://localhost:3000";

    const app = express()
    
    // app.use(cors);
    
    app.use(cors({
      
      origin: Origen, // Utiliza la variable de entorno correcta
      methods: ['GET', 'POST', 'PUT'], // Métodos permitidos
      allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
    }));
    // app.use(cors({
    //   origin: allowedOrigins,
    //   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    //   credentials: false,
    //   allowedHeaders: ['Content-Type', 'Authorization']
    // }));

    // Middleware para manejar OPTIONS pre-flight request
app.options('*', cors());

// Middleware JSON
app.use(express.json());

    // Middleware para configurar CORS

    // app.use((req, res, next) => {
    //   res.header("Access-Control-Allow-Origin", Origen);
    //   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    //   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    //   res.header("Access-Control-Allow-Credentials", "true"); // Si necesitas enviar cookies
    //   next();
    // });
    app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin");
      res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
      res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
      next();
    });
    

    app.use(bodyParser.json());
    app.use(express.json())   

    //login
    app.use('/api',Loginroutes);

    //Estado UF
    app.use('/api',Estadouf)

    //Tipo cernido
    app.use('/api',TipoCernido);
    app.use('/api',CernidoDetalle);

    //login
    app.use('/api',TipoMantenimiento);

    //Estados Maquinaria
    app.use('/api',EstadosMaq);

    //Estados Maquinaria
    app.use('/api',RevisionMaquinaria);

    //Turnos de Produccion
    app.use('/api',Turnos);

    //Turnos de Produccion
    app.use('/api',Turnos);

       //Grupos de Trabajo
    app.use('/api',GrupodeTrabajo);

    //Hornos
    app.use('/api',maquinaria);

    app.use('/api',modulosTarimas);
    app.use('/api',tipoMermas);

    //Aserradero
    app.use('/api',Aserradero);

    //Procesos
    app.use('/api',Procesos);
    
    //Patios
    app.use('/api',Patios);

    //Estado Procesos
    app.use('/api',EstadosProc)

    //Roles
    app.use('/api',Rolrouter);

    //Calificaciones
    app.use('/api',calificacion);
    app.use('/api',respuestas);

    //Usuarios
    app.use('/api',UsuariosR);

    //Tipo Proveedores
    app.use('/api',TipoProv);

    //Obtener-Crear Proveedores
    app.use('/api',Provedores)

    //Obtener-Crear Materia Primas
    app.use('/api',MateriaPrima)

    //Tabla Ordenes de Trabajo
    app.use('/api',TablaOT)
    app.use('/api',TablaCp)
    app.use('/api',TablaMaquinaria)
    app.use('/api',TablaLab)
    
    //Modelos UF
    app.use('/api',ModelosUF)

     //Insumos
     app.use('/api',Insumos)

    //OT Secado de aserrin y detallado
    app.use('/api',OTSA)
    app.use('/api',DASERRIN)

    //OT Cernido de aserrin 1 y DEtalle Cernido 1
    app.use('/api',OTCA1)
    app.use('/api',DTCA1)

    //OT Cernido de aserrin 1 y DEtalle Cernido 1
    app.use('/api',OTCC)
    app.use('/api',DTCC)

    //Encabezado Cernido de aserrin 2 y Detalle Cernido 2
    app.use('/api',OTCA2)
    app.use('/api',DTCA2)

    //OT  Pulverizado MP y detyalle de pulverizado
    app.use('/api',OTPV)
    app.use('/api',DTPV)

    //OT Formulacion
    app.use('/api',OTFM)
    app.use('/api',DTFM)

    //OT Producción
    app.use('/api',OTP)
    app.use('/api',DTP)
    
    
    //Detalle Toma de Humedad Y OT Humedad en Patios
    app.use('/api',DTHP)
    app.use('/api',OTHP)

    //Hornos
    app.use('/api',OTHH)
    app.use('/api',DTHH)
    // app.use(DTHHprueba)

    //Impregnados
    app.use('/api',OTIP)
    app.use('/api',DTIP)
    

    //Personal por area
    app.use('/api',Operarios)

    //Encabezados Control Procesos
    app.use('/api',CPS)
    app.use('/api',CPB)
    app.use('/api',CRM)
    app.use('/api',CTT)
    app.use('/api',CTH)
    app.use('/api',CPCD)
    app.use('/api',CFMP)
    //Detalles Control Procesos
    app.use('/api',DCPS)
    app.use('/api',DCPB)
    app.use('/api',DRM)
    app.use('/api',DTT)
    app.use('/api',DTH)
    app.use('/api',DCPFM)
    app.use('/api',DCPCD)
    
    
    //Encabezados Maquinaria
    app.use('/api',CKTA)
    app.use('/api',CKEXT)
    app.use('/api',CKBT)
    app.use('/api',CKCTA)
    app.use('/api',CKCTAM)
    app.use('/api',CKM2)
    app.use('/api',CKMM)
    app.use('/api',CKPH2)
    app.use('/api',CKPHM)
    app.use('/api',CKPM)

    //Detalle Maquinaria
    app.use('/api',DCKBT)
    app.use('/api',DCKM2)
    app.use('/api',DCKEXT)
    app.use('/api',DCKCTA)
    app.use('/api',DCKCTAM)
    app.use('/api',DCKMM)
    app.use('/api',DCKPH2)
    app.use('/api',DCKPHM)
    app.use('/api',DCKPM)
    app.use('/api',DCKTA)

    //Encabezados mantenimento Maquinaria
    app.use('/api',MantenimientoMaq)
    app.use('/api',MTA)
    app.use('/api',MEXT)
    app.use('/api',MBT)
    app.use('/api',MCTA)
    app.use('/api',MTAM)
    app.use('/api',MM2)
    app.use('/api',MMM)
    app.use('/api',MPH2)
    app.use('/api',MPHM)
    app.use('/api',MPM)
    //Detalle mantenimento Maquinaria
    app.use('/api',DMTA)
    app.use('/api',DMEXT)
    app.use('/api',DMBT)
    app.use('/api',DMCTA)
    app.use('/api',DMTAM)
    app.use('/api',DMM2)
    app.use('/api',DMMM)
    app.use('/api',DMPH2)
    app.use('/api',DMPHM)
    app.use('/api',DMPM)

    //Ot informacion materia prima Laboratorio
    // app.use(OTDMP)
    app.use('/api',DOTDMP)
    // app.use(OTDMPB)
    app.use('/api',DOTDMPB)
    //Granulometria
    app.use('/api',granulometria)
    //TablaPorCodigos
    app.use('/api',TablaPorCodigos)

    // app.use(PlanMes)
    app.use('/api',PlanDay)
    app.use('/api',PlanCumplido)

    //Registro de Isuues
    app.use('/api',Creacionissues)
    //Tabla Calculo Limite Liquido y Limite Plastico
    app.use('/api',TablaCLP)
    app.use('/api',CLP)
    app.use('/api',Cliquido)
    // app.use(postSendEmail)

    //Control de Operarios
    app.use('/api',RegistroTrabajo)

    //
    app.use('/api', Area)
    app.listen(process.env.PORT || 3002)


    console.log('puerto escuchando en el puerto 3002')




