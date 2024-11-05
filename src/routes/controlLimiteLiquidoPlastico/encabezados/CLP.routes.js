import { Router } from "express";
import {  postCLP, putCLP } from "../../../../controllers/controlLimiteLiquidoPlastico/encabezados/CLP.controllers.js";
// import {postcliquido} from '../../../../controllers/controlLimiteLiquidoPlastico/detallles/Cliquido.controllers.js'


const router = Router();


router.post('/CLP', postCLP);
// router.post('/cliquido', postcliquido);
router.put('/CLP', putCLP);

export default router;
