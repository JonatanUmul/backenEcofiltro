import { Router } from "express";
import {  PostTipoCernido, getTipoCernido } from '../../../../controllers/mantenimientos/tipoCernido/TipoCernido.controllesr.js';


const router = Router();

router.get('/TipoCernido', getTipoCernido );
router.post('/TipoCernido', PostTipoCernido );


export default router;
