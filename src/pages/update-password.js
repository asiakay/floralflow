// pages/update-password.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '../contexts/UserProvider';
import { updatePassword } from 'firebase/auth';

const UpdatePassword = () => {
  const { user, loading } = useUser();
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const router = useRouter();

  if (!loading && !user) {
    router.push('/login');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updatePassword(user, password);
      setMessage('Your password has been updated successfully.');
      setError('');
    } catch (err) {
      setError(err.message);
      setMessage('');
    }
  };

  return (
    <div>
      <h1>Update Password</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Update Password</button>
      </form>
      {message && <p>{message}</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default UpdatePassword;
