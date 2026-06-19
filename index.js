const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
var app = express();
// Middlewares
app.use(express.json({ limit: '10mb' })); // limite alto para imágenes base64
app.use(cors({ origin: 'http://localhost:4200' }));

const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger_output.json');

// Rutas
app.use('/api/socios',        require('./src/routes/socio.route'));
app.use('/api/transacciones', require('./src/routes/transaccion.route'));
app.use('/api/empleados',     require('./src/routes/empleado.route'));
app.use('/api/publicaciones', require('./src/routes/publicacion.route'));
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Setting
app.set('port', process.env.PORT || 3000);

// Sync DB y arrancar
sequelize.sync({ force: false })
  .then(() => {
    console.log('Tablas de PostgreSQL sincronizadas');
    app.listen(app.get('port'), () => {
      console.log('Server started on port', app.get('port'));
    });
  })
  .catch(err => {
    console.error('No se pudo iniciar el servidor debido a un error en la BD:', err);
  });