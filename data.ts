import { Project } from './types';

export const projects: Project[] = [
  {
    id: 1,
    title: "Nebula Dashboard",
    version: "v2.4.0",
    shortDescription: "AI-driven analytics visualization platform for enterprise data.",
    fullDescription: "Nebula Dashboard redefines how enterprise data is visualized. By leveraging WebGL and machine learning, it renders millions of data points in real-time without performance degradation. The system predicts trends using a proprietary LSTM model.",
    features: ["Real-time WebGL Rendering", "Predictive Analytics", "Custom Widget Engine", "Dark Mode First", "Role-Based Access Control", "Automated Reporting"],
    techStack: ["React", "Three.js", "Python", "TensorFlow", "PostgreSQL"],
    stats: [{ label: "Data Points", value: "10M+" }, { label: "Latency", value: "<50ms" }],
    projectNumber: "01/15"
  },
  {
    id: 2,
    title: "Prism Engine",
    version: "v1.1.2",
    shortDescription: "High-performance ray tracing engine for browser-based 3D editors.",
    fullDescription: "Prism Engine brings desktop-class rendering to the browser. Utilizing WebGPU, it allows designers to preview ray-traced lighting and materials instantly within a web interface.",
    features: ["WebGPU Accelerated", "Real-time Ray Tracing", "PBR Material System", "Cloud Baking", "Collaborative Editing", "Asset Compression"],
    techStack: ["WebGPU", "Rust", "WASM", "TypeScript", "Node.js"],
    stats: [{ label: "FPS", value: "60" }, { label: "Render Time", value: "0.2s" }],
    projectNumber: "02/15"
  },
  {
    id: 3,
    title: "Cipher Vault",
    version: "v3.0.0",
    shortDescription: "Zero-knowledge encryption storage solution for sensitive legal documents.",
    fullDescription: "Built for maximum security, Cipher Vault ensures that not even the server administrators can access user data. It employs client-side AES-256 encryption and decentralized key management.",
    features: ["Zero-Knowledge Architecture", "Client-Side Encryption", "Biometric Authentication", "Audit Logs", "Secure Sharing", "Offline Access"],
    techStack: ["Electron", "React", "Sodium", "Go", "Docker"],
    stats: [{ label: "Encryption", value: "AES-256" }, { label: "Uptime", value: "99.99%" }],
    projectNumber: "03/15"
  },
  {
    id: 4,
    title: "Quantum API",
    version: "v0.9.5",
    shortDescription: "GraphQL federation gateway designed for microservices orchestration.",
    fullDescription: "Quantum API unifies disparate microservices into a single, cohesive graph. It handles schema stitching, rate limiting, and caching automatically, reducing development overhead.",
    features: ["Schema Federation", "Query Complexity Analysis", "Distributed Tracing", "Automatic Caching", "Subscription Support", "Legacy REST Wrapper"],
    techStack: ["GraphQL", "Apollo", "Redis", "Kubernetes", "Node.js"],
    stats: [{ label: "Requests/sec", value: "50k" }, { label: "Services", value: "100+" }],
    projectNumber: "04/15"
  },
  {
    id: 5,
    title: "Aurora UI",
    version: "v4.2.0",
    shortDescription: "A comprehensive design system and component library for financial apps.",
    fullDescription: "Aurora UI provides a rigid yet flexible set of components optimized for high-density information displays found in fintech applications. It ensures accessibility compliance and consistent branding.",
    features: ["WCAG 2.1 AA Compliant", "Theming Engine", "Data Grid Components", "Interactive Charts", "Figma Integration", "Unit Tested"],
    techStack: ["React", "Storybook", "Styled Components", "Jest", "TypeScript"],
    stats: [{ label: "Components", value: "150+" }, { label: "Downloads", value: "12k" }],
    projectNumber: "05/15"
  },
  {
    id: 6,
    title: "Flux Commerce",
    version: "v2.1.0",
    shortDescription: "Headless e-commerce solution with sub-second checkout speeds.",
    fullDescription: "Flux Commerce decouples the frontend from the backend logic, allowing for instant page loads and a customizable checkout flow. It integrates with major payment gateways and inventory systems.",
    features: ["Headless Architecture", "One-Click Checkout", "Inventory Sync", "Omnichannel Support", "Loyalty Program", "Fraud Detection"],
    techStack: ["Next.js", "Stripe API", "Sanity CMS", "Vercel", "Postgres"],
    stats: [{ label: "Conversion", value: "+15%" }, { label: "Load Time", value: "0.8s" }],
    projectNumber: "06/15"
  },
  {
    id: 7,
    title: "Nova Auth",
    version: "v1.5.0",
    shortDescription: "Passwordless authentication provider using WebAuthn standards.",
    fullDescription: "Nova Auth eliminates the need for passwords. By using biometrics and hardware keys via WebAuthn, it provides a seamless and secure login experience for users across devices.",
    features: ["WebAuthn Support", "Biometric Login", "Magic Links", "Device Management", "Social Login", "Session Control"],
    techStack: ["Go", "WebAuthn", "Redis", "Postgres", "React"],
    stats: [{ label: "Security", value: "High" }, { label: "Success Rate", value: "99.8%" }],
    projectNumber: "07/15"
  },
  {
    id: 8,
    title: "Echo Stream",
    version: "v1.0.1",
    shortDescription: "Low-latency audio streaming protocol for collaborative music production.",
    fullDescription: "Echo Stream enables musicians to jam together remotely in real-time. It utilizes a custom UDP-based protocol to minimize buffer bloat and ensure perfect synchronization.",
    features: ["Sub-20ms Latency", "Lossless Audio", "Multi-Channel Support", "DAW Integration", "Peer-to-Peer", "Jitter Buffer"],
    techStack: ["C++", "WebRTC", "WASM", "Node.js", "Socket.io"],
    stats: [{ label: "Latency", value: "15ms" }, { label: "Quality", value: "96kHz" }],
    projectNumber: "08/15"
  },
  {
    id: 9,
    title: "Ember Analytics",
    version: "v3.1.0",
    shortDescription: "Heatmap and session recording tool for UX optimization.",
    fullDescription: "Ember Analytics tracks user interactions to generate detailed heatmaps and session replays. It helps product teams understand user behavior and identify friction points in the UI.",
    features: ["Session Replay", "Click Heatmaps", "Scroll Maps", "Funnel Analysis", "Error Tracking", "Privacy Masking"],
    techStack: ["JavaScript", "ClickHouse", "Kafka", "React", "AWS"],
    stats: [{ label: "Events/Day", value: "1B" }, { label: "Storage", value: "PB Scale" }],
    projectNumber: "09/15"
  },
  {
    id: 10,
    title: "Helix Data",
    version: "v2.0.0",
    shortDescription: "Genomic sequencing data pipeline for research institutions.",
    fullDescription: "Helix Data processes raw genomic sequencing data into actionable insights. It manages terabytes of data efficiently, providing researchers with tools to query and visualize genetic variants.",
    features: ["Variant Calling", "Genome Visualization", "Batch Processing", "Secure Storage", "Metadata Search", "Export Tools"],
    techStack: ["Python", "BioPython", "AWS Batch", "DynamoDB", "React"],
    stats: [{ label: "Accuracy", value: "99.9%" }, { label: "Processing", value: "24h" }],
    projectNumber: "10/15"
  },
  {
    id: 11,
    title: "Lunar Forms",
    version: "v1.2.0",
    shortDescription: "Dynamic form builder with conditional logic and complex validation.",
    fullDescription: "Lunar Forms allows non-developers to create complex data collection interfaces. It supports conditional branching, multi-step workflows, and real-time validation against external APIs.",
    features: ["Drag-and-Drop", "Conditional Logic", "API Validation", "PDF Generation", "E-signature", "Analytics"],
    techStack: ["Vue.js", "Laravel", "MySQL", "Redis", "Tailwind"],
    stats: [{ label: "Submissions", value: "5M+" }, { label: "Uptime", value: "100%" }],
    projectNumber: "11/15"
  },
  {
    id: 12,
    title: "Vortex CMS",
    version: "v4.0.0",
    shortDescription: "API-first content management system for omnichannel publishing.",
    fullDescription: "Vortex CMS allows content to be created once and published everywhere. Its flexible content modeling engine adapts to websites, mobile apps, and smart devices.",
    features: ["Content Modeling", "Multilingual", "Version Control", "Workflow Approval", "Asset Management", "CDN Integration"],
    techStack: ["Node.js", "MongoDB", "Elasticsearch", "React", "Express"],
    stats: [{ label: "API Resp", value: "20ms" }, { label: "Scalability", value: "Auto" }],
    projectNumber: "12/15"
  },
  {
    id: 13,
    title: "Polaris Nav",
    version: "v1.0.0",
    shortDescription: "Indoor navigation system using AR and WiFi fingerprinting.",
    fullDescription: "Polaris Nav helps users find their way inside large complexes like airports and malls. It combines augmented reality overlays with WiFi signal strength to determine precise location.",
    features: ["AR Wayfinding", "WiFi Fingerprinting", "POI Search", "Accessibility Routes", "Offline Maps", "Analytics"],
    techStack: ["Swift", "ARKit", "Kotlin", "ARCore", "Python"],
    stats: [{ label: "Precision", value: "1m" }, { label: "Venues", value: "50+" }],
    projectNumber: "13/15"
  },
  {
    id: 14,
    title: "Zenith Motion",
    version: "v2.5.0",
    shortDescription: "Animation library for creating cinematic UI transitions.",
    fullDescription: "Zenith Motion simplifies complex choreography in web applications. It provides a declarative API for physics-based animations, layout transitions, and scroll effects.",
    features: ["Physics Based", "Layout Morphing", "Scroll Triggers", "SVG Morphing", "Timeline Control", "React Hooks"],
    techStack: ["TypeScript", "React", "Web Animations API", "Math.js"],
    stats: [{ label: "Size", value: "5kb" }, { label: "Stars", value: "4.5k" }],
    projectNumber: "14/15"
  },
  {
    id: 15,
    title: "Sonic Deploy",
    version: "v1.8.0",
    shortDescription: "Instant CI/CD pipeline for edge computing applications.",
    fullDescription: "Sonic Deploy streamlines the deployment process for edge functions. It compiles, tests, and distributes code to global edge locations in seconds.",
    features: ["Global Edge", "Instant Rollback", "Preview URLs", "Log Streaming", "DDoS Protection", "Git Integration"],
    techStack: ["Go", "Rust", "Docker", "Kubernetes", "Nginx"],
    stats: [{ label: "Build Time", value: "10s" }, { label: "Deploy Time", value: "2s" }],
    projectNumber: "15/15"
  }
];