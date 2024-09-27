import { Router } from "express";
import { postPlanMes, postPlanDay,getPlanMes, getPlanDay, getPlanCumplido } from "../../../controllers/PlanMes/Mensual.controllers.js";



const router = Router();


router.post('/PlanMes', postPlanMes);
router.get('/PlanMes', getPlanMes);
router.post('/PlanDay', postPlanDay);
router.get('/PlanDay', getPlanDay);
router.get('/PlanCumplido/:hoy', getPlanCumplido)


export default router;
