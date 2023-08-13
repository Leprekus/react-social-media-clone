type Result<T, E> = [T | null, E | null];

export default async function tryCatch<T>(data: string): Promise<Result<T, any>> {
    try {
        
        const res = await fetch(data)
        const json = (await res.json() as T)
        return [json , null]

    } catch(error) {

        console.log({ error })
        return [null, error]
    }
}