import React from 'react';

export interface ProjectStats {
  label: string;
  value: string;
}

export interface Project {
  id: number;
  title: string;
  version: string;
  shortDescription: string;
  fullDescription: string;
  features: string[];
  techStack: string[];
  stats: ProjectStats[];
  projectNumber: string;
  demoUrl?: string;
  githubUrl?: string;
  isPrivate?: boolean;
  issueTag?: string;
  category?: string;
  featured?: boolean;
  highlights?: string[];
}

export interface CardProps {
  project: Project;
  index: number;
  onClick: (project: Project) => void;
  style?: React.CSSProperties;
  className?: string;
  isExpanded?: boolean;
}
