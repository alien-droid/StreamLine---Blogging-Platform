import mongoose from 'mongoose'

let isConnected = false
 // can be moved to the 'env' variable
const MONGODB_URI = process.env.MONGODB_URI
export const connectToDB = async () => {

    mongoose.set('strictQuery', true)
    if (!MONGODB_URI) return console.log('MONGO DB not defined')

    if (isConnected) return console.log('Using existing db connection')

    try {
        await mongoose.connect(MONGODB_URI)
        isConnected = true
        console.log('MongoDB Connected')
    }
    catch (error) {
        console.log(error)
    }

}