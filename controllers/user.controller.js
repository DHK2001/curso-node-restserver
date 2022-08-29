const {response} = require('express');

const usuaiosGet = (req, res = response) => {

    const {q, nombre = "No name"} = req.query;//query pàrams

    res.json({
        msg: 'get API - controlador',
        q,
        nombre
    })
}

const usuaiosPut =(req, res) => { 

    const id = req.params.id;

    res.json({
        msg: 'put API - controlador',
        id
    })
}

const usuaiosPost = (req, res) => {
    
    const {nombre, edad}=req.body;

    res.json({
        msg: 'post API - controlador',
        nombre, 
        edad
    })
}

const usuaiosDelete = (req, res) => {
    res.json({
        msg: 'delete API - controlador'
    })
}

const usuaiosPatch = (req, res) => {
    res.json({
        msg: 'patch API - controlador'
    })
}

module.exports={
    usuaiosGet,
    usuaiosPut,
    usuaiosPost,
    usuaiosDelete,
    usuaiosPatch
}