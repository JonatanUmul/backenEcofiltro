    import { Router } from "express";
    import {  postDTHP, getDTHP, getDTHPP } from "../../../../controllers/ordenesDeTrabajo/detallles/DTHP.controllers.js";



    const router = Router();


    router.post('/DTHP', postDTHP);
    router.get('/DTHP/:id', getDTHP);
    // router.get('/DTHP/:fecha', getDTH);
    router.get('/DTHP/:fecha_creacion_inicio/:fecha_creacion_fin/:id_asrd/:id_patio/:id_enc', getDTHPP);


    export default router;
