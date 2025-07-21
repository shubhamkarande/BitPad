import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Code, Eye, Calendar, Edit, Trash2, ExternalLink } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useBits } from '../contexts/BitContext';
import Button from '../components/common/Button';
import Card from '../components/common/Card';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { getUserBits, deleteBit } = useBits();

  const userBits = user ? getUserBits(user.id) : [];

  const handleDelete = (bitId: string) => {
    if (window.confirm('Are you sure you want to delete this bit?')) {
      deleteBit(bitId);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Dashboard
              </h1>
              <p className="mt-1 text-gray-600 dark:text-gray-300">
                Welcome back, {user?.username}! Manage your code snippets.
              </p>
            </div>
            <Link to="/editor">
              <Button icon={Plus}>
                New Bit
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Code className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Bits</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{userBits.length}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <Eye className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Views</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {userBits.reduce((total, bit) => total + bit.views, 0)}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <ExternalLink className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Public Bits</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {userBits.filter(bit => bit.isPublic).length}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Bits Grid */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Your Bits</h2>
          
          {userBits.length === 0 ? (
            <Card className="p-12 text-center">
              <Code className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No bits yet
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Create your first code snippet to get started
              </p>
              <Link to="/editor">
                <Button icon={Plus}>
                  Create Your First Bit
                </Button>
              </Link>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userBits.map((bit) => (
                <Card key={bit.id} hover className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                      {bit.title}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <div className={`px-2 py-1 rounded-full text-xs ${
                        bit.isPublic 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
                      }`}>
                        {bit.isPublic ? 'Public' : 'Private'}
                      </div>
                    </div>
                  </div>
                  
                  {bit.description && (
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                      {bit.description}
                    </p>
                  )}

                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(bit.updatedAt)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye className="h-4 w-4" />
                      <span>{bit.views}</span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Link to={`/editor/${bit.id}`} className="flex-1">
                      <Button variant="outline" size="sm" icon={Edit} className="w-full">
                        Edit
                      </Button>
                    </Link>
                    <Link to={`/bit/${bit.id}`} className="flex-1">
                      <Button variant="ghost" size="sm" icon={ExternalLink} className="w-full">
                        View
                      </Button>
                    </Link>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      icon={Trash2}
                      onClick={() => handleDelete(bit.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      Delete
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;