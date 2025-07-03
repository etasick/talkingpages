'use client';
import Navbar from '../components/Navbar';

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">Settings</h1>

        <p>This is your settings page. (You can add preferences, notification settings, etc.)</p>
      </main>
    </div>
  );
}
