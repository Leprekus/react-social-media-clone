import type { Request, Response, NextFunction } from 'express'
import { cwd } from 'process'
import path from 'path'

export default async function handleRequest(req: Request, res: Response, next: NextFunction) {
    const CWD = cwd()
   
    const filePath = path.join(CWD, 'src', req.path);
  
    try {

      const module = await import(filePath);

      const handler = module.default || module.handler;
  
      const response: Response = await handler(req, res, next);
  
      return response;

    } catch (error) {

      console.log(`Error at handler: ${req.path} ${error}`);

      return res.status(500).json({ Error: 'Internal server error' });

    } finally {
        
        next()
    }
  }