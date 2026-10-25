import ResourceCard from "../components/ResourceCard";
import { useCounty } from "../lib/county";
import { countyAgency } from "../lib/data";
import { usePageTitle } from "../lib/usePageTitle";

// Placeholder until build step 3 adds the assistant.
export default function Ask() {
  const { county } = useCounty();
  usePageTitle("Ask Waypoint");
  const agency = county ? countyAgency(county) : undefined;

  return (
    <>
      <h1>Ask Waypoint</h1>
      <p className="lead">The question box is coming soon. For now, use the Health, Education, and Work tabs, or call your county's veterans' service agency.</p>
      {agency && <ResourceCard resource={agency} county={county} heading="h2" />}
      <p className="ask-disclaimer">Answers come only from checked records. Waypoint is not the VA, and this is not legal advice.</p>
    </>
  );
}
