const { response, json } = require('express');
const createUser = (req, res = response) => {

    return res.json({
        ok: true,
        msg: 'Crear usuario'
    });
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