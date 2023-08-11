export default async function tryCatch(data: Promise<unknown>) {
    try {
        const res = await data

        return [res, null]
    } catch(error) {
        console.log({ error })
        return [null, error]
    }
}