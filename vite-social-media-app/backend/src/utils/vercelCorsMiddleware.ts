import type { Request, Response, NextFunction } from 'express';
import { config } from 'dotenv';
config()
// Define the allowCors middleware
const allowCors = (req: Request, res: Response, next: NextFunction) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Credentials', true as any);
    res.setHeader('Access-Control-Allow-Origin', process.env.ORIGIN_URL as string);
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS, PATCH, DELETE, POST, PUT');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );
  
    // Handle preflight requests (OPTIONS)
    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }
  
    // Continue processing the request
    next();
  };
  
export default allowCors