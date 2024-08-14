import { JwtPayload } from 'jsonwebtoken'
import jwt from 'jsonwebtoken'

 
export const createToken=(JwtPayload:{userId:string,role:string},secret:string,expireIn:string)=>{
    return jwt.sign(JwtPayload,secret,{
        expiresIn:expireIn
    })   
}



export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret as string) as JwtPayload
}
