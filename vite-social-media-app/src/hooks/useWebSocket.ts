import { useEffect, useState } from 'react';

const useWebSocket = (url: string) => {

    const [ws, setWs] = useState<WebSocket | null>(null)

    useEffect(() => {
        // Create a new WebSocket only when it's not already created
        if (!ws) {
          const newWs = new WebSocket(url);
    
          newWs.onopen = () => {
            console.log('WebSocket opened');
          };
    
          newWs.onclose = () => {
            console.log('WebSocket closed');
            // Set the WebSocket to null when it's closed
            setWs(null);
          };
    
          // Set the newly created WebSocket
          setWs(newWs);
        }
    
        // Clean up the WebSocket when the component unmounts
        return () => {
          if (ws) {
            ws.close();
          }
        };
      }, []); // Only create a new WebSocket when the URL changes

    return ws
}

export default useWebSocket