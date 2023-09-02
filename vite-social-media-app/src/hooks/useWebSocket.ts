/*
  const [ws, setWs] = useState<WebSocket | null>(null)
    useEffect(() => {
      if(!ws) 
        setWs(new WebSocket('ws://localhost:80'))
      
      if(ws) {
        ws.onopen = () => console.log('web socket opened')
        ws.onclose = () => console.log('web socket closed')

        ws.onmessage = ({ data }: { data: string }) => { setConversation(prev => [...prev as ClientMessage[], JSON.parse(data)]) }
      }

      return () => { 
        if(ws) ws.close()
      }
    }, [ws])

*/
import { create } from 'zustand'

interface WebSocketStoreStore {
    Open: (url: string) => void;
    Close: () => void;
    Send: (data: unknown) => void;
    ClearLatestMessage: () => void;
    WebSocket: WebSocket | null;
    LatestMessage: [] | unknown[];



}


const useWebSocketStore = create<WebSocketStoreStore>((set, get) => ({

    Open: (url: string) => {
      const currentWebSocket = get().WebSocket
      if(currentWebSocket === null) {
      
        const ws = new WebSocket(url)
       
        ws.addEventListener('open', () => {
          // WebSocket connection is open
          console.log('web socket opened')
          set({ WebSocket: ws });
        });
    
        ws.addEventListener('close', (event) => {
          // WebSocket connection is closed
          console.log('web socket closed ', event)
          set({ WebSocket: null });
          
        });
    
        ws.addEventListener('message', (event) => {
          // Handle incoming messages here
          const parsedData = JSON.parse(event.data);
          set({ LatestMessage: [parsedData] });
        });

        ws.addEventListener('error', (event) => console.log('error :', event))
      }
    },
    Close: () => {

      const WebSocket = get().WebSocket

      if(WebSocket && WebSocket.readyState === WebSocket.OPEN){
          console.log('close method called')
          WebSocket?.close()
          set({ WebSocket: null })
        }
    },
    Send: (data: unknown) => {

      const WebSocket = get().WebSocket

      if(WebSocket && WebSocket.readyState === WebSocket.OPEN) 
        WebSocket.send(JSON.stringify(data))
    },
    ClearLatestMessage: () => set({ LatestMessage: [] }),
    WebSocket: null,
    LatestMessage: []

}))
export default useWebSocketStore

