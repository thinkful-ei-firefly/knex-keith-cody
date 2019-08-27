const { knexInstance } = require('./practice')

const ShoppingService = {
  getAllItems(db) {
    return db('shopping_list').select('*')
  },
  insertItem(db, item) {
    return db.insert(item).into('shopping_list').returning('*').then(rows => console.log(rows[0]))
  }
}

module.exports = ShoppingService
