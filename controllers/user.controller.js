const {response, request} = require('express');
const Usuario = require('../models/usuarios')
const bcrypt = require('bcryptjs'); //npm i bcryptjs - paquete para encriptar.


const usuaiosGet = (req = request, res = response) => {

    const {q, nombre = "No name"} = req.query;//query pàrams

    res.json({
        msg: 'get API - controlador',
        q,
        nombre
    })
}

const usuaiosPut =async(req, res) => { 

    const id = req.params.id;
    const {_id, password, google,correo, ...resto} = req.body;

    //to do validar contra base de datos
    if(password){
        const salt = bcrypt.genSaltSync();
        resto.password=bcrypt.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        msg: 'put API - controlador',
        usuario
    })
}

const usuaiosPost = async(req, res) => {

    const {nombre, correo, password, rol}=req.body;// solo se sacan los datos necesesarios.
    //const {google, ... body}= req.body; PCon esto se sacan todos los datos menos el dato google para no estar llamando uno por uno.
    const usuario = new Usuario({nombre, correo, password, rol});

    //Encriptar la contraseña
    const salt = bcrypt.genSaltSync();//numero de vueltas para hacer mas comlicado la encriptacion. Entre mas vueltas mas seguro pero lleva mastiempo. El 10 es el valor por defecto.
    usuario.password=bcrypt.hashSync(password, salt);//El hash es para encriptarlo. El salt es el numero de vueltas en la encriptacion.
    
    //Guardar en BD
    await usuario.save();

    res.json({
        msg: 'post API - controlador',
        usuario
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