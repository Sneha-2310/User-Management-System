const mongoose=require("mongoose");

const querySchema=new mongoose.Schema({
    query_name:{
        type:String,
        required:true
    },
    query_description:{
        type:String,
        required:true
    },
    query_status:{
        type:Number,
        required:true
    },
})

const userSchema=new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    contact:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    pancard:{
        type:String,
        required:true
    },
    company_name:{
        type:String,
        required:true
    },
    experience:{
        type:Number,
        required:true
    },
    technical_skills:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    statuss:{
        type:Number,
        default:0
    },
    is_admin:{
        type:Number,
        required:true
    },
    queries:{
        type:[querySchema],
        default:[]
    },
});

const User = mongoose.model('User',userSchema)
const Query = mongoose.model('Query',querySchema)
module.exports = {
    User: User,
    Query: Query
}