const publicacionCtrl = require('./../../src/controllers/publicacion.controller');
const express = require('express');
const router = express.Router();

router.get('/buscar',  publicacionCtrl.buscar);   // ⚠️ ANTES de /:id
router.post('/buscar', publicacionCtrl.buscar);
router.get('/',        publicacionCtrl.getPublicaciones);
router.post('/',       publicacionCtrl.createPublicacion);
router.put('/:id',     publicacionCtrl.editPublicacion);
router.delete('/:id',  publicacionCtrl.deletePublicacion);

module.exports = router;