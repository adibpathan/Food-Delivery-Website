import express from 'express'
import cors from 'cors'
import connectDb from './config/db.js'
import dotenv from 'dotenv'
import foodRouter from './routes/foodRoute.js'
import userRouter from './routes/userRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'
dotenv.config()

// rest object 
const app = express()
const PORT = process.env.PORT || 4000

// middlewares 
app.use(express.json())
app.use(cors())

// connection 
connectDb()

//api endpoints
app.use("/api/food", foodRouter)
app.use("/images", express.static('uploads'))
app.use("/api/user", userRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)

app.get("/", (req, res)=>{
    res.send("hello, i am a server")
})

app.listen(PORT, ()=>{
    console.log(`server is listening on port ${PORT}`)
})