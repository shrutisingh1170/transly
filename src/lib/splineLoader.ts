// Singleton pattern to ensure Spline viewer script loads only once
let splineScriptLoaded = false;
let splineScriptLoading = false;
const loadCallbacks: (() => void)[] = [];

// Suppress WebGL shader warnings from Spline viewer
const suppressSplineWarnings = () => {
  // Store original console methods
  const originalWarn = console.warn;
  const originalError = console.error;
  const originalLog = console.log;

  // Filter out specific WebGL warnings from Spline
  console.warn = function(...args: any[]) {
    const message = args.join(' ');
    // Suppress known harmless Spline shader warnings
    if (
      message.includes('THREE.WebGLProgram') ||
      message.includes('use of potentially uninitialized variable') ||
      message.includes('f_sobelSample') ||
      message.includes('f_blur') ||
      message.includes('updating from')
    ) {
      return; // Suppress these warnings
    }
    originalWarn.apply(console, args);
  };

  console.error = function(...args: any[]) {
    const message = args.join(' ');
    // Suppress known harmless Spline shader errors
    if (
      message.includes('THREE.WebGLProgram') ||
      message.includes('use of potentially uninitialized variable') ||
      message.includes('updating from')
    ) {
      return; // Suppress these errors
    }
    originalError.apply(console, args);
  };

  console.log = function(...args: any[]) {
    const message = args.join(' ');
    // Suppress update messages from Spline or other libraries
    if (
      message.includes('updating from') ||
      message.includes('Missing property')
    ) {
      return; // Suppress these logs
    }
    originalLog.apply(console, args);
  };
};

// Call it immediately
if (typeof window !== 'undefined') {
  suppressSplineWarnings();
}

// Fallback versions to try if primary version fails
const SPLINE_VIEWER_VERSIONS = [
  '1.10.77',  // Primary version
  '1.9.90',   // Alternative version
  '1.9.28',   // Known stable version
  '1.10.0',   // Alternative stable version
  '1.0.0',    // Fallback to older version
];

let currentVersionIndex = 0;

const tryLoadScript = (scriptSrc: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.type = 'module';
    script.src = scriptSrc;
    script.async = true;
    script.id = 'spline-viewer-script';

    script.onload = () => {
      console.log(`✅ Spline viewer loaded successfully from: ${scriptSrc}`);
      
      // Wait for custom element to be defined
      if (customElements.get('spline-viewer')) {
        resolve();
      } else {
        // Wait up to 2 seconds for the element to be defined
        let attempts = 0;
        const checkInterval = setInterval(() => {
          attempts++;
          if (customElements.get('spline-viewer')) {
            clearInterval(checkInterval);
            resolve();
          } else if (attempts > 20) {
            // Timeout after 2 seconds
            clearInterval(checkInterval);
            console.warn('⚠️ Spline viewer script loaded but custom element not defined');
            reject(new Error('Custom element not defined'));
          }
        }, 100);
      }
    };

    script.onerror = (error) => {
      console.warn(`❌ Failed to load from: ${scriptSrc}`);
      // Remove failed script
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
      reject(error);
    };

    document.head.appendChild(script);
  });
};

export const loadSplineViewer = (): Promise<void> => {
  return new Promise((resolve) => {
    // If already loaded, resolve immediately
    if (splineScriptLoaded) {
      resolve();
      return;
    }

    // If currently loading, queue the callback
    if (splineScriptLoading) {
      loadCallbacks.push(resolve);
      return;
    }

    // Check if any version of the script already exists in DOM
    const existingScript = document.querySelector<HTMLScriptElement>('script[id="spline-viewer-script"]');
    
    if (existingScript) {
      splineScriptLoaded = true;
      resolve();
      return;
    }

    // Start loading
    splineScriptLoading = true;

    // Try loading versions in sequence
    const attemptLoad = async () => {
      while (currentVersionIndex < SPLINE_VIEWER_VERSIONS.length) {
        const version = SPLINE_VIEWER_VERSIONS[currentVersionIndex];
        const scriptSrc = `https://unpkg.com/@splinetool/viewer@${version}/build/spline-viewer.js`;
        
        try {
          console.log(`🔄 Attempting to load Spline viewer v${version}...`);
          await tryLoadScript(scriptSrc);
          
          // Success!
          splineScriptLoaded = true;
          splineScriptLoading = false;
          resolve();
          
          // Execute all queued callbacks
          loadCallbacks.forEach(cb => cb());
          loadCallbacks.length = 0;
          return;
        } catch (error) {
          currentVersionIndex++;
          // Continue to next version
        }
      }

      // All versions failed
      splineScriptLoading = false;
      console.error('❌ All Spline viewer versions failed to load. 3D viewer will not be available.');
      console.info('💡 The page will continue to function without the 3D viewer.');
      
      // Resolve anyway to not block the app
      resolve();
      
      // Execute all queued callbacks
      loadCallbacks.forEach(cb => cb());
      loadCallbacks.length = 0;
    };

    attemptLoad();
  });
};
