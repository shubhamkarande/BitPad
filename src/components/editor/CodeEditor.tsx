import React, { useRef } from 'react';
import Editor, { OnMount } from '@monaco-editor/react';
import { useTheme } from '../../hooks/useTheme';

interface CodeEditorProps {
  value: string;
  language: string;
  onChange: (value: string) => void;
  height?: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ 
  value, 
  language, 
  onChange, 
  height = '400px' 
}) => {
  const { theme } = useTheme();
  const editorRef = useRef<any>(null);

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
    
    // Custom theme configuration
    monaco.editor.defineTheme('bitpad-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#1f2937',
        'editor.foreground': '#f9fafb',
        'editorLineNumber.foreground': '#6b7280',
        'editor.selectionBackground': '#374151',
        'editor.inactiveSelectionBackground': '#374151',
        'editorCursor.foreground': '#3b82f6',
      }
    });

    monaco.editor.defineTheme('bitpad-light', {
      base: 'vs',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#ffffff',
        'editor.foreground': '#1f2937',
        'editorLineNumber.foreground': '#9ca3af',
        'editor.selectionBackground': '#dbeafe',
        'editor.inactiveSelectionBackground': '#dbeafe',
        'editorCursor.foreground': '#3b82f6',
      }
    });
  };

  const handleChange = (value: string | undefined) => {
    onChange(value || '');
  };

  return (
    <div className="border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
      <Editor
        height={height}
        language={language}
        value={value}
        theme={theme === 'dark' ? 'bitpad-dark' : 'bitpad-light'}
        onChange={handleChange}
        onMount={handleEditorDidMount}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: 'on',
          roundedSelection: false,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
          insertSpaces: true,
          wordWrap: 'on',
          contextmenu: true,
          selectOnLineNumbers: true,
        }}
      />
    </div>
  );
};

export default CodeEditor;