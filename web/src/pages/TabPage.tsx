import { useState } from "react";
import { Link } from "react-router-dom";
import ResourceCard from "../components/ResourceCard";
import { useCounty } from "../lib/county";
import { TAB_CONFIG, tabRecords, type ContentTab } from "../lib/tabs";
import { usePageTitle } from "../lib/usePageTitle";

// Health, Education, and Work: filter chips for the tab's sections, then cards.
export default function TabPage({ tab }: { tab: ContentTab }) {
  const config = TAB_CONFIG[tab];
  const { county } = useCounty();
  const [sectionId, setSectionId] = useState("all");
  usePageTitle(config.title);

  const records = tabRecords(tab, county);
  const sections = config.sections.filter((s) => s.id === "all" || records.some(s.match));
  const section = sections.find((s) => s.id === sectionId) ?? sections[0];
  const shown = records.filter(section.match);

  return (
    <>
      <h1>{config.title}</h1>
      <p className="lead">{config.intro}</p>
      <p className="tab-who">
        Not sure what fits you? Ask <b>{config.whoToAsk}</b>.
      </p>

      {!county && (
        <p className="notice">
          You're seeing state and federal help only. <Link to="/">Pick your county</Link> to add offices near you.
        </p>
      )}

      {sections.length > 1 && (
        <div className="chips" role="group" aria-label={`Filter ${config.title}`}>
          {sections.map((s) => (
            <button
              key={s.id}
              type="button"
              className="chip"
              aria-pressed={s.id === section.id}
              onClick={() => setSectionId(s.id)}
            >
              {s.label}
            </button>
          ))}
        </div>
      )}

      {shown.length > 0 ? (
        <ul className="card-list">
          {shown.map((r) => (
            <li key={r.id}>
              <ResourceCard resource={r} county={county} heading="h2" />
            </li>
          ))}
        </ul>
      ) : (
        <p className="notice">No cards here yet.</p>
      )}
    </>
  );
}
