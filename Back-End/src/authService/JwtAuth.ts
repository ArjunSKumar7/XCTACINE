import jwt from 'jsonwebtoken'
import {configKeys} from '../config/keys';

export const generateJWT = (payload:string) => {
    if(configKeys.JWT_SECRET_KEY){
        return jwt.sign(payload,configKeys.JWT_SECRET_KEY,{
            expiresIn:configKeys.JWT_EXPIRATION
        })
    }

    }

export const verifyjwt = (token:string)=>{
    if(configKeys.JWT_SECRET_KEY){
        return jwt.verify(token,configKeys.JWT_SECRET_KEY)
    }
}



    








