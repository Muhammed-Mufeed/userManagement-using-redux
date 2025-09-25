import User from '../models/User.js'
import bcrypt from 'bcrypt'
import { generateToken } from '../utils/jwt.js'


export const register = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body

    if (!username || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" })
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" })
    }
    
    //validating password before hashing, otherwise mongose can't catch this error(because of hashed password)
    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }


    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: "User with this name already exists" })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({   // this is an same way of writing,   
      username,                        // const user = new User({username,email,password: hashedPassword})
      email,                           // await user.save
      password: hashedPassword
    })                                    
    res.status(201).json({ message:"User registered successfully"})
  } catch (error) {
    console.error('Register error:', error);
    if(error.name === 'ValidationError'){
      return res.status(400).json({message: error.message})
    }
    res.status(500).json({message:"Server error"})
  }
}


export const login = async (req,res) => {
  try {
    const {email,password} = req.body

    const user =  await User.findOne({email})

    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token =  generateToken(user)

    res.status(200).json({
      message:"Login successful" , 
      user:{
        _id:user._id,
        username:user.username,
        email:user.email,
        profileImage:user.profileImage
      },
      token

    })

  } catch (error) {
     if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: 'Server error' });
  }
}