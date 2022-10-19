const Contenedor = require('./contenedor');
const express = require('express')
require('dotenv').config()


const app = express();

let nameArchivo = ('productos.txt');
const c = new Contenedor(nameArchivo);

app.get('/',(_req,res) =>{
    c.getAll();
    
    res.status(202).send('<h1>Hola mundo</h1>');
})

app.get('/productos',(_req, res) =>{
    const prod = c.getAll();
    const nom = prod.map(i => (i.title))
    const msm = `Los productos son ${nom}`
    res.status(202).send(msm);
})

app.get('/productosRandom',(_req, res) =>{
    const prod = c.getAll();
    const rango = Math.floor(Math.random()*prod.length);
    const valor = prod[rango];
    const msm = `El producto seleccionado es ${JSON.stringify(valor)}`
    res.status(202).send(msm);
})

const port = process.env.PORT

app.listen(port, ()=>{
    console.log(`Server listening on ${port}`);
})
