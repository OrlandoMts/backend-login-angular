const { response, json } = require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const {generarJWT} = require('../helpers/jwt');

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

        // Generar JWT
        const token = await generarJWT(usuario.id, usuario.name)

        // Guardar usuario en la bd
        await usuario.save();

        // Generar respuesta exitosa
        return res.status(201).json({
            ok: true,
            uid: usuario.id,
            name,
            token
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Contactar al administrador'
        });
    }

    
};

const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        // Existe el usuario con ese correo?
        const userDB = await Usuario.findOne({email});
        if( !userDB ) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo o la contraseña son invalidos'
            })
        }

        // La contraseña es correcta?
        const isAuthenticate = bcrypt.compareSync( password, userDB.password);
        if ( !isAuthenticate ) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo o la contraseña son invalidos'
            })
        }
        // Generar el JWT
        const token = await generarJWT(userDB.id, userDB.name);

        // Respuesta exitosa
        return res.json({
            ok: true,
            user: userDB,
            // uid: userDB.id,
            // name: userDB.name,
            // lastName: userDB.lastName,
            // email: userDB.email,
            token,
            msg: 'Bienvenido'
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Contacte al admnistrador'
        })
    }
};

const renewToken = async (req, res = response) => {
    
    const {name, uid} = req;
    const userDB = await Usuario.findById(uid);
    //Genera un nuevo token con los datos obtenidos del middleware
    const token = await generarJWT(uid, name); 

    return res.json({
        ok: true,
        msg: 'Token renovado',
        user: userDB,
        // name,
        uid, // Creo que ni lo ocupo
        token
    });
};

const searchUser =  async (req, res = response) => {
    const { uid } = req;
    const userDB = await Usuario.findById(uid);

    return res.json({
        ok: true,
        msg: 'Usuario encontrado',
        user: userDB
    });
};

const updateAccount = async (req, res = response) => {
    const { uid } = req;

    try {

        await Usuario.findByIdAndUpdate(uid, req.body, {new: true});
        res.status(200).json({
            ok: true,
            msg: 'modificado...'
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Contactar al administrador'
        });
    }
    
}

module.exports = {
    createUser,
    login,
    renewToken,
    updateAccount,
    searchUser
} 