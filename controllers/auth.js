const { response, json } = require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');

const createUser = async (req, res = response) => {

    const {name, email, password} = req.body

    try {
        // Verificar email
        let usuario = await Usuario.findOne({email: email});
        if(usuario){
            return res.status(400).json({
                ok: false,
                msg: 'El usuario ya existe con ese email'
            });
        }

        //Crear usuario con el modelo
        usuario = new Usuario( req.body );

        // Hash de la contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        // Guardar usuario en la bd
        await usuario.save();

        // Generar respuesta exitosa
        return res.status(201).json({
            ok: true,
            uid: usuario.id,
            name
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Contactar al administrador'
        });
    }

    
};

const login = (req, res = response) => {
  
    return res.json({
        ok: true,
        msg: 'Login usuario'
    });
};

const renewToken = (req, res = response) => {
    return res.json({
        ok: true,
        msg: 'Renew'
    });
};


module.exports = {
    createUser,
    login,
    renewToken
}