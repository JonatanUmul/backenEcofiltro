import {Router} from 'express';
import {putetapas_barro, getEtapas_barro, getEtapas_barro_lote, getBarro_inventario} from '../../../controllers/materiasPrimas/Homogenizacion.controller.js'


const router=Router()


router.post('/etapas_barro', putetapas_barro)
router.get('/etapas_barro', getEtapas_barro)
router.get('/etapas_barro_aprobados', getEtapas_barro_lote)
router.get('/BarroInventario/:idSelect', getBarro_inventario)



export default router;