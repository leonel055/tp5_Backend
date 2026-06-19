// swagger.js
const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'API TP5',
    description: 'Documentación de la API de Socios, Transacciones, Empleados y Publicaciones.'
  },
  host: 'localhost:3000',
  basePath: '/',
  schemes: ['http'],
  tags: [
    { name: 'Socios',        description: 'Operaciones sobre socios.' },
    { name: 'Transacciones', description: 'Operaciones sobre transacciones.' },
    { name: 'Empleados',     description: 'Operaciones sobre empleados.' },
    { name: 'Publicaciones', description: 'Operaciones sobre publicaciones.' }
  ],
  definitions: {
    Socio: {
      nombre: 'Leonel',
      apellido: 'Avendaño',
      foto: 'https://i.pravatar.cc/150',
      dni: '46596991',
      numeroSocio: 1,
      activo: true
    },
    Transaccion: {
      idiomaOrigen: 'es',
      textoOrigen: 'Hola mundo',
      idiomaDestino: 'en',
      textoDestino: 'Hello world',
      emailCliente: 'juan@mail.com'
    },
    Empleado: {
      apellido: 'López',
      nombre: 'Carlos',
      dni: '11223344',
      email: 'carlos@mail.com'
    },
    Publicacion: {
      titulo: 'Introducción a Node.js',
      contenido: 'Node.js es un entorno de ejecución...',
      imagenAsociada: '',
      fechaPublicacion: '2025-06-01',
      vigente: true,
      empleadoId: 1
    }
  }
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./index.js']; // apunta al archivo principal

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log(`Documentación generada en ${outputFile}`);
});