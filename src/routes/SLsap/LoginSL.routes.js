import { Router } from "express";
import { LoginSAP } from '../../../controllers/SLsap/LoginSAP.controller.js'
import { OrdenesSap } from '../../../controllers/SLsap/Orders/OrdenesSap.controller.js'
import { OtpSAP } from '../../../controllers/SLsap/Orders/Otp.controllers.js'
import { ManoObraOrders } from '../../../controllers/SLsap/Orders/Otp.controllers.js'
const router=Router();

router.post('/LoginSAP', LoginSAP) 
router.get('/OrdenesSap', OrdenesSap)
router.post('/OtpSAP', OtpSAP)
router.post('/ManoObraOrders',ManoObraOrders )

export default router