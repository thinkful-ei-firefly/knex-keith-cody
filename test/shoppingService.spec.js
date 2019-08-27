const ShoppingService = require('../src/Shopping-list-service')
const knex = require('knex')
require('dotenv').config()

describe('Shopping service', () => {
  let db
  let testItems = [
    {
      name: 'Item 1',
      price: "50.00",
      category: 'Lunch'
    },
    {
      name: 'Item 2',
      price: "25.00",
      category: 'Main'
    },
    {
      name: 'Item 3',
      price: "5.00",
      category: 'Snack'
    }
  ]

  before(() => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_URL
    })
    return db('shopping_list').truncate()
  })
  before(() => {
    return db.into('shopping_list').insert(testItems)
  })

  it('Should get 3 items from the DB', () => {
    return ShoppingService.getAllItems(db).then(actual => {
      expect(actual).to.be.an('Array')
      expect(actual[0]).to.have.all.keys(
        'id',
        'price',
        'name',
        'date_added',
        'checked',
        'category'
      )
    })
  })

  it('Should insert a new item', () => {
    const testItem = {
      name: 'Test Item',
      price: 20.01,
      category: 'Lunch'
    }

    return ShoppingService.insertItem(db, testItem).then(actual => {
      expect(actual[0]).to.have.all.keys(
        'id',
        'price',
        'name',
        'date_added',
        'checked',
        'category'
      )
    })
  })

  it('Should delete and item', () => {
    const deleteID = 3;
    return ShoppingService.deleteItem(db, deleteID)
      .then(() => ShoppingService.getAllItems(db))
      .then(allItems => {
        const expected = testItems.filter(item => item.id !== deleteID);
        expect(allItems).to.eql(expected);
      })
  });

  it(`updateArticle() updates an article from the 'blogful_articles' table`, () => {
         const idOfArticleToUpdate = 3
         const newArticleData = {
           name: 'updated name',
           price: "30.00",
           date_added: new Date(),
           category: 'Lunch',
           checked: false
        }
        return ShoppingService.updateItem(db, idOfArticleToUpdate, newArticleData)
           .then(() => ShoppingService.getById(db, idOfArticleToUpdate))
           .then(article => {
             expect(article).to.eql({
               id: idOfArticleToUpdate,
               ...newArticleData,
             })
           })
       })


  after(() => db.destroy())
})
