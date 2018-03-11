var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20');
var FacebookStrategy = require('passport-facebook');
const keys = require('./keys.js');
const User = require('../models/user-model');

passport.serializeUser(function(user,done){
  done(null,user.id); //puts the id in req.session.passport.user = {id:'...'}
})

passport.deserializeUser(function(id,done){
  User.findById(id).then(function(user){
    done(null,user);
  })
})

passport.use(
  new GoogleStrategy({
//options
  callbackURL:'/auth/google/redirect',
  clientID:keys.google.clientID,
  clientSecret:keys.google.clientSecret
},(accessToken,refreshToken,profile,done) =>{
  console.log(profile);
  User.findOne({googleID:profile.id}).then(function(currentUser){
    if(currentUser){
      console.log('CurrentUser:'+currentUser);
      done(null,currentUser);
    }
    else{
      new User({
        userName:profile.displayName,
        googleID:profile.id,
        image:profile._json.image.url
      }).save().then((newUser) =>{
        console.log('user saved:'+ newUser );
        done(null,newUser);
      })
    }
  });


}))
