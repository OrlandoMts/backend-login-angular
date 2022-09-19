const { response } = require("express");
const { validationResult } = require("express-validator");

const validarCampos = (req, res = response, next) => {
    /**
     * Devuelve un objeto con las validaciones hechas
     * en el middleware check
     */
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        })
    }

    next(); // Es para continuar al siguiente middleware si la función se ejecuta bien
};

module.exports = {
    validarCampos
}