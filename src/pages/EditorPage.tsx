import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, Play, Settings, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useBits } from '../contexts/BitContext';
import CodeEditor from '../components/editor/CodeEditor';
import Preview from '../components/editor/Preview';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Card from '../components/common/Card';

const EditorPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getBit, createBit, updateBit } = useBits();

  const [activeTab, setActiveTab] = useState<'html' | 'css' | 'javascript'>('html');
  const [showPreview, setShowPreview] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  
  const [formData, setFormData] = useState({
    title: 'Untitled Bit',
    description: '',
    html: '<!DOCTYPE html>\n<html>\n<head>\n  <title>My Bit</title>\n</head>\n<body>\n  <h1>Hello BitPad!</h1>\n  <p>Start coding something amazing...</p>\n</body>\n</html>',
    css: '/* Add your styles here */\nbody {\n  font-family: Arial, sans-serif;\n  margin: 20px;\n  background-color: #f5f5f5;\n}\n\nh1 {\n  color: #333;\n  text-align: center;\n}',
    javascript: '// Add your JavaScript here\nconsole.log("Welcome to BitPad!");\n\n// Example: Add click event\n// document.querySelector("h1").addEventListener("click", () => {\n//   alert("Hello from BitPad!");\n// });',
    isPublic: false
  });

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (id) {
      const bit = getBit(id);
      if (bit) {
        if (bit.authorId !== user.id) {
          navigate('/dashboard');
          return;
        }
        setFormData({
          title: bit.title,
          description: bit.description,
          html: bit.html,
          css: bit.css,
          javascript: bit.javascript,
          isPublic: bit.isPublic
        });
      } else {
        navigate('/dashboard');
      }
    }
  }, [id, user, getBit, navigate]);

  const handleSave = async () => {
    if (!user) return;

    setSaving(true);
    try {
      if (id) {
        updateBit(id, formData);
      } else {
        const newBitId = createBit({
          ...formData,
          authorId: user.id,
          authorUsername: user.username
        });
        navigate(`/editor/${newBitId}`);
      }
    } finally {
      setSaving(false);
    }
  };

  const handleCodeChange = (language: 'html' | 'css' | 'javascript', value: string) => {
    setFormData(prev => ({
      ...prev,
      [language]: value
    }));
  };

  const tabs = [
    { key: 'html' as const, label: 'HTML', language: 'html' },
    { key: 'css' as const, label: 'CSS', language: 'css' },
    { key: 'javascript' as const, label: 'JavaScript', language: 'javascript' }
  ];

  const currentTab = tabs.find(tab => tab.key === activeTab);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              icon={ArrowLeft}
              onClick={() => navigate('/dashboard')}
            >
              Back
            </Button>
            <div>
              <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                {formData.title}
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {id ? 'Editing' : 'Creating new'} bit
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              icon={showPreview ? EyeOff : Eye}
              onClick={() => setShowPreview(!showPreview)}
            >
              {showPreview ? 'Hide' : 'Show'} Preview
            </Button>
            <Button
              variant="ghost"
              size="sm"
              icon={Settings}
              onClick={() => setShowSettings(!showSettings)}
            >
              Settings
            </Button>
            <Button
              icon={Save}
              onClick={handleSave}
              loading={saving}
            >
              Save
            </Button>
          </div>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
          <Card className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter bit title"
              />
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Visibility
                </label>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      checked={!formData.isPublic}
                      onChange={() => setFormData(prev => ({ ...prev, isPublic: false }))}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Private</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      checked={formData.isPublic}
                      onChange={() => setFormData(prev => ({ ...prev, isPublic: true }))}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Public</span>
                  </label>
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe your bit..."
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={3}
                />
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Editor Layout */}
      <div className="flex h-[calc(100vh-120px)]">
        {/* Code Editor */}
        <div className={`${showPreview ? 'w-1/2' : 'w-full'} flex flex-col`}>
          {/* Tabs */}
          <div className="flex border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.key
                    ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Editor */}
          <div className="flex-1 p-4 bg-gray-50 dark:bg-gray-900">
            {currentTab && (
              <CodeEditor
                value={formData[activeTab]}
                language={currentTab.language}
                onChange={(value) => handleCodeChange(activeTab, value)}
                height="100%"
              />
            )}
          </div>
        </div>

        {/* Preview */}
        {showPreview && (
          <div className="w-1/2 border-l border-gray-200 dark:border-gray-700">
            <div className="h-full p-4 bg-gray-50 dark:bg-gray-900">
              <Preview
                html={formData.html}
                css={formData.css}
                javascript={formData.javascript}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditorPage;