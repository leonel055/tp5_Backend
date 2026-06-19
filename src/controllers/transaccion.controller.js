const Transaccion = require('./../../src/models/transaccion.model');
const transaccionCtrl = {};

transaccionCtrl.createTransaccion = async (req, res) => {
  /*
    #swagger.tags = ['Transacciones']
    #swagger.summary = 'Crear una transacción'
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Datos de la transacción a crear.',
      required: true,
      schema: { $ref: '#/definitions/Transaccion' }
    }
    #swagger.responses[200] = { description: 'Transacción guardada correctamente.' }
  */
  try {
    await Transaccion.create(req.body);
    res.json({ status: '1', msg: 'Transaccion guardada.' });
  } catch (error) {
    res.status(400).json({ status: '0', msg: 'Error procesando operacion.' });
  }
};

transaccionCtrl.getTransacciones = async (req, res) => {
  /*
    #swagger.tags = ['Transacciones']
    #swagger.summary = 'Obtener todas las transacciones'
    #swagger.responses[200] = { description: 'Lista de transacciones obtenida con éxito.' }
  */
  try {
    const todas = await Transaccion.findAll();
    res.json(todas);
  } catch (error) {
    res.status(500).json({ status: '0', msg: 'Error al obtener transacciones.' });
  }
};

// GET por email  →  /api/transacciones/cliente/user@mail.com
transaccionCtrl.getByEmail = async (req, res) => {
  /*
    #swagger.tags = ['Transacciones']
    #swagger.summary = 'Obtener transacciones por email del cliente'
    #swagger.parameters['email'] = { in: 'path', description: 'Email del cliente', required: true }
    #swagger.responses[200] = { description: 'Historial de transacciones del cliente.' }
  */
  try {
    const historial = await Transaccion.findAll({
      where: { emailCliente: req.params.email }
    });
    res.json(historial);
  } catch (error) {
    res.status(500).json({ status: '0', msg: 'Error al obtener historial.' });
  }
};

// GET por idiomas (PARAMS)  →  /api/transacciones/idiomas/es/en
transaccionCtrl.getByIdiomas = async (req, res) => {
  /*
    #swagger.tags = ['Transacciones']
    #swagger.summary = 'Obtener transacciones por idioma origen y destino'
    #swagger.parameters['origen'] = { in: 'path', description: 'Idioma origen', required: true }
    #swagger.parameters['destino'] = { in: 'path', description: 'Idioma destino', required: true }
    #swagger.responses[200] = { description: 'Transacciones filtradas por idiomas.' }
  */
  try {
    const result = await Transaccion.findAll({
      where: {
        idiomaOrigen:  req.params.origen,
        idiomaDestino: req.params.destino,
      }
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ status: '0', msg: 'Error al obtener por idiomas.' });
  }
};

transaccionCtrl.editTransaccion = async (req, res) => {
  /*
    #swagger.tags = ['Transacciones']
    #swagger.summary = 'Modificar una transacción'
    #swagger.parameters['id'] = { in: 'path', description: 'ID de la transacción', required: true }
    #swagger.parameters['body'] = {
      in: 'body',
      schema: { $ref: '#/definitions/Transaccion' }
    }
    #swagger.responses[200] = { description: 'Transacción actualizada.' }
    #swagger.responses[404] = { description: 'Transacción no encontrada.' }
  */
  try {
    const transaccion = await Transaccion.findByPk(req.params.id);
    if (!transaccion) {
      return res.status(404).json({ status: '0', msg: 'Transaccion no encontrada.' });
    }
    await transaccion.update(req.body);
    res.json({ status: '1', msg: 'Transaccion updated.' });
  } catch (error) {
    res.status(400).json({ status: '0', msg: 'Error procesando la operacion.' });
  }
};

transaccionCtrl.deleteTransaccion = async (req, res) => {
  /*
    #swagger.tags = ['Transacciones']
    #swagger.summary = 'Eliminar una transacción'
    #swagger.parameters['id'] = { in: 'path', description: 'ID de la transacción', required: true }
    #swagger.responses[200] = { description: 'Transacción eliminada.' }
    #swagger.responses[404] = { description: 'Transacción no encontrada.' }
  */
  try {
    const transaccion = await Transaccion.findByPk(req.params.id);
    if (!transaccion) {
      return res.status(404).json({ status: '0', msg: 'Transaccion no encontrada.' });
    }
    await transaccion.destroy();
    res.json({ status: '1', msg: 'Transaccion removed.' });
  } catch (error) {
    res.status(400).json({ status: '0', msg: 'Error procesando la operacion.' });
  }
};

module.exports = transaccionCtrl;
