import { FC, SyntheticEvent, useState } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { LoginUI } from '@ui-pages';
import { loginUser } from '../../services/reducers/auth/auth';
import { useNavigate } from 'react-router-dom';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, isLoading } = useSelector((state) => state.auth);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }))
      .unwrap()
      .then(() => {
        navigate('/');
      })
      .catch(() => {
        // Ошибка обрабатывается в слайсе
      });
  };

  return (
    <LoginUI
      errorText={error || undefined}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
