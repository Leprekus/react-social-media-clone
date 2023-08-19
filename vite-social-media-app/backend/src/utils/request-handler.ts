import type { Request, Response, NextFunction } from 'express'
import { cwd } from 'process'
import path from 'path'
import fs from 'fs'
import { generateDynamicPath, readFilesInDirectory } from './filesystem-helpers';

export default async function handleRequest(req: Request, res: Response, next: NextFunction) {

    const CWD = cwd()
   
    let filePath = path.join(CWD, 'src', req.path);

    const regex = /\[(.*?)\]/g;
  
    try {

      const directory = readFilesInDirectory(path.join(CWD, 'src','api', req.method))

      const fileExists = fs.existsSync(filePath + '.ts') 

      if(!fileExists)
        for(const file of directory) {
            if(file.match(regex)) {

                filePath = generateDynamicPath(filePath, req.method, file)
                
            }
        }

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