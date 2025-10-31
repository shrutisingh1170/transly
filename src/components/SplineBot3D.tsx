import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { X } from 'lucide-react';
import { Button } from './ui/button';
import { loadSplineViewer } from '../lib/splineLoader';
import { SplineErrorBoundary } from './SplineErrorBoundary';

interface SplineBot3DProps {
  onClose?: () => void;
  showCloseButton?: boolean;
}

export const SplineBot3D = ({ onClose, showCloseButton = false }: SplineBot3DProps) => {
  const [splineLoaded, setSplineLoaded] = useState<boolean | null>(null);

  useEffect(() => {
    loadSplineViewer()
      .then(() => {
        console.log('✅ Spline viewer loaded for 3D bot');
        setSplineLoaded(true);
      })
      .catch(err => {
        console.error('❌ Spline viewer failed to load:', err);
        setSplineLoaded(false);
      });
  }, []);

  return (
    <div className="relative w-full h-full min-h-screen bg-black">
      {/* Close Button */}
      {showCloseButton && onClose && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute top-4 right-4 z-50"
        >
          <Button
            onClick={onClose}
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/10 rounded-full"
          >
            <X className="w-6 h-6" />
          </Button>
        </motion.div>
      )}

      {/* 3D Spline Bot Viewer */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full h-full min-h-screen"
      >
        {splineLoaded === false ? (
          <div className="flex items-center justify-center h-screen">
            <div className="text-center text-white">
              <div className="text-6xl mb-4">🤖</div>
              <p className="text-xl">3D Bot Viewer</p>
              <p className="text-sm text-gray-400 mt-2">Loading fallback view...</p>
            </div>
          </div>
        ) : (
          <SplineErrorBoundary>
            <spline-viewer 
              url="https://prod.spline.design/TQFF1fBwsgLiql4V/scene.splinecode"
              loading="eager"
              events-target="global"
              className="w-full h-full"
            />
          </SplineErrorBoundary>
        )}
      </motion.div>

      {/* Info Overlay */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-40"
      >
        <div className="bg-white/10 backdrop-blur-md text-white px-6 py-3 rounded-full border border-white/20">
          <p className="text-sm">
            <span className="inline-block animate-pulse mr-2">🤖</span>
            Interactive 3D AI Assistant
          </p>
        </div>
      </motion.div>
    </div>
  );
};
