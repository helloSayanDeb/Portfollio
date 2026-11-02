import { Project } from '@/types';

export const projects: Project[] = [
  {
    id: 1,
    title: "Lemmata LaTeX Editor",
    version: "v1.2.0",
    projectNumber: "01/07",
    issueTag: "CHAPTER 01 // FLAGSHIP SYSTEM",
    category: "Web Application / Productivity",
    featured: true,
    shortDescription: "Modern, reactive browser-based LaTeX editing environment with real-time compilation, math syntax highlighting, and PDF export.",
    fullDescription: "Lemmata is a browser-native LaTeX editing engine engineered for mathematicians, engineers, and researchers. Designed to eliminate the overhead of local TeX distributions, it pairs an intelligent editor with sub-second preview compilation, error diagnosis, and equation snippets. Built for fast research document authoring.",
    features: [
      "Sub-second reactive LaTeX preview with KaTeX/MathJax engine",
      "Interactive math equation and matrix template inserters",
      "One-click PDF generation and local artifact download",
      "Zero-install, browser-native client architecture",
      "Syntax highlighting and real-time compile diagnostic linting",
      "Responsive split-pane dual view with synchronized scroll"
    ],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "KaTeX", "Vercel"],
    stats: [
      { label: "Compile Speed", value: "<120ms" },
      { label: "Deployment", value: "Vercel Edge" },
      { label: "Architecture", value: "Client-Native" },
      { label: "Status", value: "Production" }
    ],
    demoUrl: "https://latex-editor-umber.vercel.app",
    githubUrl: "https://github.com/helloSayanDeb/latex-editor",
    highlights: ["Live on Vercel Edge", "Active Daily Tool", "Open Source Flagship"]
  },
  {
    id: 2,
    title: "NISL Official Web Portal",
    version: "v2.0.0",
    projectNumber: "02/07",
    issueTag: "CHAPTER 02 // INSTITUTIONAL PLATFORM",
    category: "Institutional Web Portal",
    featured: true,
    shortDescription: "High-performance institutional portal for NISL featuring dynamic department feeds, leadership directory, and responsive modern layout.",
    fullDescription: "Official web portal engineered for the NISL community. Delivers high accessibility, lightning-fast static delivery, dynamic notice broadcasts, and an interactive departmental index. Optimized for mobile and desktop user cohorts.",
    features: [
      "Dynamic departmental curriculum and faculty showcase",
      "Real-time institutional notices and event bulletins",
      "Accessible, mobile-first responsive architecture",
      "Optimized ISR and static delivery achieving top Core Web Vitals",
      "Modern editorial UI with custom iconography and brand identity"
    ],
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel"],
    stats: [
      { label: "Lighthouse", value: "98/100" },
      { label: "Availability", value: "99.9%" },
      { label: "Payload", value: "Sub-150KB" },
      { label: "Deploy", value: "Vercel Production" }
    ],
    demoUrl: "https://nisl.vercel.app",
    githubUrl: "https://github.com/helloSayanDeb/nisl-portal",
    isPrivate: true,
    highlights: ["Official Organization Website", "Production Serving Live Users"]
  },
  {
    id: 3,
    title: "NIARS Academic Research Institute",
    version: "v1.5.0",
    projectNumber: "03/07",
    issueTag: "CHAPTER 03 // ACADEMIC RESEARCH",
    category: "Academic Research Platform",
    featured: true,
    shortDescription: "Research institute portal for multidisciplinary academic publishing, peer collaborations, and seminar announcements.",
    fullDescription: "The NIARS Academic & Research Society platform presents cutting-edge research publications, symposium proceedings, and researcher profiles. Engineered with semantic SEO, clean typography, and lightning-fast loading for scholarly cohorts.",
    features: [
      "Research paper and symposium proceedings index",
      "Academic scholar directory and faculty specialization tags",
      "Upcoming conference registration and call-for-papers dispatch",
      "High-contrast academic editorial design layout",
      "Automated OpenGraph metadata for scholarly citations"
    ],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Lucide Icons", "Vercel"],
    stats: [
      { label: "TTFB", value: "<45ms" },
      { label: "SEO Score", value: "100/100" },
      { label: "Type", value: "Academic" },
      { label: "Status", value: "Active" }
    ],
    demoUrl: "https://niars.vercel.app",
    githubUrl: "https://github.com/helloSayanDeb/academic-institute-website",
    isPrivate: true,
    highlights: ["Academic Publishing Gateway", "Continuous Git Deployments"]
  },
  {
    id: 4,
    title: "IoT Schematic Canvas & Firmware Validator",
    version: "v1.0.0",
    projectNumber: "04/07",
    issueTag: "CHAPTER 04 // HARDWARE & EDA",
    category: "Hardware Tooling / EDA",
    featured: false,
    shortDescription: "Browser-based EDA tool for interactive IoT sensor circuit diagramming, pinout verification, and firmware header generation.",
    fullDescription: "Developed at the intersection of Electronics & Communication Engineering and Web technologies. Enables engineers to draft microcontroller schematics (ESP32, STM32, Arduino), verify pinout and bus conflicts, and export firmware pin definitions before etching or breadboarding.",
    features: [
      "Interactive 2D HTML5 Canvas schematic wiring and grid snapping",
      "Microcontroller pinout conflict detection (GPIO, I2C, SPI, ADC)",
      "Sensor library: I2C OLEDs, BME280, IMUs, ultrasonic sensors",
      "Instant C/C++ firmware pin definition header generation",
      "Bill of Materials (BOM) export"
    ],
    techStack: ["React", "TypeScript", "HTML5 Canvas", "Tailwind CSS", "Embedded C++ Mappings"],
    stats: [
      { label: "Conflict Checks", value: "Real-time" },
      { label: "Domain", value: "ECE + Web" },
      { label: "Export", value: "C++ Header" }
    ],
    demoUrl: "https://custom-eda-iot.vercel.app",
    githubUrl: "https://github.com/helloSayanDeb/custom-eda-iot",
    highlights: ["ECE Hardware Synergy", "Interactive Canvas Engine"]
  },
  {
    id: 5,
    title: "Gesture Bulb: CV Smart Lighting",
    version: "v1.1.0",
    projectNumber: "05/07",
    issueTag: "CHAPTER 05 // COMPUTER VISION & IOT",
    category: "Computer Vision & IoT",
    featured: false,
    shortDescription: "Real-time contactless light controller using computer vision hand-tracking gestures and IoT actuation.",
    fullDescription: "Gesture Bulb bridges webcams and smart lighting hardware. Using OpenCV and MediaPipe machine learning landmarks, it recognizes intuitive hand gestures (pinch to dim, open palm for power, swipe for color presets) to manipulate smart illumination in real-time.",
    features: [
      "MediaPipe real-time 21-point hand landmark tracking",
      "Low-latency gesture classification pipeline (<35ms)",
      "Proportional brightness control via pinch-distance calculation",
      "Interactive browser-based live simulation demo",
      "WebSocket / REST telemetry payload dispatcher"
    ],
    techStack: ["Python", "OpenCV", "MediaPipe", "React", "WebSockets"],
    stats: [
      { label: "Inference Latency", value: "~32ms" },
      { label: "Classification", value: "96.4%" },
      { label: "FPS", value: "60 FPS" }
    ],
    demoUrl: "https://gesture-bulb.vercel.app",
    githubUrl: "https://github.com/helloSayanDeb/gesture-bulb",
    highlights: ["Contactless Smart Space", "Real-Time ML Pipeline"]
  },
  {
    id: 6,
    title: "BIPSS: Android BLE Health Telemetry",
    version: "v1.0.0",
    projectNumber: "06/07",
    issueTag: "CHAPTER 06 // EMBEDDED & MOBILE",
    category: "Mobile & Embedded Systems",
    featured: false,
    shortDescription: "Android Bluetooth Low Energy (BLE) vital health telemetry & sensor fusion companion.",
    fullDescription: "BIPSS connects Android handhelds to peripheral biomedical sensing boards over BLE GATT profiles. It processes continuous vital signs, accelerometer triggers, and physiological metrics with localized filtering and emergency warning dispatches.",
    features: [
      "Low-power BLE GATT characteristic streaming and reconnection handling",
      "Real-time sensor telemetry graphing with noise filtering",
      "Background sensor polling service with wake-lock optimizations",
      "Threshold-triggered alarm notifications for abnormal vitals",
      "Local encrypted audit store for historical diagnostics"
    ],
    techStack: ["Kotlin", "Android SDK", "BLE GATT", "Coroutines", "C++ NDK"],
    stats: [
      { label: "BLE Sync Interval", value: "20ms" },
      { label: "Packet Loss", value: "<0.01%" },
      { label: "Platform", value: "Android" }
    ],
    demoUrl: "https://github.com/helloSayanDeb/BIPSS",
    githubUrl: "https://github.com/helloSayanDeb/BIPSS",
    highlights: ["Biomedical Sensor Fusion", "Android GATT Engine"]
  },
  {
    id: 7,
    title: "Mutual Fund Diversification Simulator",
    version: "v1.0.0",
    projectNumber: "07/07",
    issueTag: "CHAPTER 07 // QUANT & FINTECH",
    category: "Quant & Financial Modeling",
    featured: false,
    shortDescription: "Quantitative investment portfolio simulator analyzing asset allocation, Sharpe ratio, and sector overlap.",
    fullDescription: "A financial simulation tool that evaluates user mutual fund allocations against benchmark indices. Computes volatility, correlation matrices, portfolio beta, and sector overexposure to model realistic risk-adjusted returns.",
    features: [
      "Monte Carlo simulation with 10,000 statistical trial paths",
      "Dynamic Sharpe ratio, Sortino ratio, and max drawdown calculations",
      "Inter-fund holding overlap analysis across equity sectors",
      "Interactive weight rebalancing slider matrix",
      "Stress-testing against historical market shock scenarios"
    ],
    techStack: ["Next.js", "TypeScript", "Chart.js", "Math.js", "Tailwind CSS"],
    stats: [
      { label: "Monte Carlo", value: "10k runs" },
      { label: "Computation", value: "Client-Side" },
      { label: "Metrics", value: "Sharpe / Beta" }
    ],
    demoUrl: "https://mutual-fund-diversification-simulat.vercel.app",
    githubUrl: "https://github.com/helloSayanDeb/Mutual-Fund-Diversification-Simulator",
    highlights: ["Quantitative Risk Engine", "Client-Side Monte Carlo"]
  }
];

export function getProjectById(id: number | string): Project | undefined {
  const numericId = typeof id === 'string' ? parseInt(id, 10) : id;
  return projects.find((p) => p.id === numericId);
}
