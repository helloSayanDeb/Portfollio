import { notFound } from 'next/navigation';
import { getProjectById } from '@/data/projects';
import { ProjectModalClient } from './modal-client';

export default async function ProjectModalRoute({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = getProjectById(id);

  if (!project) {
    notFound();
  }

  return <ProjectModalClient project={project} />;
}
