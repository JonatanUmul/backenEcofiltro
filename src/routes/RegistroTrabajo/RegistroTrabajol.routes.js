import { Router } from "express";
import { GetRegistroTrabajo } from "../../../controllers/RegistroTrabajo/detalle/RegistroTrabajo.controllers.js";



const router = Router();


router.get('/RegistroTrabajo', GetRegistroTrabajo);
// router.get('/PlanMes', getPlanMes);



export default router;
