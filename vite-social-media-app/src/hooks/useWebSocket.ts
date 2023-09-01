import { useEffect, useState } from 'react';

const useWebSocket = (url: string) => {

    const [ws, setWs] = useState<WebSocket | null>(null)

    useEffect(() =>{
        if(ws) {
            ws.onopen = () => console.log('web socket opened')
            ws.onclose = () => console.log('web socket closed')
        }
           
        if(!ws) 
            setWs(new WebSocket(url))
            
        

        return () => {
            if(ws) {
                setWs(ws.onerror = ws.onopen = ws.onclose = null)
                ws.close()}
        }
    },[])

    return ws
}

export default useWebSocket