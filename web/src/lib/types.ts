// Mirrors the record schema in CLAUDE.md. Keep in sync with pipeline/models.py.

export type Tab = "home" | "health" | "education" | "work";

export type Topic =
  | "health-care"
  | "mental-health"
  | "caregivers"
  | "housing"
  | "burial"
  | "claims"
  | "school"
  | "family-school"
  | "jobs"
  | "training"
  | "gov-jobs"
  | "business";

export interface Resource {
  id: string; // stable slug, e.g. "chemung-vsa"
  kind: "office" | "facility" | "program" | "explainer";
  tab: Tab;
  name: string;
  counties: string[]; // subset of the 9; [] means statewide or federal
  level: "local" | "state" | "federal";
  topics: Topic[];
  summary: string; // <= 280 chars, plain words, no eligibility claims
  phone?: string; // as written on the source page
  address?: string;
  lat?: number;
  lng?: number;
  hours?: string; // copied, never guessed
  url?: string; // the office or program's own page, if different from source
  who_to_ask?: string; // id of an office record, or COUNTY_VSA; required for program and explainer
  source_url: string; // the page the facts came from (required)
  last_verified: string; // YYYY-MM-DD
  status: "live" | "stale"; // stale when last_verified is over 60 days old
}

// A who_to_ask value meaning "the chosen county's veterans' service agency" (id "<county>-vsa").
export const COUNTY_VSA = "county-vsa";
