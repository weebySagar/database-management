const Table = require("../models/table");
const db = require("../utils/database");
const Sequelize = require("sequelize");

exports.createTable = async (req, res) => {
  const { tableName, columns } = req.body;

  try {
    // const table= await Table.create({tableName,columns});

    // for(const column of columns){
    //     const{columnName, columnType} = column;
    //     // await db.query(`ALTER TABLE ${tableName} ADD COLUMN ${columnName} ${Sequelize[columnType]}`)
    // }
    // await Table.createTable(tableName,columns);
    await Table.createTable(tableName, columns);
    const result = await Table.getAllTables();
    res.json(result[0])
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addRecord = async (req, res) => {
  try {
    const { tableName, record } = req.body;
    await Table.addRecord(tableName, record);
    const result =await Table.getTableData(tableName);
    const columns=[];
    const data = result[1];
    for(let val of data){
      columns.push(val.name)
    }
   
    res.json({tableName,tableData:result[0],columns})
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getAllTables= async(req,res)=>{
  try {
    // Table.getAllTables().then((tables)=>res.json({tables})).catch(err=>res.json({error:err.message}))
    const tables = await Table.getAllTables().then(tables=>tables[0]);
   
    res.json(tables)
    // .then(table=>table.map(t=>res.json(t['Tables_in_database_mangement'])));
  } catch (error) {
    res.status(500).json({error:error.message})
  }
}

exports.getTableData=async(req,res)=>{
  try {
    const {tableName}= req.params;
    const result =await Table.getTableData(tableName);
    const columns=[];
    const data = result[1];
    for(let val of data){
      columns.push(val.name)
    }
   
    res.json({tableName,tableData:result[0],columns})
  } catch (error) {
    console.log(error);
  }
}

exports.deleteRecord = async(req,res)=>{
  try {
    const {tableName,id} = req.body;
    await Table.deleteRecord(tableName,id);
    const result =await Table.getTableData(tableName);
   
    const columns=[];
    const data = result[1];
    for(let val of data){
      columns.push(val.name)
    }
   
    res.json({tableName,tableData:result[0],columns})
  } catch (error) {
    console.log(error);
  }
}

exports.dropTable=async(req,res)=>{
  const {tableName} = req.params;
  try {
     await Table.dropTable(tableName);
     const result = await Table.getAllTables();
     res.json(result[0])
  } catch (error) {
    
  }
}