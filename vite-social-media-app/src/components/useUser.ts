import { tryCatchPost } from '../lib/fetch-helpers'

const userUser = () => {

    // const getLiked = () => []
    // const unlike = (id: string) => []
    const like = async (
        id: string, 
        token: string,
        payload: boolean
        ) => {
        const queryString = new URLSearchParams({ id })
        const [ data, error ] = await tryCatchPost({ 
            endpoint: `${import.meta.env.VITE_BACKEND_URL}api/POST/like?${queryString}`,  
            payload: { like: payload},
            token: token
        })
    }

    return {
        // getLiked,
        // unlike,
        like
    }

}

export default userUser