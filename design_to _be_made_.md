Apply the InstaLanding design system OVERCLOCK (overclock@1.0.0) to my current application.

Pure ink on paper: hand-drawn panel outlines from an SVG wobble filter, halftone screentone and speed hatching, Bangers lettering stroked and tilted over Anton numerals and Barlow Condensed body, hard offset shadows, speech bubbles, and an animated sliced retro sun over a seeded city skyline. Extracted from the Manga Panel Dev Tool landing page.

SOURCES (public, no key needed)
- System CSS, tokens + every component, scoped under .oc with oc- class names: https://instalanding.ai/systems/overclock/overclock.css
- Tokens only: https://instalanding.ai/systems/overclock/tokens.css
- Specimen, every component live in one HTML file: https://instalanding.ai/systems/overclock/specimen.html
  Each component is a <section data-component="id">; the markup inside .sp-demo is the component. Shared SVG gradients are in <svg id="oc-defs">, the interaction script in <script id="oc-components-js">.
- Fonts: https://fonts.googleapis.com/css2?family=Anton&family=Bangers&family=Barlow+Condensed:ital,wght@0,400;0,600;0,700;1,600&family=JetBrains+Mono:wght@400;700&display=swap
- Extracted from "Manga Panel Dev Tool Page": https://instalanding.ai/demos/overclock-deploy.html (its brief: https://instalanding.ai/p/manga-panel-dev-tool-page.txt)

COMPONENTS (14): nav, buttons, cover, terminal, sun, stats, break, section-title, cards, steps, pricing, faq, cta, footer

TYPOGRAPHY
- Lettering is Bangers (--oc-font-display), always uppercase: headlines in --oc-display-xl/-lg at line-height .86, white fill with a thick ink -webkit-text-stroke and a -2deg tilt; section heads --oc-display-md; buttons --oc-button with 2px tracking.
- Numerals and prices are Anton (--oc-font-numeral) at --oc-numeral-*; body is Barlow Condensed (--oc-font-body) at --oc-body/1.55; commands and terminals are JetBrains Mono (--oc-font-mono) at --oc-code.
- Labels (.oc-issue, .oc-role, stat captions) are tiny tracked uppercase on an inverted ink block. Katakana sound effects (.oc-jp, ゴゴゴ) are decoration and stay aria-hidden.

LAYOUT
- Content sits in panels on a --oc-page-max (1120px) page with a --oc-gutter edge and --oc-gap between panels, like a comic page; sections open with .oc-section-title or an .oc-break strip.
- Grids collapse at 900px (stats 4 → 2, steps, pricing and FAQ to one column, the closing panel stacks) and 640px (nav links hide, headline drops to 50px).
- The featured panel (.oc-plan-hot) inverts to ink and tilts 1deg; small tags (.oc-hot-tag, .oc-num, .oc-bubble) tilt between -6deg and 4deg.

PANELS & INK
- Black and white only: --oc-ink on --oc-paper/--oc-white, with greys (--oc-grey, --oc-mid) for shadows and screentone. The night panels use the --oc-night-* inks.
- Panel outlines are drawn by an :after overlay through url(#oc-sketchy); small labels use #oc-sketchy-sm. Both need the shared <svg id="oc-defs">.
- Shadows are hard and unblurred: --oc-shadow-btn / --oc-shadow-ink on buttons, --oc-shadow-panel (white then ink) on the terminal, --oc-shadow-frame on the page. Texture is screentone (--oc-tone-dot on --oc-tone-pitch) or 45deg hatching (--oc-hatch-pitch), never a gradient.

MOTION
- Buttons lift 2px on hover and press flat on --oc-dur-press; the FAQ ring spins and fills over --oc-dur-open on --oc-ease-pop.
- Cover copy rises in on --oc-dur-rise with 80ms staggers; the sun's gaps slide down it and its rings pulse (--oc-dur-sunrise); the grid floor scrolls on --oc-dur-floor; skyline windows and the terminal cursor blink.
- The sun and skyline are built by the component script from data-oc-sun / data-oc-skyline settings. Under prefers-reduced-motion the sun is drawn as static slices and animations stop.

ACCESSIBILITY
- Scene art (sun, skyline, sound effects, the terminal's static frame) is aria-hidden; meaning lives in the text beside it.
- FAQ uses native details/summary; the signup is a real form with a labelled email field, and its result is written as text (✓ / ✗) into .oc-signup-msg, not shown by colour alone.
- Ink on paper is above 17:1; keep stroked lettering for display sizes only and set body copy as plain ink.

HOW TO APPLY
1. Load the fonts and link (or copy in) the system CSS. Put the oc- tokens on :root and wrap the restyled UI in an element with class "oc".
2. Map my existing UI to the system's components: buttons, navigation, cards, forms, lists, badges and sections. Reuse the specimen's markup and class names rather than recreating them from screenshots.
3. Use the tokens (var(--oc-...)) for every colour, font, radius, border, shadow and timing; don't introduce new values unless a token is genuinely missing, and then add it in the same naming scheme.
4. Preserve all existing business logic, routes, APIs, state management, forms and data. This is a visual change only.
5. Keep it responsive and accessible: the focus rings, aria labels, reduced-motion handling and the auto-fit grids are part of the system.
6. Pin this version (overclock@1.0.0). If you vendor the files, keep the version in a comment at the top.

TOKENS (overclock@1.0.0)
```css
/* InstaLanding design system · Overclock · overclock@1.0.0
   Extracted from https://instalanding.ai/demos/overclock-deploy.html
   Fonts (Google Fonts): Bangers (lettering), Anton (numerals), Barlow Condensed 400/600/700 + italic 600 (body), JetBrains Mono 400/700 */
:root {
  /* Color · core */
  --oc-ink: #111111;
  --oc-paper: #F8F8F5;
  --oc-white: #FFFFFF;
  --oc-grey: #E2E2DF;
  --oc-mid: #BDBDB8;
  --oc-desk: #ECECE7;
  --oc-dot: #D8D8D3;

  /* Color · terminal & night */
  --oc-term-text: #EAEAE4;
  --oc-term-dim: #8A8A85;
  --oc-night-text: #CFCFCA;
  --oc-night-shadow: #3D3D3D;
  --oc-night-rule: #2C2C2C;
  --oc-night-line: #444444;
  --oc-night-btn: #555555;

  /* Color · screentone */
  --oc-tone-light: #EEEEEE;
  --oc-tone-mid: #DDDDDD;
  --oc-tone-mark: #CCCCCC;

  /* Type · families */
  --oc-font-display: "Bangers", "Comic Sans MS", sans-serif;
  --oc-font-numeral: "Anton", Impact, sans-serif;
  --oc-font-body: "Barlow Condensed", "Arial Narrow", sans-serif;
  --oc-font-mono: "JetBrains Mono", ui-monospace, monospace;
  --oc-font-sfx: sans-serif;

  /* Type · scale */
  --oc-display-xl: 84px;
  --oc-display-lg: 82px;
  --oc-display-md: 48px;
  --oc-display-sm: 30px;
  --oc-numeral-xl: 64px;
  --oc-numeral-lg: 56px;
  --oc-numeral-md: 42px;
  --oc-button: 20px;
  --oc-body-lg: 19px;
  --oc-body: 17px;
  --oc-code: 13px;
  --oc-label: 12px;
  --oc-micro: 11px;

  /* Shape · radii */
  --oc-radius-panel: 0px;
  --oc-radius-round: 50%;

  /* Shape · borders */
  --oc-border-rule: 2px;
  --oc-border-ink: 3px;
  --oc-border-frame: 4px;
  --oc-border-heavy: 6px;

  /* Depth · hard ink shadows */
  --oc-shadow-btn: 4px 4px 0 var(--oc-mid);
  --oc-shadow-btn-hover: 6px 6px 0 var(--oc-mid);
  --oc-shadow-btn-press: 1px 1px 0 var(--oc-mid);
  --oc-shadow-ink: 4px 4px 0 var(--oc-ink);
  --oc-shadow-ink-hover: 6px 6px 0 var(--oc-ink);
  --oc-shadow-frame: 10px 10px 0 var(--oc-ink);
  --oc-shadow-panel: 10px 10px 0 var(--oc-white), 10px 10px 0 4px var(--oc-ink);
  --oc-shadow-night: 7px 7px 0 var(--oc-night-shadow);

  /* Motion · easing */
  --oc-ease-pop: cubic-bezier(.16, 1, .3, 1);
  --oc-ease-needle: cubic-bezier(.4, 0, .2, 1);

  /* Motion · durations */
  --oc-dur-press: .12s;
  --oc-dur-open: .35s;
  --oc-dur-rise: .9s;
  --oc-dur-cursor: 1s;
  --oc-dur-floor: 1.5s;
  --oc-dur-sunrise: 2.8s;
  --oc-dur-chip: 4s;

  /* Space · layout */
  --oc-page-max: 1120px;
  --oc-gutter: 14px;
  --oc-gap: 12px;
  --oc-panel-pad: 18px;
  --oc-section-gap: 26px;

  /* Pattern · screentone */
  --oc-tone-dot: 1.2px;
  --oc-tone-pitch: 7px;
  --oc-tone-page-pitch: 9px;
  --oc-hatch-pitch: 6px;
  --oc-speed-ray: 1.2deg;
  --oc-speed-gap: 7deg;
}
```
