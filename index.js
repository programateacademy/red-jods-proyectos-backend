require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const { dbConnect } = require('./config/mongo');
// const todoRoutes = require("./src/V1/routes");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000;
const {swaggerDoc :V1swaggerDoc}=require('./src/docs/swagger')
app.use(cors())
app.use(express.json())
//para que en las pruebas con postman no me salga error 500
//V1swaggerDoc(app,PORT);
app.use("/Api/v1", todoRoutes );

//middleware (prefijo)api va a ser la base de todas mis rutas
 app.use('./src/V1/routes/user.js', userRoute); 

dbConnect();

app.listen(PORT, () => {
    console.log('API lista por el puerto ', PORT);

})