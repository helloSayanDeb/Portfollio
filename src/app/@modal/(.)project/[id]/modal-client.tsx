'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Project } from '@/types';
import { ProjectModal } from '@/components/ProjectModal';

export function ProjectModalClient({ project }: { project: Project }) {
  const router = useRouter();

  return (
    <ProjectModal 
      project={project} 
      onClose={() => router.back()} 
    />
  );
}
