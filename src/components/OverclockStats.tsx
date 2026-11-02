import React from 'react';

export function OverclockStats() {
  const stats = [
    {
      num: "HITK '29",
      label: "B.Tech ECE Scholar",
      detail: "Heritage Institute of Technology",
    },
    {
      num: "08+ REPOS",
      label: "GitHub Repositories",
      detail: "github.com/helloSayanDeb",
    },
    {
      num: "05 LIVE",
      label: "Edge Production Systems",
      detail: "Deployed on Vercel Global",
    },
    {
      num: "HARDWARE + WEB",
      label: "Electronics & Full-Stack",
      detail: "C++ · Python · Next.js · BLE",
    },
  ];

  return (
    <section className="oc-stats" aria-label="Key Engineer Statistics">
      {stats.map((stat, i) => (
        <div key={i} className="oc-stat">
          <b>{stat.num}</b>
          <span>{stat.label}</span>
          <small>{stat.detail}</small>
        </div>
      ))}
    </section>
  );
}
