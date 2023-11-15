import { Request, Response, NextFunction } from "express";
import { verifyjwt } from "../authService/JwtAuth";
import { JwtPayload } from "jsonwebtoken";
import userController from "../controller/userController"
import theatrecontroller from "../controller/theatreController";

const accessCheckMiddleware = {

    checkUserBlock: async (req: Request, res: Response, next: NextFunction) => {
        try {
            let token: string | null = null;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    const response = verifyjwt(token as string) as JwtPayload;
    const userId=response?.id
    const userBlockStatus = await userController.checkUserBlocked(req, res, userId);
    if(response && !userBlockStatus) {
        next();
    }
    else {
        
        res.json({isBlocked:true, message: "access denied!! you are blocked by admin",status:'blocked' });
      }
            

        } catch (error) {
            res.status(401).json({ message: "Unauthorised Access" });
        }
    },
    checkTheatreBlock: async (req: Request, res: Response, next: NextFunction) => {
        try {
            let token: string | null = null;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    const response = verifyjwt(token as string) as JwtPayload;
    const theatreId=response?.id
    const theatreBlockStatus = await theatrecontroller.checkTheatreBlocked(req, res, theatreId);
    if(response && !theatreBlockStatus) {
        next();
    }
    else {
        
        res.json({isBlocked:true, message: "access denied!! you are blocked by admin",status:'blocked' });
      }
            

        } catch (error) {
            res.status(401).json({ message: "Unauthorised Access" });
        }
    }
}

export default accessCheckMiddleware;