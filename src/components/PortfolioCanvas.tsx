'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Project } from '@/types';
import { 
  Mail, 
  ArrowUpRight 
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon, DribbbleIcon } from './Icons';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ContactModal } from './ContactModal';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface PortfolioCanvasProps {
  projects: Project[];
}

export const PortfolioCanvas: React.FC<PortfolioCanvasProps> = ({ projects }) => {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [isContactOpen, setIsContactOpen] = useState(false);

  useEffect(() => {
    if (!containerRef.current || !scrollContainerRef.current) return;

    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
    if (cards.length === 0) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: scrollContainerRef.current,
          start: 'top top',
          end: '+=500%',
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
        }
      });

      cards.forEach((card, i) => {
        const cardTl = gsap.timeline();

        gsap.set(card, {
          x: '60vw',
          y: '110vh',
          z: -300,
          rotationX: 40,
          rotationY: -30,
          rotationZ: 10,
          opacity: 0,
          scale: 0.8
        });

        cardTl
          .to(card, {
            x: '20vw',
            y: '40vh',
            z: -100,
            rotationX: 20,
            rotationY: -15,
            rotationZ: 5,
            opacity: 1,
            scale: 0.9,
            duration: 1,
            ease: 'power1.in'
          })
          .to(card, {
            x: '0vw',
            y: '0vh',
            z: 150,
            rotationX: 0,
            rotationY: 0,
            rotationZ: 0,
            scale: 1,
            duration: 1,
            ease: 'none',
            zIndex: 100
          })
          .to(card, {
            x: '-20vw',
            y: '-40vh',
            z: -100,
            rotationX: 20,
            rotationY: 15,
            rotationZ: -5,
            scale: 0.9,
            duration: 1,
            ease: 'none',
            zIndex: 50
          })
          .to(card, {
            x: '-60vw',
            y: '-110vh',
            z: -300,
            rotationX: 40,
            rotationY: 30,
            rotationZ: -10,
            opacity: 0,
            scale: 0.8,
            duration: 1,
            ease: 'power1.out'
          });

        const offset = i * 0.25;
        tl.add(cardTl, offset);
      });
    }, scrollContainerRef);

    // Refresh ScrollTrigger to accommodate any hydration layout shifts
    ScrollTrigger.refresh();

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [projects]);

  const handleCardClick = (project: Project) => {
    router.push(`/project/${project.id}`, { scroll: false });
  };

  return (
    <div className="app-root">
      {/* Scroll Container (Pinned 3D space) */}
      <div ref={scrollContainerRef} className="scroll-container">
        
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-main z-0 pointer-events-none" />

        {/* Static Hero Content */}
        <div className="absolute z-0 flex flex-col items-center justify-center w-full h-full pointer-events-none px-4">
          {/* Ambient Glow */}
          <div className="hero-glow" />

          <div className="relative z-10 hero-content">
            <h1 className="hero-title">SAYAN</h1>
            <h1 className="hero-title">DEB</h1>

            <div className="hero-subtitle-container">
              <div className="hero-line" />
              <p className="hero-subtitle">Creative Developer & UI Engineer</p>
              <div className="hero-line" />
            </div>
          </div>
        </div>

        {/* 3D Perspective Container */}
        <div 
          ref={containerRef}
          className="perspective-container relative w-full h-full flex items-center justify-center z-10 pointer-events-none"
        >
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={el => { cardsRef.current[index] = el; }}
              onClick={() => handleCardClick(project)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleCardClick(project);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`Open details for ${project.title}`}
              className="card-wrapper pointer-events-auto cursor-pointer card-3d"
            >
              {/* Card Content Structure */}
              <div className="card-inner brushed-metal">
                {/* Light Sweep Effect on Hover */}
                <div className="card-sweep" />

                {/* Card Inner Layout */}
                <div className="card-content">
                  {/* Top Header */}
                  <div className="card-header">
                    <span className="card-version">{project.version}</span>
                    <span className="card-number">{project.projectNumber.split('/')[0]}</span>
                  </div>

                  {/* Middle Content */}
                  <div>
                    <h3 className="card-title">{project.title}</h3>
                    <p className="card-desc">{project.shortDescription}</p>
                  </div>

                  {/* Bottom Footer */}
                  <div className="card-footer">
                    <div className="tech-dots">
                      {project.techStack.slice(0, 3).map((tech, i) => (
                        <div key={i} className="tech-dot" title={tech} />
                      ))}
                    </div>
                    <button className="card-btn" aria-label={`View ${project.title}`}>
                      <ArrowUpRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="scroll-indicator">
          <div className="scroll-line" />
          <span className="scroll-text">Scroll to Explore</span>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-top">
            <div className="footer-content-left">
              <h2 className="footer-heading">Let's work together.</h2>
              <p className="footer-desc">
                Available for high-stakes engineering projects, creative development, and technical consulting.
              </p>
              <button 
                onClick={() => setIsContactOpen(true)} 
                className="footer-btn"
              >
                Get in Touch <Mail size={16} />
              </button>
            </div>

            <div className="footer-socials">
              <SocialLink href="https://github.com/helloSayanDeb" icon={<GithubIcon size={18} />} label="Github" />
              <SocialLink href="https://linkedin.com/in" icon={<LinkedinIcon size={18} />} label="LinkedIn" />
              <SocialLink href="https://twitter.com" icon={<TwitterIcon size={18} />} label="Twitter" />
              <SocialLink href="https://dribbble.com" icon={<DribbbleIcon size={18} />} label="Dribbble" />
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>© 2026 Sayan Deb. All rights reserved.</p>
            <p>Built with Next.js 15 App Router, React 19 & GSAP 3D</p>
          </div>
        </div>
      </footer>

      {/* Interactive Server Action Contact Modal */}
      <ContactModal 
        isOpen={isContactOpen} 
        onClose={() => setIsContactOpen(false)} 
      />
    </div>
  );
};

const SocialLink = ({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer" 
    className="social-link"
    aria-label={label}
  >
    <div className="social-hover" />
    <div className="relative z-10">{icon}</div>
  </a>
);
