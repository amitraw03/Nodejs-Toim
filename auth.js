//setup passposrt with a local authentication strategy , using a Person model for use

const passport =require('passport');
const LocalStrategy = require('passport-local').Strategy;  //username and pass based authentication
const Person = require('./models/PersonDet');



passport.use(new LocalStrategy(async (USERNAME ,password ,done) =>{
    //authentication logic here
      try{
        // console.log('Received credentials:',USERNAME, password);  
        const user =await Person.findOne({username : USERNAME});
        if(!user)
            return done(null,false,{message :'Incorrect username.'});
        
        const isPassMatch= user.password===password ? true : false;
        if(isPassMatch){
           return done(null,user);
        }
        else return done(null , false ,{message : 'Incorrect Password'});
      }
      catch(err){
          return done(err);
      }
  }));

  module.exports= passport;  //export configured passport