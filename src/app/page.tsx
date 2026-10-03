import { projects } from '@/data/projects';
import { PortfolioCanvas } from '@/components/PortfolioCanvas';

export default function HomePage() {
  return (
    <main>
      <PortfolioCanvas projects={projects} />
    </main>
  );
}
