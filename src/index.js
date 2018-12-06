const express = require('express');
const morgan = require('morgan');
const app = express();

// Settings
app.set('port', process.env.PORT || 6996);

// Middleware
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/user', require('./routes/User'));
app.use('/api/products', require('./routes/Products'));
app.use('/api/inventory', require('./routes/Inventory'));
/*
app.use('/api/inventory', require('./routes/Inventary'));
app.use('/api/maintenance', require('./routes/Maintenance'));
*/

// Static files
app.use(express.static(__dirname + '/public'));

// Servidor iniciado
app.listen(app.get('port'), () => {
  console.log('Servidor en linea');
});
