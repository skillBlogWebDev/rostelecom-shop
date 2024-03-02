module.exports = {
  async up(db) {
    db.createCollection('favorites')
  },

  async down(db) {
    db.collection('favorites').drop()
  },
}
