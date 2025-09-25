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
    required:[true, 'Password is required'],
    minlength:[6,' Password must be at least 6 characters characters']
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


export default mongoose.model('User',userSchema)