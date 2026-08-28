export const skillDetails = {
  "design-audit": {
    overview: "Give it a live URL, localhost app, screenshot, or repository frontend. It returns a scored UX/UI audit covering hierarchy, responsive behavior, accessibility, trust, copy clarity, and implementation polish, then ranks the fixes by impact.",
    useCases: [
      "Score a landing page, dashboard, portfolio, store, or mobile-first experience.",
      "Find visual, responsive, accessibility, and conversion weaknesses.",
      "Re-audit after the fixes and compare the score deltas.",
    ],
    prompt: "Use $design-audit to evaluate https://shipslap.online/",
    promptSource: "From the video",
  },
  "video-short-maker": {
    overview: "Turn a local source video into a platform-ready short without an external editing service. The workflow can remove dead air, tighten pauses, create a vertical export, generate local Whisper captions, burn them into the MP4, and produce an edit report.",
    useCases: [
      "Create vertical shorts from local demos, interviews, or talking-head footage.",
      "Choose target duration, language, quality, and light or aggressive cuts.",
      "Generate and burn local captions without an OpenAI API key.",
    ],
    prompt: "Use $video-short-maker to create a 30s vertical high quality short with English captions from /Users/me/Desktop/demo.mp4 using aggressive cut style.",
    promptSource: "From the video",
  },
  "startup-pressure-test": {
    overview: "Give it a startup idea before you build. It produces a founder-style diagnosis with a verdict, scorecard, core assumption, fatal flaws, problem reality, real competition, first-customer moves, and a focused two-week MVP direction.",
    useCases: [
      "Expose the assumption the entire idea depends on.",
      "Check whether the problem is urgent and whether people already pay to solve it.",
      "Define a two-week validation or MVP plan before committing months.",
    ],
    prompt: "Use $startup-pressure-test to brutally test this startup idea: an AI scheduling assistant for independent gyms.",
    promptSource: "README example",
  },
  "codex-fm": {
    overview: "Launch a Codex-themed pixel-art lo-fi radio directly in the browser. It is a lightweight focus companion for long coding sessions, with a dedicated visual environment and rotating generative sounds.",
    useCases: [
      "Open a focused lo-fi environment without leaving Codex.",
      "Use it as a quiet background companion during long sessions.",
      "Return to the radio later with the same simple invocation.",
    ],
    prompt: "Open Codex FM.",
    promptSource: "From the video",
  },
  "codex-pomodoro-arena": {
    overview: "Turn a Pomodoro session into a pixel-art boss fight. You enter the task, start a focused timer, fight distractions through the session, then move into break mode while the app tracks streaks.",
    useCases: [
      "Start a 25-minute focus session around one concrete task.",
      "Make repetitive work feel more engaging through a boss-fight loop.",
      "Track sessions, breaks, and streaks in a browser-based arena.",
    ],
    prompt: "Open Codex Pomodoro Arena and start a focus session for finishing this feature.",
    promptSource: "Video-based example",
  },
  "simple-flight-search": {
    overview: "Run a lightweight assisted flight search without API keys, scraping, reverse engineering, or booking automation. It collects public options and turns them into a practical shortlist with price, stops, baggage hints, date tradeoffs, and booking advice.",
    useCases: [
      "Compare current routes, dates, stops, and likely baggage constraints.",
      "Get a concise shortlist instead of a wall of search results.",
      "Understand when and where to continue the booking manually.",
    ],
    prompt: "Use $simple-flight-search: find cheap flights from Milan to Tokyo in July, max 1 stop, and give booking advice.",
    promptSource: "README example",
  },
  "local-client-prospector": {
    overview: "Turn browser-assisted local research into a qualified lead sheet. The skill checks nearby businesses, distinguishes standalone websites from social-only presences, scores the opportunity, and returns evidence, contact details, and practical outreach notes.",
    useCases: [
      "Find local shops, gyms, restaurants, salons, or clinics with weak web presence.",
      "Verify whether each prospect has a real site or only social profiles.",
      "Create a filtered XLSX or a concise ranked list for outreach.",
    ],
    prompt: "Use $local-client-prospector and $spreadsheets to find businesses within 20km of Casoria that may need a website. Create an XLSX with filters, lead score, phone, website/social links, notes, and top prospects.",
    promptSource: "Video + README",
  },
  "complexity-optimizer": {
    overview: "Analyze a real codebase for algorithmic complexity and performance hotspots. It looks for expensive loops, repeated lookups, N+1 patterns, render-heavy work, and other structural costs, then separates safe improvements from riskier changes.",
    useCases: [
      "Map the most expensive paths before touching implementation.",
      "Rank optimizations by expected impact and regression risk.",
      "Implement a selected low-risk change and verify it with relevant tests.",
    ],
    prompt: "Use $complexity-optimizer to analyze this codebase and give me a report.",
    promptSource: "README example",
  },
  "visual-web-builder": {
    overview: "Combine image generation with image-first frontend implementation. It creates visual references first, studies typography, layout, spacing, color, components, and image treatment, then implements the actual responsive website from that visual source of truth.",
    useCases: [
      "Generate a visual direction before committing to frontend code.",
      "Create section-by-section references for a complete landing page.",
      "Implement the approved direction inside the current React or web project.",
    ],
    prompt: "Use $visual-web-builder to build a 5-section premium landing page for a pilates studio in Milan. Generate the visual references first, analyze them, then implement the site in the current React project.",
    promptSource: "npm README example",
  },
  "site-post-screenshots": {
    overview: "Turn a real website URL into a consistent set of social-ready screenshots. It captures faithful desktop and mobile views, then produces X-ready, desktop-only, mobile-only, and desktop-plus-phone compositions without redesigning the source site.",
    useCases: [
      "Create polished launch visuals from an existing live website.",
      "Export desktop and mobile compositions at social-friendly dimensions.",
      "Keep the original site faithful while improving presentation and framing.",
    ],
    prompt: "Use $site-post-screenshots https://www.builtwithcodex.online/ and send the screens in chat.",
    promptSource: "From the video",
  },
  "x-phoenix-score": {
    overview: "Score a draft X post using directional engagement weights inspired by the open-source X ranking references. It breaks down the likely signals, explains weaknesses, and suggests rewrites while keeping the author's original point intact.",
    useCases: [
      "Evaluate a draft, screenshot, or extracted X post before publishing.",
      "See a weighted signal breakdown instead of a generic writing score.",
      "Generate concrete improvements and alternative hooks.",
    ],
    prompt: "Use $x-phoenix-score to analyze this X post and suggest concrete improvements: [paste your draft].",
    promptSource: "README example",
  },
  "goal-mvp": {
    overview: "Turn a rough product idea into the smallest version worth shipping. The workflow clarifies the outcome, cuts non-essential scope, plans the architecture, builds the product, verifies the real behavior, and finishes with a practical launch path.",
    useCases: [
      "Convert a broad idea into a focused, testable MVP specification.",
      "Remove features that do not prove the core value.",
      "Build, verify, and prepare the result for its first real users.",
    ],
    prompt: "/goal MVP build a booking tool for independent barbershops.",
    promptSource: "README example",
  },
  "codex-phone-lab": {
    overview: "Go from a prompt to a React Native app running on a physical phone through Expo Go. The workflow handles project creation, environment checks, live preview, QR launch, and rapid iteration without Xcode, TestFlight, or an App Store build.",
    useCases: [
      "Prototype an iPhone or Android app from a product prompt.",
      "Launch the result on a real device through an Expo QR code.",
      "Iterate on screens and interactions while previewing changes live.",
    ],
    prompt: "Use $codex-phone-lab and make me a notes app for my phone.",
    promptSource: "README example",
  },
  "mac-storage-cleanup": {
    overview: "Audit a Mac for wasted storage before deleting anything. It checks caches, logs, installers, build artifacts, node_modules, Xcode data, simulators, Docker leftovers, and other large candidates, then ranks them by size, confidence, and risk.",
    useCases: [
      "Understand where disk space is actually going.",
      "Separate safe cleanup candidates from files that need review.",
      "Approve exact removals only after seeing their impact and risk.",
    ],
    prompt: "$mac-storage-cleanup",
    promptSource: "From the video",
  },
  "name-prospector": {
    overview: "Generate brand and product names at scale, screen likely domains, and research competitors using similar identities. It helps move from thousands of raw candidates to a shorter list with naming patterns, domain signals, and collision risks.",
    useCases: [
      "Generate large batches of names from a product brief and keywords.",
      "Check requested TLDs such as .com, .ai, or .io.",
      "Surface similar competitors before committing to an identity.",
    ],
    prompt: "Use $name-prospector: AI booking tool for restaurants, .com/.ai, competitors.",
    promptSource: "npm README example",
  },
  "codex-security-audit-skill": {
    overview: "Run a practical pre-launch security audit across a repository, SaaS, API, mobile app, or MVP. It checks secrets, authentication, authorization, dependency risk, unsafe input handling, production configuration, and other launch-blocking exposures.",
    useCases: [
      "Map the exposed attack surface before launch.",
      "Rank concrete findings by severity and repository evidence.",
      "Implement approved Critical and High fixes with focused verification.",
    ],
    prompt: "Use $codex-security-audit-skill on this project. Start with the audit and do not change files yet.",
    promptSource: "README example",
  },
  "sell-my-saas": {
    overview: "Turn a SaaS URL or product description into platform-native sales content. It analyzes the landing page, finds the strongest proof and value, then creates drafts tailored for X, LinkedIn, Reddit, launch posts, founder updates, and direct outreach.",
    useCases: [
      "Extract the strongest sellable angle from a product URL.",
      "Create platform-specific posts instead of recycling one generic draft.",
      "Produce launch copy, cold DMs, and founder updates in a chosen tone.",
    ],
    prompt: "Use $sell-my-saas for https://your-saas.com. Keep the tone direct and not cringe.",
    promptSource: "README example",
  },
  "mengtofrontend": {
    overview: "Audit and polish a landing page using a focused anti-slop checklist. It finds weak typography, careless letter spacing, generic imagery, fake-looking visuals, vague copy, missing micro-interactions, and unfinished mobile behavior.",
    useCases: [
      "Identify the visual tells that make a page feel AI-generated.",
      "Prioritize typography, imagery, copy, interaction, and mobile fixes.",
      "Run a final refinement pass before launch.",
    ],
    prompt: "Use $mengtofrontend to audit this landing page and tell me what feels AI-generated or weak before launch: https://example.com.",
    promptSource: "README example",
  },
  "landing-to-powerpoint": {
    overview: "Transform a landing page URL or local HTML file into a concise presentation. The workflow captures evidence from the source, shapes a product narrative, creates a maximum-eight-slide PowerPoint, exports a PDF when supported, and opens a browser preview.",
    useCases: [
      "Convert an existing landing page into a clear product story.",
      "Create a polished PPTX with screenshots and visual evidence.",
      "Deliver a matching PDF and browser-openable preview.",
    ],
    prompt: "$landing-to-powerpoint https://www.vibedesk.online/",
    promptSource: "From the video",
  },
  "startup-user-simulator": {
    overview: "Test a startup, SaaS, app, or landing page through five evidence-based customer personas. It inspects the actual experience, traces each persona's decision journey, explains why they convert, hesitate, or leave, and ranks the fixes by likely impact.",
    useCases: [
      "Pressure-test positioning and conversion with five plausible customers.",
      "Compare old and new landing-page versions using the same personas.",
      "Rewrite the highest-impact sections when customers may not understand the offer.",
    ],
    prompt: "Use $startup-user-simulator to test https://www.trysynara.com/ with five simulated customer personas.",
    promptSource: "Video-based example",
  },
  "first-customer-finder": {
    overview: "Turn a startup URL or idea into a qualified shortlist of potential first customers. It defines the ICP, researches recent public pain and timing signals, links the evidence for every prospect, scores fit, drafts a source-based opener, and never sends outreach automatically.",
    useCases: [
      "Find early adopters already describing the problem publicly.",
      "Rank prospects by fit, urgency, evidence quality, and timing.",
      "Create a polished report with one evidence-based opener per prospect.",
    ],
    prompt: "Use $first-customer-finder to find ten evidence-backed potential first customers for https://example.com and create the final HTML report.",
    promptSource: "README example",
  },
  "startup-channel-finder": {
    overview: "Find where the right users are already active instead of returning a generic list of launch sites. It researches current communities, directories, marketplaces, forums, and launch platforms, verifies promotion rules and audience fit, then builds channel-specific drafts and a seven-day plan.",
    useCases: [
      "Rank launch channels using current audience and promotion evidence.",
      "Understand exactly what to publish in each selected channel.",
      "Turn the results into a focused seven-day distribution plan.",
    ],
    prompt: "Use $startup-channel-finder to find where I should launch https://www.trysynara.com/.",
    promptSource: "Video + README",
  },
  "startup-pricing-lab": {
    overview: "Research how a product delivers value, who pays, which costs continue, how competitors charge, and which monetization model is safest to test. It recommends concrete plans and price hypotheses, makes an explicit lifetime-deal decision, and creates a fourteen-day validation roadmap.",
    useCases: [
      "Compare monthly, one-time, lifetime, usage-based, and hybrid models.",
      "Turn competitor evidence into concrete plan and price hypotheses.",
      "Validate pricing through reversible experiments instead of guessing.",
    ],
    prompt: "Use $startup-pricing-lab to recommend the best pricing model, plans, and prices for https://example.com.",
    promptSource: "README example",
  },
  "startup-business-planner": {
    overview: "Turn a startup URL, repository, or product idea into an evidence-backed operating plan. It combines market, ICP, positioning, business model, go-to-market, pricing, unit economics, an editable financial model, and a ninety-day execution roadmap while keeping unknowns visible.",
    useCases: [
      "Create a complete business plan from a URL or product description.",
      "Recommend pricing and expose the assumptions behind the financial model.",
      "Translate the strategy into a practical ninety-day roadmap.",
    ],
    prompt: "Use $startup-business-planner for https://example.com. Build the complete business plan, pricing recommendation, financial model, and 90-day roadmap.",
    promptSource: "README example",
  },
  "code-rot-cleaner": {
    overview: "Find code a project may no longer need without treating every static warning as proof. It checks orphan modules, unused dependencies and exports, duplicate implementations, and stale commented code, then classifies each finding as safe to remove, review, or keep.",
    useCases: [
      "Separate credible removal evidence from framework and dynamic-loading false positives.",
      "Prove eligible deletions inside disposable copies before touching the project.",
      "Estimate removable files and lines of code in a native Markdown report.",
    ],
    prompt: "Use $code-rot-cleaner to find code this project no longer needs. Start in report-only mode and do not change project files.",
    promptSource: "README example",
  },
  "mac-file-detective": {
    overview: "Find forgotten Mac files from the clues you still remember. It combines Spotlight evidence, filenames, document text, dates, file types, application metadata, project context, and optional visual inspection to return a short ranked list.",
    useCases: [
      "Search from remembered content when the filename is unknown.",
      "Combine approximate date, application, color, logo, and layout clues.",
      "See why each candidate matches before opening it.",
    ],
    prompt: "Use $mac-file-detective to find the screenshot with a green pricing table that I saved last month.",
    promptSource: "Video + README",
  },
  "build-startup-brand": {
    overview: "Turn a startup idea, URL, pitch, or existing identity into a complete brand system. It defines the strategic core, creates three distinct creative territories, scores them, and develops the selected direction into usable positioning, voice, messaging, color, type, and visual guidance.",
    useCases: [
      "Create a brand from an early idea without a finished brief.",
      "Compare three genuinely different creative territories before choosing.",
      "Deliver the final verbal and visual identity in a polished HTML report.",
    ],
    prompt: "Use $build-startup-brand to create a complete brand identity for https://www.trysynara.com/.",
    promptSource: "Video + README",
  },
  "startup-launch-doctor": {
    overview: "Audit a live startup before launch. It reconstructs what the product appears to do, follows the public conversion journey, tests positioning, proof, trust, pricing, documentation, mobile UX, accessibility, and broken paths, then produces a prioritized launch-readiness report.",
    useCases: [
      "Find critical launch blockers from a URL, localhost app, repo, screenshot, or copy draft.",
      "Inspect the primary conversion path on desktop and mobile.",
      "Compare a current experience with a redesign before publishing.",
    ],
    prompt: "Use $startup-launch-doctor in deep mode on https://www.trysynara.com/. Inspect pricing, trust, documentation, and the primary conversion paths on desktop and mobile.",
    promptSource: "Video-based example",
  },
  "analyze-startup-feedback": {
    overview: "Turn support tickets, interviews, surveys, reviews, sales calls, and churn notes into traceable product evidence. It preserves every source in an evidence ledger, clusters recurring signals, scores opportunities, separates proof from praise, and builds an interactive customer evidence map.",
    useCases: [
      "Rank product opportunities while preserving the evidence IDs behind each recommendation.",
      "Create an evidence-backed Now, Next, Later or validation roadmap.",
      "Extract credible customer language without inventing or merging quotes.",
    ],
    prompt: "Use $analyze-startup-feedback in full mode for https://www.trysynara.com/. Create the complete Startup Customer Evidence Map and keep quotes private unless publication permission exists.",
    promptSource: "Video + README",
  },
  "track-startup-competitors": {
    overview: "Build evidence-backed competitive intelligence across official sites, pricing pages, changelogs, documentation, GitHub, packages, X, news, public communities, reviews, jobs, and web archives. It records a verified baseline, compares later snapshots, and explains what changed and why it matters.",
    useCases: [
      "Create a verified baseline for a startup and its real competitors.",
      "Detect product, price, positioning, hiring, and distribution changes over time.",
      "Separate actions to take now from items to investigate, watch, or ignore.",
    ],
    prompt: "Use $track-startup-competitors to build a verified competitor baseline for https://example.com and tell me what changed in the last 30 days.",
    promptSource: "README example",
  },
  "simulate-startup-sales": {
    overview: "Practice realistic startup sales conversations before meeting a buyer. It generates varied call scenarios from a product URL or pitch, becomes a stateful buyer with hidden motives, challenges unsupported claims, and produces a native Markdown performance report after the call.",
    useCases: [
      "Generate eight to fifteen distinct sales calls worth practicing.",
      "Run discovery, objection, pricing, and multi-stakeholder scenarios.",
      "Review what earned or lost the next step with evidence-linked feedback.",
    ],
    prompt: "Use $simulate-startup-sales to analyze https://example.com and create a Markdown pack with 12 different sales calls I can practice. Keep buyer motives and exact objections hidden.",
    promptSource: "README example",
  },
  "generate-startup-ideas": {
    overview: "Generate startup ideas around the founder rather than producing a static brainstorm. It asks three focused questions, searches current public pain and demand signals, launches a broad first burst, learns from love/maybe/no reactions, then validates the strongest finalists.",
    useCases: [
      "Discover opportunities from recent complaints, workarounds, and requests.",
      "Refine the idea space interactively from the founder's reactions.",
      "Validate the best candidates and save them in a native Markdown report.",
    ],
    prompt: "Use $generate-startup-ideas in surprise-me mode. Ask me the three questions, search current public signals, then start the first idea burst.",
    promptSource: "README example",
  },
  "code-change-guardian": {
    overview: "Show what may break before a risky code change. It maps the blast radius, finds implicit contracts and downstream consumers, characterizes current behavior, plans a behavior-preserving refactor, and records the verification evidence in a native Markdown report.",
    useCases: [
      "Analyze the impact of a migration, API change, dependency upgrade, or refactor.",
      "Protect implicit behavior before extracting or replacing a component.",
      "Verify a current diff and identify unprotected regression paths.",
    ],
    prompt: "Use $code-change-guardian to analyze what could break if we replace JWT authentication with sessions. Do not edit code.",
    promptSource: "README example",
  },
  "app-store-review-guardian": {
    overview: "Audit an iOS app before submission using repository evidence, App Store metadata, privacy disclosures, review notes, and reviewer access. It checks permission usage, authentication, payments, broken paths, external dependencies, and common App Review rejection risks.",
    useCases: [
      "Find repository and metadata inconsistencies before Apple does.",
      "Check privacy, permissions, payments, sign-in, and reviewer access.",
      "Produce a prioritized submission checklist with blocking evidence.",
    ],
    prompt: "Use $app-store-review-guardian to audit this iOS app before submission.",
    promptSource: "README example",
  },
  "create-product-ads-with-actionway": {
    overview: "Turn a product image or app screenshot into a finished vertical advertisement. The workflow creates a creative plan, obtains an exact Actionway quote before spending, generates motion, voiceover, and optional music, then assembles and verifies the final MP4 locally.",
    useCases: [
      "Create a short launch ad from one product screenshot.",
      "Control camera behavior, interface fidelity, headline, CTA, voice, and music.",
      "See the exact paid-media cost before generation begins.",
    ],
    prompt: "Use $create-product-ads-with-actionway to create a 10-second vertical ad for Microdex. Keep the camera completely locked and preserve the full app interface. Only animate subtle green indicator lights, reflections, and button illumination. Headline: Control Codex from your iPhone. CTA: Open source on GitHub. Show me the creative plan and exact Actionway quote before spending.",
    promptSource: "From the video",
  },
  "codex-first-million": {
    overview: "Turn a personal financial snapshot into three transparent paths toward a first-million target. It models milestones, income levers, tradeoffs, and practical experiments, then creates one polished bilingual Markdown roadmap instead of promising a guaranteed outcome.",
    useCases: [
      "Model realistic paths from income, expenses, assets, debt, skills, and available time.",
      "Compare scenarios with every assumption visible and editable.",
      "Translate the selected path into milestones and near-term actions.",
    ],
    prompt: "Use $codex-first-million to build my path to €1M. Ask for my current income, expenses, assets, debt, skills, and available time before modeling the scenarios.",
    promptSource: "README example",
  },
};
