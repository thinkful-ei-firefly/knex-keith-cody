const ShoppingService = require('../src/Shopping-list-service');
const knex = require('knex');
require('dotenv').config();


describe('Shopping service', () => {
  let db;
  let testItems = [
    {
      name: 'Item 1',
      price: 50,
      category: 'Lunch'
    },
    {
      name: 'Item 2',
      price: 25,
      category: 'Main'
    },
    {
      name: 'Item 3',
      price: 5,
      category: 'Snack'
    }
  ]

  before(() => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_URL
    })
    return db('shopping_list').truncate();
  });
  before(() => {
    return db.into('shopping_list')
      .insert(testItems);
  });

  it('Should get 3 items from the DB', () => {
    return ShoppingService.getAllItems(db)
      .then(actual => {
        expect(actual).to.be.an('Array');
        expect(actual[0]).to.have.all.keys('id', 'price', 'name', 'date_added', 'checked', 'category');
      })
  })



  

  after(() => db.destroy());
}); 