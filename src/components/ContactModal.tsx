'use client';

import React, { useActionState, useEffect, useRef } from 'react';
import { submitContactAction, ContactState } from '@/app/actions/contact';
import { X, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import gsap from 'gsap';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [state, formAction, isPending] = useActionState<ContactState | null, FormData>(
    submitContactAction,
    null
  );

  const modalRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    let ctx: gsap.Context;
    if (modalRef.current && backdropRef.current) {
      ctx = gsap.context(() => {
        gsap.fromTo(backdropRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
        gsap.fromTo(
          modalRef.current,
          { scale: 0.9, opacity: 0, y: 30 },
          { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: 'back.out(1.2)' }
        );
      });
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (ctx) ctx.revert();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div 
        ref={backdropRef} 
        className="modal-backdrop" 
        onClick={onClose} 
      />

      <div ref={modalRef} className="contact-modal-content brushed-metal">
        <button 
          onClick={onClose} 
          className="modal-close"
          aria-label="Close contact dialog"
        >
          <X size={20} />
        </button>

        <div className="contact-header">
          <h2 className="contact-title">Start a Project</h2>
          <p className="contact-subtitle">
            Need high-performance frontend architecture, creative engineering, or technical consultation? Fill out the brief below.
          </p>
        </div>

        {state?.success ? (
          <div className="form-status success flex flex-col items-center text-center">
            <CheckCircle2 size={36} className="mb-2 text-green-400" />
            <p className="font-semibold">{state.message}</p>
            <button 
              onClick={onClose} 
              className="submit-btn" 
              style={{ marginTop: '1.5rem' }}
            >
              Done
            </button>
          </div>
        ) : (
          <form action={formAction} className="contact-form">
            {state && !state.success && (
              <div className="form-status error flex items-center gap-2">
                <AlertCircle size={18} />
                <span>{state.message}</span>
              </div>
            )}

            <div className="form-group">
              <label htmlFor="name" className="form-label">Your Name</label>
              <input 
                id="name" 
                name="name" 
                type="text" 
                required 
                placeholder="e.g. Alex Rivera" 
                className="form-input" 
              />
              {state?.errors?.name && (
                <span className="form-error">{state.errors.name[0]}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">Email Address</label>
              <input 
                id="email" 
                name="email" 
                type="email" 
                required 
                placeholder="alex@company.com" 
                className="form-input" 
              />
              {state?.errors?.email && (
                <span className="form-error">{state.errors.email[0]}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="projectType" className="form-label">Inquiry Scope</label>
              <select id="projectType" name="projectType" className="form-select">
                <option value="Next.js / Frontend Engineering">Next.js / Frontend Engineering</option>
                <option value="3D WebGL / Creative Interactions">3D WebGL / Creative Interactions</option>
                <option value="Full-Stack Technical Architecture">Full-Stack Technical Architecture</option>
                <option value="Design System Consulting">Design System Consulting</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="message" className="form-label">Project Details</label>
              <textarea 
                id="message" 
                name="message" 
                required 
                placeholder="Tell me about the goals, timeline, and vision..." 
                className="form-textarea" 
              />
              {state?.errors?.message && (
                <span className="form-error">{state.errors.message[0]}</span>
              )}
            </div>

            <button type="submit" disabled={isPending} className="submit-btn">
              {isPending ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Transmitting...
                </>
              ) : (
                <>
                  Send Message <Send size={15} />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
