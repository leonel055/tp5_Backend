const { DataTypes } = require('sequelize');
const sequelize = require('./../../config/database');

const Transaccion = sequelize.define('Transaccion', {
  idiomaOrigen:  { type: DataTypes.STRING },
  textoOrigen:   { type: DataTypes.TEXT },
  idiomaDestino: { type: DataTypes.STRING },
  textoDestino:  { type: DataTypes.TEXT },
  emailCliente:  { type: DataTypes.STRING },
}, {
  tableName: 'transacciones',
  timestamps: true,
});

module.exports = Transaccion;