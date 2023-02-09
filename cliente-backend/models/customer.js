const { Sequelize, DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  const customer = sequelize.define(
    'customer',
    {
      // Model attributes are defined here
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        unique: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'first_name'
      },
      lastName: {
        type: DataTypes.STRING,
        field: 'last_name'
      },
      address: {
        type: DataTypes.STRING,
      },
      birthDate: {
        type: DataTypes.DATE,
        allowNull: true,
        xlabel: 'birthDate',
        defaultValue: DataTypes.NOW,
        field: 'birth_date'
      },
      nroDoc: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'nro_doc'
      }
    },
    {
      // Other model options go here
      tableName: 'customer',
      timestamps: false,
    }
  );
  return customer;
};
