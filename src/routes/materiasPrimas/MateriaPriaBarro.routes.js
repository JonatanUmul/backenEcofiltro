import {Router} from 'express';
import {getMateriaPriaBarro, get_Max_id_ot_mezclado_aserrin} from '../../../controllers/materiasPrimas/MateriaPriaBarro.router.js'


const router=Router()

router.get('/MateriaPriaBarro', getMateriaPriaBarro)
router.get('/get_Max_id_ot_mezclado_aserrin', get_Max_id_ot_mezclado_aserrin)



export default router;