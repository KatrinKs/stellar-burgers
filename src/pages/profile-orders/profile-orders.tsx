import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  fetchUserOrders,
  wsMessage,
  wsConnect,
  wsDisconnect,
  wsError
} from '../../services/reducers/feed/feed';
import { getCookie } from '../../utils/cookie';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const { userOrders } = useSelector((state) => state.feed);
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    dispatch(fetchUserOrders());

    const accessToken = getCookie('accessToken');
    if (accessToken) {
      const token = accessToken.replace('Bearer ', '');
      ws.current = new WebSocket(
        `wss://norma.nomoreparties.space/orders?token=${token}`
      );

      ws.current.onopen = () => {
        console.log('Profile WebSocket connected');
        dispatch(wsConnect());
      };

      ws.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
        dispatch(wsMessage(data));
      };

      ws.current.onclose = () => {
        console.log('Profile WebSocket disconnected');
        dispatch(wsDisconnect());
      };

      ws.current.onerror = (error) => {
        console.log('Profile WebSocket error:', error);
        dispatch(wsError('WebSocket connection error'));
      };
    }

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [dispatch]);

  const sortedOrders: TOrder[] = [...userOrders].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return <ProfileOrdersUI orders={sortedOrders} />;
};
