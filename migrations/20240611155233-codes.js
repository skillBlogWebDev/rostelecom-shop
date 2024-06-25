module.exports = {
  async up(db) {
    db.createCollection('codes')
  },

  async down(db) {
    db.collection('codes').drop()
  },
}
