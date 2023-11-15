import { Request, Response, NextFunction } from "express";
import { verifyjwt } from "../authService/JwtAuth";
import { JwtPayload } from "jsonwebtoken";

const authMiddlewares =(role:string) => {
  return  async (req: Request,res: Response,next: NextFunction) => {
    try {
    let token: string | null = null;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
  
      const response = verifyjwt(token as string) as JwtPayload;
      console.log("authmiddleware",response)
      if (response && response.role === role) {
        next();
      } else {
        res.status(401).json({ message: "Unauthorized" });
      }
    } catch (error) {
      res.status(401).json({ message: "Token expired" });
    }
  }
}

export default authMiddlewares;
