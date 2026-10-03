# SAYAN DEB — 3D Luxury Creative Portfolio

![Next.js 15](https://img.shields.io/badge/Next.js-15.0-black?style=for-the-badge&logo=next.js&logoColor=white)
![React 19](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-3.14-88CE02?style=for-the-badge&logo=greensock&logoColor=white)

An ultra-premium, interactive 3D portfolio showcasing 15 state-of-the-art engineering systems. Built with **Next.js 15 App Router**, **React 19**, **GSAP ScrollTrigger**, and a curated **brushed-metal design system**.

---

## ✨ Features

- **3D Perspective Card Stream**: Pinned viewport card choreography along an interactive 3D spatial curve powered by GSAP and ScrollTrigger.
- **Dual-Routing Architecture**:
  - **In-Page Intercepting Modal (`@modal/(.)project/[id]`)**: Opening a project smoothly presents an animated detail modal with real-time glare and parallax without reloading or resetting scroll position.
  - **Standalone Pre-rendered Pages (`/project/[id]`)**: Direct URL visits and link sharing load dedicated SSG detail pages with dynamic SEO metadata, OpenGraph tags, and return navigation.
- **Brushed-Metal Aesthetics**: Custom Vanilla CSS design tokens with directional lighting, specular reflection sweeps, ambient glows, and dark-mode depth.
- **Interactive Server Action Contact Form**: In-modal brief submission built on React 19 Server Actions (`useActionState`), including field validation, pending states, and toast confirmation.
- **15 Curated Project Case Studies**: Detailed breakdowns of architectural features, latency/performance metrics, tech stacks, live demos, and GitHub repositories.
- **Zero-Layout-Shift Typography**: Variable font optimization via `next/font/google` utilizing `DM Sans` and `Syne`.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Core Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Motion & 3D**: [GSAP](https://greensock.com/gsap/) with [ScrollTrigger](https://greensock.com/scrolltrigger/)
- **Icons**: Custom SVG social icons & [Lucide React](https://lucide.dev/)
- **Styling**: Vanilla CSS Design Tokens, 3D Transforms, and Keyframe Animations

---

## 📁 Project Structure

```text
├── src/
│   ├── app/
│   │   ├── @modal/
│   │   │   ├── (.)project/[id]/
│   │   │   │   ├── modal-client.tsx   # Modal client wrapper with router.back()
│   │   │   │   └── page.tsx           # Intercepting route server component
│   │   │   └── default.tsx            # Default null slot handler
│   │   ├── actions/
│   │   │   └── contact.ts             # Contact form Next.js Server Action
│   │   ├── project/[id]/
│   │   │   └── page.tsx               # Standalone SSG project detail page
│   │   ├── globals.css                # Luxury brushed-metal design system
│   │   ├── layout.tsx                 # Root layout with fonts & @modal slot
│   │   └── page.tsx                   # Main 3D portfolio landing page
│   ├── components/
│   │   ├── ContactModal.tsx           # Contact modal with Server Action
│   │   ├── Icons.tsx                  # Lightweight SVG brand icons
│   │   ├── PortfolioCanvas.tsx        # Pinned 3D perspective scroll canvas
│   │   └── ProjectModal.tsx           # Parallax project case study modal
│   ├── data/
│   │   └── projects.ts                # 15 project records & data accessors
│   └── types/
│       └── index.ts                   # TypeScript interfaces & definitions
├── next.config.ts                     # Next.js build configuration
├── tsconfig.json                      # Strict TypeScript settings
└── package.json                       # Dependencies & scripts
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18.18+ or 20+
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/helloSayanDeb/Portfollio.git
   cd Portfollio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Launch development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🏗️ Production Build

To create an optimized production build with static page generation (SSG) for all projects:

```bash
npm run build
npm start
```

---

## 👤 Author

**Sayan Deb**
- GitHub: [@helloSayanDeb](https://github.com/helloSayanDeb)
- Portfolio: [https://github.com/helloSayanDeb/Portfollio](https://github.com/helloSayanDeb/Portfollio)

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
