const mongoose = require('mongoose');

const dbConnect =() =>{
    const MONGO_URI= process.env.MONGO_URI;
    mongoose.set("strictQuery", false);
    mongoose.connect(MONGO_URI,{
      useNewUrlParser:true,
      useUnifiedTopology:true
    },(err)=>{
      if(!err){
        console.log("*** Conectado***")
      }else{
        console.log("*** Error de Conexion ***")
      }
    })
}
module.exports={
  dbConnect
}

