const {response, json} = require('express');
const Usuario = require('../models/usuarios')
const bcrypts = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');

const login = async(req, res=response)=>{

    const {correo, password}=req.body;

    try{

        //Verificar si el email existe
        const usuario = await Usuario.findOne({correo});

        if(!usuario){
            return res.status(400).json({
                msg: 'Usuario/Pasword noson correctos - correo'
            })
        }

        //si el usuario esta activo 
        if(!usuario.estado){
            return res.status(400).json({
                msg: 'Usuario/Pasword noson correctos - estado: false'
            })
        }

        //verificar la contraseña
        const validPassword = bcrypts.compareSync(password, usuario.password);
        if(!validPassword){
            return res.status(400).json({
                msg: 'usuario / password no son correctos.'
        });
        }

        //generar el JWT
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        })

    }catch (error){

      console.log(error);  
      return res.status(500).json({
        msg: 'Hable con el administrador'
      })
    }

}

const googleSignIn = async(req, res = response)=>{
    const {id_token} = req.body

    try{

        const {correo, img, nombre} = await googleVerify(id_token);
        
        //referencia que verifica si el correo existe en la bd
        let usuario = await Usuario.findOne({correo});

        if(!usuario){
            //se crea si no existe
            const data={
                nombre,
                correo,
                password: ':P',
                rol: "USER_ROLE",
                img,
                google: true
            };

            usuario = new Usuario( data );
            await usuario.save();
        }

        //si el usuario en DB tiene estado en false
        if(!usuario.estado){
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado'
            });
        }

        //generar el JWT
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        });

    } catch(error){
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'El token no se pudo verificar'
        })
    }

}


module.exports={
    login,
    googleSignIn
}