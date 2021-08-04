import jwt from 'jsonwebtoken';

const handleToken = ( id: string, email: string ) => {
  return jwt.sign({id, email, iat:17280000}, 'agmedtoken')
}

export default handleToken;