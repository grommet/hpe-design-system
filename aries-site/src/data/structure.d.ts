import React from 'react';

export interface PageDetails {
  name: string;
  seoDescription?: string;
  description?: string;
  /**
   * List of sub-page names that belong to this section.
   * Only present on "Hub" or "Category" pages (e.g. Home, Foundation).
   */
  pages?: string[];
  color?: string;
  icon?: (size?: string, color?: string) => React.ReactNode;
  preview?: {
    image?: {
      src: string;
      alt: string;
      fit: string;
    };
    component?: () => React.ReactNode;
    background?: string;
  };
  pageLayout?: string;
  accessibility?: string;
  category?: string;
  sections?: string[];
  relatedContent?: string[];
  tags?: string[];
}

export declare const structure: PageDetails[];
