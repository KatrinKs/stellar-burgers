import { FC, SyntheticEvent, useState } from 'react';
import { ForgotPasswordUI } from '@ui-pages';
import { useNavigate } from 'react-router-dom';

export const ForgotPassword: FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (!email) {
      setError('Введите email');
      return;
    }

    localStorage.setItem('resetPassword', 'true');
    navigate('/reset-password');
  };

  return (
    <ForgotPasswordUI
      errorText={error}
      email={email}
      setEmail={setEmail}
      handleSubmit={handleSubmit}
    />
  );
};
