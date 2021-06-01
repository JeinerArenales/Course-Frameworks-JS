'use strict'

var contoller = {

    datosCurso: ( req, res ) => {
        return res.status(200).send(
            {
                course: "master en Frameworks",
                autor: "Jeiner Arenales"
            }
        )
    },
    test:( req, res ) => {
        return res.status(200).send({
            message: "Accion Test"
        })
    }
    
}

module.exports = contoller;