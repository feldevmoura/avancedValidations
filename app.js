var express = require('express');
var path = require('path')
var app = express();

// view engine setup
app.use(express.static('public'));
var PORT = 4000;
app.listen(PORT, () => console.log('Servidor rodando na porta:' , PORT))

app.use(express.urlencoded({ extended: true }));


app.set('view engine', 'ejs');

const userRoutes = require('./routes/userRoutes');

app.use('/', userRoutes);

module.exports = app;
