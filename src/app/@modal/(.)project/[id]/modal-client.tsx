'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Project } from '@/types';
import { OverclockDossierModal } from '@/components/OverclockDossierModal';

export function ProjectModalClient({ project }: { project: Project }) {
  const router = useRouter();

  return (
    <div className="oc">
      <OverclockDossierModal
        project={project}
        onClose={() => router.back()}
      />
    </div>
  );
}
