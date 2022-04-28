const jwt = require('jsonwebtoken')
  //bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjIwMmQyOTZhZjVlNWIwMjc0NGRiYmIiLCJuYW1lIjoicG9pbyIsImVtYWlsIjoicG9pb0BnbWFpbC5jb20iLCJpYXQiOjE2NDY3MDA5OTJ9.3QTXyTerG6d_83eJKpcK4nevHidErMLVk8RZqH9s5d4
function auth(req,res,next){
    let jwtToken = req.header('Authorization')//contiene las credenciales para autenticar a un usuario con un servidor
    if(!jwtToken) return res.status(401).send('Acceso Denegado, No hay token')
    jwtToken = jwtToken.split(' ')[1]


    try {
     const payload = jwt.verify(jwtToken,"secretKey");
     req.user = payload
     next()
    } catch (e) {
        res.status(400).send("Acceso Denegado. Token no valido")
    }

}

module.exports = auth;