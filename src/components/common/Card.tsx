import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className = '', hover = false }) => {
  return (
    <div className={`
      bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700
      ${hover ? 'hover:shadow-lg hover:scale-[1.02] transition-all duration-200' : ''}
      ${className}
    `}>
      {children}
    </div>
  );
};

export default Card;