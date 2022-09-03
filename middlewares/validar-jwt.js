const { response } = require('express');
const jwt = require('jsonwebtoken');
const { usuaiosDelete } = require('../controllers/user.controller');
const Usuario = require('../models/usuarios');

const validarJWT = async(req, res=response, next)=>{
    const token = req.header('x-token');


    if(!token){
        return res.status(401).json({
            msg: 'No hay token en la peticion.'
        });
    }

    try{
        const {uid}=jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        const usuario = await Usuario.findById(uid);

        if(!usuario){
            return res.status(401).json({
                msg: 'token no valido - usuario no existe DB'
            });
        }

        if(!usuario.estado){
            return res.status(401).json({
                msg: 'token no valido - usuario con estado: false'
            });
        }

        req.usuario=usuario;

        next();
    }catch(error){
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        })

    }

    
}

module.exports={
    validarJWT
}