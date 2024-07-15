    import { Router } from "express";
    import {  postDTIP, getDTIP, getSDTIP } from "../../../../controllers/ordenesDeTrabajo/detallles/DTIP.controllers.js";



    const router = Router();


    router.post('/DTIP', postDTIP);
    router.get('/DTIP/:id', getDTIP);
    // router.get('/DTHP/:fecha', getDTH);
    router.get('/DTIP/:fecha_creacion_inicio/:fecha_creacion_fin', getSDTIP);


    export default router;
