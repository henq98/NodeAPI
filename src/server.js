const express = require('express');
const cors = require('cors');

const mongoose = require('mongoose');
const requireDir = require('require-dir'); 

const app = express();
app.use(express.json()); // Permitir request de dados em formato JSON
app.use(cors()); // Permite acesso da API aos domínios externos

// Iniciando o Database
mongoose.connect('mongodb://localhost:27017/nodeAPI', { useNewUrlParser: true })
    .then(() => console.log('MongoDB connected'))
    .catch(error => console.log('Connection failed: ' + error));
mongoose.set('useFindAndModify', false);

requireDir('./models'); 

// Rotas
app.use('/api', require('./routes'));

app.listen(3000, () => {
    console.log('server on')
});