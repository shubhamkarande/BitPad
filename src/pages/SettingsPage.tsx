import React, { useState } from 'react';
import { User, Mail, Palette, Save } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../hooks/useTheme';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Card from '../components/common/Card';

const SettingsPage: React.FC = () => {
  const { user, updateUser } = useAuth();
  const { theme, toggleTheme } = useTheme();
  
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
  });
  
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      updateUser(formData);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <Card className="p-8">
          <p className="text-gray-600 dark:text-gray-300">Please log in to access settings.</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
          <p className="mt-1 text-gray-600 dark:text-gray-300">
            Manage your account preferences and profile information.
          </p>
        </div>

        <div className="space-y-6">
          {/* Profile Settings */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
              <User className="h-5 w-5 mr-2" />
              Profile Information
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                icon={User}
                required
              />
              
              <Input
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                icon={Mail}
                required
              />
              
              <Button type="submit" icon={Save} loading={saving}>
                Save Changes
              </Button>
            </form>
          </Card>

          {/* Appearance Settings */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
              <Palette className="h-5 w-5 mr-2" />
              Appearance
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Theme
                </label>
                <div className="flex items-center space-x-4">
                  <button
                    type="button"
                    onClick={() => theme !== 'light' && toggleTheme()}
                    className={`flex items-center space-x-2 p-3 rounded-lg border-2 transition-all ${
                      theme === 'light'
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                    }`}
                  >
                    <div className="w-4 h-4 bg-white border border-gray-300 rounded" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Light</span>
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => theme !== 'dark' && toggleTheme()}
                    className={`flex items-center space-x-2 p-3 rounded-lg border-2 transition-all ${
                      theme === 'dark'
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                    }`}
                  >
                    <div className="w-4 h-4 bg-gray-800 rounded" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Dark</span>
                  </button>
                </div>
              </div>
            </div>
          </Card>

          {/* Account Info */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Account Information
            </h2>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">Account created:</span>
                <span className="text-gray-900 dark:text-white">
                  {new Date(user.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">User ID:</span>
                <span className="text-gray-900 dark:text-white font-mono text-xs">
                  {user.id}
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;