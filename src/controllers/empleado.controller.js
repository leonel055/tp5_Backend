const Empleado = require('./../../src/models/empleado.model');
const empleadoCtrl = {};

empleadoCtrl.getEmpleados = async (req, res) => {
  /*
    #swagger.tags = ['Empleados']
    #swagger.summary = 'Obtener todos los empleados'
    #swagger.responses[200] = { description: 'Lista de empleados obtenida con éxito.' }
  */
  try {
    res.json(await Empleado.findAll());
  } catch (error) {
    res.status(500).json({ status: '0', msg: 'Error al obtener empleados.' });
  }
};

empleadoCtrl.getEmpleado = async (req, res) => {
  /*
    #swagger.tags = ['Empleados']
    #swagger.summary = 'Obtener un empleado por ID'
    #swagger.parameters['id'] = { in: 'path', description: 'ID del empleado', required: true }
    #swagger.responses[200] = { description: 'Empleado obtenido con éxito.' }
    #swagger.responses[404] = { description: 'Empleado no encontrado.' }
  */
  try {
    const emp = await Empleado.findByPk(req.params.id);
    if (!emp) return res.status(404).json({ status: '0', msg: 'Empleado no encontrado.' });
    res.json(emp);
  } catch (error) {
    res.status(500).json({ status: '0', msg: 'Error al obtener el empleado.' });
  }
};

empleadoCtrl.createEmpleado = async (req, res) => {
  /*
    #swagger.tags = ['Empleados']
    #swagger.summary = 'Crear un empleado'
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Datos del empleado a crear.',
      required: true,
      schema: { $ref: '#/definitions/Empleado' }
    }
    #swagger.responses[200] = { description: 'Empleado guardado correctamente.' }
  */
  try {
    await Empleado.create(req.body);
    res.json({ status: '1', msg: 'Empleado guardado.' });
  } catch (error) {
    res.status(400).json({ status: '0', msg: 'Error procesando operacion.' });
  }
};

empleadoCtrl.editEmpleado = async (req, res) => {
  /*
    #swagger.tags = ['Empleados']
    #swagger.summary = 'Modificar un empleado'
    #swagger.parameters['id'] = { in: 'path', description: 'ID del empleado', required: true }
    #swagger.parameters['body'] = {
      in: 'body',
      schema: { $ref: '#/definitions/Empleado' }
    }
    #swagger.responses[200] = { description: 'Empleado actualizado.' }
    #swagger.responses[404] = { description: 'Empleado no encontrado.' }
  */
  try {
    const emp = await Empleado.findByPk(req.params.id);
    if (!emp) {
      return res.status(404).json({ status: '0', msg: 'Empleado no encontrado.' });
    }
    await emp.update(req.body);
    res.json({ status: '1', msg: 'Empleado updated.' });
  } catch (error) {
    res.status(400).json({ status: '0', msg: 'Error procesando la operacion.' });
  }
};

empleadoCtrl.deleteEmpleado = async (req, res) => {
  /*
    #swagger.tags = ['Empleados']
    #swagger.summary = 'Eliminar un empleado'
    #swagger.parameters['id'] = { in: 'path', description: 'ID del empleado', required: true }
    #swagger.responses[200] = { description: 'Empleado eliminado.' }
    #swagger.responses[404] = { description: 'Empleado no encontrado.' }
  */
  try {
    const emp = await Empleado.findByPk(req.params.id);
    if (!emp) {
      return res.status(404).json({ status: '0', msg: 'Empleado no encontrado.' });
    }
    await emp.destroy();
    res.json({ status: '1', msg: 'Empleado removed.' });
  } catch (error) {
    res.status(400).json({ status: '0', msg: 'Error procesando la operacion.' });
  }
};

module.exports = empleadoCtrl;
