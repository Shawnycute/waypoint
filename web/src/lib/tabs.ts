import type { County } from "./counties";
import { RESOURCES, servesCounty } from "./data";
import type { Resource, Tab, Topic } from "./types";

export type ContentTab = Exclude<Tab, "home">;

export interface Section {
  id: string;
  label: string;
  match: (r: Resource) => boolean;
}

export interface TabConfig {
  title: string;
  intro: string;
  whoToAsk: string;
  sections: Section[];
}

const all: Section = { id: "all", label: "All", match: () => true };

const topic = (id: string, label: string, ...topics: Topic[]): Section => ({
  id,
  label,
  match: (r) => r.topics.some((t) => topics.includes(t)),
});

export const TAB_CONFIG: Record<ContentTab, TabConfig> = {
  health: {
    title: "Health & Welfare",
    intro: "VA health care, counseling, help for caregivers, housing, and burial.",
    whoToAsk: "your county veterans' service agency",
    sections: [
      all,
      topic("care", "Health care", "health-care"),
      topic("mental", "Mental health", "mental-health"),
      topic("family", "Caregivers", "caregivers"),
      topic("housing", "Housing and money", "housing"),
      topic("burial", "Burial", "burial"),
    ],
  },
  education: {
    title: "Education",
    intro: "School benefits for veterans and their families, and veteran offices at schools near you.",
    whoToAsk: "your school's certifying official, or HESC for state awards",
    sections: [
      all,
      { id: "veterans", label: "For veterans", match: (r) => r.topics.includes("school") && r.kind !== "office" },
      topic("family", "For families", "family-school"),
      { id: "schools", label: "Schools near you", match: (r) => r.kind === "office" && r.level === "local" },
    ],
  },
  work: {
    title: "Work",
    intro: "Job help from veteran specialists, training, government jobs, and starting a business.",
    whoToAsk: "your nearest NYS Career Center",
    sections: [
      all,
      topic("jobs", "Find a job", "jobs"),
      topic("training", "Training", "training"),
      topic("gov", "Government jobs", "gov-jobs"),
      topic("business", "Start a business", "business"),
    ],
  },
};

export const LEVEL_LABEL: Record<Resource["level"], string> = {
  local: "Near you",
  state: "New York",
  federal: "Federal",
};

export const TOPIC_LABEL: Record<Topic, string> = {
  "health-care": "Health care",
  "mental-health": "Mental health",
  caregivers: "Caregivers",
  housing: "Housing and money",
  burial: "Burial",
  claims: "Claims help",
  school: "School",
  "family-school": "School for families",
  jobs: "Jobs",
  training: "Training",
  "gov-jobs": "Government jobs",
  business: "Business",
};

const LEVEL_ORDER: Record<Resource["level"], number> = { local: 0, state: 1, federal: 2 };

// Records for a tab that serve the county, local first, then state, then federal.
export function tabRecords(tab: Tab, county: County | null): Resource[] {
  return RESOURCES.filter((r) => r.tab === tab && servesCounty(r, county)).sort(
    (a, b) => LEVEL_ORDER[a.level] - LEVEL_ORDER[b.level],
  );
}
