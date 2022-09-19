const express = require('express')
const cors = require('cors')
const authRoute = require('./routes/auth')
require('dotenv').config();


const app = express();
const port = process.env.PORT;

// Directorio publico
app.use(express.static('public'))

// CORS
app.use( cors() );

// Lectura y parse del body
app.use( express.json() );

//Rutas
app.use( '/api/auth', authRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
