import jwt from 'jsonwebtoken'
import {configKeys} from '../config/keys';

export const generateJWT = (id:string,role:string) => {
  
  
    try {
      const jwtPayload={id:id,role:role}
      if (configKeys.JWT_SECRET_KEY) {
        const token = jwt.sign(jwtPayload, configKeys.JWT_SECRET_KEY,{
          expiresIn: configKeys.JWT_EXPIRATION
        });
console.log("token",token)
        return token;
      }
    } catch (error) {
      console.error("Error generating JWT:", error);
      throw error;
    }
  };

export const verifyjwt = (token:string)=>{
    if(configKeys.JWT_SECRET_KEY){
     const verifyjwtaaaa =   jwt.verify(token,configKeys.JWT_SECRET_KEY)
     return verifyjwtaaaa
    }
}



    








