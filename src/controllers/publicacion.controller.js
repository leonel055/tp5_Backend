const { Op } = require('sequelize');
const Publicacion = require('./../../src/models/publicacion.model');
const Empleado = require('./../../src/models/empleado.model');
const publicacionCtrl = {};

publicacionCtrl.createPublicacion = async (req, res) => {
  try {
    await Publicacion.create(req.body);
    res.json({ status: '1', msg: 'Publicacion guardada.' });
  } catch (error) {
    res.status(400).json({ status: '0', msg: 'Error procesando operacion.' });
  }
};

publicacionCtrl.getPublicaciones = async (req, res) => {
  try {
    const pubs = await Publicacion.findAll({ include: [{ model: Empleado, as: 'empleado' }] });
    res.json(pubs);
  } catch (error) {
    res.status(500).json({ status: '0', msg: 'Error al obtener publicaciones.' });
  }
};

publicacionCtrl.editPublicacion = async (req, res) => {
  try {
    const pub = await Publicacion.findByPk(req.params.id);
    if (!pub) {
      return res.status(404).json({ status: '0', msg: 'Publicacion no encontrada.' });
    }
    await pub.update(req.body);
    res.json({ status: '1', msg: 'Publicacion updated.' });
  } catch (error) {
    res.status(400).json({ status: '0', msg: 'Error procesando la operacion.' });
  }
};

publicacionCtrl.deletePublicacion = async (req, res) => {
  try {
    const pub = await Publicacion.findByPk(req.params.id);
    if (!pub) {
      return res.status(404).json({ status: '0', msg: 'Publicacion no encontrada.' });
    }
    await pub.destroy();
    res.json({ status: '1', msg: 'Publicacion removed.' });
  } catch (error) {
    res.status(400).json({ status: '0', msg: 'Error procesando la operacion.' });
  }
};

publicacionCtrl.buscar = async (req, res) => {
  try {
    const body  = req.body  || {};
    const query = req.query || {};

    const titulo  = query.titulo  || body.titulo;
    const vigente = query.vigente ?? body.vigente;

    const where = {};

    if (titulo) {
      where.titulo = { [Op.iLike]: `%${titulo}%` };
    }

    if (vigente !== undefined && vigente !== null && vigente !== '') {
      where.vigente = vigente === 'true' || vigente === true;
    }

    const result = await Publicacion.findAll({
      where,
      include: [{ model: Empleado, as: 'empleado' }]
    });

    res.json(result);
  } catch (error) {
    res.status(500).json({ status: '0', msg: 'Error en la búsqueda.', detalle: error.message });
  }
};

module.exports = publicacionCtrl;