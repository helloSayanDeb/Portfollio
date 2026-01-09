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
    <div className="bg-black min-h-screen text-white font-sans selection:bg-white/20">
      
      {/* Scroll Container (Pinned) */}
      <div ref={scrollContainerRef} className="h-screen w-full relative overflow-hidden flex items-center justify-center">
        
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] via-[#050505] to-black z-0 pointer-events-none" />
        
        {/* Static Hero Content */}
        <div className="absolute z-0 flex flex-col items-center justify-center w-full h-full pointer-events-none select-none px-4">
           {/* Ambient Glow */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-neutral-900/40 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

          <div className="relative z-10 flex flex-col items-center justify-center transform -translate-y-12 w-full">
             <h1 className="font-display font-extrabold text-[16vw] leading-[0.8] tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-neutral-500 via-neutral-800 to-black"
                 style={{ 
                   WebkitTextStroke: '1px rgba(255,255,255,0.1)',
                   filter: 'drop-shadow(0 0 40px rgba(0,0,0,0.8))' 
                 }}>
              SAYAN
            </h1>
            <h1 className="font-display font-extrabold text-[16vw] leading-[0.8] tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-neutral-500 via-neutral-800 to-black"
                 style={{ 
                   WebkitTextStroke: '1px rgba(255,255,255,0.1)',
                   filter: 'drop-shadow(0 0 40px rgba(0,0,0,0.8))' 
                 }}>
              DEB
            </h1>
            
            <div className="mt-8 md:mt-10 flex items-center justify-center gap-3 md:gap-6 opacity-80 w-full max-w-2xl mx-auto">
              <div className="h-px w-6 md:w-32 bg-gradient-to-r from-transparent via-neutral-500 to-transparent shrink-0" />
              <p className="font-sans text-neutral-500 tracking-[0.2em] md:tracking-[0.5em] text-[10px] md:text-sm font-medium uppercase whitespace-nowrap text-center">
                Creative Developer & UI Engineer
              </p>
              <div className="h-px w-6 md:w-32 bg-gradient-to-r from-transparent via-neutral-500 to-transparent shrink-0" />
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
              className="absolute w-[85vw] h-[48vh] md:w-[360px] md:h-[500px] cursor-pointer pointer-events-auto card-3d group"
            >
              {/* Card Content Structure */}
              <div className="relative w-full h-full bg-[#0a0a0a] brushed-metal border-l border-t border-white/10 shadow-2xl transition-all duration-300 group-hover:border-white/30 group-hover:scale-[1.02] overflow-hidden flex flex-col">
                
                {/* Light Sweep Effect on Hover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out z-20 pointer-events-none" />

                {/* Card Inner Layout */}
                <div className="relative z-10 p-6 md:p-8 flex flex-col h-full justify-between">
                  
                  {/* Top Header */}
                  <div className="flex justify-between items-start">
                    <span className="font-mono text-[10px] md:text-xs text-neutral-500 tracking-widest border border-white/10 px-2 py-1 bg-black/40 backdrop-blur-sm">
                      {project.version}
                    </span>
                    <span className="font-display text-3xl md:text-4xl text-neutral-800 font-bold opacity-30">
                      {project.projectNumber.split('/')[0]}
                    </span>
                  </div>

                  {/* Middle Content */}
                  <div className="space-y-3 md:space-y-4">
                    <h3 className="font-display text-2xl md:text-3xl font-bold text-white leading-tight group-hover:text-neutral-200 transition-colors">
                      {project.title}
                    </h3>
                    <p className="font-sans text-xs md:text-sm text-neutral-400 leading-relaxed line-clamp-3">
                      {project.shortDescription}
                    </p>
                  </div>

                  {/* Bottom Footer */}
                  <div className="flex justify-between items-end border-t border-white/5 pt-4 md:pt-6 mt-2">
                    <div className="flex gap-2">
                      {project.techStack.slice(0, 3).map((tech, i) => (
                        <div key={i} className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-neutral-700 group-hover:bg-white transition-colors duration-300" />
                      ))}
                    </div>
                    <button className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center bg-white/5 border border-white/10 hover:bg-white hover:text-black transition-all duration-300 group/btn">
                      <ArrowUpRight size={16} className="md:w-[18px] md:h-[18px] group-hover/btn:rotate-45 transition-transform" />
                    </button>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40 z-0">
          <div className="w-[1px] h-8 md:h-12 bg-gradient-to-b from-transparent via-white to-transparent animate-pulse" />
          <span className="text-[9px] md:text-[10px] tracking-widest uppercase">Scroll to Explore</span>
        </div>

      </div>

      {/* Footer Section (Appears after scroll) */}
      <footer className="relative z-10 bg-[#050505] border-t border-white/10 py-12 md:py-20 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 md:gap-10">
          <div className="flex flex-col gap-4 text-center md:text-left">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white">Let's work together.</h2>
            <p className="text-neutral-500 max-w-md text-sm md:text-base">
              Available for freelance projects and technical consulting.
            </p>
            <a href="mailto:hello@sayandeb.com" className="inline-flex items-center justify-center gap-2 mt-4 px-6 md:px-8 py-3 md:py-4 bg-white text-black font-bold uppercase tracking-wide hover:bg-neutral-200 transition-colors w-fit mx-auto md:mx-0 text-sm md:text-base">
              Get in Touch <Mail size={16} />
            </a>
          </div>
          
          <div className="flex gap-4 md:gap-6">
            <SocialLink href="#" icon={<Github size={18} />} label="Github" />
            <SocialLink href="#" icon={<Linkedin size={18} />} label="LinkedIn" />
            <SocialLink href="#" icon={<Twitter size={18} />} label="Twitter" />
            <SocialLink href="#" icon={<Dribbble size={18} />} label="Dribbble" />
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 md:mt-20 text-center md:text-left text-neutral-600 text-xs md:text-sm flex flex-col md:flex-row gap-4 justify-between items-center border-t border-white/5 pt-8">
            <p>© 2024 Sayan Deb. All rights reserved.</p>
            <p>Designed & Developed with React + GSAP</p>
        </div>
      </footer>

      {/* Expanded Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-8 perspective-container">
          
          {/* Backdrop */}
          <div 
            ref={backdropRef}
            className="absolute inset-0 bg-black/80 backdrop-blur-xl opacity-0" 
            onClick={handleClose}
          />
          
          {/* Modal Content */}
          <div 
            ref={modalRef}
            className="relative w-full h-full md:max-w-6xl md:h-[90vh] bg-[#0a0a0a] md:border border-white/10 shadow-2xl overflow-y-auto brushed-metal opacity-0 group"
            style={{ transformStyle: 'preserve-3d' }}
          >
             {/* Animated Glare Layer */}
             <div 
               ref={modalGlareRef}
               className="absolute inset-0 w-full h-full pointer-events-none z-20"
               style={{
                 background: 'linear-gradient(115deg, transparent 40%, rgba(255,255,255,0.05) 45%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.05) 55%, transparent 60%)',
                 backgroundSize: '200% 100%'
               }}
             />

             {/* Close Button */}
             <button 
              onClick={handleClose}
              className="fixed md:absolute top-4 right-4 md:top-6 md:right-6 z-50 p-2 bg-black/50 border border-white/10 hover:bg-white hover:text-black transition-colors rounded-full md:rounded-none"
            >
              <X size={20} className="md:w-6 md:h-6" />
            </button>

            <div className="flex flex-col lg:flex-row min-h-full">
              
              {/* Left Column: Header & Info */}
              <div className="w-full lg:w-1/3 p-6 md:p-12 border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col gap-6 md:gap-8 bg-gradient-to-b from-[#111] to-[#0a0a0a] relative z-10">
                 {/* Decorative metal edge */}
                 <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

                 <div className="modal-parallax-title mt-8 md:mt-0">
                   <div className="flex items-center gap-3 mb-4">
                     <span className="text-[10px] md:text-xs font-mono text-neutral-400 border border-white/10 px-2 py-0.5">{selectedProject.projectNumber}</span>
                     <span className="text-[10px] md:text-xs font-mono text-neutral-400 border border-white/10 px-2 py-0.5">{selectedProject.version}</span>
                   </div>
                   <h2 className="font-display text-3xl md:text-5xl font-bold mb-4 md:mb-6 text-white text-glow leading-tight">{selectedProject.title}</h2>
                   <p className="font-sans text-base md:text-lg text-neutral-400 leading-relaxed">
                     {selectedProject.fullDescription}
                   </p>
                 </div>

                 <div className="mt-auto pt-6 md:pt-0">
                   <h4 className="text-xs md:text-sm font-bold uppercase tracking-widest text-neutral-500 mb-3 md:mb-4">Technology Stack</h4>
                   <div className="flex flex-wrap gap-2">
                     {selectedProject.techStack.map((tech, i) => (
                       <span key={i} className="px-2 py-1 md:px-3 md:py-1.5 bg-[#151515] border border-white/5 text-neutral-300 text-xs md:text-sm hover:border-white/20 transition-colors cursor-default">
                         {tech}
                       </span>
                     ))}
                   </div>
                 </div>
              </div>

              {/* Right Column: Details & Features */}
              <div className="w-full lg:w-2/3 p-6 md:p-12 bg-[#050505] relative overflow-hidden modal-content-right pb-20 md:pb-12">
                {/* Background Grid */}
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #333 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

                <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  {/* Stats Row */}
                  <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8 modal-parallax-stats">
                     {selectedProject.stats.map((stat, i) => (
                       <div key={i} className="p-3 md:p-4 border border-white/5 bg-[#0a0a0a] flex flex-col items-center justify-center text-center">
                         <span className="text-xl md:text-3xl font-display font-bold text-white mb-1">{stat.value}</span>
                         <span className="text-[10px] md:text-xs text-neutral-500 uppercase tracking-wider">{stat.label}</span>
                       </div>
                     ))}
                  </div>

                  {/* Features Grid */}
                  <h4 className="md:col-span-2 text-xs md:text-sm font-bold uppercase tracking-widest text-neutral-500 mb-0 md:mb-2 mt-2 md:mt-4">Key Features</h4>
                  {selectedProject.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3 md:gap-4 p-3 md:p-4 border border-white/5 hover:border-white/20 transition-colors bg-[#0a0a0a]/50">
                      <div className="mt-1 text-white/50">
                         {getFeatureIcon(i)}
                      </div>
                      <div>
                        <h5 className="text-white text-sm md:text-base font-medium mb-1">{feature}</h5>
                        <p className="text-[10px] md:text-xs text-neutral-500">Optimized for high performance and scalability.</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Call to Action in Modal */}
                <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-white/5 flex justify-end relative z-10">
                   <button className="flex items-center gap-2 md:gap-3 px-5 py-3 md:px-6 md:py-3 bg-white text-black font-bold uppercase hover:bg-neutral-200 transition-colors group text-sm md:text-base w-full md:w-auto justify-center">
                     View Live Project <ArrowUpRight size={16} className="md:w-[18px] md:h-[18px] group-hover:rotate-45 transition-transform" />
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
    className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center border border-white/10 text-neutral-400 hover:text-white hover:border-white transition-all duration-300 bg-[#0a0a0a] group relative overflow-hidden"
    aria-label={label}
  >
    <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
    <div className="relative z-10">{icon}</div>
  </a>
);

// Helper to get random icons for features
const getFeatureIcon = (index: number) => {
  const icons = [
    <Layers size={16} className="md:w-[18px] md:h-[18px]" />,
    <Cpu size={16} className="md:w-[18px] md:h-[18px]" />,
    <Zap size={16} className="md:w-[18px] md:h-[18px]" />,
    <Globe size={16} className="md:w-[18px] md:h-[18px]" />,
    <Database size={16} className="md:w-[18px] md:h-[18px]" />,
    <Lock size={16} className="md:w-[18px] md:h-[18px]" />
  ];
  return icons[index % icons.length];
};

export default App;