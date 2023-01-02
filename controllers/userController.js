const {User}=require('../models/userModel');
const {Query}=require('../models/userModel');
const bcrypt=require('bcrypt');

const securePassword=async(password)=>{
    try{
        const passwordHash=await bcrypt.hash(password, 10);
        return passwordHash;
    }
    catch(error){
        console.log(error.message);
    }
}
//load register

const loadRegister=async(req,res)=>{
    try{
res.render('registration');
    }
    catch(error){
        console.log(error.message);
    }
}
const insertUser= async(req,res)=>{
    try{
        const spassword= await securePassword(req.body.password);
        const user=new User({
                name:req.body.name,
                contact:req.body.contact,
                email:req.body.email,
                pancard:req.body.pancard,
                company_name:req.body.company_name,
                experience:req.body.experience,
                technical_skills:req.body.technical_skills,
                password:spassword,
                statuss:req.body.statuss,
                is_admin:0,
                queries:[],
        }); 
        const userData=await user.save();
        if(userData){
            res.render('registration',{message:"Registration Sucessful"});
        }
        else{
            res.render('registration',{message:"Registration failed"});  
        }
    }   
    catch(error){
        console.log(error.message);
    }
}

//login method
const loginLoad=async(req,res)=>{
    try{
        res.render('login');
    }
    catch(error){console.log(error.message);}
}

//verify Login

const verifyLogin=async(req,res)=>{
   try{
    const email=req.body.email;
    const password=req.body.password;

    userData=await User.findOne({email:email});
    if(userData){
      const passwordMatch=await bcrypt.compare(password,userData.password);
    if(passwordMatch){
        if(userData.statuss==0){res.render('login',{message:"You have not been approved by the admin"});}
        else{
        req.session.user_id=userData._id;
        res.redirect('/home');}
    }
    else{res.render('login',{message:"Email and Password incorrect"});}
    }   
    else{
        res.render('login',{message:"Email and Password incorrect"});
    }  
} 
    catch(error){console.log(error.message);}
}
//Home
const loadHome=async(req,res)=>{
try{
    const user=await User.findById({_id:req.session.user_id});
    res.render('home',{user:userData});
}
    catch(error){console.log(error.message);}
}

//logout function
const userLogout=async(req,res)=>{
    try{req.session.destroy();
        res.redirect('/');}
    catch(err){console.log(err.message);}
}
//Edit function
const editLoad=async(req,res)=>{
    try{
        const id=req.query.id;
        const userData=await User.findById({_id:id});
        if(userData){res.render('edit',{user:userData});}
        else {res.redirect('/home');}
    }
    catch(err){console.log(err.message);}
}
// add query

const addQuery=async(req,res)=>{
    try{  
        const p=req.body.x;
        // console.log(p);
        // console.log(req.body);
        const q=await User.findById({_id:p});
        // console.log(q);
        const newQuery = new Query({
            query_name: req.body.q,
            query_description: req.body.qdescription,
            query_status: 0,
        });
        const x=await newQuery.save();

        const user=await User.findByIdAndUpdate(
            { _id:p },{$push:{queries:newQuery}}
        )
        const q1=await User.findById({_id:p});
        console.log(q1);
       res.redirect('/home');
    }
    catch(error){console.log(error.message);}
}

//Approved questions view
const approvedQuestions=async(req,res)=>{
    try{
        const id=req.query.id;
        const userData=await User.findById({_id:id});
        console.log(userData);
        if(userData){res.render('approved',{user:userData});}
        else {res.redirect('/home');}
    }
    catch(err){console.log(err.message);}
}

module.exports={
    loadRegister,insertUser,
    loginLoad,verifyLogin,loadHome,
    userLogout,editLoad,addQuery,
    approvedQuestions
}