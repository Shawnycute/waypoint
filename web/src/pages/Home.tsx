import { Link } from "react-router-dom";
import CountyPicker from "../components/CountyPicker";
import ResourceCard from "../components/ResourceCard";
import { useCounty } from "../lib/county";
import { localHelp } from "../lib/data";
import type { Resource } from "../lib/types";
import { usePageTitle } from "../lib/usePageTitle";

const MORE = [
  { to: "/health", title: "Health & Welfare", text: "VA care, counseling, caregivers, housing, burial" },
  { to: "/education", title: "Education", text: "GI Bill, state awards, and school veteran offices" },
  { to: "/work", title: "Work", text: "Job help, training, and government jobs" },
];

function HelpSection({ title, record, missing }: { title: string; record?: Resource; missing: string }) {
  const { county } = useCounty();
  return (
    <section className="help-section">
      <h2>{title}</h2>
      {record ? <ResourceCard resource={record} county={county} /> : <p className="notice">{missing}</p>}
    </section>
  );
}

export default function Home() {
  const { county, picking, setCounty, startPicking, stopPicking } = useCounty();
  const showPicker = !county || picking;
  usePageTitle(showPicker ? "Where do you live?" : "Help near you");

  if (showPicker) {
    return (
      <>
        <h1>Where do you live?</h1>
        <p className="lead">Pick your county to see veteran help near you.</p>
        <CountyPicker onPick={setCounty} />
        {county && (
          <p className="picker-cancel">
            <button type="button" className="btn btn-secondary" onClick={stopPicking}>
              Keep {county} County
            </button>
          </p>
        )}
      </>
    );
  }

  const help = localHelp(county);
  return (
    <>
      <h1>Help near you</h1>
      <p className="lead">
        Veteran help for <b>{county} County</b>.{" "}
        <button type="button" className="link-btn" onClick={startPicking}>
          Change county
        </button>
      </p>

      <HelpSection
        title="Free help with VA claims"
        record={help.agency}
        missing={`We don't have the ${county} County veterans' service agency yet.`}
      />
      <HelpSection title="VA medical care" record={help.medical} missing="We don't have a VA medical center or clinic yet." />
      <HelpSection title="Counseling at a Vet Center" record={help.vetCenter} missing="We don't have a Vet Center yet." />

      <section className="help-section">
        <h2>More help</h2>
        <ul className="more-list">
          {MORE.map((m) => (
            <li key={m.to}>
              <Link to={m.to} className="more-link">
                <b>{m.title}</b>
                <span>{m.text}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
