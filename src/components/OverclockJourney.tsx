import React from 'react';

export function OverclockJourney() {
  const steps = [
    {
      num: '01',
      title: 'Purba Barasat Adarsha Bidyapeeth',
      lead: 'Higher Secondary (Science PCMB)',
      text: 'Mastered foundational physics, mathematics, chemistry, and computational logic. Developed early curiosity for how mathematical proofs translate into algorithmic computer programs.',
      cmd: '$ init --curriculum "Science PCMB" --school PBAB',
    },
    {
      num: '02',
      title: 'Heritage Institute of Technology',
      lead: 'B.Tech Electronics & Comm. (2025–2029)',
      text: 'Studying in the Kolkata metropolitan area. Focusing on microprocessors, embedded architectures, digital signal processing, Data Structures & Algorithms, and modern systems programming.',
      cmd: '$ HITK.enroll(Degree.BTech, Branch.ECE, 2025-2029)',
    },
    {
      num: '03',
      title: 'Open Source, Web & Frontier Systems',
      lead: 'Building, Breaking & Learning in Public',
      text: 'Shipped Lemmata LaTeX Editor, institutional portals, and EDA canvas tools. Continuously reading about Web3, quant finance modeling, and computer vision with an appetite to learn from the community.',
      cmd: '$ git push origin main && vercel deploy --prod',
    },
  ];

  return (
    <section id="journey" className="oc-wrap" aria-label="Journey and Education">
      <div className="oc-section-title">
        <div>
          <span className="oc-issue">CHAPTER IV // CHRONOLOGICAL ARC</span>
          <h2>ENGINEERING JOURNEY</h2>
        </div>
        <p>
          From high school scientific rigor to university-level electronics, communication
          systems, and open-source full-stack development.
        </p>
      </div>

      <div className="oc-story">
        <div className="oc-steps">
          {steps.map((step, idx) => (
            <div key={idx} className="oc-step">
              <span className="oc-step-n">{step.num}</span>
              <span className="oc-role" style={{ marginBottom: '6px' }}>{step.lead}</span>
              <h4>{step.title}</h4>
              <p>{step.text}</p>
              <code>{step.cmd}</code>
            </div>
          ))}
        </div>

        <div className="oc-story-note">
          <b>INKED LOG:</b> &ldquo;It&apos;s mostly <u>Python, C++ and DSA</u>, a lot of figuring
          things out, breaking stuff, and slowly getting it. Hoping to contribute to open source
          and find people and projects I can actually learn from.&rdquo; &mdash; <i>Sayan Deb, Kolkata</i>
        </div>
      </div>
    </section>
  );
}
