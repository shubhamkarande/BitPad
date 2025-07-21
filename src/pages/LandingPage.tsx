import React from 'react';
import { Link } from 'react-router-dom';
import { Code, Zap, Share, Shield, Users, Sparkles } from 'lucide-react';
import Button from '../components/common/Button';

const LandingPage: React.FC = () => {
  const features = [
    {
      icon: Code,
      title: 'Monaco Editor',
      description: 'Professional code editor with syntax highlighting, IntelliSense, and VS Code features.'
    },
    {
      icon: Zap,
      title: 'Live Preview',
      description: 'See your HTML, CSS, and JavaScript code come to life instantly as you type.'
    },
    {
      icon: Share,
      title: 'Easy Sharing',
      description: 'Share your creations with unique URLs. Make them public or keep them private.'
    },
    {
      icon: Shield,
      title: 'Secure Execution',
      description: 'Your code runs in a safe, sandboxed environment with enterprise-grade security.'
    },
    {
      icon: Users,
      title: 'Collaborate',
      description: 'Work together in real-time with your team on the same codebase.'
    },
    {
      icon: Sparkles,
      title: 'Modern Stack',
      description: 'Built with the latest web technologies for the best developer experience.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 dark:from-blue-400/5 dark:to-purple-400/5" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <div className="inline-flex items-center space-x-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-full text-sm font-medium">
              <Sparkles className="h-4 w-4" />
              <span>Fast, Collaborative Online Coding</span>
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
              Build, Share, and
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                {" "}Collaborate
              </span>
            </h1>
            
            <p className="max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              The modern online code playground for developers. Write HTML, CSS, and JavaScript with 
              Monaco Editor, see live previews, and share your creations instantly.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button size="lg" className="w-full sm:w-auto">
                  Start Coding Now
                </Button>
              </Link>
              <Link to="/explore">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Explore Public Bits
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Everything You Need to Code
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
              Professional tools and features designed for modern web development
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg group-hover:bg-blue-200 dark:group-hover:bg-blue-800/50 transition-colors">
                    <feature.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Ready to Start Building?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of developers creating amazing things with BitPad
            </p>
            <Link to="/signup">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Create Your Account
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;