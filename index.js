const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

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

// Middlewares
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Bring in Models
let ProductsModel = require('./models/productsModel');

// set Public Folder
app.use(express.static(path.join(__dirname, 'public')));

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

    ProductsModel.find({},(err, products)=>{
        if(err) 
        {
            console.log(err)
        }
        else
        {
            res.render('add', {
                title:'Productos',
                products: products
            })
        }
       
    });
});

//Get single product
app.get('/products/:id', (req, res)=>{
   ProductsModel.findById(req.params.id, (err, product)=>{
        res.render('product', {
        product: product
        });
   });
});


//Get single product
app.get('/products/edit/:id', (req, res)=>{
    ProductsModel.findById(req.params.id, (err, product)=>{
            res.render('edit_product', {
            title: 'Edit Product',
            product: product
         });
    });
 });

app.post('/products/add', (req, res)=>{
    console.log('POST /api');
    console.log(req.body);
    console.log('Enviado');

    // const {name, price, category, image} = req.body;
    // let product = {
    //     name,
    //     price,
    //     category,
    //     image
    // };
    let product = new ProductsModel();

    product.name = req.body.name
    product.price = req.body.price
    product.category = req.body.category
    product.image = req.body.image 

    product.save((err, data )=>{
        if(err) res.status(500).send({ message: `Error al guardar el producto ${err}`})
        res.redirect('/products');
    });
});

// Update
app.post('/products/edit/:id', (req, res)=>{
  
    let product = {};

    product.name = req.body.name
    product.price = req.body.price
    product.category = req.body.category
    product.image = req.body.image 

    let query = {_id:req.params.id}

    ProductsModel.update(query, product, (err)=>{
        if(err) console.log(err)
        res.redirect('/products');
    });
});

app.listen(4000, ()=>{
    console.log('server running on port 4000');
});