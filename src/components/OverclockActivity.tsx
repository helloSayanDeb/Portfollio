'use client';

import React, { useEffect, useState, useCallback } from 'react';

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

interface PushEventInfo {
  repo: string;
  repoUrl: string;
  commitHash: string;
  commitUrl: string;
  message: string;
  branch: string;
  timeAgo: string;
}

function alignToWeeks(data: ContributionDay[]): ContributionDay[] {
  if (data.length === 0) return [];
  const first = new Date(data[0].date);
  const startDay = first.getDay(); // 0 = Sunday
  const result: ContributionDay[] = [];

  // Prepend empty days if start is not Sunday
  for (let i = startDay - 1; i >= 0; i--) {
    const d = new Date(first);
    d.setDate(d.getDate() - (i + 1));
    result.push({ date: d.toISOString().split('T')[0], count: 0, level: 0 });
  }

  result.push(...data);

  // Pad end so length is multiple of 7
  while (result.length % 7 !== 0) {
    const last = new Date(result[result.length - 1].date);
    last.setDate(last.getDate() + 1);
    result.push({ date: last.toISOString().split('T')[0], count: 0, level: 0 });
  }

  return result;
}

function getFallbackContributions(): ContributionDay[] {
  const days: ContributionDay[] = [];
  const today = new Date();
  for (let i = 167; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    const dayOfWeek = d.getDay();
    const rand = (Math.sin(i * 12.9898) * 43758.5453) % 1;
    const absRand = Math.abs(rand);

    let count = 0;
    let level = 0;
    if (dayOfWeek !== 0 && absRand > 0.6) {
      count = Math.floor(absRand * 6) + 1;
      level = count >= 5 ? 4 : count >= 3 ? 3 : count >= 2 ? 2 : 1;
    }

    days.push({ date: dateStr, count, level });
  }
  return alignToWeeks(days);
}

export function OverclockActivity() {
  const [activeCell, setActiveCell] = useState<{ date: string; count: number } | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [latestPush, setLatestPush] = useState<PushEventInfo>({
    repo: 'helloSayanDeb/latex-editor',
    repoUrl: 'https://github.com/helloSayanDeb/latex-editor',
    commitHash: '7bec197',
    commitUrl: 'https://github.com/helloSayanDeb/latex-editor/commit/7bec19742e6b5569c16711055d55ceaeead3207a',
    message: 'feat: update reactive MathJax and KaTeX compile pipeline',
    branch: 'main',
    timeAgo: 'recently',
  });
  const [contributions, setContributions] = useState<ContributionDay[]>(() => getFallbackContributions());
  const [totalCount, setTotalCount] = useState<number>(71);

  const fetchAllTelemetry = useCallback(async () => {
    try {
      const res = await fetch('https://api.github.com/users/helloSayanDeb/events/public', {
        headers: { Accept: 'application/vnd.github.v3+json' },
      });
      if (res.ok) {
        const events = await res.json();
        const push = events.find((e: { type: string }) => e.type === 'PushEvent');
        if (push) {
          const repoName = push.repo.name;
          const branchName = push.payload?.ref ? push.payload.ref.replace('refs/heads/', '') : 'main';
          const headSha = push.payload?.head || '';
          const shortSha = headSha ? headSha.slice(0, 7) : 'head';
          let commitMsg = push.payload?.commits?.[0]?.message?.split('\n')[0];

          if (!commitMsg && headSha && repoName) {
            try {
              const commitRes = await fetch(
                `https://api.github.com/repos/${repoName}/commits/${headSha}`,
                { signal: AbortSignal.timeout(2500) }
              );
              if (commitRes.ok) {
                const commitData = await commitRes.json();
                commitMsg = commitData.commit?.message?.split('\n')[0];
              }
            } catch {
              // fallback
            }
          }

          if (!commitMsg) {
            commitMsg = `Dispatched push to ${branchName} (${shortSha})`;
          }

          const date = new Date(push.created_at);
          const now = new Date();
          const diffHours = Math.round((now.getTime() - date.getTime()) / (1000 * 60 * 60));
          const timeAgo =
            diffHours <= 1
              ? 'just now'
              : diffHours < 24
              ? `${diffHours}h ago`
              : `${Math.round(diffHours / 24)}d ago`;

          setLatestPush({
            repo: repoName,
            repoUrl: `https://github.com/${repoName}`,
            commitHash: shortSha,
            commitUrl: headSha ? `https://github.com/${repoName}/commit/${headSha}` : `https://github.com/${repoName}`,
            message: commitMsg,
            branch: branchName,
            timeAgo,
          });
        }
      }
    } catch {
      // kept in fallback
    }

    try {
      const res = await fetch('https://github-contributions-api.jogruber.de/v4/helloSayanDeb?y=last');
      if (res.ok) {
        const data = await res.json();
        if (data?.contributions && Array.isArray(data.contributions)) {
          const days: ContributionDay[] = data.contributions.map(
            (c: { date: string; count: number; level: number }) => ({
              date: c.date,
              count: c.count,
              level: c.level,
            })
          );
          const sliceCount = 168;
          const rawSlice = days.slice(-sliceCount);
          setContributions(alignToWeeks(rawSlice));
          if (data.total && typeof data.total.lastYear === 'number') {
            setTotalCount(data.total.lastYear);
          }
        }
      }
    } catch {
      // kept in fallback
    }
  }, []);

  useEffect(() => {
    let ignore = false;
    const run = async () => {
      if (!ignore) {
        await fetchAllTelemetry();
      }
    };
    run();
    return () => {
      ignore = true;
    };
  }, [fetchAllTelemetry]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchAllTelemetry();
    setTimeout(() => setIsRefreshing(false), 600);
  };

  return (
    <section id="git-radar" className="oc-wrap oc-radar-section" aria-label="GitHub Radar">
      <div className="oc-section-title">
        <div>
          <span className="oc-issue">CHAPTER III // LIVE TELEMETRY RADAR</span>
          <h2>GITHUB ACTIVE PUSH &amp; INK MATRIX</h2>
        </div>
        <p>
          Real-time API driven push dispatches and screentone contribution halftone matrix
          tracking live commits across Sayan Deb&apos;s open source repositories.
        </p>
      </div>

      <div className="oc-radar-box">
        {/* Header telemetry info */}
        <div className="oc-radar-header">
          <div>
            <h3>CODE RADAR: @helloSayanDeb</h3>
            <span className="oc-role">CONNECTED TO GITHUB API v3 · LIVE SATELLITE</span>
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
            <span className="oc-radar-badge">
              <span>●</span> {totalCount}+ COMMITS IN RECORD
            </span>
            <span className="oc-radar-badge">8 PUBLIC REPOSITORIES</span>
            <button
              type="button"
              onClick={handleRefresh}
              className="oc-btn oc-btn-ghost oc-btn-sm"
              style={{ padding: '3px 8px', fontSize: '13px' }}
              aria-label="Refresh GitHub telemetry"
              disabled={isRefreshing}
            >
              {isRefreshing ? 'SCANNING...' : 'SCAN API ↻'}
            </button>
          </div>
        </div>

        {/* Manga Styled Active Push Dialogue */}
        <div
          className="oc-push-manga-dialog"
          role="region"
          aria-label="Latest Push Dispatch Dialogue"
        >
          {/* Katakana Sound Effect for Radar Beep */}
          <span className="oc-push-sfx" aria-hidden="true">
            ピピピッ！
          </span>

          <div className="oc-push-balloon">
            <div className="oc-push-balloon-head">
              <span className="oc-push-beacon" aria-hidden="true" />
              <span className="oc-push-channel">
                SATELLITE TELEMETRY // LATEST ACTIVE PUSH DETECTED!
              </span>
              <span className="oc-push-stamp">{latestPush.timeAgo}</span>
            </div>

            <div className="oc-push-balloon-body">
              <div className="oc-push-repo-line">
                <span className="oc-push-branch-tag">[{latestPush.branch}]</span>
                <a
                  href={latestPush.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="oc-push-repo-link"
                >
                  {latestPush.repo} ↗
                </a>
                <a
                  href={latestPush.commitUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="oc-push-hash-tag"
                >
                  #{latestPush.commitHash}
                </a>
              </div>

              <div className="oc-push-message">
                &ldquo;{latestPush.message}&rdquo;
              </div>
            </div>

            {/* Speech bubble tail pointer */}
            <div className="oc-push-tail" aria-hidden="true" />
          </div>
        </div>

        {/* Dynamic Sensor Probe Readout */}
        <div className="oc-sensor-readout">
          <span className="oc-sensor-prompt">&gt; SENSOR PROBE:</span>
          {activeCell ? (
            <span>
              Target <b>{activeCell.date}</b> &mdash; <u>{activeCell.count} commits</u> inked to repository tree.
            </span>
          ) : (
            <span>Hover or focus on screentone cells below to analyze daily commit telemetry.</span>
          )}
        </div>

        {/* Screentone Halftone Heatmap Matrix */}
        <div className="oc-matrix-wrap" style={{ position: 'relative' }}>
          <div className="oc-matrix-container">
            {/* Day of Week Labels */}
            <div className="oc-matrix-day-labels" aria-hidden="true">
              <span>Sun</span>
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
            </div>

            {/* Grid Cells */}
            <div className="oc-matrix-grid" role="grid" aria-label="Contribution Heatmap">
              {contributions.map((day, idx) => (
                <div
                  key={idx}
                  className={`oc-cell oc-level-${day.level}`}
                  onMouseEnter={() => setActiveCell({ date: day.date, count: day.count })}
                  onMouseLeave={() => setActiveCell(null)}
                  onFocus={() => setActiveCell({ date: day.date, count: day.count })}
                  onBlur={() => setActiveCell(null)}
                  tabIndex={0}
                  aria-label={`${day.date}: ${day.count} contributions`}
                >
                  <div className="oc-cell-tooltip" aria-hidden="true">
                    {day.date}: <b>{day.count} {day.count === 1 ? 'commit' : 'commits'}</b>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Screentone Legend & Direct GitHub Action */}
        <div className="oc-legend">
          <span>Less Ink</span>
          <div className="oc-legend-cells" aria-hidden="true">
            <span className="oc-cell oc-level-0" title="0 commits" />
            <span className="oc-cell oc-level-1" title="1-2 commits" />
            <span className="oc-cell oc-level-2" title="3-4 commits" />
            <span className="oc-cell oc-level-3" title="5-6 commits" />
            <span className="oc-cell oc-level-4" title="7+ commits" />
          </div>
          <span>Max Ink (Heavy Push)</span>
        </div>

        <div style={{ marginTop: '22px', display: 'flex', justifyContent: 'flex-end', gap: '10px', flexWrap: 'wrap' }}>
          <a
            href="https://github.com/helloSayanDeb"
            target="_blank"
            rel="noopener noreferrer"
            className="oc-btn oc-btn-ghost"
          >
            GitHub Profile ↗
          </a>
          <a
            href="https://github.com/helloSayanDeb?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="oc-btn"
          >
            All 8 Repositories ↗
          </a>
        </div>
      </div>
    </section>
  );
}
