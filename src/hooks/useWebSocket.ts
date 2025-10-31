import { useEffect, useRef } from 'react';
import { useDispatch } from '../services/store';
import {
  wsConnect,
  wsDisconnect,
  wsMessage,
  wsError
} from '../services/reducers/feed/feed';

export const useWebSocket = (url: string) => {
  const dispatch = useDispatch();
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    ws.current = new WebSocket(url);

    ws.current.onopen = () => {
      console.log('WebSocket connected');
      dispatch(wsConnect());
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      dispatch(wsMessage(data));
    };

    ws.current.onclose = () => {
      console.log('WebSocket disconnected');
      dispatch(wsDisconnect());
    };

    ws.current.onerror = (error) => {
      console.log('WebSocket error:', error);
      dispatch(wsError('WebSocket connection error'));
    };

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [dispatch, url]);
};
