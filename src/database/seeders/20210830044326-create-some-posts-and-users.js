'use strict';
const { User } =  require('../models/index');
const bcrypt = require('bcrypt');
const authConfig = require('../../../config/auth');

module.exports = {
  up: async (queryInterface, Sequelize) => {
   return Promise.all([
     User.create({
       name: 'Mariano',
       email: 'mariano@gmail.com',
       password: bcrypt.hashSync('123456789',
        Number.parseInt(authConfig.salt)
       ),
       posts: [
        {
       title: 'title 1',
       body: 'body 1',
     }, 
     { 
       title: 'title 2',
       body: 'body 2',
     },{ 
       title: 'title 3',
       body: 'body 3',
     },
   ],
  }, 
  {
    include: 'posts',
  }   
  ),

  User.create(
    {
    name: 'Esteban',
    email: 'esteban@gmail.com',
    password: bcrypt.hashSync('123456789',
     Number.parseInt(authConfig.salt)
    ),
    posts: [
     {
    title: 'title 4',
    body: 'body 4',
  }, 
  { 
    title: 'title 5',
    body: 'body 5',
  },
],
}, 
{
 include: 'posts',
}   
),

]);
},

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
    queryInterface.bulkDelete('posts', null, {}),
    queryInterface.bulkDelete('users', null, {}),
    ]);
  },
};
