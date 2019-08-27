const { knexInstance } = require('./practice')

const ShoppingService = {
  getAllItems(db) {
    return db('shopping_list').select('*')
  },
  insertItem(db, item) {
    return db.insert(item).into('shopping_list').returning('*')
  },
  getById(db, id) {
    return db.from('shopping_list').select('*').where('id', id).first()
  },
  updateItem(db, id, newFields){
    return db('shopping_list')
      .where({id})
      .update(newFields);
  },
  deleteItem(db, id){
    return db('shopping_list')
      .where({id})
      .delete();
  }
}

module.exports = ShoppingService
