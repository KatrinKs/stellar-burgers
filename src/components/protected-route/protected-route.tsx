import { FC, ReactElement, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { checkUserAuth } from '../../services/reducers/auth/auth';

interface ProtectedRouteProps {
  onlyUnAuth?: boolean;
  children: ReactElement;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  onlyUnAuth = false,
  children
}) => {
  const dispatch = useDispatch();
  const { user, isAuthChecked } = useSelector((state) => state.auth);
  const location = useLocation();

  useEffect(() => {
    if (!isAuthChecked) {
      dispatch(checkUserAuth());
    }
  }, [dispatch, isAuthChecked]);

  if (!isAuthChecked) {
    return <div>Проверка авторизации...</div>;
  }

  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: '/' } };
    return <Navigate to={from} replace />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return children;
};
