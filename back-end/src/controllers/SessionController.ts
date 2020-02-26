import { Request, Response } from 'express'
import jwt from "jsonwebtoken";
import User from "../schemas/User";
import authConfig from "../config/auth";

interface SessionType extends ReadableStream<Uint8Array>  {
  email: string;
  password: string;
}

class SessionController {
  public async store(req: Request, res: Response): Promise<Response> {
    const body: SessionType = req.body;

    const { email, password } = body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "User not found." });
    }

    if (!user.compareHash(password)) {
      return res.status(401).json({ error: "Password does not match." });
    }

    const { _id: id, name } = user;

    return res.status(201).json({
      user: {
        id,
        name,
        email
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn
      })
    });
  }
}

export default new SessionController();
