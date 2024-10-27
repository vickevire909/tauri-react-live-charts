import { useEffect, useState } from 'react';
import { DataPoint } from '../types/types';

interface UseDataProps {
  url: string;
  count: number;
}

export interface UseData {
  data: DataPoint[] | null;
  isConnected: boolean;
  error: string | null;
}

export const useData = ({ url, count }: UseDataProps): UseData => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [data, setValues] = useState<DataPoint[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    const ws = new WebSocket(url);

    ws.onopen = () => {
      console.log('Websockets connection established');
      setIsConnected(true);
      setError(null);
    };

    // Handle incoming messages
    ws.onmessage = (event) => {
      const data: DataPoint[] = JSON.parse(event.data);
      setValues(data);
    };

    ws.onerror = (event) => {
      setError('WebSocket error occurred');
      console.error('WebSocket error:', event);
    };

    ws.onclose = () => {
      setIsConnected(false);
      setError('WebSocket connection closed');
      console.log('Websockets connection closed');
    };

    setSocket(ws);

    return () => ws.close();
  }, [url]);

  useEffect(() => {
    if (socket?.readyState === WebSocket.OPEN) {
      socket.send(
        JSON.stringify({
          command: 'setValues',
          count: Math.max(1, Math.floor(count)),
        }),
      );
      console.log('Requested to change the value count to ', count);
    } else {
      setError('Cannot send command: WebSocket is not connected');
    }
  }, [count, socket]);

  return { data, isConnected, error };
};
