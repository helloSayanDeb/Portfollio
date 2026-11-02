import React from 'react';
import { projects } from '@/data/projects';
import { OverclockNav } from '@/components/OverclockNav';
import { OverclockHero } from '@/components/OverclockHero';
import { OverclockStats } from '@/components/OverclockStats';
import { OverclockProjects } from '@/components/OverclockProjects';
import { OverclockActivity } from '@/components/OverclockActivity';
import { OverclockJourney } from '@/components/OverclockJourney';
import { OverclockTerminal } from '@/components/OverclockTerminal';
import { OverclockContact } from '@/components/OverclockContact';
import { OverclockFooter } from '@/components/OverclockFooter';

export default function HomePage() {
  return (
    <main className="oc">
      <div className="oc-page-container">
        {/* Comic Masthead */}
        <OverclockNav />

        {/* Issue Cover: Sliced Sun + Skyline + Hero Headline + Quick Terminal */}
        <OverclockHero />

        {/* 4-Panel Stats Strip */}
        <OverclockStats />

        {/* Transition Break 1 */}
        <div className="oc-break" aria-hidden="true">
          <span>CHAPTER I &amp; II · ARCHIVES &amp; PROTOTYPES</span>
        </div>

        {/* Chapters I & II: 7 Projects (Double-Spreads + Multi-Column Panels) */}
        <OverclockProjects projects={projects} />

        {/* Transition Break 2 */}
        <div className="oc-break" aria-hidden="true">
          <span>CHAPTER III · REAL-TIME CODE TELEMETRY</span>
        </div>

        {/* Chapter III: Manga GitHub Active Push Radar & Screentone Heatmap */}
        <OverclockActivity />

        {/* Transition Break 3 */}
        <div className="oc-break" aria-hidden="true">
          <span>CHAPTER IV · THE ENGINEERING ARC</span>
        </div>

        {/* Chapter IV: Education & Engineering Chronological Journey */}
        <OverclockJourney />

        {/* Transition Break 4 */}
        <div className="oc-break" aria-hidden="true">
          <span>CHAPTER V · DIAGNOSTIC TERMINAL</span>
        </div>

        {/* Chapter V: Interactive Comic CLI Widget */}
        <OverclockTerminal />

        {/* Chapter VI: Reader Mail & Direct Connect Panel */}
        <OverclockContact />

        {/* Comic Colophon & Footer */}
        <OverclockFooter />
      </div>
    </main>
  );
}
