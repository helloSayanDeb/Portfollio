import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { projects, getProjectById } from '@/data/projects';
import { OverclockDossierModal } from '@/components/OverclockDossierModal';

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
    title: `${project.title} (${project.version}) // Sayan Deb Dossier`,
    description: project.fullDescription,
    keywords: [project.title, ...project.techStack, 'Sayan Deb', 'ECE Engineer', 'Kolkata'],
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
    <main className="oc">
      <div className="oc-standalone-page">
        <div className="oc-standalone-nav">
          <Link href="/" className="oc-btn oc-btn-ghost oc-btn-sm">
            ← Return to Main Comic Issue
          </Link>
          <span className="oc-issue">PROJECT ARCHIVE // {project.projectNumber}</span>
        </div>

        <OverclockDossierModal project={project} isStandalone={true} />
      </div>
    </main>
  );
}
