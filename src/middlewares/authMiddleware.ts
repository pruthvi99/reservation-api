import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';

interface AuthenticatedRequest extends Request {
  user?: any; 
}

const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.header('Authorization');

  if (!authHeader) {
    return res.status(401).json({ error: 'Unauthorized - Missing token' });
  }

  const [bearer, token] = authHeader.split(' ');

  if (bearer !== 'Bearer' || !token) {
    return res.status(401).json({ error: 'Unauthorized - Invalid token format' });
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ error: 'Unauthorized - Invalid token' });
  }
};

const generateToken = (user: any) => {
  return jwt.sign(user, config.jwtSecret, { expiresIn: '1h' });
};

export { authMiddleware, generateToken };
