const route = require('express').Router();
const passport = require('passport');

route.get('/login',(req,res) => {
  res.render('login',{user:req.user});
});

route.get('/google',passport.authenticate('google',{
  scope:['profile']
}));

route.get('/google/redirect',passport.authenticate('google'),function(req,res){
 res.redirect('/profile/');
});

route.get("/logout",(req,res) => {
  req.logout();
  res.redirect('/');
});

route.get("/facebook",passport.authenticate('facebook',{
  scope:['public_profile']
}))


route.get("/facebook/redirect",passport.authenticate('facebook'),function(req,res){
 res.redirect('/profile/');
})

module.exports = route;
