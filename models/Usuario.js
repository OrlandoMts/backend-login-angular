const { Schema, model } = require("mongoose");

const UsuarioSchema = Schema({
    name: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    address: {
        type: String,
    },
    city: {
        type: String
    }, 
    country: {
        type: String
    },
    postalCode: {
        type: Number
    },
    about: {
        type: String
    }
});

module.exports = model('Usuario', UsuarioSchema);