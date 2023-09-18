const express = require('express');
const path = require('path');

const tableRoutes = require('./routes/table');
const db = require('./utils/database');

const app = express();

app.use(express.urlencoded({extended:false}));
app.use(express.json())

app.use(express.static(path.join(__dirname,'views')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
  });

app.use('/database',tableRoutes)


app.listen(3000)
// db.sync().then(()=>app.listen(3000)).catch(err=>console.log(err))