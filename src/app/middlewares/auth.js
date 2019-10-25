import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(400).json({
      error: 'Token not provided',
    });
  }
  const [, token] = authHeader.split(' ');
  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    console.log(decoded);
    req.userId = decoded.id;
  } catch (err) {
    return res.status(400).json({ error: 'Invalid token' });
  }
  return next();
};
