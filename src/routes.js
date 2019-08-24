const express = require('express');
const routes = express.Router();

const ProductController = require('./controllers/ProductController');

// routes.get('/products', ProductController.index);

routes.route('/products')
    .get(ProductController.index)
    .post(ProductController.store);
routes.route('/products/:id')
    .get(ProductController.show)
    .put(ProductController.update)
    .delete(ProductController.destroy)

module.exports = routes;