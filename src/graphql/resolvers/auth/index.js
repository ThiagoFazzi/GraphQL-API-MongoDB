import { createUser } from './createUser'
import { login } from './login'

export const authResolver = {
  ...createUser,
  ...login
}