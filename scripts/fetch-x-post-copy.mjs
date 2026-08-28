import { pathToFileURL } from "node:url";

export const posts = {
  "design-audit": "2049882721032233347",
  "video-short-maker": "2050251401348165809",
  "startup-pressure-test": "2050908233158816122",
  "codex-fm": "2052811648813892021",
  "codex-pomodoro-arena": "2053082556028026897",
  "simple-flight-search": "2053822430339375517",
  "local-client-prospector": "2054981327414231173",
  "complexity-optimizer": "2055343704467206506",
  "visual-web-builder": "2056344054938628218",
  "site-post-screenshots": "2056706439360442462",
  "x-phoenix-score": "2057509200603775052",
  "goal-mvp": "2058155994291548537",
  "codex-phone-lab": "2058578772585074958",
  "mac-storage-cleanup": "2059605538670051727",
  "name-prospector": "2059967933389119981",
  "codex-security-audit-skill": "2062504650163839254",
  "sell-my-saas": "2062867038939562369",
  "mengtofrontend": "2063229427044241879",
  "landing-to-powerpoint": "2063954193644396567",
  "startup-user-simulator": "2076275381305233478",
  "first-customer-finder": "2076637778734153857",
  "startup-channel-finder": "2078464813429367277",
  "startup-pricing-lab": "2078812095462900047",
  "startup-business-planner": "2079189588807954498",
  "code-rot-cleaner": "2079551973339349170",
  "mac-file-detective": "2079914364899881091",
  "build-startup-brand": "2081348810824159442",
  "startup-launch-doctor": "2082073596856607075",
  "analyze-startup-feedback": "2083957246674042890",
  "track-startup-competitors": "2084972696237183197",
  "simulate-startup-sales": "2085697476556738723",
  "generate-startup-ideas": "2087147021585232334",
  "code-change-guardian": "2088234180429627780",
  "app-store-review-guardian": "2089321345482179027",
  "create-product-ads-with-actionway": "2091933561192386882",
  "codex-first-million": "2093020717969261020",
};

function decodePost(html) {
  const paragraph = html.match(/<p[^>]*>([\s\S]*?)<\/p>/i)?.[1] ?? "";
  return paragraph
    .replace(/<br\s*\/?\s*>/gi, "\n")
    .replace(/<a[^>]*>[\s\S]*?<\/a>/gi, "")
    .replace(/<[^>]+>/g, "")
    .replace(/&gt;/g, ">")
    .replace(/&lt;/g, "<")
    .replace(/&amp;/g, "&")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  for (const [slug, id] of Object.entries(posts)) {
    const statusUrl = `https://x.com/Kappaemme1926/status/${id}`;
    const endpoint = `https://publish.twitter.com/oembed?omit_script=1&url=${encodeURIComponent(statusUrl)}`;
    const response = await fetch(endpoint);
    console.log(`\n## ${slug}`);
    if (!response.ok) {
      console.log(`Unavailable (${response.status})`);
      continue;
    }
    const payload = await response.json();
    console.log(decodePost(payload.html));
  }
}
