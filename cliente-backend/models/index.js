const { Sequelize } = require('sequelize');
const customer = require('./customer.js')
const sequelize = new Sequelize(process.env.DATABASE,
  process.env.USER_DB, process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: 'postgres',
    underscored: true,
    logging: function(obj) {
      console.log(obj);
    },
  });
  const db = {};

  try {
    db['customer'] = customer(sequelize);
    db.Sequelize = Sequelize;
    db.sequelize = sequelize;
    // await sequelize.authenticate();
  } catch (err) {
    console.error('Unable to connect', err)
  }
module.exports = db;

