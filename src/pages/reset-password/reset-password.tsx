import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { ResetPasswordUI } from '@ui-pages';
import { useNavigate } from 'react-router-dom';

export const ResetPassword: FC = () => {
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('resetPassword')) {
      navigate('/forgot-password');
    }
  }, [navigate]);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (!password || !token) {
      setError('Заполните все поля');
      return;
    }

    localStorage.removeItem('resetPassword');
    navigate('/login');
  };

  return (
    <ResetPasswordUI
      errorText={error}
      password={password}
      token={token}
      setPassword={setPassword}
      setToken={setToken}
      handleSubmit={handleSubmit}
    />
  );
};
