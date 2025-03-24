import { Router } from "express";
import { LoginSAP } from '../../../controllers/SLsap/LoginSAP.controller.js'
import {OrdenesSap} from '../../../controllers/SLsap/Orders/OrdenesSap.controller.js'
const router=Router();

router.post('/LoginSAP', LoginSAP)
router.get('/OrdenesSap', OrdenesSap)

export default router