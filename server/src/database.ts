import Mongoose from 'mongoose'
export const connect = async () => {
  if (!process.env.DB_URI) {
    throw new Error('DB_URI is not defined')
  }
  const uri = process.env.DB_URI
  const mongoose = await Mongoose.connect(uri, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  const connection = mongoose.connection
  connection.once('open', async () => {
    console.log('Connected to database')
  })
  connection.on('error', () => {
    console.log('Error connecting to database')
  })
}
export const disconnect = () => {
  Mongoose.disconnect()
}
