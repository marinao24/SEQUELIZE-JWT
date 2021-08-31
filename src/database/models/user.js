'use strict';
const { Model} = require('sequelize');
const { username } = require('../../../config/database');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Post, { as: 'posts', foreignKey:'userId' });
      User.belongsToMany(models.Role, { 
        as: 'roles',
        through:'user-role', 
        foreignKey: 'userId',
      });
    }
}
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: {
          msg: 'El nombre solo puede contener letras',
        },
        len: {
          args: [2,50],
          msg: 'El nombre debe tener entre 2 y 50 caracteres',
        },
      },
    },
    password:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [9,255],
          msg: 'La contraseña debe tener entre 9 y 255 caracteres'
        },
      },
    },  
    email:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          msg: 'El mail tiene que ser un correo válido'
        },
      },
    },
  },
  {
    sequelize,
    modelName: 'User',
  }  
);
User.isAdmin = function (roles) {
  let auxRoles = [];
  roles.forEach((role) => {
    auxRoles.push(role.name);
  });
  return auxRoles.includes('admin');
};
  return User;
};