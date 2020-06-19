const express = require('express');
const path = require('path');

// Init App
const app = express();

// Load View Engine
app.set('vista', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/', (req, res)=>{
    //res.send('Hello world');
    res.render('index');
});

app.listen(4000, ()=>{
    console.log('server running on port 4000');
});