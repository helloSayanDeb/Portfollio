'use client';

import React from 'react';
import Link from 'next/link';
import { Project } from '@/types';

interface OverclockProjectsProps {
  projects: Project[];
}

export function OverclockProjects({ projects }: OverclockProjectsProps) {
  const featuredProjects = projects.filter((p) => p.featured);
  const regularProjects = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="oc-wrap" aria-label="Project Archives">
      <div className="oc-section-title">
        <div>
          <span className="oc-issue">CHAPTER I &amp; II // 07 BATTLE-TESTED SYSTEMS</span>
          <h2>PROJECT ARCHIVES</h2>
        </div>
        <p>
          High-performance web applications, hardware EDA tooling, computer vision models,
          and quant finance simulators built with pure ink and obsessive engineering.
        </p>
      </div>

      {/* Chapter I: Double-Spread Panels for Top Systems */}
      <div className="oc-spread-grid">
        {featuredProjects.map((project, idx) => {
          const isAlt = idx % 2 === 1;
          const sfx = idx === 0 ? 'ドオオン' : idx === 1 ? 'ゴゴゴ' : 'バァァン';
          return (
            <article
              key={project.id}
              className={`oc-card oc-spread-card ${isAlt ? 'oc-card-alt' : ''}`}
            >
              {/* Art Side */}
              <div className="oc-art">
                <span className="oc-num" aria-hidden="true">
                  {project.projectNumber.split('/')[0]}
                </span>
                <div className="oc-speed" aria-hidden="true" />
                <span className="oc-sfx" aria-hidden="true">
                  {sfx}
                </span>

                <div className="oc-art-label">
                  {project.title.split(':')[0]}
                  <small>{project.category}</small>
                </div>

                {project.id === 1 && (
                  <div
                    className="oc-art-code"
                    style={{
                      marginTop: '12px',
                      fontSize: '11px',
                      textAlign: 'left',
                      position: 'relative',
                      zIndex: 4,
                    }}
                  >
                    <span style={{ color: '#8A8A85' }}>% Lemmata Engine</span>
                    <br />
                    {`\\int_{-\\infty}^{+\\infty} e^{-x^2} dx = \\sqrt{\\pi}`}
                    <br />
                    <span
                      style={{
                        background: '#f8f8f5',
                        color: '#111',
                        padding: '1px 5px',
                        fontWeight: 700,
                      }}
                    >
                      COMPILE &lt;120ms
                    </span>
                  </div>
                )}

                {project.id === 2 && (
                  <div
                    style={{
                      marginTop: '12px',
                      background: '#111',
                      color: '#fff',
                      padding: '8px 12px',
                      border: '2px solid #fff',
                      fontSize: '11px',
                      fontFamily: 'var(--oc-font-mono)',
                      position: 'relative',
                      zIndex: 4,
                    }}
                  >
                    <b>NISL.PORTAL // v2.0</b>
                    <br />
                    <span style={{ color: '#22c55e' }}>● HTTP 200 OK</span> · TTFB 38ms
                    <br />
                    ISR Cache: <span style={{ textDecoration: 'underline' }}>HIT (100% Static)</span>
                  </div>
                )}

                {project.id === 3 && (
                  <div
                    style={{
                      marginTop: '12px',
                      background: '#fff',
                      color: '#111',
                      border: '2px solid #111',
                      padding: '8px 12px',
                      fontSize: '11px',
                      fontFamily: 'var(--oc-font-mono)',
                      boxShadow: '4px 4px 0 #111',
                      position: 'relative',
                      zIndex: 4,
                    }}
                  >
                    <b>NIARS RESEARCH SOC.</b>
                    <br />
                    DOI: 10.1145/NIARS.2026.01
                    <br />
                    <i>Peer-Reviewed Proceedings</i>
                  </div>
                )}

                <div className="oc-art-tag">
                  {project.version}
                  <small>RELEASE</small>
                </div>
              </div>

              {/* Info Side */}
              <div className="oc-info">
                <div>
                  <span className="oc-role">{project.issueTag || 'FEATURED ARCHIVE'}</span>
                  <h3>{project.title}</h3>
                  <p className="oc-desc">{project.shortDescription}</p>

                  <div className="oc-tags" aria-label="Technologies used">
                    {project.techStack.map((tech, tIdx) => (
                      <span key={tIdx} className="oc-tag">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="oc-facts">
                    {project.stats.map((s, sIdx) => (
                      <span key={sIdx}>
                        <b>{s.label}:</b> {s.value}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="oc-card-actions">
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="oc-btn oc-btn-sm"
                    >
                      Live Demo ↗
                    </a>
                  )}
                  {project.githubUrl && (
                    project.isPrivate ? (
                      <span
                        className="oc-btn oc-btn-ghost oc-btn-sm"
                        style={{ opacity: 0.85, cursor: 'default' }}
                      >
                        Org Repo (Private) 🔒
                      </span>
                    ) : (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="oc-btn oc-btn-ghost oc-btn-sm"
                      >
                        GitHub Repo ↗
                      </a>
                    )
                  )}
                  <Link
                    href={`/project/${project.id}`}
                    scroll={false}
                    className="oc-btn oc-btn-ghost oc-btn-sm"
                  >
                    Dossier Details →
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Chapter II: Grid Panels for Secondary Engineering Explorations */}
      <div className="oc-grid-2">
        {regularProjects.map((project, idx) => {
          const sfx = idx === 0 ? 'ズズズ' : idx === 1 ? 'ピカッ' : idx === 2 ? 'ガタタ' : 'ギュン';
          return (
            <article key={project.id} className="oc-card oc-card-stacked">
              <div className="oc-art">
                <span className="oc-num" aria-hidden="true">
                  {project.projectNumber.split('/')[0]}
                </span>
                <div className="oc-speed" aria-hidden="true" />
                <span className="oc-sfx" aria-hidden="true">
                  {sfx}
                </span>

                <div className="oc-art-label">
                  {project.title.split(':')[0]}
                  <small>{project.category}</small>
                </div>

                {project.id === 4 && (
                  <div
                    style={{
                      marginTop: '8px',
                      background: '#111',
                      color: '#eaeae4',
                      padding: '5px 10px',
                      border: '1.5px solid #eaeae4',
                      fontSize: '11px',
                      fontFamily: 'var(--oc-font-mono)',
                      position: 'relative',
                      zIndex: 4,
                    }}
                  >
                    GPIO_21: SDA · GPIO_22: SCL<br />
                    <b>✓ PINOUT VERIFIED (NO CONFLICTS)</b>
                  </div>
                )}

                {project.id === 5 && (
                  <div
                    style={{
                      marginTop: '8px',
                      background: '#111',
                      color: '#eaeae4',
                      padding: '5px 10px',
                      border: '1.5px solid #eaeae4',
                      fontSize: '11px',
                      fontFamily: 'var(--oc-font-mono)',
                      position: 'relative',
                      zIndex: 4,
                    }}
                  >
                    [MEDIAPIPE 21-PT SKELETON]<br />
                    PINCH: 74% DIM · <b>INFERENCE &lt;35ms</b>
                  </div>
                )}

                {project.id === 6 && (
                  <div
                    style={{
                      marginTop: '6px',
                      background: '#111',
                      color: '#eaeae4',
                      padding: '4px 10px',
                      border: '1.5px solid #eaeae4',
                      fontSize: '11px',
                      fontFamily: 'var(--oc-font-mono)',
                      position: 'relative',
                      zIndex: 4,
                      textAlign: 'center',
                    }}
                  >
                    <svg viewBox="0 0 160 26" style={{ width: '130px', height: '22px', display: 'block', margin: '2px auto' }}>
                      <path
                        d="M0 13 L40 13 L48 4 L56 22 L64 8 L72 17 L80 13 L160 13"
                        fill="none"
                        stroke="#22c55e"
                        strokeWidth="2"
                      />
                    </svg>
                    <b>BLE GATT TELEMETRY STREAM</b>
                  </div>
                )}

                {project.id === 7 && (
                  <div
                    style={{
                      marginTop: '8px',
                      background: '#111',
                      color: '#eaeae4',
                      padding: '5px 10px',
                      border: '1.5px solid #eaeae4',
                      fontSize: '11px',
                      fontFamily: 'var(--oc-font-mono)',
                      position: 'relative',
                      zIndex: 4,
                    }}
                  >
                    MONTE CARLO: 10,000 PATHS<br />
                    <b>SHARPE: 1.84 · BETA: 0.92</b>
                  </div>
                )}

                <div className="oc-art-tag">
                  {project.version}
                  <small>SPEC</small>
                </div>
              </div>

              <div className="oc-info">
                <div>
                  <span className="oc-role">{project.issueTag || 'SPECIAL PROJECT'}</span>
                  <h3>{project.title}</h3>
                  <p className="oc-desc">{project.shortDescription}</p>

                  <div className="oc-tags">
                    {project.techStack.map((tech, tIdx) => (
                      <span key={tIdx} className="oc-tag">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="oc-facts">
                    {project.stats.map((s, sIdx) => (
                      <span key={sIdx}>
                        <b>{s.label}:</b> {s.value}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="oc-card-actions">
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="oc-btn oc-btn-sm"
                    >
                      {project.demoUrl.includes('github') ? 'Codebase ↗' : 'Launch Demo ↗'}
                    </a>
                  )}
                  {project.githubUrl && !project.demoUrl?.includes('github') && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="oc-btn oc-btn-ghost oc-btn-sm"
                    >
                      GitHub ↗
                    </a>
                  )}
                  <Link
                    href={`/project/${project.id}`}
                    scroll={false}
                    className="oc-btn oc-btn-ghost oc-btn-sm"
                  >
                    Dossier →
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
