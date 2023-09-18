const express = require('express');

const router = express.Router();
const tableController = require('../controllers/table')


router.post('/createTable',tableController.createTable);

router.post('/addRecord',tableController.addRecord);

router.get('/getAllTables',tableController.getAllTables)

router.get('/getTableData/:tableName',tableController.getTableData)

router.post('/deleteRecord',tableController.deleteRecord);

router.post('/dropTable/:tableName',tableController.dropTable)

module.exports = router;