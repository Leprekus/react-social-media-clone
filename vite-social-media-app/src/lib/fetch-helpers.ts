type Result<T, E> = [T | null, E | null];

interface TryCatchPostProps {
    payload: { [key: string]: any },
    endpoint: string;
    token?: string; 

}


export async function tryCatchPost<T>({ endpoint, payload, token }: TryCatchPostProps): Promise<Result<T, any>> {

    const credentials = btoa(`${import.meta.env.VITE_CLIENT_ID}:${import.meta.env.VITE_CLIENT_SECRET}`)
    const headers = { 
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer: ${token}` : `${credentials}`
      }

    try {
        
        const res = await fetch(endpoint, { 
            method: 'POST', 
            headers,
            credentials: 'include',
            body: JSON.stringify(payload) 
        })
        const json = (await res.json() as T)
        if(json)
            return [json , null]
        return [json, { error: 'no json'}]

    } catch(error) {

        console.log({ error })
        return [null, error]
    }
}

interface TryCatchGetProps {
    endpoint: string;
    token?: string; 
}

export async function tryCatchGet<T>({ endpoint, token }: TryCatchGetProps): Promise<Result<T, any>> {
    try {
        const headers = { authorization: token ? `Bearer ${(token as string)}` : '' } 
        const res = await fetch(endpoint, { 
            method: 'GET', 
            headers,
            credentials: 'include',
        })
        const json = (await res.json() as T)
        if(json)
            return [json , null]
        return [json, { error: 'no json' }]

    } catch(error) {

        console.log({ error })
        return [null, error]
    }
}