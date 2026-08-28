import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { skills } from "../src/skills.js";

const outputDir = path.resolve("public/skill-covers");
await mkdir(outputDir, { recursive: true });

const escapeXml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const shorten = (value, length) =>
  value.length > length ? `${value.slice(0, length - 1).trim()}…` : value;

const accents = {
  Build: "#a8b99a",
  Startup: "#c8b58f",
  Growth: "#bd795b",
  Design: "#a7a2c3",
  Research: "#8faab0",
  System: "#9c9c98",
  Media: "#c08c72",
  Productivity: "#9eaa86",
  Security: "#bc7777",
  Finance: "#b7a46f",
};

for (const [index, skill] of skills.entries()) {
  const accent = accents[skill.category] || "#a3a19d";
  const slugSize = skill.slug.length > 27 ? 39 : skill.slug.length > 20 ? 45 : 52;
  const svg = `
    <svg width="1200" height="675" viewBox="0 0 1200 675" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid" width="42" height="42" patternUnits="userSpaceOnUse">
          <path d="M 42 0 L 0 0 0 42" fill="none" stroke="#ffffff" stroke-opacity="0.024" stroke-width="1"/>
        </pattern>
        <filter id="shadow" x="-10%" y="-20%" width="120%" height="150%">
          <feDropShadow dx="0" dy="24" stdDeviation="28" flood-color="#000000" flood-opacity="0.42"/>
        </filter>
      </defs>
      <rect width="1200" height="675" fill="#0a0a0a"/>
      <rect width="1200" height="675" fill="url(#grid)"/>
      <rect x="0.5" y="0.5" width="1199" height="674" rx="20" fill="none" stroke="#ffffff" stroke-opacity="0.08"/>

      <g transform="translate(54 46)">
        <rect width="34" height="34" rx="7" fill="#151515" stroke="#ffffff" stroke-opacity="0.13"/>
        <text x="17" y="23" text-anchor="middle" fill="#f2f1ef" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="15" font-weight="600">›_</text>
        <text x="48" y="23" fill="#f2f1ef" font-family="Inter, Arial, sans-serif" font-size="18" font-weight="600">Codex</text>
      </g>

      <g transform="translate(1084 49)">
        <circle cx="5" cy="8" r="4" fill="${accent}"/>
        <text x="19" y="13" text-anchor="end" fill="#6b6a67" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="12" letter-spacing="1.5">${escapeXml(skill.category.toUpperCase())}</text>
      </g>

      <g filter="url(#shadow)">
        <rect x="64" y="164" width="1072" height="346" rx="24" fill="#111111" stroke="#ffffff" stroke-opacity="0.12"/>
        <rect x="83" y="184" width="1034" height="306" rx="17" fill="#151515" stroke="#ffffff" stroke-opacity="0.08"/>
      </g>

      <text x="116" y="318" fill="${accent}" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="31" font-weight="500">$</text>
      <text x="154" y="322" fill="#f2f1ef" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="${slugSize}" font-weight="500" letter-spacing="-1.5">${escapeXml(skill.slug)}</text>
      <rect x="154" y="344" width="12" height="42" rx="2" fill="#a3a19d" opacity="0.82"/>

      <g transform="translate(112 424)">
        <circle cx="10" cy="9" r="9" fill="none" stroke="#6b6a67" stroke-width="1"/>
        <path d="M6 9h8M10 5v8" stroke="#6b6a67" stroke-width="1"/>
        <text x="34" y="14" fill="#6b6a67" font-family="Inter, Arial, sans-serif" font-size="14">Invoke skill in Codex</text>
      </g>
      <g transform="translate(1042 404)">
        <circle cx="28" cy="28" r="28" fill="#f2f1ef"/>
        <path d="M18 30h20M31 20l10 10-10 10" fill="none" stroke="#0a0a0a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </g>

      <line x1="66" y1="612" x2="1134" y2="612" stroke="#ffffff" stroke-opacity="0.08"/>
      <text x="66" y="640" fill="#4a4947" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="11" letter-spacing="1.4">Slashcmd.dev / skill ${String(index + 1).padStart(2, "0")}</text>
      <text x="1134" y="640" text-anchor="end" fill="#4a4947" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="11" letter-spacing="1.4">OPEN SOURCE · CODEX</text>
    </svg>`;

  await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(path.join(outputDir, `${skill.slug}.png`));
}

console.log(`Generated ${skills.length} skill covers in ${outputDir}`);
