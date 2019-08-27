const {knexInstance} = require('./practice');

const ShoppingService = {
  getAllItems(db) {
    return db('shopping_list')
    .select('*')
  }
}

module.exports = ShoppingService