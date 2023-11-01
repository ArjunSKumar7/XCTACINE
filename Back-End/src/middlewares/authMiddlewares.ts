import { Request, Response, NextFunction } from "express";
import { verifyjwt } from "../authService/JwtAuth";

const authMiddlewares = {
  tokenCheckMiddleware: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    let token: string | null = null;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    try {
      const response = verifyjwt(token as string);
      if (response) {
        next();
      } else {
        res.status(401).json({ message: "Unauthorized" });
      }
    } catch (error) {
      res.status(401).json({ message: "Token expired" });
    }
  },
};

export default authMiddlewares;
