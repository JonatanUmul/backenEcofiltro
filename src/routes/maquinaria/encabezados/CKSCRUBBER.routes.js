import { Router } from "express";
import {postCKSCRUBBER} from "../../../../controllers/maquinaria/encabezado/CKSCRUBBER.controllers.js"
import {postDCKSCRUBBER, putDCKSCRUBBER, putCKSCRUBBER, getDCKSCRUBBER} from "../../../../controllers/maquinaria/encabezado/DCKSCRUBBER.controllers.js"



const router = Router();


router.post('/CKSCRUBBER', postCKSCRUBBER);
router.post('/DCKSCRUBBER', postDCKSCRUBBER);
router.put('/DCKSCRUBBER', putDCKSCRUBBER);
router.get('/DCKSCRUBBER/:id', getDCKSCRUBBER);
router.put('/CKSCRUBBER', putCKSCRUBBER);

export default router;
