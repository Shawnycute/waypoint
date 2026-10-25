export const COUNTIES = [
  { name: "Allegany", fips: "36003" },
  { name: "Cattaraugus", fips: "36009" },
  { name: "Chautauqua", fips: "36013" },
  { name: "Chemung", fips: "36015" },
  { name: "Erie", fips: "36029" },
  { name: "Niagara", fips: "36063" },
  { name: "Schuyler", fips: "36097" },
  { name: "Steuben", fips: "36101" },
  { name: "Tioga", fips: "36107" },
] as const;

export type County = (typeof COUNTIES)[number]["name"];

export const COUNTY_NAMES: readonly County[] = COUNTIES.map((c) => c.name);

export function isCounty(value: unknown): value is County {
  return typeof value === "string" && (COUNTY_NAMES as readonly string[]).includes(value);
}

export function countySlug(county: County): string {
  return county.toLowerCase();
}

// Approximate county centers [lat, lng]. Only used to sort facilities by distance
// when none is in the chosen county; never shown to anyone.
export const COUNTY_CENTERS: Record<County, [number, number]> = {
  Allegany: [42.26, -78.03],
  Cattaraugus: [42.25, -78.68],
  Chautauqua: [42.23, -79.37],
  Chemung: [42.14, -76.76],
  Erie: [42.76, -78.78],
  Niagara: [43.17, -78.74],
  Schuyler: [42.39, -76.88],
  Steuben: [42.27, -77.39],
  Tioga: [42.17, -76.31],
};
