const { mongoose } = require("mongoose");

const dbConnection = async() => {
    try {

        await mongoose.connect(process.env.DB_MONGO);

        console.log('DB connection success')


    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de inicializar la Base de Datos')
    }
};

module.exports = {
    dbConnection
}