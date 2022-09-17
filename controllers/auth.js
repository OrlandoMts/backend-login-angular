const { response } = require('express');

const createUser = (req, res = response) => {

    console.log(req.body);
    
    return res.json({
        ok: true,
        msg: 'Crear usuario'
    });
};

const login = (req, res) => {
    console.log(req.body);
    return res.json({
        ok: true,
        msg: 'Login usuario'
    });
};

const renewToken = (req, res) => {
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