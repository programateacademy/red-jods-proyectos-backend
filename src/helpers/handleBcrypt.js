
/*este archivo me va a ayu dar a hacer referencia a todos esos errores
 que se produzcan en el momento de  de una conexion o un req*/

 //res del express y argumento de error
 const httpError =(res, err) =>{
    console.log(err)
    res.status(500)//STATUS CO0DE
    res.send({error: 'Algo ocurrio'})
  }
  //cuando llame a la funcion me responda un status eje 500
  //enviame un data con el error tipo: Algo ocurrio
  module.exports = {httpError}