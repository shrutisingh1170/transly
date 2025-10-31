import React, { Component, ErrorInfo, ReactNode } from 'react';
import { motion } from 'motion/react';
import { AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class SplineErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Suppress WebGL and Spline-related errors
    const errorMessage = error.message || '';
    const isSuppressible = 
      errorMessage.includes('WebGL') ||
      errorMessage.includes('THREE') ||
      errorMessage.includes('spline') ||
      errorMessage.includes('shader');

    if (!isSuppressible) {
      console.error('Spline Error Boundary caught an error:', error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex items-center justify-center h-full min-h-[400px] bg-black">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center text-white max-w-md px-6"
          >
            <AlertTriangle className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
            <h3 className="text-xl mb-2">3D Viewer Unavailable</h3>
            <p className="text-sm text-gray-400 mb-4">
              The 3D viewer encountered a loading issue. This doesn't affect the rest of the application.
            </p>
            <div className="text-6xl mb-4 animate-bounce">🤖</div>
            <p className="text-xs text-gray-500">
              Try refreshing the page or continue using other features
            </p>
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}
