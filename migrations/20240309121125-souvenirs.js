// eslint-disable-next-line @typescript-eslint/no-var-requires
const { faker } = require('@faker-js/faker')

const getRandomArrayValue = (arr) => arr[Math.floor(Math.random() * arr.length)]

const colors = ['purpure', 'yellow', 'orange', 'black', 'white']
const souvenirTypes = ['promotional-souvenirs', 'business-souvenirs']
const images = [
  '/img/souvenirs/promotional-souvenirs-1.png',
  '/img/souvenirs/promotional-souvenirs-2.png',
  '/img/souvenirs/business-souvenirs-1.png',
  '/img/souvenirs/business-souvenirs-2.png',
]
const materials = ['flour salt', 'metal', 'plastic']
const heights = [5, 10, 15, 20]
const weights = [80, 100, 150, 250]

module.exports = {
  async up(db) {
    return db.collection('souvenirs').insertMany(
      [...Array(50)].map(() => {
        const type = getRandomArrayValue(souvenirTypes)

        const characteristics = [
          {
            type: 'promotional-souvenirs',
            color: getRandomArrayValue(colors),
            material: getRandomArrayValue(materials),
            height: getRandomArrayValue(heights),
            weight: getRandomArrayValue(weights),
          },
          {
            type: 'business-souvenirs',
            color: getRandomArrayValue(colors),
            material: getRandomArrayValue(materials),
            height: getRandomArrayValue(heights),
            weight: getRandomArrayValue(weights),
          },
        ]

        return {
          category: 'souvenirs',
          type,
          price: +faker.string.numeric(4).replace(/.{0,2}$/, 99),
          name: faker.lorem.sentence(2),
          description: faker.lorem.sentences(10),
          characteristics: characteristics.find((item) => item.type === type),
          images: images.filter((item) => item.includes(type)),
          vendorCode: faker.string.numeric(4),
          inStock: faker.string.numeric(2),
          isBestseller: faker.datatype.boolean(),
          isNew: faker.datatype.boolean(),
          popularity: +faker.string.numeric(3),
          sizes: {},
        }
      })
    )
  },

  async down(db) {
    return db.collection('souvenirs').updateMany([])
  },
}
