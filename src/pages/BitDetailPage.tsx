import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Eye, Calendar, User, Edit, Share2 } from 'lucide-react';
import { useBits } from '../contexts/BitContext';
import { useAuth } from '../contexts/AuthContext';
import Preview from '../components/editor/Preview';
import CodeEditor from '../components/editor/CodeEditor';
import Button from '../components/common/Button';
import Card from '../components/common/Card';

const BitDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getBit, incrementViews } = useBits();
  const { user } = useAuth();

  const bit = id ? getBit(id) : undefined;

  useEffect(() => {
    if (bit && id) {
      incrementViews(id);
    }
  }, [bit, id, incrementViews]);

  if (!bit) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <Card className="p-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Bit Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            The bit you're looking for doesn't exist or may have been deleted.
          </p>
          <Button onClick={() => navigate('/explore')}>
            Back to Explore
          </Button>
        </Card>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: bit.title,
          text: bit.description,
          url: url,
        });
      } catch (err) {
        // Fallback to clipboard
        navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
      }
    } else {
      navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
    }
  };

  const isOwner = user && user.id === bit.authorId;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                icon={ArrowLeft}
                onClick={() => navigate(-1)}
              >
                Back
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {bit.title}
                </h1>
                <div className="flex items-center space-x-6 mt-2 text-sm text-gray-600 dark:text-gray-300">
                  <div className="flex items-center space-x-1">
                    <User className="h-4 w-4" />
                    <span>by {bit.authorUsername}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Eye className="h-4 w-4" />
                    <span>{bit.views} views</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>Updated {formatDate(bit.updatedAt)}</span>
                  </div>
                </div>
                {bit.description && (
                  <p className="mt-3 text-gray-600 dark:text-gray-300">
                    {bit.description}
                  </p>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                icon={Share2}
                onClick={handleShare}
              >
                Share
              </Button>
              {isOwner && (
                <Link to={`/editor/${bit.id}`}>
                  <Button icon={Edit}>
                    Edit
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Preview */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Preview
          </h2>
          <div className="h-96 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <Preview
              html={bit.html}
              css={bit.css}
              javascript={bit.javascript}
            />
          </div>
        </div>

        {/* Code Sections */}
        <div className="space-y-8">
          {/* HTML */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">HTML</h3>
            <div className="h-64">
              <CodeEditor
                value={bit.html}
                language="html"
                onChange={() => {}} // Read-only
                height="100%"
              />
            </div>
          </div>

          {/* CSS */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">CSS</h3>
            <div className="h-64">
              <CodeEditor
                value={bit.css}
                language="css"
                onChange={() => {}} // Read-only
                height="100%"
              />
            </div>
          </div>

          {/* JavaScript */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">JavaScript</h3>
            <div className="h-64">
              <CodeEditor
                value={bit.javascript}
                language="javascript"
                onChange={() => {}} // Read-only
                height="100%"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BitDetailPage;