import {Router} from 'express'
import {getCorrelativoMuestraBarro, putCorrelativoMuestraBarro,GetLoteRegistroDeCamionadas, postLoteRegistroDeCamionadas} from '../../../controllers/materiasPrimas/CorrelativoMuestraBarro.controller.js'


const router=Router()

router.get('/CorrelativoMuestraBarro', getCorrelativoMuestraBarro)
router.get('/LoteRegistroDeCamionadas', GetLoteRegistroDeCamionadas)
router.put('/CorrelativoMuestraBarro', putCorrelativoMuestraBarro)
router.post('/LoteRegistroDeCamionadas', postLoteRegistroDeCamionadas)

export default router;