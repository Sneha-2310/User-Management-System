const express=require("express");

const admin_route=express();
const session=require("express-session");
const config=require("../config/config");
admin_route.use(session({secret:config.sessionSecret}));


admin_route.set('view engine','ejs');
admin_route.set('views','./views/admin');

const auth=require("../middleware/adminAuth");

const bodyParser=require('body-parser');
admin_route.use(bodyParser.json());
admin_route.use(bodyParser.urlencoded({extended:true}));

const adminController=require("../controllers/adminController");

admin_route.get('/',auth.isLogout,adminController.loginLoad);

admin_route.get('/home',auth.isLogin,adminController.loadDashboard);


admin_route.post('/',adminController.verifyLogin);


admin_route.get('/logout',auth.isLogin,adminController.logout);

admin_route.get('/dashboard',auth.isLogin,adminController.adminDashboard);

admin_route.get('/edit-user',auth.isLogin,adminController.editUser);
admin_route.post('/edit-user',auth.isLogin,adminController.updateUsers);

admin_route.get('/queries', auth.isLogin, adminController.loadQueries)

admin_route.get('/edit-query',auth.isLogin,adminController.editQuery);
admin_route.post('/edit-query',auth.isLogin,adminController.updateQuery);

admin_route.get('*',function(req,res){
    res.redirect('/admin');
})
module.exports=admin_route;