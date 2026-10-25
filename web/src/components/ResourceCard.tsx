import type { County } from "../lib/counties";
import { isStale, resolveWhoToAsk } from "../lib/data";
import { directionsHref, formatDate, hostOf, telHref } from "../lib/format";
import { LEVEL_LABEL, TAB_CONFIG, TOPIC_LABEL } from "../lib/tabs";
import type { Resource } from "../lib/types";
import ExternalLink from "./ExternalLink";

interface Props {
  resource: Resource;
  county: County | null;
  heading?: "h2" | "h3";
}

export default function ResourceCard({ resource: r, county, heading: Heading = "h3" }: Props) {
  const needsWho = r.kind === "program" || r.kind === "explainer" || r.who_to_ask !== undefined;
  const who = resolveWhoToAsk(r, county);
  const topic = r.topics[0];

  return (
    <article className="card" id={`card-${r.id}`}>
      <p className="card-tag">
        {LEVEL_LABEL[r.level]}
        {topic && ` · ${TOPIC_LABEL[topic]}`}
      </p>
      <Heading className="card-name">{r.name}</Heading>
      <p className="card-summary">{r.summary}</p>

      {(r.address || r.hours) && (
        <dl className="card-facts">
          {r.address && (
            <div>
              <dt>Address</dt>
              <dd>{r.address}</dd>
            </div>
          )}
          {r.hours && (
            <div>
              <dt>Hours</dt>
              <dd>{r.hours}</dd>
            </div>
          )}
        </dl>
      )}

      {(r.phone || r.address || (r.url && r.url !== r.source_url)) && (
        <div className="card-actions">
          {r.phone && (
            <a className="btn btn-primary" href={telHref(r.phone)}>
              Call {r.phone}
            </a>
          )}
          {r.address && (
            <ExternalLink className="btn btn-secondary" href={directionsHref(r.address)}>
              Directions
            </ExternalLink>
          )}
          {r.url && r.url !== r.source_url && (
            <ExternalLink className="btn btn-secondary" href={r.url}>
              Website
            </ExternalLink>
          )}
        </div>
      )}

      {needsWho && (
        <p className="card-who">
          Who to ask:{" "}
          {who ? (
            <>
              <b>{who.name}</b>
              {who.phone && (
                <>
                  , <a href={telHref(who.phone)}>{who.phone}</a>
                </>
              )}
            </>
          ) : (
            <b>{r.tab === "home" ? "your county veterans' service agency" : TAB_CONFIG[r.tab].whoToAsk}</b>
          )}
        </p>
      )}

      {isStale(r) && <p className="card-stale">Not checked in over 60 days. Call to confirm before you go.</p>}

      <p className="card-meta">
        <ExternalLink href={r.source_url}>Source: {hostOf(r.source_url)}</ExternalLink>
        <span>Checked {formatDate(r.last_verified)}</span>
      </p>
    </article>
  );
}
