import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import ArrowLeft from "lucide-react/dist/esm/icons/arrow-left.mjs";
import ArrowRight from "lucide-react/dist/esm/icons/arrow-right.mjs";
import ArrowUpRight from "lucide-react/dist/esm/icons/arrow-up-right.mjs";
import Check from "lucide-react/dist/esm/icons/check.mjs";
import ChevronDown from "lucide-react/dist/esm/icons/chevron-down.mjs";
import ChevronRight from "lucide-react/dist/esm/icons/chevron-right.mjs";
import Copy from "lucide-react/dist/esm/icons/copy.mjs";
import Heart from "lucide-react/dist/esm/icons/heart.mjs";
import Menu from "lucide-react/dist/esm/icons/menu.mjs";
import Moon from "lucide-react/dist/esm/icons/moon.mjs";
import Play from "lucide-react/dist/esm/icons/play.mjs";
import Search from "lucide-react/dist/esm/icons/search.mjs";
import Sun from "lucide-react/dist/esm/icons/sun.mjs";
import X from "lucide-react/dist/esm/icons/x.mjs";
import "./styles.css";
import {
  agents as catalogAgents,
  categories as catalogCategories,
  skills as catalogSkills,
} from "./skills.js";
import { creator, sponsor } from "./site-config.js";

/* ------------------------------------------------------------------ data */

const prototypeSkills = [
  {
    slug: "goal-mvp",
    name: "Goal MVP",
    category: "Startup",
    color: "sage",
    cover: "SHIP YOUR MVP.",
    headline: "Turn an idea into a working MVP.",
    kicker: "Minimum viable product",
    description: "Turn any idea into a focused, buildable MVP with a concrete launch plan.",
    detail:
      "Goal MVP guides Codex from a rough idea to the smallest version worth shipping — with scope, architecture, implementation, and verification attached.",
    command: "npx skills add goal-mvp",
    outcomes: [
      "Turns a rough idea into a focused MVP specification.",
      "Builds the smallest version that proves real value.",
      "Finishes with verification and a practical launch checklist.",
    ],
    featured: true,
  },
  {
    slug: "image-to-code",
    name: "Image to Code",
    category: "Build",
    color: "rust",
    cover: "IMAGE TO CODE.",
    headline: "Turn any visual reference into working code.",
    kicker: "Pixels into product",
    description: "Turn screenshots and visual references into polished, working frontend.",
    detail:
      "An image-first frontend workflow that generates, studies, and faithfully implements strong visual references instead of drifting into generic UI.",
    command: "npx skills add image-to-code",
    outcomes: [
      "Creates a clear visual source of truth before coding.",
      "Extracts typography, spacing, color, and component logic.",
      "Implements a responsive frontend with visual fidelity.",
    ],
  },
  {
    slug: "startup-pressure-test",
    name: "Startup Pressure Test",
    category: "Research",
    color: "sand",
    cover: "TEST YOUR STARTUP.",
    headline: "Find the flaws before you build.",
    kicker: "Pressure before launch",
    description: "Find the fatal assumptions in a startup idea before wasting months building it.",
    detail:
      "A direct early-stage startup evaluation that checks real pain, current behavior, competition, founder advantage, and the smallest useful test.",
    command: "npx skills add startup-pressure-test",
    outcomes: [
      "Identifies the core assumption the idea depends on.",
      "Ranks the most dangerous flaws by severity.",
      "Produces a tight MVP and validation path.",
    ],
  },
  {
    slug: "mac-storage-cleanup",
    name: "Mac Storage Cleanup",
    category: "System",
    color: "ink",
    cover: "CLEAN YOUR MAC.",
    headline: "Find what is wasting space on your Mac.",
    kicker: "Space. Speed. Focus.",
    description: "Find wasted storage and safely review what can be removed from a Mac.",
    detail:
      "A cautious storage audit that finds large caches, logs, build artifacts, downloads, and development leftovers without deleting blindly.",
    command: "npx skills add mac-storage-cleanup",
    outcomes: [
      "Maps where disk space is actually going.",
      "Separates safe cleanup from risky candidates.",
      "Explains every proposed removal before acting.",
    ],
  },
  {
    slug: "first-customer-finder",
    name: "First Customer Finder",
    category: "Startup",
    color: "rust",
    cover: "FIND YOUR FIRST CUSTOMER.",
    headline: "Find the people who already need it.",
    kicker: "Real people. Real signals.",
    description: "Find evidence-backed early adopters already experiencing the problem you solve.",
    detail:
      "A focused prospecting workflow that uses recent public pain and buying signals to identify plausible first customers and design partners.",
    command: "npx skills add first-customer-finder",
    outcomes: [
      "Defines the narrowest plausible early adopter.",
      "Finds public evidence of urgency and active workarounds.",
      "Produces a qualified, traceable prospect list.",
    ],
  },
  {
    slug: "app-store-review-guardian",
    name: "App Store Review Guardian",
    category: "Build",
    color: "sage",
    cover: "SHIP TO THE APP STORE.",
    headline: "Ship to the App Store with fewer surprises.",
    kicker: "Review before review",
    description: "Audit an Apple platform app before submission and catch avoidable rejection risks.",
    detail:
      "A repository and metadata audit covering privacy, permissions, payments, reviewer access, authentication, and App Store submission evidence.",
    command: "npx skills add app-store-review-guardian",
    outcomes: [
      "Finds practical App Review risks in the product.",
      "Checks metadata, disclosures, and reviewer access.",
      "Produces a prioritized submission checklist.",
    ],
  },
  {
    slug: "codex-phone-lab",
    name: "Codex Phone Lab",
    category: "Build",
    color: "sand",
    cover: "BUILD ON YOUR PHONE.",
    headline: "Build an app on a real phone.",
    kicker: "Real device. Live preview.",
    description: "Build and iterate mobile apps through a real-phone Expo preview.",
    detail:
      "A practical React Native workflow for creating mobile prototypes, launching Expo, and testing the result on a physical device through a QR code.",
    command: "npx skills add codex-phone-lab",
    outcomes: [
      "Scaffolds a focused mobile application.",
      "Runs a live preview on a physical phone.",
      "Keeps iteration fast and visually verifiable.",
    ],
  },
  {
    slug: "startup-pricing-lab",
    name: "Startup Pricing Lab",
    category: "Research",
    color: "ink",
    cover: "PRICE IT PROPERLY.",
    headline: "Price your product with evidence.",
    kicker: "Evidence over vibes",
    description: "Research and validate a defensible pricing model using current evidence.",
    detail:
      "A pricing workflow that compares monetization models, current market anchors, value metrics, and reversible price hypotheses.",
    command: "npx skills add startup-pricing-lab",
    outcomes: [
      "Maps the product's economic profile and value cadence.",
      "Compares recurring, one-time, lifetime, and hybrid models.",
      "Builds concrete pricing experiments instead of guessing.",
    ],
  },
];

const prototypeCategories = ["All", "Build", "Research", "Startup", "System"];
const skills = catalogSkills;
const categories = catalogCategories;
const agents = catalogAgents;
const githubProfile = creator.githubUrl;
const githubSponsorsUrl = creator.githubSponsorsUrl;
const xProfile = creator.xUrl;
const supportUrl = creator.supportUrl;
const sponsorHref = sponsor.active && sponsor.url ? sponsor.url : githubSponsorsUrl;
const sponsorPageHref = sponsor.active && sponsor.url ? sponsor.url : "#sponsor";
const sponsorLinkProps = sponsor.active
  ? { target: "_blank", rel: "noreferrer" }
  : {};

const runtimes = [
  {
    name: "Codex",
    mark: "M22.282 9.821a6 6 0 0 0-.516-4.91 6.05 6.05 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a6 6 0 0 0-3.998 2.9 6.05 6.05 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.05 6.05 0 0 0 6.515 2.9A6 6 0 0 0 13.26 24a6.06 6.06 0 0 0 5.772-4.206 6 6 0 0 0 3.997-2.9 6.06 6.06 0 0 0-.747-7.073M13.26 22.43a4.48 4.48 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.8.8 0 0 0 .392-.681v-6.737l2.02 1.168a.07.07 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494M3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.77.77 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646M2.34 7.896a4.5 4.5 0 0 1 2.366-1.973V11.6a.77.77 0 0 0 .388.677l5.815 3.354-2.02 1.168a.08.08 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855-5.833-3.387L15.119 7.2a.08.08 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667m2.01-3.023-.141-.085-4.774-2.782a.78.78 0 0 0-.785 0L9.409 9.23V6.897a.07.07 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.8.8 0 0 0-.393.681zm1.097-2.365 2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5Z",
  },
  {
    name: "Claude Code",
    accent: "#d97757",
    mark: "m4.714 15.956 4.718-2.648.079-.23-.08-.128h-.23l-.79-.048-2.695-.073-2.337-.097-2.265-.122-.57-.121-.535-.704.055-.353.48-.321.685.06 1.518.104 2.277.157 1.651.098 2.447.255h.389l.054-.158-.133-.097-.103-.098-2.356-1.596-2.55-1.688-1.336-.972-.722-.491L2 6.223l-.158-1.008.656-.722.88.06.224.061.893.686 1.906 1.476 2.49 1.833.364.304.146-.104.018-.072-.164-.274-1.354-2.446-1.445-2.49-.644-1.032-.17-.619a3 3 0 0 1-.103-.729L6.287.133 6.7 0l.995.134.42.364.619 1.415L9.735 4.14l1.555 3.03.455.898.243.832.09.255h.159V9.01l.127-1.706.237-2.095.23-2.695.08-.76.376-.91.747-.492.583.28.48.685-.067.444-.286 1.851-.558 2.903-.365 1.942h.213l.243-.242.983-1.306 1.652-2.064.728-.82.85-.904.547-.431h1.032l.759 1.129-.34 1.166-1.063 1.347-.88 1.142-1.263 1.7-.79 1.36.074.11.188-.02 2.853-.606 1.542-.28 1.84-.315.832.388.09.395-.327.807-1.967.486-2.307.462-3.436.813-.043.03.049.061 1.548.146.662.036h1.62l3.018.225.79.522.473.638-.08.485-1.213.62-1.64-.389-3.825-.91-1.31-.329h-.183v.11l1.093 1.068 2.003 1.81 2.508 2.33.127.578-.321.455-.34-.049-2.204-1.657-.85-.747-1.925-1.62h-.127v.17l.443.649 2.343 3.521.122 1.08-.17.353-.607.213-.668-.122-1.372-1.924-1.415-2.168-1.141-1.943-.14.08-.674 7.254-.316.37-.728.28-.607-.461-.322-.747.322-1.476.388-1.924.316-1.53.285-1.9.17-.632-.012-.042-.14.018-1.432 1.967-2.18 2.945-1.724 1.845-.413.164-.716-.37.066-.662.401-.589 2.386-3.036 1.439-1.882.929-1.086-.006-.158h-.055L4.138 18.56l-1.13.146-.485-.456.06-.746.231-.243 1.907-1.312Z",
  },
  {
    name: "Cursor",
    mark: "M11.503.131 1.891 5.678a.84.84 0 0 0-.42.726v11.188c0 .3.162.575.42.724l9.609 5.55a1 1 0 0 0 .998 0l9.61-5.55a.84.84 0 0 0 .42-.724V6.404a.84.84 0 0 0-.42-.726L12.497.131a1.01 1.01 0 0 0-.996 0M2.657 6.338h18.55c.263 0 .43.287.297.515L12.23 22.918c-.062.107-.229.064-.229-.06V12.335a.59.59 0 0 0-.295-.51l-9.11-5.257c-.109-.063-.064-.23.061-.23",
  },
  {
    name: "OpenCode",
    mark: "M22 24H2V0h20zM17 4.8H7v14.4h10z",
  },
];

const gregPosts = [
  {
    skill: "Startup Feedback Engine",
    cover: "/skill-covers/analyze-startup-feedback.png",
    url: "https://x.com/gdb/status/2084074129930772953",
    quote: "codex for customer feedback -> roadmap",
    sharedPost: "CODEX SKILL THAT TURNS CUSTOMER FEEDBACK INTO A ROADMAP!",
    views: "137.8K views",
    replies: "70",
    reposts: "43",
    likes: "735",
    bookmarks: "433",
    date: "Aug 3, 2026",
  },
  {
    skill: "First Customer Finder",
    cover: "/skill-covers/first-customer-finder.png",
    url: "https://x.com/gdb/status/2076686329686171666",
    quote: "Codex for finding customers for your startup:",
    sharedPost: "CODEX SKILL THAT FINDS YOUR STARTUP’S FIRST CUSTOMERS!",
    views: "691.4K views",
    replies: "87",
    reposts: "210",
    likes: "3.7K",
    bookmarks: "4.9K",
    date: "Jul 13, 2026",
  },
  {
    skill: "Complexity Optimizer",
    cover: "/skill-covers/complexity-optimizer.png",
    url: "https://x.com/gdb/status/2055646916499714488",
    quote: "codex for improving computational complexity",
    sharedPost: "CODEX SKILL THAT FINDS COMPLEXITY HOTSPOTS IN YOUR CODEBASE!",
    views: "330.9K views",
    replies: "59",
    reposts: "113",
    likes: "1.7K",
    bookmarks: "1.4K",
    date: "May 16, 2026",
  },
  {
    skill: "Local Client Prospector",
    cover: "/skill-covers/local-client-prospector.png",
    url: "https://x.com/gdb/status/2055285857628676399",
    quote: "codex for finding local businesses who may need help building a website:",
    sharedPost: "CODEX SKILL THAT TURNS LOCAL SEARCH INTO CLIENT LEADS!",
    views: "291.9K views",
    replies: "66",
    reposts: "79",
    likes: "1.6K",
    bookmarks: "1.8K",
    date: "May 15, 2026",
  },
  {
    skill: "Startup Pressure Test",
    cover: "/skill-covers/startup-pressure-test.png",
    url: "https://x.com/gdb/status/2050972114077843772",
    quote: "codex for startup ideas",
    sharedPost: "CODEX SKILL TO BRUTALLY TEST ANY STARTUP IDEA!",
    views: "395.7K views",
    replies: "108",
    reposts: "178",
    likes: "2.3K",
    bookmarks: "2.7K",
    date: "May 3, 2026",
  },
];

const sponsorTiers = [
  {
    name: "Backer",
    amount: 15,
    price: "$15",
    cadence: "/mo",
    description: "Support independent skill building and put your name behind Slashcmd.",
    features: ["Your name on the sponsor wall", "Backs new open-source skill releases"],
    cta: "Become a backer",
  },
  {
    name: "Skill sponsor",
    amount: 99,
    price: "$99",
    cadence: "/mo",
    description: "Place your developer tool beside one highly relevant skill and its demo.",
    features: ["Everything in Backer", "Logo + link on one skill page", "Listed on the sponsor page"],
    cta: "Sponsor a skill",
  },
  {
    name: "Featured sponsor",
    amount: 249,
    price: "$249",
    cadence: "/mo",
    description: "Show up across the catalogue where developers discover their next workflow.",
    features: ["Everything in Skill sponsor", "Homepage catalogue placement", "Featured logo on this page", "Thank-you post on X"],
    cta: "Get featured",
  },
  {
    name: "Exclusive partner",
    amount: 499,
    price: "$499",
    cadence: "/mo",
    description: "Own the most visible placement on Slashcmd for one month.",
    features: ["Exclusive top announcement bar", "Homepage, catalogue and every skill page", "One dedicated sponsor post on X", "One partner in your category"],
    cta: "Become the partner",
    featured: true,
  },
];

const sponsorFaqs = [
  {
    q: "Who will see my product?",
    a: "Developers and founders looking for practical skills for Codex, Claude Code, Cursor, and OpenCode. Placement is designed for relevant developer tools, infrastructure, AI products, and founder software — not generic display ads.",
  },
  {
    q: "Can I sponsor only one launch?",
    a: "Yes. A one-off skill launch or X campaign can be arranged without a monthly commitment. Send the product, preferred skill, and launch date and Kappaemme will propose the cleanest placement.",
  },
  {
    q: "Do you guarantee clicks or sales?",
    a: "No. Sponsorship buys clear, native placement and the agreed public deliverables. Public views can be shared where available, but clicks and conversions depend on the product and audience fit.",
  },
  {
    q: "What products are a good fit?",
    a: "Coding agents, APIs, developer infrastructure, deployment tools, AI products, design tools, startup software, and products that genuinely help the people using these skills.",
  },
  {
    q: "How does payment work?",
    a: "Checkout, receipts, renewals, and cancellation stay on GitHub Sponsors. After sponsoring, send Kappaemme the logo, destination link, and preferred dates on X so the promised placement can be scheduled.",
  },
];

const principles = [
  { t: "One skill, one job", d: "Every skill owns a single outcome. No sprawling mega-prompts." },
  { t: "Readable, not magic", d: "Plain markdown you can open, audit and fork before you run it." },
  { t: "Ends in a verification", d: "A skill is done when the result has been checked, not when text stops." },
  { t: "Portable when possible", d: "Plain workflows travel across agents; tool-dependent skills stay clearly marked Codex only." },
];

const steps = [
  { t: "Install", d: "One command drops the skill into your project's skills directory. Nothing global, nothing hidden." },
  { t: "Invoke", d: "Call it by name in your agent. The skill takes over the workflow instead of you re-explaining it." },
  { t: "Scope", d: "It asks the few questions that actually change the output, then commits to a plan." },
  { t: "Execute", d: "The work happens in your repo, in your environment, with your own tools and permissions." },
  { t: "Verify", d: "Each skill ends with a check on the real behaviour — not a summary of what it intended to do." },
  { t: "Fork", d: "Every skill is a file. Edit it, tighten it, make it yours, open a PR if it helps everyone." },
];

const faqs = [
  {
    q: "What exactly is a skill?",
    a: "A markdown file with a set of instructions and a defined outcome. Your coding agent reads it and follows the workflow instead of improvising. No binaries, no runtime, nothing to trust blindly.",
  },
  {
    q: "Does it only work with Codex?",
    a: "Every skill is tested on Codex. Skills marked Portable are plain instruction-led workflows that can also be adapted to Claude Code, Cursor, and OpenCode. The npm command shown installs the Codex version.",
  },
  {
    q: "Do I need an account?",
    a: "No. Install a skill with one command and it lives in your repository. Slashcmd is a catalogue, not a service — there is nothing to log into.",
  },
  {
    q: "Where does my code go?",
    a: "Nowhere. Skills run inside your own agent, on your machine, with the provider you already use. Slashcmd never sees your project.",
  },
  {
    q: "Who creates these skills?",
    a: "Every skill in this catalogue is designed, tested, documented, and released by Kappaemme. Slashcmd is his personal skill library, not a marketplace.",
  },
];

/* --------------------------------------------------------------- helpers */

const XIcon = (props) => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const gregAvatarUrl = "https://pbs.twimg.com/profile_images/1347621377503711233/bHg3ipfD_x96.jpg";
const kappaAvatarUrl = "https://pbs.twimg.com/profile_images/2018267726507110400/7yfnGNA2_x96.jpg";

const GhIcon = (props) => (
  <svg viewBox="0 0 16 16" width="15" height="15" fill="currentColor" aria-hidden {...props}>
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.4 7.4 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
  </svg>
);

function Logo() {
  return (
    <a className="logo" href="#home" aria-label="Slashcmd — home">
      <span className="logo-mark" aria-hidden="true">/</span>
      <span>Slashcmd</span>
    </a>
  );
}

/* ---------------------------------------------------------------- header */

function Header({ onCatalog, theme, onThemeToggle }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return undefined;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  return (
    <>
      <div className="strip">
        <a
          className="shell strip-inner"
          href={sponsor.active ? sponsorHref : "#sponsor"}
          {...sponsorLinkProps}
        >
          <span className="strip-tag">{sponsor.active ? "Partner" : "Sponsor"}</span>
          <span>
            {sponsor.active
              ? `${sponsor.name} · ${sponsor.tagline}`
              : "One partner per month, presented properly"}
          </span>
          <ArrowRight size={13} />
        </a>
      </div>
      <header className="site-header">
        <div className="shell header-inner">
          <Logo />
          <nav id="primary-navigation" className={`site-nav ${open ? "open" : ""}`} aria-label="Primary">
            <a href="#catalog" onClick={close}>Skills</a>
            <a href="#how" onClick={close}>How it works</a>
            <a href="#faq" onClick={close}>FAQ</a>
            <a href="#sponsor" onClick={close}>Sponsor</a>
            <a href={supportUrl} target="_blank" rel="noreferrer" onClick={close}>Support</a>
            <a className="nav-mobile-only" href={githubProfile} target="_blank" rel="noreferrer" onClick={close}>
              GitHub <ArrowUpRight size={15} />
            </a>
            <a className="nav-mobile-only" href={xProfile} target="_blank" rel="noreferrer" onClick={close}>
              Follow on X <ArrowUpRight size={15} />
            </a>
          </nav>
          <div className="header-actions">
            <a className="icon-button header-social" href={githubProfile} target="_blank" rel="noreferrer" aria-label="Kappaemme on GitHub">
              <GhIcon />
            </a>
            <button
              className="icon-button theme-toggle"
              onClick={onThemeToggle}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
            </button>
            <a className="icon-button header-social" href={xProfile} target="_blank" rel="noreferrer" aria-label="Kappaemme on X">
              <XIcon />
            </a>
            <a className="button button-ghost sm support-button" href={supportUrl} target="_blank" rel="noreferrer">
              <Heart size={14} /> Support
            </a>
            <button className="button button-primary sm" onClick={onCatalog}>Browse skills</button>
            <button
              className="icon-button menu-button"
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-controls="primary-navigation"
              aria-label={open ? "Close navigation" : "Open navigation"}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>
    </>
  );
}

/* ------------------------------------------------------------------ hero */

function Terminal() {
  return (
    <div className="terminal" aria-label="Example terminal session">
      <div className="terminal-bar">
        <div className="terminal-dots"><span /><span /><span /></div>
        <span className="terminal-path">~/projects/atlas</span>
        <span className="terminal-badge">codex</span>
      </div>
      <pre className="terminal-body">
        <span className="t-prompt">$</span> <span className="t-cmd">npx codex-goal-mvp-skill</span>{"\n"}
        <span className="t-ok">✓</span> goal-mvp <span className="t-dim">→ .codex/skills/goal-mvp.md</span>{"\n"}
        {"\n"}
        <span className="t-prompt">$</span> <span className="t-cmd">codex "/goal-mvp booking tool for barbershops"</span>{"\n"}
        <span className="t-arrow">→</span> scoping the smallest version worth shipping{"\n"}
        <span className="t-arrow">→</span> 3 flows · 1 data model · 4 screens{"\n"}
        <span className="t-arrow">→</span> cutting: loyalty points, multi-location, analytics{"\n"}
        <span className="t-ok">✓</span> plan written to <span className="t-file">MVP.md</span>{"\n"}
        <span className="t-ok">✓</span> verified against the launch checklist{"\n"}
        {"\n"}
        <span className="t-prompt">$</span> <span className="caret" />
      </pre>
    </div>
  );
}

function Hero({ onCatalog }) {
  return (
    <main id="home" className="hero shell">
      <div className="hero-copy">
        <span className="eyebrow">Open-source skills by Kappaemme</span>
        <h1>
          Skills that make AI agents<br />
          <em>actually</em> useful.
        </h1>
        <p className="hero-sub">
          Open-source workflows for Codex, with portable skills for Claude Code,
          Cursor and OpenCode — built to finish real work.
        </p>
        <div className="hero-actions">
          <button className="button button-primary" onClick={onCatalog}>
            Browse the catalogue <ArrowRight size={15} />
          </button>
          <a className="button button-ghost" href={githubProfile} target="_blank" rel="noreferrer">
            <GhIcon /> Explore on GitHub
          </a>
          <a className="button button-ghost" href={supportUrl} target="_blank" rel="noreferrer">
            <Heart size={15} /> Support the project
          </a>
        </div>
        <div className="hero-meta">
          <span>{skills.length} skills</span>
          <i />
          <span>MIT licensed</span>
          <i />
          <span>No account required</span>
          <i />
          <a href={xProfile} target="_blank" rel="noreferrer">Created by Kappaemme</a>
        </div>
      </div>
      <Terminal />
    </main>
  );
}

/* ------------------------------------------------------- compat + values */

function Compat() {
  return (
    <div className="rule">
      <div className="shell compat">
        <span>Works with</span>
        <ul aria-label="Supported coding agents">
          {runtimes.map((runtime) => (
            <li key={runtime.name} style={runtime.accent ? { "--runtime-accent": runtime.accent } : undefined}>
              <span className="runtime-mark" aria-hidden="true">
                <svg viewBox="0 0 24 24" role="img">
                  <path fill="currentColor" d={runtime.mark} />
                </svg>
              </span>
              <span className="runtime-name">{runtime.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Principles() {
  return (
    <section className="rule">
      <div className="shell section">
        <div className="section-head section-head-single-line">
          <span className="eyebrow">What a skill is</span>
          <h2>A prompt you never have to write twice.</h2>
          <p>
            Each skill is a single markdown file with a job, a method and a definition of done.
            You read it, you install it, your agent follows it.
          </p>
        </div>
        <div className="principles">
          {principles.map((p, i) => (
            <div className="principle" key={p.t}>
              <span className="principle-n">{String(i + 1).padStart(2, "0")}</span>
              <b>{p.t}</b>
              <span>{p.d}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- catalog */

function Cover({ skill, index }) {
  return (
    <div className="cover">
      <img
        src={skill.coverImage}
        alt={`${skill.name} invoked from the Codex prompt bar`}
        loading="lazy"
      />
    </div>
  );
}

function SkillCard({ skill, index, onSelect }) {
  return (
    <button className="skill-card" onClick={() => onSelect(skill)}>
      {skill.gregPostUrl && <span className="flag proof-flag">Shared by @gdb</span>}
      {skill.featured && <span className="flag">Featured</span>}
      <Cover skill={skill} index={index} />
      <span className="card-body">
        <b>{skill.name}</b>
        <p>{skill.description}</p>
        <span className="card-foot">
          <span className="card-tag">{skill.portable ? `${skill.agents.length} agents · portable` : "Codex only"}</span>
          <ArrowUpRight size={16} />
        </span>
      </span>
    </button>
  );
}

function Catalog({ onSelect }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [agent, setAgent] = useState("All agents");
  const [expanded, setExpanded] = useState(false);

  const filtered = useMemo(
    () =>
      skills.filter((skill) => {
        const matchesCategory = category === "All" || skill.category === category;
        const matchesAgent = agent === "All agents" || skill.agents.includes(agent);
        const haystack = `${skill.name} ${skill.description} ${skill.category} ${skill.agents.join(" ")}`.toLowerCase();
        return matchesCategory && matchesAgent && haystack.includes(query.toLowerCase());
      }),
    [query, category, agent]
  );

  const isDefaultView = category === "All" && agent === "All agents" && !query;
  const visibleSkills = isDefaultView && !expanded ? filtered.slice(0, 6) : filtered;

  useEffect(() => {
    const onKey = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        document.querySelector("#skill-search")?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section id="catalog" className="rule">
      <div className="shell section">
        <div className="section-head">
          <span className="eyebrow">The catalogue</span>
          <h2>Pick a skill. Ship something better.</h2>
        </div>

        <div className="catalog-toolbar">
          <div className="search-wrap">
            <Search size={16} />
            <input
              id="skill-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={`Search ${skills.length} skills`}
            />
            <kbd>⌘K</kbd>
          </div>
          <div className="catalog-selects">
            <label className="filter-select">
              <span>Category</span>
              <select value={category} onChange={(event) => setCategory(event.target.value)}>
                {categories.map((item) => (
                  <option key={item} value={item}>{item === "All" ? "All categories" : item}</option>
                ))}
              </select>
              <ChevronDown size={14} />
            </label>
            <label className="filter-select">
              <span>Works with</span>
              <select value={agent} onChange={(event) => setAgent(event.target.value)}>
                {agents.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
              <ChevronDown size={14} />
            </label>
          </div>
        </div>

        {filtered.length > 0 ? (
          <div className="skill-grid">
            {visibleSkills.map((skill) => (
              <SkillCard
                key={skill.slug}
                skill={skill}
                index={skills.indexOf(skill)}
                onSelect={onSelect}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">No skill matches “{query}”.</div>
        )}

        {isDefaultView && filtered.length > 6 && (
          <div className="catalog-reveal">
            <button type="button" onClick={() => setExpanded((current) => !current)} aria-expanded={expanded}>
              <span>
                <b>{expanded ? "Show fewer skills" : `Show all ${skills.length} skills`}</b>
                <small>{expanded ? "Return to the curated selection" : `${skills.length - visibleSkills.length} more workflows in the catalogue`}</small>
              </span>
              <ChevronDown size={17} />
            </button>
          </div>
        )}

        <div className="catalog-foot">
          <span>{visibleSkills.length} of {filtered.length} skills</span>
          <span>New releases announced on X</span>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------- how it works */

function HowItWorks() {
  return (
    <section id="how" className="rule">
      <div className="shell section">
        <div className="section-head">
          <span className="eyebrow">How it works</span>
          <h2>
            Install once.
            <span className="heading-muted-line">The workflow comes with it.</span>
          </h2>
        </div>
        <div className="steps">
          {steps.map((step, i) => (
            <div className="step" key={step.t}>
              <span className="step-n">{String(i + 1).padStart(2, "0")}</span>
              <b>{step.t}</b>
              <p>{step.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ proof */

function Proof() {
  return (
    <section id="proof" className="rule">
      <div className="shell section">
        <div className="proof-top">
          <div className="section-head">
            <span className="eyebrow">On the timeline</span>
            <h2>Five Kappaemme skills shared by OpenAI co-founder Greg Brockman.</h2>
            <p>
              I build every skill in public and share the demo on X. Then something
              rare happened. Greg Brockman, cofounder of OpenAI, picked up five of
              those releases and put them in front of his audience. These are the
              original posts. They show that independent open source work can reach
              the people shaping the tools it was built for.
            </p>
          </div>
          <div className="proof-metrics" aria-label="Public reach">
            <span><b>5</b><small>posts by Greg</small></span>
            <span><b>~2M</b><small>combined X views</small></span>
            <span><b>10K+</b><small>likes across highlights</small></span>
          </div>
        </div>
        <div className="x-review-grid" aria-label="Greg Brockman posts on X">
          {gregPosts.map((post) => (
            <a className="x-review-card" href={post.url} target="_blank" rel="noreferrer" key={post.url}>
              <span className="x-review-head">
                <img src={gregAvatarUrl} alt="Greg Brockman avatar" width="36" height="36" loading="lazy" />
                <span>
                  <b>Greg Brockman <small className="x-verified" aria-label="Verified account">✓</small></b>
                  <em>@gdb</em>
                </span>
                <XIcon />
              </span>
              <span className="x-review-copy">{post.quote}</span>
              <span className="x-review-quote">
                <span className="x-review-quote-head">
                  <img src={kappaAvatarUrl} alt="Kappaemme avatar" width="24" height="24" loading="lazy" />
                  <span><b>Kappaemme <small className="x-verified">✓</small></b><em>@Kappaemmedev</em></span>
                </span>
                <strong>{post.sharedPost}</strong>
                <small>{post.skill}</small>
              </span>
              <span className="x-review-meta" aria-label="Post engagement">
                <span><Heart size={14} /> {post.likes}</span>
                <span>{post.views}</span>
              </span>
            </a>
          ))}
        </div>
        <p className="proof-note"><Check size={14} /> Every card links to the original public post on X.</p>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------- faq */

function Faq() {
  return (
    <section id="faq" className="rule">
      <div className="shell section">
        <div className="section-head">
          <span className="eyebrow">Questions</span>
          <h2>The things people ask first.</h2>
        </div>
        <div className="faq">
          {faqs.map((item) => (
            <details key={item.q}>
              <summary>
                <span>{item.q}</span>
                <span className="faq-plus" />
              </summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------- band + footer */

function Band() {
  return (
    <section className="band" id="sponsor">
      <div className="shell">
        <span className="eyebrow">{sponsor.active ? "Current partner" : "For sponsors"}</span>
        <h2>
          {sponsor.active
            ? `${sponsor.name} supports independent skill building.`
            : "Put your tool inside the workflow."}
        </h2>
        <p>
          {sponsor.active
            ? sponsor.description || sponsor.tagline
            : "Own the homepage, a single skill launch, or the whole catalogue for a month. One relevant partner at a time — no ad network, no tracking."}
        </p>
        <a className="button button-primary" href={sponsorPageHref} {...sponsorLinkProps}>
          {sponsor.active ? sponsor.cta : "See sponsor options"} <ArrowRight size={15} />
        </a>
      </div>
    </section>
  );
}

function SponsorPage({ onCatalog, theme, onThemeToggle }) {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const tierHref = (tier) =>
    `${githubSponsorsUrl}?frequency=recurring&amount=${tier.amount}`;
  const oneTimeHref = `${githubSponsorsUrl}?frequency=one-time`;

  return (
    <>
      <Header onCatalog={onCatalog} theme={theme} onThemeToggle={onThemeToggle} />
      <main className="sponsor-page">
        <section className="shell sponsor-hero">
          <div className="sponsor-hero-copy">
            <span className="eyebrow">Sponsor Slashcmd</span>
            <h1>Your product, inside workflows developers already use.</h1>
            <p>
              Slashcmd stays free and open source. Sponsorship gives relevant developer
              products a native place in the catalogue, skill pages, and Kappaemme’s public launches —
              with one clear partner, never a wall of ads.
            </p>
            <div className="sponsor-hero-actions">
              <a className="button button-primary" href={githubSponsorsUrl} target="_blank" rel="noreferrer">
                <GhIcon /> Sponsor on GitHub <ArrowRight size={15} />
              </a>
              <a className="button button-ghost" href={oneTimeHref} target="_blank" rel="noreferrer">
                <Heart size={14} /> Give once
              </a>
              <a className="button button-ghost" href={xProfile} target="_blank" rel="noreferrer">
                <XIcon /> Send assets on X
              </a>
            </div>
            <p className="github-checkout-note"><GhIcon /> Billing, receipts, renewals, and cancellation are handled securely by GitHub Sponsors.</p>
          </div>
          <div className="sponsor-signal-grid" aria-label="Slashcmd public signals">
            <span><b>{skills.length}</b><small>published skills</small></span>
            <span><b>~2M</b><small>combined X views</small></span>
            <span><b>5</b><small>posts by Greg Brockman</small></span>
            <span><b>10K+</b><small>likes across highlights</small></span>
          </div>
        </section>

        <section className="rule">
          <div className="shell sponsor-section">
            <div className="sponsor-section-head">
              <div>
                <span className="eyebrow">Monthly partnerships</span>
                <h2>Pick the amount of visibility you actually need.</h2>
              </div>
              <p>Every placement is reviewed for audience fit. Cancel or change the next month before renewal.</p>
            </div>
            <div className="pricing-grid">
              {sponsorTiers.map((tier) => (
                <a
                  className={`pricing-card ${tier.featured ? "featured" : ""}`}
                  href={tierHref(tier)}
                  target="_blank"
                  rel="noreferrer"
                  key={tier.name}
                  aria-label={`Choose ${tier.name} on GitHub Sponsors for ${tier.price} per month`}
                >
                  {tier.featured && <span className="pricing-badge">One slot / month</span>}
                  <span className="pricing-name">{tier.name}</span>
                  <p className="pricing-price"><b>{tier.price}</b><small>{tier.cadence}</small></p>
                  <p className="pricing-description">{tier.description}</p>
                  <ul>
                    {tier.features.map((feature) => <li key={feature}><Check size={13} /> {feature}</li>)}
                  </ul>
                  <span className="pricing-cta">
                    <span><GhIcon /> {tier.cta}</span> <ArrowUpRight size={14} />
                  </span>
                </a>
              ))}
            </div>
            <a className="custom-campaign" href={oneTimeHref} target="_blank" rel="noreferrer">
              <span><small>One-off campaign</small><b>Launching something? Sponsor one skill release or one X demo.</b></span>
              <span className="custom-campaign-cta"><GhIcon /> Give once on GitHub <ArrowRight size={14} /></span>
            </a>
            <div className="sponsor-handoff" aria-label="How a sponsorship goes live">
              <span><small>01</small><b>Choose and pay on GitHub</b><p>The amount and renewal are visible before checkout.</p></span>
              <span><small>02</small><b>Send logo + link on X</b><p>Share the asset, destination URL, and preferred launch date.</p></span>
              <span><small>03</small><b>Your placement goes live</b><p>The banner locations listed in your tier are reserved for the paid period.</p></span>
            </div>
          </div>
        </section>

        <section className="rule">
          <div className="shell sponsor-section sponsor-placements">
            <div className="sponsor-section-head">
              <div>
                <span className="eyebrow">Where your brand appears</span>
                <h2>Placed in context, not pasted into empty ad space.</h2>
              </div>
              <p>The placement changes with the tier, but it always looks native to Slashcmd and stays clearly labeled.</p>
            </div>
            <div className="placement-grid">
              <article>
                <span>01</span><b>Top announcement</b>
                <p>The exclusive partner owns the first line seen on every page for the agreed month.</p>
              </article>
              <article>
                <span>02</span><b>Inside the catalogue</b>
                <p>A branded card sits naturally among the skills developers are actively browsing.</p>
              </article>
              <article>
                <span>03</span><b>Relevant skill pages</b>
                <p>Your product appears beside the install command, source, prompt, and original workflow demo.</p>
              </article>
              <article>
                <span>04</span><b>Public launch on X</b>
                <p>Higher tiers include a transparent thank-you or dedicated sponsor post from Kappaemme.</p>
              </article>
            </div>
            <div className="sponsor-mockup" aria-label="Example exclusive partner placement">
              <span className="sponsor-mockup-tag">Sponsor</span>
              <span className="sponsor-mockup-logo">YOUR LOGO</span>
              <span className="sponsor-mockup-copy"><b>Built for developers who ship with agents.</b><small>One useful sentence. One link. No tracking circus.</small></span>
              <ArrowUpRight size={18} />
            </div>
          </div>
        </section>

        <section className="rule">
          <div className="shell sponsor-section sponsor-faq-section">
            <div className="section-head">
              <span className="eyebrow">Questions</span>
              <h2>Before your logo goes live.</h2>
            </div>
            <div className="faq">
              {sponsorFaqs.map((item) => (
                <details key={item.q}>
                  <summary><span>{item.q}</span><span className="faq-plus" /></summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="band sponsor-final-cta">
          <div className="shell">
            <span className="eyebrow">Available now</span>
            <h2>Be the first partner developers see on Slashcmd.</h2>
            <p>Choose a tier on GitHub, then send your logo, link, and preferred month on X. The placements listed in your tier stay reserved for the paid period.</p>
            <div className="sponsor-final-actions">
              <a className="button button-primary" href={githubSponsorsUrl} target="_blank" rel="noreferrer"><GhIcon /> Sponsor on GitHub <ArrowRight size={15} /></a>
              <a className="button button-ghost" href={xProfile} target="_blank" rel="noreferrer"><XIcon /> Send assets on X</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="footer-inner">
          <div className="footer-brand">
            <Logo />
            <p>Open-source skills for people who ship with coding agents.</p>
          </div>
          <div className="footer-col">
            <b>Catalogue</b>
            <a href="#catalog">All skills</a>
            <a href="#how">How it works</a>
            <a href="#faq">FAQ</a>
          </div>
          <div className="footer-col">
            <b>Project</b>
            <a href={githubProfile} target="_blank" rel="noreferrer">GitHub</a>
            <a href={xProfile} target="_blank" rel="noreferrer">X</a>
            <a href={supportUrl} target="_blank" rel="noreferrer">Support</a>
            <a href="#sponsor">Sponsor</a>
          </div>
          <div className="footer-col">
            <b>Legal</b>
            <a href="#faq">License</a>
            <a href="#faq">Privacy</a>
          </div>
        </div>
        <div className="footer-base">
          <span>© {new Date().getFullYear()} Slashcmd · Created by Kappaemme</span>
          <span>MIT · built in public</span>
        </div>
      </div>
    </footer>
  );
}

/* ----------------------------------------------------------- detail page */

function SkillPrompt({ skill }) {
  const [copied, setCopied] = useState(false);

  const copyPrompt = async () => {
    await navigator.clipboard.writeText(skill.prompt);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <section className="prompt-panel" aria-labelledby={`prompt-${skill.slug}`}>
      <div className="prompt-head">
        <div>
          <span className="eyebrow">Try it yourself</span>
          <h2 id={`prompt-${skill.slug}`}>Start with this prompt.</h2>
        </div>
        <a className="prompt-source" href={skill.xUrl} target="_blank" rel="noreferrer">
          {skill.promptSource} <ArrowUpRight size={10} />
        </a>
      </div>
      <p>Paste it into your agent after installing the skill, then replace the example details with yours.</p>
      <div className="prompt-code">
        <code>{skill.prompt}</code>
        <button onClick={copyPrompt} aria-live="polite">
          {copied ? <Check size={15} /> : <Copy size={15} />}
          {copied ? "Copied" : "Copy prompt"}
        </button>
      </div>
    </section>
  );
}

function SkillDetail({ skill, onBack, theme, onThemeToggle }) {
  const [copied, setCopied] = useState(false);

  const copyCommand = async () => {
    await navigator.clipboard.writeText(skill.command);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  useEffect(() => { window.scrollTo(0, 0); }, [skill.slug]);

  return (
    <>
      <Header onCatalog={onBack} theme={theme} onThemeToggle={onThemeToggle} />
      <main className="shell detail">
        <button className="breadcrumb" onClick={onBack}>
          <ArrowLeft size={13} /> Catalogue / {skill.category} / {skill.name}
        </button>

        <div className="detail-hero">
          <div>
            <span className="eyebrow">{skill.category}</span>
            <h1>{skill.headline}</h1>
            <p>{skill.description}</p>
            <div className="detail-meta">
              <a href={xProfile} target="_blank" rel="noreferrer">Created by Kappaemme</a><i /><span>MIT</span><i /><span>Released {skill.launchDate}</span>
            </div>
            <div className="agent-pills" aria-label="Compatible agents">
              {skill.agents.map((agent) => <span key={agent}>{agent}</span>)}
              {skill.portable && <small>Portable workflow</small>}
              {skill.gregPostUrl && (
                <a href={skill.gregPostUrl} target="_blank" rel="noreferrer">Shared by Greg Brockman <ArrowUpRight size={11} /></a>
              )}
            </div>
          </div>
          <Cover skill={skill} index={skills.indexOf(skill)} />
        </div>

        <section className="install-section" aria-labelledby={`install-${skill.slug}`}>
          <div className="install-head">
            <span className="eyebrow">Installation</span>
            <div>
              <h2 id={`install-${skill.slug}`}>Install in one command.</h2>
              <p>Run this in your terminal. If your agent is already open, start a new session when the installation finishes.</p>
            </div>
          </div>
          <div className="install-bar">
            <span className="install-type">Terminal</span>
            <code><span>$</span> {skill.command}</code>
            <button onClick={copyCommand}>
              {copied ? <Check size={15} /> : <Copy size={15} />}
              {copied ? "Copied" : "Copy command"}
            </button>
          </div>
          <div className="install-steps" aria-label="Installation steps">
            <span><b>01</b> Run the command</span>
            <span><b>02</b> Open a new agent session</span>
            <span><b>03</b> Try the prompt below</span>
          </div>
        </section>

        <div className="detail-body">
          <div className="detail-content">
            <section className="skill-explainer">
              <span className="eyebrow">Inside the skill</span>
              <h2>What it actually does.</h2>
              <p className="detail-overview">{skill.overview}</p>
              <h3>What you can do</h3>
            <ol className="outcomes">
              {skill.outcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}
            </ol>
            </section>
            <SkillPrompt skill={skill} />
          </div>
          <aside>
            <a className="aside-card" href={skill.xUrl} target="_blank" rel="noreferrer">
              <div className="aside-head">
                <span className="avatar">KM</span>
                <span>
                  <b>Kappaemme</b>
                  <small>Creator · release on X</small>
                </span>
                <XIcon />
              </div>
              <div className="aside-video" aria-hidden="true">
                <span className="demo-play"><Play size={22} fill="currentColor" /></span>
                <span className="demo-copy">
                  <small>Original workflow</small>
                  <b>Prompt → real output</b>
                </span>
                <span className="demo-timeline"><i /><i /><i /><i /></span>
              </div>
              <span className="aside-link">Watch the original demo on X <ArrowUpRight size={15} /></span>
            </a>
            {skill.githubUrl && (
              <a className="aside-source" href={skill.githubUrl} target="_blank" rel="noreferrer">
                <span className="mark"><GhIcon /></span>
                <span>
                  <small>Source code</small>
                  <b>{skill.repositoryName}</b>
                </span>
                <ArrowUpRight size={16} />
              </a>
            )}
            <a className={`aside-sponsor ${sponsor.active ? "sponsor-live" : ""}`} href={sponsorPageHref} {...sponsorLinkProps}>
              <span className="mark">◇</span>
              <span>
                <small>{sponsor.active ? "This skill is supported by" : "This skill could be supported by"}</small>
                <b>{sponsor.active ? sponsor.name : "Your brand"}</b>
              </span>
              <ChevronRight size={16} />
            </a>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}

/* --------------------------------------------------------------- app root */

function Home({ onSelect, theme, onThemeToggle }) {
  const scrollCatalog = () =>
    document.querySelector("#catalog")?.scrollIntoView({ behavior: "smooth" });
  return (
    <>
      <Header onCatalog={scrollCatalog} theme={theme} onThemeToggle={onThemeToggle} />
      <Hero onCatalog={scrollCatalog} />
      <Compat />
      <Principles />
      <Catalog onSelect={onSelect} />
      <HowItWorks />
      <Proof />
      <Faq />
      <Band />
      <Footer />
    </>
  );
}

function App() {
  const [selected, setSelected] = useState(null);
  const [showSponsor, setShowSponsor] = useState(false);
  const [theme, setTheme] = useState(() =>
    document.documentElement.dataset.theme === "light" ? "light" : "dark"
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    localStorage.setItem("slashcmd-theme", theme);
    const themeMeta = document.querySelector('meta[name="theme-color"]');
    if (themeMeta) themeMeta.content = theme === "light" ? "#f5f3ee" : "#11110f";
  }, [theme]);

  useEffect(() => {
    const sync = () => {
      if (window.location.hash.startsWith("#skill/")) {
        const slug = window.location.hash.replace("#skill/", "");
        setSelected(skills.find((skill) => skill.slug === slug) || null);
        setShowSponsor(false);
      } else {
        setSelected(null);
        setShowSponsor(window.location.hash === "#sponsor");
      }
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const openSkill = (skill) => {
    setSelected(skill);
    setShowSponsor(false);
    window.location.hash = `skill/${skill.slug}`;
    window.scrollTo(0, 0);
  };

  const goHome = () => {
    setSelected(null);
    setShowSponsor(false);
    window.location.hash = "catalog";
    window.setTimeout(() => document.querySelector("#catalog")?.scrollIntoView(), 0);
  };

  const toggleTheme = () => setTheme((current) => current === "dark" ? "light" : "dark");

  if (selected) {
    return <SkillDetail skill={selected} onBack={goHome} theme={theme} onThemeToggle={toggleTheme} />;
  }

  if (showSponsor) {
    return <SponsorPage onCatalog={goHome} theme={theme} onThemeToggle={toggleTheme} />;
  }

  return <Home onSelect={openSkill} theme={theme} onThemeToggle={toggleTheme} />;
}

createRoot(document.getElementById("root")).render(
  <>
    <App />
    <Analytics />
    <SpeedInsights />
  </>
);
