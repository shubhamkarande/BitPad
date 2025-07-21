import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Eye, Calendar, User, ExternalLink } from 'lucide-react';
import { useBits } from '../contexts/BitContext';
import Input from '../components/common/Input';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

const ExplorePage: React.FC = () => {
  const { getPublicBits } = useBits();
  const [searchTerm, setSearchTerm] = useState('');
  
  const publicBits = getPublicBits();
  
  const filteredBits = publicBits.filter(bit =>
    bit.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bit.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bit.authorUsername.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Explore Public Bits
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Discover amazing code snippets created by the BitPad community
          </p>
          
          <div className="max-w-md">
            <Input
              placeholder="Search bits, authors, or descriptions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={Search}
            />
          </div>
        </div>

        {filteredBits.length === 0 ? (
          <Card className="p-12 text-center">
            <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              {searchTerm ? 'No bits found' : 'No public bits yet'}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {searchTerm 
                ? 'Try adjusting your search terms'
                : 'Be the first to share a public bit with the community!'
              }
            </p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBits.map((bit) => (
              <Card key={bit.id} hover className="p-6">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {bit.title}
                  </h3>
                  {bit.description && (
                    <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
                      {bit.description}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <div className="flex items-center space-x-1">
                    <User className="h-4 w-4" />
                    <span>{bit.authorUsername}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Eye className="h-4 w-4" />
                    <span>{bit.views} views</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(bit.updatedAt)}</span>
                  </div>
                </div>

                {/* Preview of code */}
                <div className="mb-4">
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-md p-3 text-xs font-mono">
                    <div className="text-gray-600 dark:text-gray-400 mb-1">HTML:</div>
                    <div className="text-gray-800 dark:text-gray-200 truncate">
                      {bit.html.slice(0, 80)}...
                    </div>
                  </div>
                </div>

                <Link to={`/bit/${bit.id}`}>
                  <Button variant="outline" size="sm" icon={ExternalLink} className="w-full">
                    View Bit
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExplorePage;