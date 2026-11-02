'use client';

import React, { useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Project } from '@/types';

interface OverclockDossierModalProps {
  project: Project;
  onClose?: () => void;
  isStandalone?: boolean;
}

export function OverclockDossierModal({
  project,
  onClose,
  isStandalone = false,
}: OverclockDossierModalProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onClose) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isStandalone) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isStandalone, handleKeyDown]);

  const content = (
    <article className="oc-modal-container" role="dialog" aria-modal={!isStandalone} aria-label={project.title}>
      {/* Top Bar */}
      <div className="oc-modal-bar">
        <span className="oc-modal-bar-title">
          DOSSIER // {project.projectNumber} · {project.issueTag || 'ENGINEERING ARCHIVE'}
        </span>
        {!isStandalone && onClose && (
          <button
            type="button"
            onClick={onClose}
            className="oc-modal-close"
            aria-label="Close project dossier"
          >
            ✕
          </button>
        )}
      </div>

      {/* Body Content */}
      <div className="oc-modal-body">
        <div className="oc-modal-hero">
          <div>
            <span className="oc-role">{project.category}</span>
            <h2>{project.title}</h2>
          </div>
          <div className="oc-modal-stamp">{project.version}</div>
        </div>

        <p className="oc-hero-lead" style={{ margin: '0 0 18px', maxWidth: '100%' }}>
          {project.fullDescription || project.shortDescription}
        </p>

        {/* Feature List */}
        <div>
          <span className="oc-issue">ENGINEERING SPECIFICATIONS &amp; CAPABILITIES</span>
          <ul className="oc-modal-features">
            {project.features.map((feat, idx) => (
              <li key={idx}>{feat}</li>
            ))}
          </ul>
        </div>

        {/* Tech Badges */}
        <div style={{ marginTop: '16px' }}>
          <span className="oc-issue">SYSTEM TECH STACK</span>
          <div className="oc-tags" style={{ marginTop: '8px' }}>
            {project.techStack.map((tech, idx) => (
              <span key={idx} className="oc-tag">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        {project.stats && project.stats.length > 0 && (
          <div className="oc-modal-stats-grid">
            {project.stats.map((s, idx) => (
              <div key={idx} className="oc-modal-stat-box">
                <b>{s.value}</b>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        )}

        {/* Action Controls */}
        <div className="oc-modal-actions">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="oc-btn"
            >
              {project.demoUrl.includes('github') ? 'View Source Code ↗' : 'Launch Live Demo ↗'}
            </a>
          )}
          {project.githubUrl && !project.demoUrl?.includes('github') && (
            project.isPrivate ? (
              <span className="oc-btn oc-btn-ghost oc-btn-sm" style={{ opacity: 0.85, cursor: 'default' }}>
                Org Repository (Private) 🔒
              </span>
            ) : (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="oc-btn oc-btn-ghost"
              >
                GitHub Repository ↗
              </a>
            )
          )}
          {isStandalone ? (
            <Link href="/" className="oc-btn oc-btn-ghost">
              ← Return to Main Comic Issue
            </Link>
          ) : (
            onClose && (
              <button type="button" onClick={onClose} className="oc-btn oc-btn-ghost">
                Close Dossier [Esc]
              </button>
            )
          )}
        </div>
      </div>
    </article>
  );

  if (isStandalone) {
    return content;
  }

  return (
    <div
      className="oc-modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget && onClose) {
          onClose();
        }
      }}
    >
      {content}
    </div>
  );
}
