module.exports = {
  async up(db) {
    db.createCollection('comparison')
  },

  async down(db) {
    db.collection('comparison').drop()
  },
}
