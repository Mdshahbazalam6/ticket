const express = require('express')
const flightModal = require('../Database/flight')
const route = express.Router()
const bodyParser = require('body-parser')
let jsonParser = bodyParser.json()
async function getFlights ( req,res ){
    try {
        let data = await flightModal.find()
        res.status(200).send({
            data
        })
    } catch (error) {
        console.log(error)
    }
} 
async function search ( req,res ){
    const postbody = req.body.postbody
    console.log(postbody)
    const {from,to}=postbody
    console.log(from,to)
    try {
        let data = await flightModal.find({$and :[{from:from},{to:to}]})
        res.status(200).send({
            data
        })
    } catch (error) {
        console.log(error)
    }
} 

route.get('/allflights',getFlights)
route.post('/searchflight',jsonParser,search)

module.exports = route