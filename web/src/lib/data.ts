import resourcesJson from "@data/resources.json";
import zipCountyJson from "@data/zip_county.json";
import { COUNTY_CENTERS, countySlug, isCounty, type County } from "./counties";
import { parseDay } from "./format";
import { COUNTY_VSA, type Resource, type Topic } from "./types";

export const RESOURCES = resourcesJson as Resource[];

const BY_ID = new Map(RESOURCES.map((r) => [r.id, r]));

const ZIP_COUNTY = zipCountyJson as Record<string, string[]>;

// Seed records all have ids starting with "example-"; the app shows a notice while they're in use.
export const IS_EXAMPLE_DATA = RESOURCES.some((r) => r.id.startsWith("example-"));

const STALE_AFTER_DAYS = 60;

export function isStale(r: Resource, now = new Date()): boolean {
  if (r.status === "stale") return true;
  const ageDays = (now.getTime() - parseDay(r.last_verified).getTime()) / 86_400_000;
  return ageDays > STALE_AFTER_DAYS;
}

export function countiesForZip(zip: string): County[] {
  return (ZIP_COUNTY[zip] ?? []).filter(isCounty);
}

export function servesCounty(r: Resource, county: County | null): boolean {
  return r.counties.length === 0 || (county !== null && r.counties.includes(county));
}

export function countyAgency(county: County): Resource | undefined {
  return (
    BY_ID.get(`${countySlug(county)}-vsa`) ??
    RESOURCES.find((r) => r.kind === "office" && r.tab === "home" && r.topics.includes("claims") && r.counties.includes(county))
  );
}

export function resolveWhoToAsk(r: Resource, county: County | null): Resource | undefined {
  if (!r.who_to_ask) return undefined;
  if (r.who_to_ask === COUNTY_VSA) return county ? countyAgency(county) : undefined;
  return BY_ID.get(r.who_to_ask);
}

function distanceSq(r: Resource, county: County): number {
  if (r.lat === undefined || r.lng === undefined) return Infinity;
  const [lat, lng] = COUNTY_CENTERS[county];
  const dx = (r.lng - lng) * Math.cos((lat * Math.PI) / 180);
  const dy = r.lat - lat;
  return dx * dx + dy * dy;
}

// Facilities in the county come first, then the closest ones outside it.
function nearestFacility(county: County, topic: Topic): Resource | undefined {
  const inCounty = (r: Resource) => (r.counties.includes(county) ? 0 : 1);
  return RESOURCES.filter((r) => r.kind === "facility" && r.topics.includes(topic))
    .sort((a, b) => inCounty(a) - inCounty(b) || distanceSq(a, county) - distanceSq(b, county))[0];
}

export function localHelp(county: County) {
  return {
    agency: countyAgency(county),
    medical: nearestFacility(county, "health-care"),
    vetCenter: nearestFacility(county, "mental-health"),
  };
}
