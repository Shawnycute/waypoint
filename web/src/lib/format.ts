// Parse YYYY-MM-DD as a local date so it never shifts a day in US time zones.
export function parseDay(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function formatDate(iso: string): string {
  return parseDay(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function telHref(phone: string): string {
  const match = phone.match(/^(.*?)(?:\s*(?:ext\.?|extension|x)\s*(\d+))?\s*$/i);
  const main = (match?.[1] ?? phone).replace(/[^\d+]/g, "");
  const ext = match?.[2];
  return ext ? `tel:${main},${ext}` : `tel:${main}`;
}

export function directionsHref(address: string): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
}

export function hostOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}
