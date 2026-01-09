import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from './data';
import { Project } from './types';
import { 
  X, 
  Github, 
  Linkedin, 
  Twitter, 
  Dribbble, 
  Mail, 
  ArrowUpRight, 
  Layers,
  Cpu,
  Zap,
  Globe,
  Database,
  Lock
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  
  // Refs for Modal Animation
  const modalRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const modalGlareRef = useRef<HTMLDivElement>(null);

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Initialize Scroll Animation
  useEffect(() => {
    if (!containerRef.current || !scrollContainerRef.current) return;

    const cards = cardsRef.current.filter(Boolean);
    const totalCards = cards.length;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: scrollContainerRef.current,
        start: "top top",
        end: "+=500%", 
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
          ease: "power1.in"
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
          ease: "none",
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
          ease: "none",
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
          ease: "power1.out"
        });

      const offset = i * 0.25; 
      tl.add(cardTl, offset);
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  // Handle Modal Entry Animation & Interactions
  useEffect(() => {
    let ctx: gsap.Context;

    if (selectedProject && modalRef.current && backdropRef.current) {
      // Create a context for easy cleanup of all modal-related animations
      ctx = gsap.context(() => {
        // 1. Reset State
        gsap.set(backdropRef.current, { opacity: 0 });
        gsap.set(modalRef.current, { 
          scale: 0.5, 
          opacity: 0, 
          rotationX: 45, 
          y: 100 
        });

        // 2. Animate In
        gsap.to(backdropRef.current, { 
          opacity: 1, 
          duration: 0.5,
          ease: "power2.out"
        });

        gsap.to(modalRef.current, {
          scale: 1,
          opacity: 1,
          rotationX: 0,
          y: 0,
          duration: 0.8,
          ease: "back.out(1.2)", 
          delay: 0.1
        });

        // 3. Glare Effect (Continuous Loop)
        if (modalGlareRef.current) {
            gsap.fromTo(modalGlareRef.current, 
              { xPercent: -200, opacity: 0, skewX: -20 },
              { 
                xPercent: 200, 
                opacity: 0.4,
                duration: 2.5, 
                ease: "power2.inOut", 
                repeat: -1, 
                repeatDelay: 5,
                delay: 0.8
              }
            );
        }

        // 4. Parallax Effects within Modal
        // Using the modal itself as the scroller
        
        // Parallax Title (Left Column) - Moves slower than scroll
        gsap.to(".modal-parallax-title", {
            y: 80, // Moves down as you scroll (lags behind)
            ease: "none",
            scrollTrigger: {
                trigger: ".modal-parallax-title",
                scroller: modalRef.current,
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        });

        // Parallax Stats (Right Column) - Moves faster/up
        gsap.to(".modal-parallax-stats", {
            y: -50, // Moves up against scroll (leads)
            ease: "none",
            scrollTrigger: {
                trigger: ".modal-content-right",
                scroller: modalRef.current,
                start: "top center",
                end: "bottom top",
                scrub: true
            }
        });

      }, modalRef); // Scope selector to modalRef
    }

    return () => {
      if (ctx) ctx.revert();
    };
  }, [selectedProject]);

  const handleCardClick = (project: Project) => {
    setSelectedProject(project);
  };

  const handleClose = () => {
    if (modalRef.current && backdropRef.current) {
      // Animate Out
      gsap.to(modalRef.current, {
        scale: 0.8,
        opacity: 0,
        rotationX: -20,
        y: -50,
        duration: 0.4,
        ease: "power3.in",
        onComplete: () => setSelectedProject(null)
      });
      
      gsap.to(backdropRef.current, {
        opacity: 0,
        duration: 0.4,
        delay: 0.1
      });
    } else {
      setSelectedProject(null);
    }
  };

  return (
    <div className="app-root">
      
      {/* Scroll Container (Pinned) */}
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
              <p className="hero-subtitle">
                Creative Developer & UI Engineer
              </p>
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
              ref={el => cardsRef.current[index] = el}
              onClick={() => handleCardClick(project)}
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
                    <span className="card-version">
                      {project.version}
                    </span>
                    <span className="card-number">
                      {project.projectNumber.split('/')[0]}
                    </span>
                  </div>

                  {/* Middle Content */}
                  <div>
                    <h3 className="card-title">
                      {project.title}
                    </h3>
                    <p className="card-desc">
                      {project.shortDescription}
                    </p>
                  </div>

                  {/* Bottom Footer */}
                  <div className="card-footer">
                    <div className="tech-dots">
                      {project.techStack.slice(0, 3).map((tech, i) => (
                        <div key={i} className="tech-dot" />
                      ))}
                    </div>
                    <button className="card-btn">
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

      {/* Footer Section (Appears after scroll) */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-top">
            <div className="footer-content-left">
              <h2 className="footer-heading">Let's work together.</h2>
              <p className="footer-desc">
                Available for freelance projects and technical consulting.
              </p>
              <a href="mailto:hello@sayandeb.com" className="footer-btn">
                Get in Touch <Mail size={16} />
              </a>
            </div>
            
            <div className="footer-socials">
              <SocialLink href="#" icon={<Github size={18} />} label="Github" />
              <SocialLink href="#" icon={<Linkedin size={18} />} label="LinkedIn" />
              <SocialLink href="#" icon={<Twitter size={18} />} label="Twitter" />
              <SocialLink href="#" icon={<Dribbble size={18} />} label="Dribbble" />
            </div>
          </div>
          <div className="footer-bottom">
              <p>© 2024 Sayan Deb. All rights reserved.</p>
              <p>Designed & Developed with React + GSAP</p>
          </div>
        </div>
      </footer>

      {/* Expanded Project Modal */}
      {selectedProject && (
        <div className="modal-overlay perspective-container">
          
          {/* Backdrop */}
          <div 
            ref={backdropRef}
            className="modal-backdrop"
            onClick={handleClose}
          />
          
          {/* Modal Content */}
          <div 
            ref={modalRef}
            className="modal-container"
          >
             {/* Animated Glare Layer */}
             <div 
               ref={modalGlareRef}
               className="modal-glare"
             />

             {/* Close Button */}
             <button 
              onClick={handleClose}
              className="modal-close"
            >
              <X size={20} />
            </button>

            <div className="modal-layout">
              
              {/* Left Column: Header & Info */}
              <div className="modal-left">
                 {/* Decorative metal edge */}
                 <div className="metal-edge"></div>

                 <div className="modal-parallax-title" style={{ marginTop: 'auto', marginBottom: 'auto' }}>
                   <div className="modal-meta">
                     <span className="meta-tag">{selectedProject.projectNumber}</span>
                     <span className="meta-tag">{selectedProject.version}</span>
                   </div>
                   <h2 className="modal-title">{selectedProject.title}</h2>
                   <p className="modal-desc">
                     {selectedProject.fullDescription}
                   </p>
                 </div>

                 <div style={{ marginTop: 'auto' }}>
                   <h4 className="modal-tech-title">Technology Stack</h4>
                   <div className="tech-tags">
                     {selectedProject.techStack.map((tech, i) => (
                       <span key={i} className="tech-tag">
                         {tech}
                       </span>
                     ))}
                   </div>
                 </div>
              </div>

              {/* Right Column: Details & Features */}
              <div className="modal-content-right modal-right">
                {/* Background Grid */}
                <div className="grid-bg"></div>

                <div className="relative z-10">
                  {/* Stats Row */}
                  <div className="stats-grid modal-parallax-stats">
                     {selectedProject.stats.map((stat, i) => (
                       <div key={i} className="stat-card">
                         <span className="stat-value">{stat.value}</span>
                         <span className="stat-label">{stat.label}</span>
                       </div>
                     ))}
                  </div>

                  {/* Features Grid */}
                  <h4 className="features-title">Key Features</h4>
                  <div className="features-grid">
                    {selectedProject.features.map((feature, i) => (
                        <div key={i} className="feature-item">
                        <div className="feature-icon">
                            {getFeatureIcon(i)}
                        </div>
                        <div className="feature-text">
                            <h5>{feature}</h5>
                            <p>Optimized for high performance and scalability.</p>
                        </div>
                        </div>
                    ))}
                  </div>
                </div>

                {/* Call to Action in Modal */}
                <div className="modal-cta">
                   <button className="cta-btn group">
                     View Live Project <ArrowUpRight size={16} />
                   </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}

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
    <div className="social-hover"></div>
    <div className="relative z-10">{icon}</div>
  </a>
);

// Helper to get random icons for features
const getFeatureIcon = (index: number) => {
  const icons = [
    <Layers size={16} />,
    <Cpu size={16} />,
    <Zap size={16} />,
    <Globe size={16} />,
    <Database size={16} />,
    <Lock size={16} />
  ];
  return icons[index % icons.length];
};

export default App;