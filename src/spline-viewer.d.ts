// Type declarations for Spline Viewer custom element
import 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'spline-viewer': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        url?: string;
        loading?: 'lazy' | 'eager';
        'events-target'?: string;
      };
    }
  }
}

export {};
