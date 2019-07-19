export const isAuth = auth => {
  if (!auth) {
    throw new Error('Unauthenticated!')
  }
}