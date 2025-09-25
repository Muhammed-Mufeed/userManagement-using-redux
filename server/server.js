import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js'

dotenv.config()
connectDB()
const app = express()

app.use(cors())
app.use(express.json())


app.use('/api',userRoutes)


// Basic route to test server
app.get('/',(req,res) => {
  res.send("Backend is running smooth")
})

// Custom error handling middleware for JSON parsing errors
app.use((err,req,res,next) => {
 if(err instanceof SyntaxError && err.status === 400 && 'body' in err ){
  return res.status(400).json({error:'Invalid Json format'})
 }
 next(err)
})

const  PORT = process.env.PORT || 5000
app.listen(PORT,() => {
 console.log(`Server running on port ${PORT}`);
})