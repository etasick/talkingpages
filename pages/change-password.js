'use client';
import { useState } from 'react';
import { updatePassword } from 'aws-amplify/auth';
import Navbar from '../components/Navbar';

export default function ChangePasswordPage() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      await updatePassword({ oldPassword, newPassword });
      setMessage('Password updated successfully.');
    } catch (error) {
      console.error('Error updating password:', error);
      setMessage(error.message || 'Failed to update password.');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="max-w-xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">Change Password</h1>

        <form onSubmit={handleChangePassword} className="space-y-4">
          <label className="block">Old Password</label>
          <input
            type="password"
            className="border p-2 w-full rounded"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />

          <label className="block">New Password</label>
          <input
            type="password"
            className="border p-2 w-full rounded"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />

          {message && <p className="text-green-600">{message}</p>}

          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Change Password
          </button>
        </form>
      </main>
    </div>
  );
}
