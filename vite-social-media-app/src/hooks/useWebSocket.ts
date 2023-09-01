import { useEffect, useRef } from 'react';

const useWebSocket = (url='ws//:localhost:80') => {

    const  ws = useRef<WebSocket | null>(null);

    useEffect(() =>{
        if(ws.current) {
            ws.current.onopen = () => console.log('web socket opened')
            ws.current.onclose = () => console.log('web socket closed')
        }
           
        if(!ws.current) {
            ws.current = new WebSocket(url)
        }

        return () => {
            if(ws.current) {
                ws.current.onerror = ws.current.onopen = ws.current.onclose = null;
                ws.current.close()}
        }
    },[])

    return ws.current
}

export default useWebSocket