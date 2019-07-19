import bcrypt from 'bcryptjs'
import User from '../../mongoose/models/user'
import jwt from 'jsonwebtoken'

export const login = {
  login: async ({ email, password }) => {
    const user = await User.findOne({ email: email })
    if (!user) {
      throw new Error('User does not exist')
    }
    const isEqual = await bcrypt.compare(password, user.password)
    if (!isEqual) {
      throw new Error('Login fail, try again')
    }
    const token = jwt.sign(
      { userId: user.id, email: user.email}, 
      'somesupersecretkey', 
      { expiresIn: '1h' }
    )
    return { userId: user.id, token: token, tokenExpiration: 1 }
  }
}