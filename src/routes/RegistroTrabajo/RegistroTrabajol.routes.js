import { Router } from "express";
import { GetRegistroTrabajo,PostGuardarMano } from "../../../controllers/RegistroTrabajo/detalle/RegistroTrabajo.controllers.js";



const router = Router();


router.get('/RegistroTrabajo', GetRegistroTrabajo);
router.post('/RegistroTrabajo', PostGuardarMano);
// router.get('/PlanMes', getPlanMes);



export default router;
