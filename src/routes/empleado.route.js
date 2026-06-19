const empleadoCtrl = require('./../../src/controllers/empleado.controller');
const express = require('express');
const router = express.Router();

router.get('/',       empleadoCtrl.getEmpleados);
router.get('/:id',    empleadoCtrl.getEmpleado);
router.post('/',      empleadoCtrl.createEmpleado);
router.put('/:id',    empleadoCtrl.editEmpleado);
router.delete('/:id', empleadoCtrl.deleteEmpleado);

module.exports = router;