var express = require('express');
var authRoutes = require('./routes/auth-routes');
var profileRoutes = require('./routes/profile-routes')
var passportSetup = require('./config/passport-setup');
var mongoose = require('mongoose');
var keys = require('./config/keys');
var passport = require('passport');
var cookieSession = require('cookie-session');
var app = express();


app.set("view engine","ejs");

app.use('/styles',express.static(__dirname + '/styles'));

app.use(cookieSession({
  maxAge: 24*60*60*1000,
  keys:[keys.session.cookieKey]
}))
//intialize passport

app.use(passport.initialize());
app.use(passport.session());

//set routes
app.use("/auth",authRoutes);
app.use("/profile",profileRoutes);
//mongodb connect
 mongoose.connect(keys.mongodb.dbURI,() => {
   console.log('db connected.');
 });


//create home route
app.get("/",(req,res) =>{
   res.render('home', {user:req.user});
})

app.listen(4000,() =>{
  console.log("listening to port 4000");
});
