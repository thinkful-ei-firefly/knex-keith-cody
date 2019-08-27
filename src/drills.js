require('dotenv').config()
const { knexInstance } = require('./practice.js')

function getItemByName(searchTerm) {
  knexInstance
    .from('shopping_list')
    .select('*')
    .where('name', 'ILIKE', `%${searchTerm}%`)
    .then(data => console.log(data))
}

function pageNumber(page) {
  const itemsPerPage = 6
  const offset = itemsPerPage * (page - 1)

  knexInstance
    .from('shopping_list')
    .limit(itemsPerPage)
    .offset(offset)
    .then(data => {
      console.log(data)
    })
}

function daysAgo(days) {
  knexInstance
    .from('shopping_list')
    .select('*')
    .where(
      'date_added',
      '>',
      knexInstance.raw(`now() - '?? days'::interval`, days)
    )
    .then(data => console.log(data))
}

function totalCostByCat() {
  knexInstance
    .from('shopping_list')
    .select('category')
    .groupBy('category')
    .sum('price as total')
    .then(data => console.log(data))
}

// getItemByName('sal')
// pageNumber(2)
// daysAgo(5)
totalCostByCat()
