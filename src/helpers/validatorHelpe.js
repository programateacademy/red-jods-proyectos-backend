const {validateResult} =require('express-validator');

const validateResulto = (req , res , next ) =>{
  try{

    validateResult(req).throw();
    return next();

  }catch(err){
    res.status(403);

    res.send({errors: err.array()});
  }
}
module.exports={validateResulto}
