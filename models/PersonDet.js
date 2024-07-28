
const mongoose =require('mongoose');
const bcrypt= require('bcrypt');

//Create a Person Schema
const personSchema= new mongoose.Schema({
    name:{
       type:String,
       required:true
    },
    age:{
        type:Number,
     },
     work:{
        type:String,
        enum:['chef','waiter','manager'],
        required:true
     },
     mobile:{
        type:Number,
        required:true
     },
     email:{
        type:String,
        unique:true,
        required:true
     },
     address:{
        type:String,
     },
     salary:{
        type:Number,
        required:true
     },
     username:{
      type: String,
      required:true
     },
     password:{
      type: String,
      required:true
     }

});

personSchema.pre('save', async function(next){
   const person =this;

   //hash the pass only if it has been modified or it is new
   if(!person.isModified('password')) return next();

   try{
      //hash password generation
      const salt = await bcrypt.genSalt(10);
      //hash password
      const hashedPassword = await bcrypt.hash(person.password , salt);
      //Override plain password with the hashed one
      person.password = hashedPassword;

      next();
   }
   catch(err){
      return next(err);
   }
})

personSchema.methods.comparePassword = async function(candidatePassword){
   try{
      //use bcrypt to compare provided pass with hashed pass
      const isMatch = await bcrypt.compare(candidatePassword , this.password);
      return isMatch;
   }
   catch(err){
      throw err;
   }
}



// Create Person Model
const Person=mongoose.model('Person',personSchema);
module.exports=Person;