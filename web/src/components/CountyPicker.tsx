import { useId, useState, type FormEvent } from "react";
import { COUNTY_NAMES, type County } from "../lib/counties";
import { countiesForZip } from "../lib/data";

export default function CountyPicker({ onPick }: { onPick: (county: County) => void }) {
  const [zip, setZip] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [choices, setChoices] = useState<County[] | null>(null);
  const id = useId();

  function submit(e: FormEvent) {
    e.preventDefault();
    setChoices(null);
    const clean = zip.trim();
    if (!/^\d{5}$/.test(clean)) {
      setError("Enter a 5-digit ZIP code.");
      return;
    }
    const found = countiesForZip(clean);
    if (found.length === 0) {
      setError(`We couldn't find ZIP ${clean} in the 9 counties Waypoint covers. Pick your county below.`);
      return;
    }
    setError(null);
    if (found.length === 1) onPick(found[0]);
    else setChoices(found);
  }

  return (
    <div className="picker">
      <form className="zip-form" onSubmit={submit} noValidate>
        <label htmlFor={`${id}-zip`}>ZIP code</label>
        <div className="zip-row">
          <input
            id={`${id}-zip`}
            type="text"
            inputMode="numeric"
            autoComplete="postal-code"
            maxLength={5}
            value={zip}
            onChange={(e) => setZip(e.target.value.replace(/\D/g, ""))}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? `${id}-error` : undefined}
          />
          <button type="submit" className="btn btn-primary">
            Find my county
          </button>
        </div>
        <div aria-live="polite">
          {error && (
            <p id={`${id}-error`} className="form-error">
              {error}
            </p>
          )}
          {choices && (
            <div className="zip-choices" role="group" aria-labelledby={`${id}-choices`}>
              <p id={`${id}-choices`}>ZIP {zip} is in more than one county. Which one do you live in?</p>
              <div className="county-grid">
                {choices.map((c) => (
                  <button key={c} type="button" className="county-btn" onClick={() => onPick(c)}>
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </form>

      <h2 className="picker-or">Or pick your county</h2>
      <div className="county-grid">
        {COUNTY_NAMES.map((c) => (
          <button key={c} type="button" className="county-btn" onClick={() => onPick(c)}>
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}
