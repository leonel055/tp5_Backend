const { DataTypes } = require('sequelize');
const sequelize = require('./../../config/database');
const Empleado = require('./empleado.model');

const Publicacion = sequelize.define('Publicacion', {
  titulo:           { type: DataTypes.STRING },
  contenido:        { type: DataTypes.TEXT },
  imagenAsociada:   { type: DataTypes.TEXT },   // base64
  fechaPublicacion: { type: DataTypes.STRING },
  vigente:          { type: DataTypes.BOOLEAN, defaultValue: true },
}, {
  tableName: 'publicaciones',
  timestamps: true,
});

Publicacion.belongsTo(Empleado, {
  foreignKey: { name: 'empleadoId', allowNull: false },
  as: 'empleado'
});
Empleado.hasMany(Publicacion, { foreignKey: 'empleadoId', as: 'publicaciones' });

module.exports = Publicacion;