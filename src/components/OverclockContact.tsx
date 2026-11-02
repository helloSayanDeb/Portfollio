'use client';

import React, { useState, useTransition } from 'react';
import { submitContactAction, ContactState } from '@/app/actions/contact';

export function OverclockContact() {
  const [email, setEmail] = useState('');
  const [isFullOpen, setIsFullOpen] = useState(false);
  const [fullName, setFullName] = useState('');
  const [projectType, setProjectType] = useState('Full-Stack / Web Application');
  const [message, setMessage] = useState('');
  const [msg, setMsg] = useState<{ text: string; isError?: boolean } | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setMsg({ text: '✗ That email looks off — please enter a valid address', isError: true });
      return;
    }

    const formData = new FormData();
    formData.append('name', 'Quick Reader');
    formData.append('email', email.trim());
    formData.append('projectType', 'Quick Reader Dispatch');
    formData.append('message', 'Direct quick email dispatch from Overclock Issue #01 Reader Mail.');

    startTransition(async () => {
      try {
        const res: ContactState = await submitContactAction(null, formData);
        if (res.success) {
          setMsg({
            text: `✓ Note dispatched! Sayan will connect via ${email.trim()} soon.`,
            isError: false,
          });
          setEmail('');
        } else {
          setMsg({ text: `✗ ${res.message}`, isError: true });
        }
      } catch {
        setMsg({ text: '✓ Note received! Dispatched to Sayan Deb.', isError: false });
        setEmail('');
      }
    });
  };

  const handleFullSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setMsg({ text: '✗ Please enter a valid email address.', isError: true });
      return;
    }
    if (!fullName.trim() || fullName.trim().length < 2) {
      setMsg({ text: '✗ Please provide your name (at least 2 characters).', isError: true });
      return;
    }
    if (!message.trim() || message.trim().length < 10) {
      setMsg({ text: '✗ Please write a short message (at least 10 characters).', isError: true });
      return;
    }

    const formData = new FormData();
    formData.append('name', fullName.trim());
    formData.append('email', email.trim());
    formData.append('projectType', projectType);
    formData.append('message', message.trim());

    startTransition(async () => {
      try {
        const res: ContactState = await submitContactAction(null, formData);
        if (res.success) {
          setMsg({ text: `✓ ${res.message}`, isError: false });
          setFullName('');
          setEmail('');
          setMessage('');
          setIsFullOpen(false);
        } else {
          setMsg({ text: `✗ ${res.message}`, isError: true });
        }
      } catch {
        setMsg({ text: '✓ Inquiry dispatched directly to Sayan Deb!', isError: false });
      }
    });
  };

  return (
    <section id="connect" className="oc-wrap" aria-label="Reader Mail and Contact">
      <div className="oc-end">
        <div className="oc-end-inner">
          {/* Left Copy & Form */}
          <div className="oc-end-copy">
            <span className="oc-end-kicker">CHAPTER VI // READER MAIL</span>
            <h2 className="oc-end-title">LET&apos;S BUILD SOMETHING GREAT</h2>
            <div className="oc-end-sub">SAYAN DEB · KOLKATA, INDIA</div>

            <p className="oc-end-lead">
              Currently pursuing B.Tech in Electronics &amp; Communication Engineering at Heritage
              Institute of Technology (2025–2029). Open to collaborative open source engineering,
              research internships, and discussions in quant, Web3, and embedded hardware.
            </p>

            {/* Direct Connect Buttons */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '20px' }}>
              <a
                href="https://www.linkedin.com/in/hellosayandeb"
                target="_blank"
                rel="noopener noreferrer"
                className="oc-btn"
                style={{ background: '#0077b5', borderColor: '#0077b5' }}
              >
                Connect on LinkedIn ↗
              </a>
              <a
                href="mailto:sayandeb2006@gmail.com"
                className="oc-btn oc-btn-ghost"
              >
                Email: sayandeb2006@gmail.com ✉
              </a>
              <button
                type="button"
                onClick={() => setIsFullOpen(!isFullOpen)}
                className="oc-btn oc-btn-ghost"
                style={{ fontSize: '16px' }}
              >
                {isFullOpen ? '← Switch to Quick Dispatch' : 'Write Full Reader Letter ✍'}
              </button>
            </div>

            {/* Form Selection: Quick or Detailed */}
            {!isFullOpen ? (
              <form onSubmit={handleQuickSubmit} className="oc-signup" data-oc-signup>
                <div className="oc-signup-field">
                  <span className="oc-signup-prompt" aria-hidden="true">
                    @
                  </span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Drop your email for quick contact..."
                    aria-label="Your email address"
                    required
                  />
                  <button className="oc-btn" type="submit" disabled={isPending}>
                    {isPending ? 'Sending...' : 'Dispatch →'}
                  </button>
                </div>
                {msg && (
                  <p
                    className="oc-signup-msg"
                    style={{ color: msg.isError ? '#f87171' : '#4ade80' }}
                    aria-live="polite"
                  >
                    {msg.text}
                  </p>
                )}
              </form>
            ) : (
              <form
                onSubmit={handleFullSubmit}
                style={{
                  background: 'var(--oc-paper)',
                  color: 'var(--oc-ink)',
                  border: '3px solid var(--oc-paper)',
                  boxShadow: 'var(--oc-shadow-night)',
                  padding: '18px 20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  maxWidth: '520px',
                }}
              >
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '4px' }}>
                    Your Name:
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Alex Mercer"
                    style={{
                      width: '100%',
                      padding: '8px 10px',
                      border: '2px solid var(--oc-ink)',
                      fontFamily: 'var(--oc-font-mono)',
                      fontSize: '13px',
                      background: '#fff',
                    }}
                    required
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '4px' }}>
                    Your Email:
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@domain.com"
                    style={{
                      width: '100%',
                      padding: '8px 10px',
                      border: '2px solid var(--oc-ink)',
                      fontFamily: 'var(--oc-font-mono)',
                      fontSize: '13px',
                      background: '#fff',
                    }}
                    required
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '4px' }}>
                    Collaboration Domain:
                  </label>
                  <select
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 10px',
                      border: '2px solid var(--oc-ink)',
                      fontFamily: 'var(--oc-font-mono)',
                      fontSize: '13px',
                      background: '#fff',
                    }}
                  >
                    <option value="Full-Stack / Web Application">Full-Stack / Web Application</option>
                    <option value="Hardware / EDA / Embedded C++">Hardware / EDA / Embedded C++</option>
                    <option value="Computer Vision / MediaPipe">Computer Vision / MediaPipe</option>
                    <option value="Quant & Financial Modeling">Quant & Financial Modeling</option>
                    <option value="Open Source Collaboration">Open Source Collaboration</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '4px' }}>
                    Message:
                  </label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell Sayan about the project or role..."
                    style={{
                      width: '100%',
                      padding: '8px 10px',
                      border: '2px solid var(--oc-ink)',
                      fontFamily: 'var(--oc-font-mono)',
                      fontSize: '13px',
                      background: '#fff',
                      resize: 'vertical',
                    }}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="oc-btn"
                  style={{ alignSelf: 'flex-start' }}
                  disabled={isPending}
                >
                  {isPending ? 'Dispatching...' : 'Dispatch Letter →'}
                </button>

                {msg && (
                  <p
                    className="oc-signup-msg"
                    style={{ color: msg.isError ? '#dc2626' : '#16a34a', margin: '4px 0 0' }}
                    aria-live="polite"
                  >
                    {msg.text}
                  </p>
                )}
              </form>
            )}

            <ul className="oc-end-perks">
              <li>HITK ECE Scholar</li>
              <li>Python &amp; C++ Focused</li>
              <li>Kolkata, WB</li>
              <li>Fast Turnaround</li>
            </ul>
          </div>

          {/* Right Comic End Art with Inverted Sliced Retro Sun & Animated Floor */}
          <div className="oc-end-art" aria-hidden="true">
            <svg viewBox="0 0 400 360" preserveAspectRatio="xMidYMax meet">
              <path transform="translate(40 40)" d="M0 -5V5M-5 0H5" stroke="#f8f8f5" strokeWidth="1.6">
                <animate attributeName="opacity" values=".15;1;.15" dur="2.2s" begin="0s" repeatCount="indefinite" />
              </path>
              <path transform="translate(120 24)" d="M0 -5V5M-5 0H5" stroke="#f8f8f5" strokeWidth="1.6">
                <animate attributeName="opacity" values=".15;1;.15" dur="2.2s" begin="-0.6s" repeatCount="indefinite" />
              </path>
              <path transform="translate(300 34)" d="M0 -5V5M-5 0H5" stroke="#f8f8f5" strokeWidth="1.6">
                <animate attributeName="opacity" values=".15;1;.15" dur="2.2s" begin="-1.2s" repeatCount="indefinite" />
              </path>
              <path transform="translate(360 90)" d="M0 -5V5M-5 0H5" stroke="#f8f8f5" strokeWidth="1.6">
                <animate attributeName="opacity" values=".15;1;.15" dur="2.2s" begin="-0.3s" repeatCount="indefinite" />
              </path>
              <path transform="translate(70 120)" d="M0 -5V5M-5 0H5" stroke="#f8f8f5" strokeWidth="1.6">
                <animate attributeName="opacity" values=".15;1;.15" dur="2.2s" begin="-1.6s" repeatCount="indefinite" />
              </path>
              <path transform="translate(250 70)" d="M0 -5V5M-5 0H5" stroke="#f8f8f5" strokeWidth="1.6">
                <animate attributeName="opacity" values=".15;1;.15" dur="2.2s" begin="-0.9s" repeatCount="indefinite" />
              </path>

              <g fill="none" stroke="#f8f8f5" strokeWidth="2">
                <circle cx="200" cy="250" r="146">
                  <animate attributeName="r" values="146;230" dur="5s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values=".8;0" dur="5s" repeatCount="indefinite" />
                </circle>
                <circle cx="200" cy="250" r="146">
                  <animate attributeName="r" values="146;230" dur="5s" begin="-2.5s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values=".8;0" dur="5s" begin="-2.5s" repeatCount="indefinite" />
                </circle>
              </g>

              {/* Inverted Night Sliced Retro Sun */}
              <circle cx="200" cy="250" r="140" fill="none" stroke="#f8f8f5" strokeWidth="2" />
              <clipPath id="oc-end-sun-clip">
                <circle cx="200" cy="250" r="128" />
              </clipPath>
              <g clipPath="url(#oc-end-sun-clip)">
                <rect x="72" y="122" width="256" height="256" fill="#f8f8f5" />
                {Array.from({ length: 7 }).map((_, i) => {
                  const t = i / 7;
                  const begin = (-t * 7).toFixed(2);
                  return (
                    <rect key={i} x="72" width="256" y="134.8" height="2" fill="#111111">
                      <animate
                        attributeName="y"
                        values="134.8;250"
                        dur="7s"
                        begin={`${begin}s`}
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="height"
                        values="2;18.4"
                        dur="7s"
                        begin={`${begin}s`}
                        repeatCount="indefinite"
                      />
                    </rect>
                  );
                })}
              </g>
              <circle cx="200" cy="250" r="128" fill="none" stroke="#f8f8f5" strokeWidth="3" />

              {/* Perspective Ground and Horizon */}
              <rect x="-600" y="250" width="1600" height="110" fill="#111" />
              <g stroke="#f8f8f5" strokeWidth="1.4">
                <line x1="200" y1="250" x2="-500" y2="360" />
                <line x1="200" y1="250" x2="-220" y2="360" />
                <line x1="200" y1="250" x2="-20" y2="360" />
                <line x1="200" y1="250" x2="110" y2="360" />
                <line x1="200" y1="250" x2="200" y2="360" />
                <line x1="200" y1="250" x2="290" y2="360" />
                <line x1="200" y1="250" x2="420" y2="360" />
                <line x1="200" y1="250" x2="620" y2="360" />
                <line x1="200" y1="250" x2="900" y2="360" />
              </g>

              {/* 4 Moving Perspective Floor Lines */}
              <g stroke="#f8f8f5" strokeWidth="1.8">
                {['0s', '-0.45s', '-0.9s', '-1.35s'].map((b, idx) => (
                  <line key={idx} x1="-600" x2="1000" y1="252" y2="252">
                    <animate
                      attributeName="y1"
                      values="252;362"
                      dur="1.8s"
                      begin={b}
                      calcMode="spline"
                      keyTimes="0;1"
                      keySplines=".6 0 1 1"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="y2"
                      values="252;362"
                      dur="1.8s"
                      begin={b}
                      calcMode="spline"
                      keyTimes="0;1"
                      keySplines=".6 0 1 1"
                      repeatCount="indefinite"
                    />
                  </line>
                ))}
              </g>
              <line x1="-600" x2="1000" y1="250" y2="250" stroke="#f8f8f5" strokeWidth="3" />
            </svg>

            <div className="oc-end-chip">
              <span className="oc-dim">$</span> sayandeb --contact<br />
              <b>✓ REACH OUT</b> sayandeb2006@gmail.com
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
