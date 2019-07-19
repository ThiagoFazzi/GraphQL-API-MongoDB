export const isAuth = req => {
  if (!req.isAuth) {
    throw new Error('Unauthenticated!')
  }
}