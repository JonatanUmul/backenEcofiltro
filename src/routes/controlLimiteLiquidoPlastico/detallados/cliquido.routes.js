import { Router } from "express";
import { postcliquido } from "../../../../controllers/controlLimiteLiquidoPlastico/detallles/Cliquido.controllers.js";



const router = Router();


router.post('/Cliquido', postcliquido);


export default router;
