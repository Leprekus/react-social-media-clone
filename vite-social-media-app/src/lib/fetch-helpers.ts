type Result<T, E> = [T | null, E | null];

interface TryCatchPostProps {
    payload: { [key: string]: any },
    endpoint: string;
    token?: string; 
    method?: 'POST' | 'PUT';

}


export async function tryCatchPost<T>({ endpoint, payload, token, method = 'POST' }: TryCatchPostProps): Promise<Result<{ json: T | null, res: Response }, any>> {

    const credentials = btoa(`${import.meta.env.VITE_CLIENT_ID}:${import.meta.env.VITE_CLIENT_SECRET}`)
    const headers = { 
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer: ${token}` : `${credentials}`
      }


    try {
        const res = await fetch(endpoint, { 
            method, 
            headers,
            credentials: 'include',
            body: JSON.stringify(payload) 
        })
        const contentType = res.headers.get('content-type');
        const isJson = contentType && contentType.indexOf('application/json') !== -1;
    
        if(isJson) {
            const json = (await res.json() as T)
            return [ {json, res } , null ]
        }
        return [ { json: null, res }, null ]

    } catch(error) {

        console.log({ error })
        return [ null, error ]
    }
}

interface TryCatchGetProps {
    endpoint: string;
    token?: string; 
}

export async function tryCatchGet<T>({ endpoint, token }: TryCatchGetProps): Promise<Result<{ json: T | null, res: Response }, any>> {
    try {
        const headers = { authorization: token ? `Bearer ${(token as string)}` : '' } 
        const res = await fetch(endpoint, { 
            method: 'GET', 
            headers,
            credentials: 'include',
        })
        const contentType = res.headers.get('content-type');
        const isJson = contentType && contentType.indexOf('application/json') !== -1;
    
        if(isJson) {
            const json = (await res.json() as T)
            return [ {json, res } , null ]
        }
        return [ { json: null, res }, null ]

    } catch(error) {

        console.log({ error })
        return [null, error]
    }
}