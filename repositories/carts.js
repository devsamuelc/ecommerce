const fs = require('fs');
const Repository = require('./repository');

class CartsRepository extends Repository {}

module.exports = new CartsRepository('carts.json');