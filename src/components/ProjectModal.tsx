'use client';

import React, { useEffect, useRef } from 'react';
import { Project } from '@/types';
import { 
  X, 
  ArrowUpRight, 
  Layers, 
  Cpu, 
  Zap, 
  Globe, 
  Database, 
  Lock 
} from 'lucide-react';
import { GithubIcon } from './Icons';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ProjectModalProps {
  project: Project;
  onClose?: () => void;
  isStandalone?: boolean;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ 
  project, 
  onClose = () => {},
  isStandalone = false 
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const modalGlareRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // If standalone page, we don't need entry popup animation
    if (isStandalone) return;

    let ctx: gsap.Context;

    if (modalRef.current && backdropRef.current) {
      ctx = gsap.context(() => {
        // Reset state
        gsap.set(backdropRef.current, { opacity: 0 });
        gsap.set(modalRef.current, { 
          scale: 0.85, 
          opacity: 0, 
          rotationX: 25, 
          y: 60 
        });

        // Animate Backdrop in
        gsap.to(backdropRef.current, { 
          opacity: 1, 
          duration: 0.4,
          ease: "power2.out"
        });

        // Animate Modal container in
        gsap.to(modalRef.current, {
          scale: 1,
          opacity: 1,
          rotationX: 0,
          y: 0,
          duration: 0.65,
          ease: "back.out(1.15)", 
          delay: 0.05
        });

        // Continuous luxury glare sweep
        if (modalGlareRef.current) {
          gsap.fromTo(
            modalGlareRef.current,
            { xPercent: -200, opacity: 0, skewX: -20 },
            { 
              xPercent: 200, 
              opacity: 0.4,
              duration: 2.5, 
              ease: "power2.inOut", 
              repeat: -1, 
              repeatDelay: 5,
              delay: 0.5
            }
          );
        }

        // Parallax inside the modal scroller
        if (modalRef.current) {
          gsap.to(".modal-parallax-title", {
            y: 50,
            ease: "none",
            scrollTrigger: {
              trigger: ".modal-parallax-title",
              scroller: modalRef.current,
              start: "top top",
              end: "bottom top",
              scrub: true
            }
          });

          gsap.to(".modal-parallax-stats", {
            y: -30,
            ease: "none",
            scrollTrigger: {
              trigger: ".modal-content-right",
              scroller: modalRef.current,
              start: "top center",
              end: "bottom top",
              scrub: true
            }
          });
        }
      }, modalRef);
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleModalClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (ctx) ctx.revert();
    };
  }, [isStandalone]);

  const handleModalClose = () => {
    if (isStandalone) {
      onClose();
      return;
    }

    if (modalRef.current && backdropRef.current) {
      gsap.to(modalRef.current, {
        scale: 0.88,
        opacity: 0,
        rotationX: -15,
        y: -40,
        duration: 0.3,
        ease: "power2.in",
        onComplete: onClose
      });
      gsap.to(backdropRef.current, {
        opacity: 0,
        duration: 0.3,
        delay: 0.05
      });
    } else {
      onClose();
    }
  };

  const getFeatureIcon = (index: number) => {
    const icons = [
      <Layers key="1" size={16} />,
      <Cpu key="2" size={16} />,
      <Zap key="3" size={16} />,
      <Globe key="4" size={16} />,
      <Database key="5" size={16} />,
      <Lock key="6" size={16} />
    ];
    return icons[index % icons.length];
  };

  const modalBody = (
    <div 
      ref={modalRef}
      className={`modal-container ${isStandalone ? 'standalone-container' : ''}`}
      style={isStandalone ? { opacity: 1 } : undefined}
    >
      {/* Animated Glare Layer */}
      <div ref={modalGlareRef} className="modal-glare" />

      {/* Close Button */}
      {!isStandalone && (
        <button 
          onClick={handleModalClose}
          className="modal-close"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>
      )}

      <div className="modal-layout">
        {/* Left Column: Header & Info */}
        <div className="modal-left">
          <div className="metal-edge" />

          <div className="modal-parallax-title" style={{ marginTop: 'auto', marginBottom: 'auto' }}>
            <div className="modal-meta">
              <span className="meta-tag">{project.projectNumber}</span>
              <span className="meta-tag">{project.version}</span>
            </div>
            <h2 className="modal-title">{project.title}</h2>
            <p className="modal-desc">
              {project.fullDescription}
            </p>
          </div>

          <div style={{ marginTop: 'auto' }}>
            <h4 className="modal-tech-title">Technology Stack</h4>
            <div className="tech-tags">
              {project.techStack.map((tech, i) => (
                <span key={i} className="tech-tag">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Details & Features */}
        <div className="modal-content-right modal-right">
          <div className="grid-bg" />

          <div className="relative z-10">
            {/* Stats Row */}
            <div className="stats-grid modal-parallax-stats">
              {project.stats.map((stat, i) => (
                <div key={i} className="stat-card">
                  <span className="stat-value">{stat.value}</span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              ))}
            </div>

            {/* Features Grid */}
            <h4 className="features-title">Key Architectural Features</h4>
            <div className="features-grid">
              {project.features.map((feature, i) => (
                <div key={i} className="feature-item">
                  <div className="feature-icon">
                    {getFeatureIcon(i)}
                  </div>
                  <div className="feature-text">
                    <h5>{feature}</h5>
                    <p>Engineered for high-concurrency throughput and fault tolerance.</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action in Modal */}
          <div className="modal-cta">
            {project.githubUrl && (
              <a 
                href={project.githubUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="cta-btn cta-btn-secondary"
              >
                <GithubIcon size={16} /> Source Code
              </a>
            )}
            <a 
              href={project.demoUrl || '#'} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="cta-btn"
            >
              View Live Project <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  if (isStandalone) {
    return modalBody;
  }

  return (
    <div className="modal-overlay perspective-container">
      {/* Backdrop */}
      <div 
        ref={backdropRef}
        className="modal-backdrop"
        onClick={handleModalClose}
      />
      {modalBody}
    </div>
  );
};
