const express = require('express');
const cors = require('cors');

const mongoose = require('mongoose');
const requireDir = require('require-dir'); 
require('dotenv-safe').config({ allowEmptyValues: true });

const app = express();
app.use(express.json()); // Permitir request de dados em formato JSON
app.use(cors()); // Permite acesso da API aos domínios externos

// Iniciando o Database
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true })
    .then(() => console.log('MongoDB connected'))
    .catch(error => console.log('Connection failed: ' + error));
mongoose.set('useFindAndModify', false);

requireDir('./models'); 

// Rotas
app.use('/api', require('./routes'));

app.listen(process.env.PORT || 3000, () => console.log('server on'));