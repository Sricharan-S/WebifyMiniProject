const router = require('express').Router();

const noprofile = function(req,res,next){
  if(!req.user){
    res.redirect('/');
  }
  else{
    next();
  }
}

router.get('/',(req,res) =>{
  res.render('profile',{user:req.user});
})
router.get("/logout",(req,res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
