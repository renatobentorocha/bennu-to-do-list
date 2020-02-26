import { Request, Response, NextFunction } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import jwt from "jsonwebtoken";
import { promisify } from "util";
import authConfig from "../config/auth";

interface RequestType extends Request<ParamsDictionary>  {  
  userId: string;
}

type DecodeType =  {
  id: string;
}

export default async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token not provided" });
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = jwt.verify(token, authConfig.secret) as DecodeType;

    (req as RequestType).userId = decoded.id;

    return next();
  } catch (error) {
    return res.status(401).json({ error: "Token invalid" });
  }
};
