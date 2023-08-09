import jwt from 'jsonwebtoken'
import {configKeys} from '../config/keys';

export const generateJWT = (userId:string) => {
    console.log("generateJWT", userId, configKeys.JWT_SECRET_KEY);
  
    try {
      if (configKeys.JWT_SECRET_KEY) {
        const token = jwt.sign({userId}, configKeys.JWT_SECRET_KEY,{
          expiresIn: configKeys.JWT_EXPIRATION
        });
        console.log(token, "Generated JWT");
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



    








