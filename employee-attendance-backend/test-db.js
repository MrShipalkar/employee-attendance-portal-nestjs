const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  'attendance_db',
  'postgres',
  'Pass@1122',
  {
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres',
    logging: console.log,
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log('✅ Database Connected Successfully');
  })
  .catch((err) => {
    console.error('❌ Connection Failed');
    console.error(err);
  });