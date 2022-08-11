const express = require ("express")
const cores = require("cors")
const app = express()
const connectToDatabase = require('./Database/index')
const flightroute = require('./router/flightroute')
const userRoute = require('./router/user')

app.use(cores())
app.use(express())
// app.get('/',(req,res)=>{
//     res.status(200).send({
//         message:"Hello world"
//     })
// })

app.use(flightroute)
app.use(userRoute)

connectToDatabase().then(()=>{
    app.listen(8080,(()=>{
        console.log("port is 8080")
    }))
})

// https://github.com/pranavk22/case-study