import mongoose from 'mongoose'

const connectDb = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL) 
        console.log('connect to mongodb successfully')
    } catch (error) {
        console.log('connection failed')
    }
}

export default connectDb;