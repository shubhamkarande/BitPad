import React, { useEffect, useRef } from 'react';

interface PreviewProps {
  html: string;
  css: string;
  javascript: string;
}

const Preview: React.FC<PreviewProps> = ({ html, css, javascript }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const document = iframe.contentDocument;
    if (!document) return;

    const content = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Preview</title>
        <style>
          body {
            margin: 0;
            padding: 16px;
            font-family: system-ui, -apple-system, sans-serif;
          }
          ${css}
        </style>
      </head>
      <body>
        ${html}
        <script>
          try {
            ${javascript}
          } catch (error) {
            console.error('JavaScript Error:', error);
            document.body.innerHTML += '<div style="color: red; background: #fee; padding: 10px; margin: 10px 0; border-radius: 4px; border: 1px solid #fcc;"><strong>JavaScript Error:</strong> ' + error.message + '</div>';
          }
        </script>
      </body>
      </html>
    `;

    document.open();
    document.write(content);
    document.close();
  }, [html, css, javascript]);

  return (
    <div className="h-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
      <iframe
        ref={iframeRef}
        className="w-full h-full"
        title="Code Preview"
        sandbox="allow-scripts allow-same-origin"
      />
    </div>
  );
};

export default Preview;