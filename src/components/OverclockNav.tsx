'use client';

import React from 'react';
import Link from 'next/link';

export function OverclockNav() {
  return (
    <header className="oc-nav" role="banner">
      <Link href="/" className="oc-logo" aria-label="Sayan Deb Portfolio Home">
        <span className="oc-logo-mark" aria-hidden="true">SD</span>
        <span>SAYAN DEB</span>
      </Link>

      <span className="oc-nav-tag" aria-label="Education Batch">
        HITK ECE &apos;29
      </span>

      <nav aria-label="Issue Navigation">
        <ul>
          <li><a href="#projects">Archives</a></li>
          <li><a href="#git-radar">Live Radar</a></li>
          <li><a href="#journey">Journey</a></li>
          <li><a href="#terminal">CLI</a></li>
          <li><a href="#connect">Reader Mail</a></li>
        </ul>
      </nav>

      <div className="oc-nav-actions">
        <a
          href="https://www.linkedin.com/in/hellosayandeb"
          target="_blank"
          rel="noopener noreferrer"
          className="oc-btn oc-btn-sm"
          aria-label="Connect with Sayan Deb on LinkedIn"
        >
          LinkedIn ↗
        </a>
        <a
          href="https://github.com/helloSayanDeb"
          target="_blank"
          rel="noopener noreferrer"
          className="oc-btn oc-btn-ghost oc-btn-sm"
          aria-label="View Sayan Deb on GitHub"
        >
          GitHub ↗
        </a>
      </div>
    </header>
  );
}
