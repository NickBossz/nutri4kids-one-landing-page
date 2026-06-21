export interface Utm {
  source?: string;
  medium?: string;
  campaign?: string;
  term?: string;
  content?: string;
}

const STORAGE_KEY = "lf:utm";
const ENTRY_KEY = "lf:entry";

export function captureUtm(): void {
  if (typeof window === "undefined") return;
  try {
    const params = new URLSearchParams(window.location.search);
    const utm: Utm = {};
    let has = false;
    (["source", "medium", "campaign", "term", "content"] as const).forEach((k) => {
      const v = params.get(`utm_${k}`);
      if (v) {
        utm[k] = v;
        has = true;
      }
    });
    if (has) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(utm));
    }
    if (!window.localStorage.getItem(ENTRY_KEY)) {
      window.localStorage.setItem(
        ENTRY_KEY,
        JSON.stringify({ path: window.location.pathname, at: Date.now() }),
      );
    }
  } catch {
    /* noop */
  }
}

export function getUtm(): Utm {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

export function getEntryPath(): string {
  if (typeof window === "undefined") return "/";
  try {
    return JSON.parse(window.localStorage.getItem(ENTRY_KEY) || "{}").path || "/";
  } catch {
    return "/";
  }
}

export function describeOrigin(audience: "family" | "school"): string {
  const utm = getUtm();
  const entry = getEntryPath();
  const parts: string[] = [];
  if (utm.source) parts.push(utm.source);
  parts.push(entry);
  if (utm.campaign) parts.push(utm.campaign);
  parts.push(audience === "family" ? "Família" : "Escola");
  return parts.filter(Boolean).join(" / ");
}
