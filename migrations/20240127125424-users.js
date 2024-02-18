module.exports = {
  async up(db) {
    db.createCollection('users')
  },

  async down(db) {
    db.collection('users').drop()
  },
}
