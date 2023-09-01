import jwt from 'jsonwebtoken'
import {configKeys} from '../config/keys';

export const generateJWT = (id:string) => {
  
  
    try {
      if (configKeys.JWT_SECRET_KEY) {
        const token = jwt.sign({id}, configKeys.JWT_SECRET_KEY,{
          expiresIn: configKeys.JWT_EXPIRATION
        });

        return token;
      }
    } catch (error) {
      console.error("Error generating JWT:", error);
      throw error;
    }
  };

export const verifyjwt = (token:string)=>{
    if(configKeys.JWT_SECRET_KEY){
        return jwt.verify(token,configKeys.JWT_SECRET_KEY)
    }
}



    








