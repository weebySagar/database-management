const Sequelize = require('sequelize');
const db = require('../utils/database');

// const Table= db.define('database',{
//     id:{
//         type:Sequelize.INTEGER,
//         allowNull:false,
//         autoIncrement:true,
//         primaryKey:true
//     },
//     tableName:{
//         type:Sequelize.STRING,
//         allowNull:false,

//     },
//     columns:{
//         type:Sequelize.JSON,
//         allowNull:false
//     }
// });

// module.exports = Table;

module.exports = class Table{

    static createTable(tableName,columns){
        columns.unshift({columnName:'id',columnType:'INT AUTO_INCREMENT PRIMARY KEY NOT NULL'})
        let query= `CREATE TABLE ${tableName} (`;
        query+= columns.map(column=> `${column.columnName} ${column.columnType}`).join(', ');
        query+=')';

         return db.execute(query);

    }

    static addRecord(tableName,record){
        const columns = record.map(rec=> rec.columnName);
        const values = record.map(rec=>rec.value);

        const query = `INSERT INTO ${tableName} (${columns.join(', ')}) VALUES (${values.map(()=>'?').join(', ')})`

        return db.execute(query,values);
    }

    static getAllTables(){
       return db.execute('SHOW TABLES')
    
    }

    static getTableData(tableName){
        return db.execute(`SELECT * FROM ${tableName}`);
     
    }

    static deleteRecord(tableName,id){
        return db.execute(`DELETE FROM ${tableName} WHERE id=${id}`);
    }

    static dropTable(tableName){
        return db.execute(`DROP TABLE ${tableName}`)
    }

}