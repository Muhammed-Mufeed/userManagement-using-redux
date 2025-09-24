import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username:{
    type:String,
    required:[true,'Username is required'],
    trim:true,
    minlength:[3,'Username must be atleast 3 characters']
  },
  
  email:{
    type:String,
    required:[true,"Email is required"] ,
    unique:true,
    match: [/^\S+@\S+\.\S+$/, 'Invalid email format'],
  },

  password:{
    type:String,
    required:true,
    minlength:[6,'Min 6 characters']
  },

  profileImage:{
    type:String,
    default:''
  },

  isAdmin:{
    type:Boolean,
    default:false
  }

},{timestamps:true} )


export default userSchema