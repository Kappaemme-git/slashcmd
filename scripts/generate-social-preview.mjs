import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const WIDTH = 1200;
const HEIGHT = 630;
const outputDirectory = path.resolve("public/og");
const outputPath = path.join(outputDirectory, "slashcmd-social-preview.png");

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <defs>
    <pattern id="grid" width="42" height="42" patternUnits="userSpaceOnUse">
      <path d="M 42 0 L 0 0 0 42" fill="none" stroke="#ffffff" stroke-opacity="0.035" stroke-width="1"/>
    </pattern>
    <linearGradient id="terminal-sheen" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#1c1c19"/>
      <stop offset="1" stop-color="#121210"/>
    </linearGradient>
    <radialGradient id="glow" cx="80%" cy="42%" r="52%">
      <stop offset="0" stop-color="#8e9c7f" stop-opacity="0.12"/>
      <stop offset="1" stop-color="#8e9c7f" stop-opacity="0"/>
    </radialGradient>
    <filter id="shadow" x="-25%" y="-25%" width="150%" height="160%">
      <feDropShadow dx="0" dy="24" stdDeviation="24" flood-color="#000000" flood-opacity="0.44"/>
    </filter>
  </defs>

  <rect width="1200" height="630" fill="#11110f"/>
  <rect width="1200" height="630" fill="url(#grid)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <rect x="1" y="1" width="1198" height="628" rx="22" fill="none" stroke="#ffffff" stroke-opacity="0.11" stroke-width="2"/>

  <!-- Brand -->
  <g transform="translate(58 49)">
    <rect width="44" height="44" rx="7" fill="#f2f1ef"/>
    <text x="22" y="32" text-anchor="middle" fill="#11110f" font-family="Arial, Helvetica, sans-serif" font-size="30" font-weight="800">/</text>
    <text x="60" y="32" fill="#f2f1ef" font-family="Arial, Helvetica, sans-serif" font-size="28" font-weight="700" letter-spacing="-1">Slashcmd</text>
  </g>
  <text x="1142" y="77" text-anchor="end" fill="#8f8d87" font-family="Menlo, Monaco, monospace" font-size="14" letter-spacing="2.4">OPEN SOURCE · AI AGENTS</text>
  <line x1="58" y1="116" x2="1142" y2="116" stroke="#ffffff" stroke-opacity="0.1"/>

  <!-- Editorial headline -->
  <g transform="translate(59 153)">
    <rect x="0" y="4" width="7" height="7" fill="#929d80"/>
    <text x="20" y="13" fill="#9b9993" font-family="Menlo, Monaco, monospace" font-size="14" font-weight="700" letter-spacing="2.5">SKILLS FOR AI AGENTS</text>

    <text x="0" y="90" fill="#f2f1ef" font-family="Arial, Helvetica, sans-serif" font-size="61" font-weight="600" letter-spacing="-3.2">Skills that make</text>
    <text x="0" y="157" fill="#f2f1ef" font-family="Arial, Helvetica, sans-serif" font-size="61" font-weight="600" letter-spacing="-3.2">AI agents</text>
    <text x="0" y="224" fill="#77756f" font-family="Arial, Helvetica, sans-serif" font-size="61" font-weight="600" letter-spacing="-3.2">actually</text>
    <text x="218" y="224" fill="#f2f1ef" font-family="Arial, Helvetica, sans-serif" font-size="61" font-weight="600" letter-spacing="-3.2">useful.</text>

    <text x="1" y="274" fill="#aaa7a1" font-family="Arial, Helvetica, sans-serif" font-size="20">Install focused workflows for Codex, Claude Code,</text>
    <text x="1" y="303" fill="#aaa7a1" font-family="Arial, Helvetica, sans-serif" font-size="20">Cursor and OpenCode. One command. No account.</text>

    <g transform="translate(0 342)">
      <rect width="210" height="42" rx="21" fill="#f2f1ef"/>
      <text x="105" y="27" text-anchor="middle" fill="#11110f" font-family="Menlo, Monaco, monospace" font-size="13" font-weight="700" letter-spacing="1">36 OPEN-SOURCE SKILLS</text>
      <rect x="222" width="160" height="42" rx="21" fill="#171714" stroke="#ffffff" stroke-opacity="0.15"/>
      <text x="302" y="27" text-anchor="middle" fill="#b4b1aa" font-family="Menlo, Monaco, monospace" font-size="13" font-weight="700" letter-spacing="1">BY KAPPAEMME</text>
    </g>
  </g>

  <!-- Terminal product card -->
  <g filter="url(#shadow)" transform="translate(695 157)">
    <rect width="447" height="344" rx="22" fill="url(#terminal-sheen)" stroke="#ffffff" stroke-opacity="0.14" stroke-width="2"/>
    <rect x="1" y="1" width="445" height="55" rx="21" fill="#191916"/>
    <path d="M1 35 Q1 56 22 56 H425 Q446 56 446 35 V56 H1Z" fill="#191916"/>
    <line x1="0" y1="56" x2="447" y2="56" stroke="#ffffff" stroke-opacity="0.09"/>
    <circle cx="24" cy="28" r="5" fill="#67655f"/>
    <circle cx="43" cy="28" r="5" fill="#67655f"/>
    <circle cx="62" cy="28" r="5" fill="#67655f"/>
    <text x="82" y="33" fill="#8d8b85" font-family="Menlo, Monaco, monospace" font-size="12">~/projects/atlas</text>
    <rect x="366" y="16" width="58" height="25" rx="6" fill="none" stroke="#ffffff" stroke-opacity="0.12"/>
    <text x="395" y="32" text-anchor="middle" fill="#8d8b85" font-family="Menlo, Monaco, monospace" font-size="10" letter-spacing="1.3">CODEX</text>

    <rect x="23" y="82" width="401" height="171" rx="14" fill="#1e1e1b" stroke="#ffffff" stroke-opacity="0.08"/>
    <text x="47" y="127" fill="#929d80" font-family="Menlo, Monaco, monospace" font-size="19">$</text>
    <text x="71" y="127" fill="#f2f1ef" font-family="Menlo, Monaco, monospace" font-size="22" font-weight="700">/design-audit</text>
    <rect x="71" y="141" width="9" height="23" fill="#a5a39d"/>
    <text x="47" y="194" fill="#8c8983" font-family="Menlo, Monaco, monospace" font-size="13">→ hierarchy · UX · accessibility</text>
    <text x="47" y="222" fill="#a8b494" font-family="Menlo, Monaco, monospace" font-size="13">✓ prioritized audit ready</text>

    <g transform="translate(23 277)">
      <text x="0" y="16" fill="#77756f" font-family="Menlo, Monaco, monospace" font-size="11" letter-spacing="1.5">WORKS WITH</text>
      <g transform="translate(103 0)">
        <rect width="113" height="30" rx="15" fill="#20201c" stroke="#ffffff" stroke-opacity="0.1"/>
        <text x="56.5" y="20" text-anchor="middle" fill="#c1beb7" font-family="Arial, Helvetica, sans-serif" font-size="12" font-weight="700">4 AI AGENTS</text>
      </g>
      <text x="401" y="18" text-anchor="end" fill="#8c8983" font-family="Menlo, Monaco, monospace" font-size="11">SKILL 01</text>
    </g>
  </g>

  <!-- Footer rule -->
  <line x1="58" y1="568" x2="1142" y2="568" stroke="#ffffff" stroke-opacity="0.1"/>
  <text x="58" y="600" fill="#f2f1ef" font-family="Menlo, Monaco, monospace" font-size="14" font-weight="700" letter-spacing="2">SLASHCMD.DEV</text>
  <text x="1142" y="600" text-anchor="end" fill="#77756f" font-family="Menlo, Monaco, monospace" font-size="12" letter-spacing="1.7">INSTALL ONCE. THE WORKFLOW COMES WITH IT.</text>
</svg>`;

await mkdir(outputDirectory, { recursive: true });
await sharp(Buffer.from(svg))
  .png({ compressionLevel: 9, adaptiveFiltering: true })
  .toFile(outputPath);

console.log(`Generated ${outputPath} (${WIDTH}x${HEIGHT})`);
