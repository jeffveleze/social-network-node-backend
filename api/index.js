const express = require('express');
const bodyParser = require('body-parser');

const swaggerUI = require('swagger-ui-express');

const config = require('../config.js');
const user = require('./components/user/network');
const auth = require('./components/auth/network');
const errors = require('../network/errors');

const app = express();

app.use(bodyParser.json());

const swaggerDoc = require('./swagger.json');

app.use('/api/user', user);
app.use('/api/auth', auth);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));

app.use(errors);

app.listen(3000, config.api.port, () => {
    console.log('API escuchando en el puerto', config.api.port);
});