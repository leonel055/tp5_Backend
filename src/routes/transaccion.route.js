const transaccionCtrl = require('./../../src/controllers/transaccion.controller');
const express = require('express');
const router = express.Router();

router.post('/',                        transaccionCtrl.createTransaccion);
router.get('/',                         transaccionCtrl.getTransacciones);
router.get('/cliente/:email',           transaccionCtrl.getByEmail);
router.get('/idiomas/:origen/:destino', transaccionCtrl.getByIdiomas);
router.put('/:id',                       transaccionCtrl.editTransaccion);
router.delete('/:id',                    transaccionCtrl.deleteTransaccion);

module.exports = router;