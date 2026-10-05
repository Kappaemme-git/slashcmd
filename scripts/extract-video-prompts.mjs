import { execFileSync } from "node:child_process";
import { mkdtempSync, mkdirSync, readdirSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { posts } from "./fetch-x-post-copy.mjs";

const root = mkdtempSync(join(tmpdir(), "slashcmd-video-prompts-"));
const ocrBinary = join(root, "ocr-video-frames");
const ocrSource = resolve("scripts/ocr-video-frames.swift");

execFileSync("swiftc", [ocrSource, "-o", ocrBinary], { stdio: "inherit" });

function areaFromUrl(url) {
  const match = url.match(/\/(\d+)x(\d+)\//);
  return match ? Number(match[1]) * Number(match[2]) : 0;
}

function findVideoUrl(html) {
  const normalized = html.replaceAll("\\/", "/").replaceAll("&amp;", "&");
  const matches = normalized.match(/https:\/\/video\.twimg\.com\/[^\s"'<>]+?\.mp4\?tag=\d+/g) ?? [];
  return [...new Set(matches)].sort((a, b) => areaFromUrl(b) - areaFromUrl(a))[0] ?? null;
}

function relevantText(ocrOutput) {
  const rows = ocrOutput.trim().split("\n").filter(Boolean);
  const preferred = rows.filter((row) => {
    const text = row.toLowerCase();
    return (
      text.includes("use $") ||
      text.includes("ask codex") ||
      text.includes("/goal") ||
      text.includes("what should we work on")
    );
  });
  return (preferred.length ? preferred : rows.slice(1, 5)).slice(0, 4);
}

try {
  for (const [slug, id] of Object.entries(posts)) {
    const page = await fetch(`https://x.com/Kappaemmedev/status/${id}`).then((response) => response.text());
    const videoUrl = findVideoUrl(page);
    console.log(`\n## ${slug}`);
    if (!videoUrl) {
      console.log("No public MP4 found");
      continue;
    }

    const framesDir = join(root, slug);
    mkdirSync(framesDir);
    execFileSync(
      "ffmpeg",
      [
        "-hide_banner",
        "-loglevel",
        "error",
        "-ss",
        "0",
        "-t",
        "7",
        "-i",
        videoUrl,
        "-vf",
        "fps=1",
        join(framesDir, "frame-%02d.png"),
      ],
      { stdio: "inherit" },
    );

    const frames = readdirSync(framesDir)
      .filter((file) => file.endsWith(".png"))
      .sort()
      .map((file) => join(framesDir, file));
    const ocr = execFileSync(ocrBinary, frames, { encoding: "utf8", maxBuffer: 8 * 1024 * 1024 });
    console.log(relevantText(ocr).join("\n"));
  }
} finally {
  rmSync(root, { recursive: true, force: true });
}
