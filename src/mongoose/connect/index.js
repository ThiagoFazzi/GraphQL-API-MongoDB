import mongoose from 'mongoose'

export const startConnection = async (userName, userPassword, dbName) => {
  try {
    await mongoose.connect(
      `mongodb+srv://${userName}:${userPassword}@cluster0-vpwhf.mongodb.net/${dbName}?retryWrites=true&w=majority`,
      { useNewUrlParser: true }
    )
  } catch (error) {
    throw error.message
  }
}
