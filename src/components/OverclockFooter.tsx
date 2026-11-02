import React from 'react';

export function OverclockFooter() {
  return (
    <footer className="oc-foot" role="contentinfo">
      <span>&copy; 2026 SAYAN DEB · HERITAGE INSTITUTE OF TECHNOLOGY (ECE &apos;29)</span>
      <nav aria-label="Footer Navigation">
        <a href="#projects">Archives</a>
        <a href="#git-radar">Live Radar</a>
        <a href="#terminal">CLI</a>
        <a
          href="https://www.linkedin.com/in/hellosayandeb"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn ↗
        </a>
        <a
          href="https://github.com/helloSayanDeb"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub ↗
        </a>
      </nav>
      <span>BUILT WITH OVERCLOCK @1.0.0 · PURE INK &amp; CODE ★</span>
    </footer>
  );
}
