    import { Router } from "express";
    import {  postDTIP, getDTIP, getSDTIP } from "../../../../controllers/ordenesDeTrabajo/detallles/DTIP.controllers.js";



    const router = Router();


    router.post('/DTIP', postDTIP);
    router.get('/DTIP/:id', getDTIP);
    // router.get('/DTHP/:fecha', getDTH);
    router.get('/DTIP/:fecha_creacion/:id_asrd/:id_patio/:id_enc', getSDTIP);


    export default router;
