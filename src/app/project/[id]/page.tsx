import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { projects, getProjectById } from '@/data/projects';
import { ProjectModal } from '@/components/ProjectModal';
import { ArrowLeft } from 'lucide-react';

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({
    id: p.id.toString(),
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { id } = await params;
  const project = getProjectById(id);

  if (!project) {
    return {
      title: 'Project Not Found | Sayan Deb',
    };
  }

  return {
    title: `${project.title} (${project.version}) | Sayan Deb Portfolio`,
    description: project.fullDescription,
    keywords: [project.title, ...project.techStack, 'Sayan Deb', 'Creative Engineer'],
    openGraph: {
      title: `${project.title} - ${project.shortDescription}`,
      description: project.fullDescription,
      type: 'article',
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const project = getProjectById(id);

  if (!project) {
    notFound();
  }

  return (
    <div className="standalone-page">
      <div className="standalone-nav">
        <Link href="/" className="back-link">
          <ArrowLeft size={16} /> Return to 3D Canvas
        </Link>
        <span className="card-version">{project.projectNumber}</span>
      </div>

      <ProjectModal 
        project={project} 
        isStandalone={true} 
      />
    </div>
  );
}
