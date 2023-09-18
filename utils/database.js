const mysql = require('mysql2');
const {Sequelize} = require('sequelize');

// const sequelize = new Sequelize('nodjs_learning','root','admin',{dialect:'mysql',host:'127.0.0.1',port:'5000',ssl:false});

const pool = mysql.createPool({
    host:'127.0.0.1',
    user:'root',
    database:'database_mangement',
    password:'admin',
    port:5000
})

module.exports = pool.promise();

// module.exports = sequelize