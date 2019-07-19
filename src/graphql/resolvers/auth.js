import bcrypt from 'bcryptjs'
import User from '../../mongoose/models/user'
import jwt from 'jsonwebtoken'

export const authResolver = {
  createUser: args => {
    return User.findOne({email: args.userInput.email})
    .then(user => {
      if(user){
        throw new Error('User exists already.')
      }
      return bcrypt.hash(args.userInput.password, 12)
    })
    .then(hashedPassord => {
      const user = new User({
        email: args.userInput.email,
        password: hashedPassord
      })
      return user
        .save()
        .then(result => {
          return {...result._doc, password: null, _id: result.id}
          })
        .catch(err => {
          throw err
        })
    })
    .catch(err => {
      throw err
    })
  },
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