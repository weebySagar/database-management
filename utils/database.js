const mysql = require('mysql2');
const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('nodjs_learnin','root','admin',{dialect:'mssql',host:'127.0.0.1',port:5000});

module.exports = sequelize;