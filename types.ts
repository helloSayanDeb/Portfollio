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
}

export interface CardProps {
  project: Project;
  index: number;
  onClick: (project: Project) => void;
  style?: React.CSSProperties;
  className?: string;
  isExpanded?: boolean;
}