import { Router } from "express";
import {  getGrupodeTrabajo } from '../../../../controllers/mantenimientos/gruposdetrabajo/GrupodeTrabajo.js';


const router = Router();

router.get('/GrupodeTrabajo', getGrupodeTrabajo );
// router.post('/GrupodeTrabajo', PostGrupodeTrabajo );


export default router;
