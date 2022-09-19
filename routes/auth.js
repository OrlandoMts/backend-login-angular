const { Router } = require('express');
const { check } = require('express-validator');
const { createUser, login, renewToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validate-fields');
  
    
const router = Router();

router.post('/new', [
    check('name', 'Nombre obligatorio').not().isEmpty(),
    check('email', 'El email es necesario').isEmail(),
    check('password', 'La contraseña es obligatoria').isLength({min:6}),
    validarCampos
], createUser);

// El segundo argumento recibe middlewares que son ejecutados
// antes de llegar al controlador
router.post('/', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').isLength({min: 6}),
    validarCampos
], login);

// Validar token y revalidar
router.get('/renew', renewToken);


module.exports = router;