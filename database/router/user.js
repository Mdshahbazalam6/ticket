const express = require("express")
const userModel = require("../Database/User")
const route = express.Router();
const bodyParser = require('body-parser')
const jwt = require("jsonwebtoken")
const SECRET = require("../Constant/index")

let jsonParser = bodyParser.json()

async function createUser(req, res) {
    let userBody = req.body.postbody
    console.log(userBody)

    let existingUser = await userModel.findOne({
        email: userBody.email
    })
    console.log(existingUser)
    if (existingUser) {
        return res.status(500).send({
            message: "Bad Request User already exists"
        })
    }
    let data = await userModel.create(userBody)
    console.log(data)
    return res.status(200).send({
        data,
    })
}


async function loginUser ( req,res ){
    let userbody = req.body.postbody
    let { email,password } = userbody 
    let existingUser = await userModel.findOne({
        email:email
    },{
        password: 1,
        _id: 1,
        email: 1,
        name: 1,
        booked:1
    })

    if(existingUser){
        if(existingUser.password == password){
        let encrypted_Token = jwt.sign({
            id:existingUser._id,
            email:existingUser.email,
            name:existingUser.name,
            booked:existingUser.booked
        },SECRET)
        return res.send({
            data:{
                token:encrypted_Token
                
            },
           
        })
        }else{
            error:"Password Does not match"
        }

       
    }else{
        return res.status(404).send({
            error:"User was not found "
        })
    }
}
async function getLoggedinUser ( req,res ){
    
    let {token} = req.body
    if(token){
        try {
            let data = jwt.verify(token,SECRET)
            console.log(data)
            return res.status(200).send({
                data,
            })

        } catch (error) {
            return res.status(404).send({
                error:"token not Provided"
            })
        }
    }
}

async function Booknow(req, res) {
    let userBody = req.body.postbody
    let existingUser = await userModel.findOne({
        email: userBody.email
    })
    existingUser.booked.push(userBody.Item)

    await existingUser.save()
    return res.status(200).send({
        data:existingUser,
    })
}



route.post('/posts', jsonParser, createUser)
route.post('/book', jsonParser, Booknow)
route.post('/login', jsonParser, loginUser)
route.post('/loogedinuser',jsonParser,getLoggedinUser)

module.exports = route