const mongoose = require('mongoose')

const flightBookingModel = new mongoose.Schema(
    {
        airlines:{
            type:String,
            required:true
        },
        from:{
            type:String,
            required:true
        },
        to:{
            type:String,
            required:true
        },
        fare:{
            type:Number,
            required:true
        },
        depart:{
            type:String,
            required:true
        },
        arrive:{
            type:String,
            required:true
        }
    }
)


const flightModal = mongoose.model("flight",flightBookingModel)

module.exports = flightModal;