module.exports = {
  async up(db) {
    db.createCollection('cart')
  },

  async down(db) {
    db.collection('cart').drop()
  },
}
