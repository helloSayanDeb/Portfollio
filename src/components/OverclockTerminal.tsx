'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { projects } from '@/data/projects';

interface LogLine {
  type: 'input' | 'output' | 'info' | 'error' | 'success';
  text: string;
}

export function OverclockTerminal() {
  const router = useRouter();
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<LogLine[]>([
    {
      type: 'info',
      text: 'Sayan Deb Interactive Comic Terminal v1.1.0 [Overclock Engine · HITK ECE]',
    },
    {
      type: 'info',
      text: 'Type "help" or click any shortcut chip below to query the database.\n',
    },
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const executeCommand = (rawCmd: string) => {
    const trimmed = rawCmd.trim();
    if (!trimmed) return;

    // Save to command history
    setCommandHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    const parts = trimmed.split(' ');
    const cmd = parts[0].toLowerCase();
    const arg = parts.slice(1).join(' ').trim();

    const newHistory: LogLine[] = [...history, { type: 'input', text: `$ ${trimmed}` }];

    switch (cmd) {
      case 'help':
        newHistory.push({
          type: 'output',
          text: `AVAILABLE COMMANDS:
  whoami          - Display engineer persona, batch & credentials
  bio             - Sayan's philosophy and learning quote
  education       - Higher secondary & B.Tech ECE university info
  skills          - Core languages, frameworks & hardware tools
  projects        - Summary of all 7 deployed systems
  open <1-7>      - Launch live demo of project 1 through 7
  dossier <1-7>   - View full manga dossier for project 1 through 7
  linkedin        - Open Sayan's official LinkedIn profile
  github          - Open Sayan's GitHub repositories
  contact         - Display direct email and communication handles
  clear | cls     - Wipe terminal screen`,
        });
        break;

      case 'whoami':
        newHistory.push({
          type: 'success',
          text: `SAYAN DEB // B.Tech Electronics & Communication Engineering
Campus: Heritage Institute of Technology (HITK), Kolkata [2025–2029]
Location: Kolkata metropolitan area, West Bengal, India
Status: Active Open Source Contributor & Hardware Tinkerer`,
        });
        break;

      case 'bio':
        newHistory.push({
          type: 'output',
          text: `"It's mostly Python, C++ and DSA, a lot of figuring things out, breaking stuff, and slowly getting it. I keep reading about Web3, blockchain, finance (quant), AI/ML and want to get into someday. Still pretty early on all of them. Hoping to contribute to open source and find people and projects I can actually learn from."`,
        });
        break;

      case 'education':
        newHistory.push({
          type: 'output',
          text: `1. Heritage Institute of Technology (HITK), Kolkata
   B.Tech in Electronics & Communication Engineering (ECE) [2025 - 2029]
2. Purba Barasat Adarsha Bidyapeeth
   Higher Secondary Examination (Science PCMB)`,
        });
        break;

      case 'skills':
        newHistory.push({
          type: 'output',
          text: `LANGUAGES: Python, C++, C, TypeScript, JavaScript, SQL, Kotlin
FRAMEWORKS: Next.js, React, Tailwind CSS, MediaPipe, OpenCV, KaTeX
HARDWARE/EMBEDDED: Microcontrollers, BLE GATT, STM32/ESP32 mappings, EDA Canvas
CORE CONCEPTS: Data Structures & Algorithms, Object-Oriented Design, Quant Simulation`,
        });
        break;

      case 'projects':
        newHistory.push({
          type: 'output',
          text: `SHOWCASE ARCHIVES:
  [01] Lemmata LaTeX Editor  -> https://latex-editor-umber.vercel.app
  [02] NISL Official Portal     -> https://nisl.vercel.app
  [03] NIARS Academic Institute -> https://niars.vercel.app
  [04] IoT Schematic Canvas     -> https://custom-eda-iot.vercel.app
  [05] Gesture Bulb (CV/ML)     -> https://gesture-bulb.vercel.app
  [06] BIPSS (BLE Health)       -> https://github.com/helloSayanDeb/BIPSS
  [07] Quant Diversification    -> https://mutual-fund-diversification-simulat.vercel.app

Tip: Type "open 1" to launch demo, or "dossier 1" to inspect specifications.`,
        });
        break;

      case 'open': {
        const id = parseInt(arg, 10);
        const proj = projects.find((p) => p.id === id);
        if (proj && proj.demoUrl) {
          if (typeof window !== 'undefined') {
            window.open(proj.demoUrl, '_blank');
          }
          newHistory.push({
            type: 'success',
            text: `Dispatched browser launch for [${proj.id}] ${proj.title} -> ${proj.demoUrl}`,
          });
        } else {
          newHistory.push({
            type: 'error',
            text: `Invalid project id: "${arg}". Use 1 through 7. (e.g. "open 1")`,
          });
        }
        break;
      }

      case 'dossier': {
        const id = parseInt(arg, 10);
        const proj = projects.find((p) => p.id === id);
        if (proj) {
          router.push(`/project/${proj.id}`);
          newHistory.push({
            type: 'success',
            text: `Navigating to Dossier [${proj.id}] ${proj.title}...`,
          });
        } else {
          newHistory.push({
            type: 'error',
            text: `Invalid project id: "${arg}". Use 1 through 7. (e.g. "dossier 1")`,
          });
        }
        break;
      }

      case 'linkedin':
        if (typeof window !== 'undefined') {
          window.open('https://www.linkedin.com/in/hellosayandeb', '_blank');
        }
        newHistory.push({
          type: 'success',
          text: 'Dispatched browser hook to https://www.linkedin.com/in/hellosayandeb',
        });
        break;

      case 'github':
        if (typeof window !== 'undefined') {
          window.open('https://github.com/helloSayanDeb', '_blank');
        }
        newHistory.push({
          type: 'success',
          text: 'Dispatched browser hook to https://github.com/helloSayanDeb',
        });
        break;

      case 'contact':
        newHistory.push({
          type: 'output',
          text: `Email: sayandeb2006@gmail.com
LinkedIn: https://www.linkedin.com/in/hellosayandeb
GitHub: https://github.com/helloSayanDeb`,
        });
        break;

      case 'clear':
      case 'cls':
        setHistory([]);
        setInputVal('');
        return;

      default:
        newHistory.push({
          type: 'error',
          text: `Command not recognized: "${cmd}". Type "help" for a list of valid commands.`,
        });
        break;
    }

    setHistory(newHistory);
    setInputVal('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeCommand(inputVal);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIdx = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIdx);
      setInputVal(commandHistory[nextIdx]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (commandHistory.length === 0 || historyIndex === -1) return;
      const nextIdx = historyIndex + 1;
      if (nextIdx >= commandHistory.length) {
        setHistoryIndex(-1);
        setInputVal('');
      } else {
        setHistoryIndex(nextIdx);
        setInputVal(commandHistory[nextIdx]);
      }
    }
  };

  const shortcutChips = [
    'help',
    'whoami',
    'bio',
    'skills',
    'projects',
    'open 1',
    'linkedin',
    'github',
    'contact',
    'clear',
  ];

  return (
    <section id="terminal" className="oc-wrap oc-interactive-term-section" aria-label="Interactive Terminal">
      <div className="oc-section-title">
        <div>
          <span className="oc-issue">CHAPTER V // SHELL EMULATOR</span>
          <h2>INTERACTIVE COMIC CLI</h2>
        </div>
        <p>
          Execute live diagnostic queries. Type commands or tap shortcut chips below to query the engineer database.
        </p>
      </div>

      <div className="oc-term-cli">
        <div className="oc-term-bar">
          <i />
          <i />
          <i />
          <span>sayandeb@hitk-ece:~ (zsh)</span>
        </div>

        {/* Shortcut command chips for mobile / quick click */}
        <div className="oc-term-chips" aria-label="Terminal command shortcuts">
          {shortcutChips.map((chip) => (
            <button
              key={chip}
              type="button"
              className="oc-term-chip-btn"
              onClick={() => {
                executeCommand(chip);
                inputRef.current?.focus();
              }}
            >
              ${chip}
            </button>
          ))}
        </div>

        <div className="oc-term-cli-history" role="log" aria-live="polite">
          {history.map((line, idx) => (
            <div
              key={idx}
              style={{
                color:
                  line.type === 'error'
                    ? '#f87171'
                    : line.type === 'success'
                    ? '#4ade80'
                    : line.type === 'input'
                    ? '#ffffff'
                    : 'var(--oc-term-text)',
                marginBottom: '4px',
                whiteSpace: 'pre-wrap',
              }}
            >
              {line.text}
            </div>
          ))}
          <div ref={endRef} />
        </div>

        <form onSubmit={handleSubmit} className="oc-term-cli-input">
          <span className="oc-term-cli-prompt">&gt;</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder='Type command (e.g. "skills", "projects", "open 1", "help")...'
            aria-label="Command line input"
            autoComplete="off"
            spellCheck={false}
          />
        </form>
      </div>
    </section>
  );
}
