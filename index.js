const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/productspug');
let db = mongoose.connection;

// Check connection
db.once('open', ()=>{
    console.log('Connected to MongoDB');
});

// Check for DB errors
db.on('error', (err)=>{
    console.log(err);
});

// Init App
const app = express();

// Load View Engine
app.set('vista', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Home Route
app.get('/', (req, res)=>{
    //res.send('Hello world');
    res.render('index', {
        title:'Bienvenido'
    });
});

app.get('/products', (req, res)=>{
    let products = [
        {
            id:1,
            title:'Producto 1',
            description: 'producto 1 prueba contenido'
        },
        {
            id:2,
            title:'Producto 2',
            description: 'producto 2 prueba contenido'
        },
        {
            id:3,
            title:'Producto 3',
            description: 'producto 3 prueba contenido'
        }
    ];
    res.render('add', {
        title:'Add Products',
        products: products
    });
});

app.listen(4000, ()=>{
    console.log('server running on port 4000');
});