'use client';

import React, { useState } from 'react';

// Deterministic PRNG for skyline generation (seed = 11)
function createRng(seed: number) {
  return function () {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
}

interface BuildingRect {
  x: number;
  y: number;
  w: number;
  h: number;
  windows: Array<{ x: number; y: number; w: number; h: number; blinkDelay?: string; isInk?: boolean }>;
  antenna?: { x: number; y1: number; y2: number; cy: number; blinkDelay: string };
}

function generateSkylineBuildings(): BuildingRect[] {
  const W = 1200;
  const base = 110;
  const min = 24;
  const max = 100;
  const dip = 0.7;
  const r = createRng(11);
  const buildings: BuildingRect[] = [];
  let x = -6;

  while (x < W) {
    const w = Math.round(26 + r() * 44);
    let h = min + r() * (max - min);
    if (dip !== null) {
      const k = Math.min(1, Math.abs((x + w / 2) / W - dip) / 0.22);
      h = min * 0.6 + (h - min * 0.6) * (0.25 + 0.75 * k);
    }
    h = Math.round(h);
    const y = base - h;
    const windows: BuildingRect['windows'] = [];

    if (r() < 0.5) {
      for (let wy = y + 8; wy < base - 8; wy += 11) {
        for (let wx = x + 6; wx < x + w - 8; wx += 9) {
          if (r() < 0.55) {
            const bl = r() < 0.16;
            windows.push({
              x: wx,
              y: wy,
              w: 4,
              h: 5,
              blinkDelay: bl ? (-r() * 2.6).toFixed(2) + 's' : undefined,
            });
          }
        }
      }
    } else {
      for (let wy2 = y + 8; wy2 < base - 6; wy2 += 8) {
        windows.push({
          x: x + 5,
          y: wy2,
          w: w - 10,
          h: 2.5,
        });
        if (r() < 0.35) {
          windows.push({
            x: x + w - 10,
            y: wy2,
            w: 3,
            h: 2.5,
            blinkDelay: (-r() * 2.6).toFixed(2) + 's',
            isInk: true,
          });
        }
      }
    }

    let antenna: BuildingRect['antenna'] = undefined;
    if (r() < 0.28) {
      const ax = x + Math.round(w / 2);
      antenna = {
        x: ax,
        y1: y,
        y2: y - 16,
        cy: y - 18,
        blinkDelay: (-r() * 2.6).toFixed(2) + 's',
      };
    }

    buildings.push({ x, y, w, h, windows, antenna });
    x += w + Math.round(r() * 6);
  }

  return buildings;
}

const STATIC_BUILDINGS = generateSkylineBuildings();

export function OverclockHero() {
  const [copied, setCopied] = useState(false);
  const installCmd = 'git clone https://github.com/helloSayanDeb/latex-editor.git';

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(installCmd);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="oc-hero" aria-label="Issue Cover">
      {/* Sliced Retro Sun */}
      <div className="oc-hero-sun" aria-hidden="true">
        <svg viewBox="0 0 640 640">
          <circle cx="320" cy="320" r="276" fill="#f8f8f5" stroke="#111111" strokeWidth="3" />
          <circle cx="320" cy="320" r="276" fill="none" stroke="#111111" strokeWidth="2">
            <animate attributeName="r" values="276;380" dur="6s" repeatCount="indefinite" />
            <animate attributeName="opacity" values=".9;0" dur="6s" repeatCount="indefinite" />
          </circle>
          <circle cx="320" cy="320" r="276" fill="none" stroke="#111111" strokeWidth="2">
            <animate attributeName="r" values="276;380" dur="6s" begin="-3s" repeatCount="indefinite" />
            <animate attributeName="opacity" values=".9;0" dur="6s" begin="-3s" repeatCount="indefinite" />
          </circle>

          {/* Sliced disc */}
          <clipPath id="oc-hero-sun-clip">
            <circle cx="320" cy="320" r="252" />
          </clipPath>
          <g clipPath="url(#oc-hero-sun-clip)">
            <rect x="68" y="68" width="504" height="504" fill="#111111" />
            {Array.from({ length: 8 }).map((_, i) => {
              const t = i / 8;
              const begin = (-t * 9).toFixed(2);
              return (
                <rect key={i} x="68" width="504" y="88.2" height="2" fill="#f8f8f5">
                  <animate
                    attributeName="y"
                    values="88.2;320"
                    dur="9s"
                    begin={`${begin}s`}
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="height"
                    values="2;37.1"
                    dur="9s"
                    begin={`${begin}s`}
                    repeatCount="indefinite"
                  />
                </rect>
              );
            })}
          </g>
          <circle cx="320" cy="320" r="252" fill="none" stroke="#111111" strokeWidth="4" />
        </svg>
      </div>

      {/* Skyline & Perspective Floor */}
      <div className="oc-hero-horizon" aria-hidden="true">
        <svg className="oc-skyline" viewBox="0 0 1200 110" preserveAspectRatio="xMidYMax slice">
          <g>
            {STATIC_BUILDINGS.map((b, idx) => (
              <g key={idx}>
                <rect x={b.x} y={b.y} width={b.w} height={b.h + 6} fill="#111111" />
                {b.windows.map((w, wIdx) => (
                  <rect
                    key={wIdx}
                    x={w.x}
                    y={w.y}
                    width={w.w}
                    height={w.h}
                    fill={w.isInk ? '#111111' : '#f8f8f5'}
                    className={w.blinkDelay ? 'oc-blink' : undefined}
                    style={w.blinkDelay ? { animationDelay: w.blinkDelay } : undefined}
                  />
                ))}
                {b.antenna && (
                  <g>
                    <line
                      x1={b.antenna.x}
                      y1={b.antenna.y1}
                      x2={b.antenna.x}
                      y2={b.antenna.y2}
                      stroke="#111111"
                      strokeWidth="2"
                    />
                    <circle
                      cx={b.antenna.x}
                      cy={b.antenna.cy}
                      r="2.6"
                      fill="#111111"
                      className="oc-blink"
                      style={{ animationDelay: b.antenna.blinkDelay }}
                    />
                  </g>
                )}
              </g>
            ))}
          </g>
        </svg>
        <div className="oc-floor">
          <div className="oc-floor-plane" />
        </div>
      </div>

      {/* Left Column Copy */}
      <div className="oc-hero-copy">
        <div className="oc-issue">VOL. 01 · SPECIAL ISSUE · 2026 // KOLKATA, INDIA</div>

        <h1>
          ENGINEER THE FUTURE
          <br />
          BREAK &amp; REBUILD!
          <span className="oc-jp">限界を超えろ — ECE · FULL-STACK · EMBEDDED · QUANT</span>
        </h1>

        <div className="oc-hero-lead">
          &ldquo;It&apos;s mostly <strong>Python, C++ and DSA</strong>, a lot of figuring things out,
          breaking stuff, and slowly getting it. I keep reading about Web3, blockchain,
          finance (quant), AI/ML and want to get into someday. Still pretty early on all of them.
          Hoping to contribute to <strong>open source</strong> and find people and projects I can
          actually learn from.&rdquo;
        </div>

        <div className="oc-hero-ctas">
          <a href="#projects" className="oc-btn">
            Explore 07 Projects ↓
          </a>
          <a
            href="https://www.linkedin.com/in/hellosayandeb"
            target="_blank"
            rel="noopener noreferrer"
            className="oc-btn oc-btn-ghost"
          >
            LinkedIn Profile ↗
          </a>
          <a
            href="https://github.com/helloSayanDeb"
            target="_blank"
            rel="noopener noreferrer"
            className="oc-btn oc-btn-ghost"
          >
            GitHub Codebase ↗
          </a>
        </div>

        <div className="oc-install oc-mono">
          <code>{installCmd}</code>
          <button type="button" onClick={handleCopy} aria-label="Copy clone command">
            {copied ? 'COPIED!' : 'COPY'}
          </button>
        </div>
      </div>

      {/* Right Column Terminal Box */}
      <div className="oc-term-wrap">
        <div className="oc-bubble" aria-hidden="true">
          OVERCLOCK SPEED! ★
        </div>
        <div
          className="oc-term"
          role="img"
          aria-label="Terminal preview of Sayan Deb systems and deployments"
        >
          <div className="oc-term-bar">
            <i />
            <i />
            <i />
            <span>~/sayandeb — zsh</span>
          </div>
          <pre>
            $ sayandeb --status{'\n'}
            <span className="oc-dim">→ identity    </span>Sayan Deb (B.Tech ECE &apos;29){'\n'}
            <span className="oc-dim">  campus      </span>Heritage Institute of Technology{'\n'}
            <span className="oc-dim">  focus       </span>C++, Python, DSA, IoT &amp; Full-Stack{'\n'}
            <span className="oc-dim">→ deployments </span>{'\n'}
            {'  '}• latex-editor.vercel.app  <span className="oc-ok">200 OK</span>{'\n'}
            {'  '}• nisl.vercel.app          <span className="oc-ok">200 OK</span>{'\n'}
            {'  '}• niars.vercel.app         <span className="oc-ok">200 OK</span>{'\n'}
            {'  '}• custom-eda-iot.vercel.app<span className="oc-ok">200 OK</span>{'\n'}
            {'\n'}
            <span className="oc-ok">✓ READY</span> Ship without fear &amp; build the new world.{'\n'}
            $ <span className="oc-cursor" />
          </pre>
        </div>
      </div>
    </section>
  );
}
