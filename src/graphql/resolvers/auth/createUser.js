import bcrypt from 'bcryptjs'
import User from '../../mongoose/models/user'

export const createUser = {
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
  }
}