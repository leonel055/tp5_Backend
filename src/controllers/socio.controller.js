const Socio = require('./../../src/models/socio.model');
const socioCtrl = {};


// GET todos
socioCtrl.getSocios = async (req, res) => {
  /*
   #swagger.tags = ['Socios']
   #swagger.summary = 'Obtener todos los socios'
   #swagger.responses[200] = { description: 'Lista de socios obtenida con éxito.' }
 */
  try {
    const socios = await Socio.findAll();
    res.json(socios);
  } catch (error) {
    res.status(500).json({ status: '0', msg: 'Error al obtener socios.' });
  }
};

// GET solo activos
socioCtrl.getSociosActivos = async (req, res) => {
  /*
    #swagger.tags = ['Socios']
    #swagger.summary = 'Obtener socios activos'
    #swagger.responses[200] = { description: 'Lista de socios activos.' }
  */
  try {
    const socios = await Socio.findAll({ where: { activo: true } });
    res.json(socios);
  } catch (error) {
    res.status(500).json({ status: '0', msg: 'Error al obtener socios activos.' });
  }
};

// POST crear
socioCtrl.createSocio = async (req, res) => {
  /*
    #swagger.tags = ['Socios']
    #swagger.summary = 'Crear un socio'
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Datos del socio a crear.',
      required: true,
      schema: { $ref: '#/definitions/Socio' }
    }
    #swagger.responses[200] = { description: 'Socio guardado correctamente.' }
  */
  try {
    await Socio.create(req.body);
    res.json({ status: '1', msg: 'Socio guardado.' });
  } catch (error) {
    res.status(400).json({ status: '0', msg: 'Error procesando operacion.' });
  }
};

// PUT modificar
socioCtrl.editSocio = async (req, res) => {
  /*
    #swagger.tags = ['Socios']
    #swagger.summary = 'Modificar un socio'
    #swagger.parameters['id'] = { in: 'path', description: 'ID del socio', required: true }
    #swagger.parameters['body'] = {
      in: 'body',
      schema: { $ref: '#/definitions/Socio' }
    }
    #swagger.responses[200] = { description: 'Socio actualizado.' }
  */
    try {
      const socio = await Socio.findByPk(req.params.id);
      if (!socio) {
        return res.status(404).json({ status: '0', msg: 'Socio no encontrado.' });
      }
      await socio.update(req.body);
      res.json({ status: '1', msg: 'Socio updated.' });
    } catch (error) {
      res.status(400).json({ status: '0', msg: 'Error procesando la operacion.' });
    }
  };

// DELETE eliminar
socioCtrl.deleteSocio = async (req, res) => {
  /*
   #swagger.tags = ['Socios']
   #swagger.summary = 'Eliminar un socio'
   #swagger.parameters['id'] = { in: 'path', description: 'ID del socio', required: true }
   #swagger.responses[200] = { description: 'Socio eliminado.' }
 */
  try {
    const socio = await Socio.findByPk(req.params.id);
    if (!socio) {
      return res.status(404).json({ status: '0', msg: 'Socio no encontrado.' });
    }
    await socio.destroy();
    res.json({ status: '1', msg: 'Socio removed.' });
  } catch (error) {
    res.status(400).json({ status: '0', msg: 'Error procesando la operacion.' });
  }
};

module.exports = socioCtrl;