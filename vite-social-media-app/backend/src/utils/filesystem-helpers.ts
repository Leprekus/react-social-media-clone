import fs from 'fs'
import path from 'path'
import { cwd } from 'process'

export function readFilesInDirectory(directoryPath: string) {
    try {
      const files = fs.readdirSync(directoryPath);
      return files;
    } catch (error) {
      console.error(`Error reading directory: ${(error as Error).message}`);
      return [];
    }
  }

export function generateDynamicPath(filePath:string, method: string, file:string) {

    const CWD = cwd()

    const dynamicRoute = path.join(CWD, 'src', 'api', method, file)

    const dynamicRouteSegments = dynamicRoute.split('/')
    
    const filePathSegments = filePath.split('/')

    const endpoint = filePathSegments.slice(dynamicRouteSegments.length, filePathSegments.length)

    return path.join(dynamicRoute, ...endpoint)

}

