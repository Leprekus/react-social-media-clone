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
        const vote = tryCatchPost({ 
            endpoint: `${import.meta.env.VITE_BACKEND_URL}api/POST/vote?${queryString}`,  
            payload: '',
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