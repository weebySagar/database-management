const Sequelize = require('sequelize');
const db = require('../utils/database');

const Table= db.define('Table',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    tableName:{
        type:Sequelize.STRING,
        allowNull:false,

    }
})