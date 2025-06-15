import "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

// Add TypeScript interface for your Community type
export interface Community {
  _id: string;
  name: string;
  tags: string;
  description: string;
  location: string;
  website: string;
  featured: boolean;
}
