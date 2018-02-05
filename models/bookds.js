

module.exports = (sequelize, DataTypes) => {
  const BookDs = sequelize.define('BookDs', {
    Author: DataTypes.STRING,
    Name: DataTypes.STRING,
    id: DataTypes.INTEGER,
    rating: DataTypes.FLOAT,
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
      },
    },
  });
  return BookDs;
};
