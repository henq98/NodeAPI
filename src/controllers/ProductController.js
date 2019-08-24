const mongoose = require('mongoose');

const Product = mongoose.model('Product');

module.exports = {
    async index(req, res) { // Listar produtos
        const { // Desestruturação (ES6) // 
            page = 1 // Página padrão. Retorna a ela quando não encontrar alguma página
        } = req.query; // url: ?page=1   
        const products = await Product.paginate(
            {}, // Condições, filtro: where...
            { // MongoosePaginate config
                page, // Página atual
                limit: 5, // Limite de documentos/objetos por página
            }) // result com todas as propriedades do objeto
            .then((result) => result) // E.g., result.docs, result.page, etc... 
            .catch((err) => console.log(err));
        return res.json(products);
    },
    async show(req, res) { // Listar produto por ID
        const product = await Product.findById(req.params.id);
        return res.json(product);
    },
    async store(req, res) { // Criar produto
        const product = await Product.create(req.body);
        return res.json(product);
    },
    async update(req, res) { // Atualizar produto
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } // Retorna, à variável "product", o produto atualizado
        );
        return res.json(product);
    },
    async destroy(req, res) { // Remover produto
        await Product.findByIdAndRemove(req.params.id);
        return res.send('Removed');
    }
};