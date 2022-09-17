const express = require('express')
const cors = require('cors')
const authRoute = require('./routes/auth')


const app = express();
const port = 3000;

// CORS
app.use( cors() );

// Lectura y parse del body
app.use( express.json() );

//Rutas
app.use( '/api/auth', authRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
