import { Link, useNavigate } from "react-router-dom";
import { useCounty } from "../lib/county";
import Logo from "./Logo";
import TabBar from "./TabBar";

export default function Header() {
  const { county, startPicking } = useCounty();
  const navigate = useNavigate();

  return (
    <header className="site-header">
      <Link to="/" className="brand" aria-label="Waypoint home">
        <Logo size={24} />
        <span className="wordmark">Waypoint</span>
      </Link>
      <TabBar />
      {county && (
        <button
          type="button"
          className="county-chip"
          aria-label={`${county} County. Change county`}
          onClick={() => {
            startPicking();
            navigate("/");
          }}
        >
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
            <path d="M12 21s-6-5.6-6-11a6 6 0 0 1 12 0c0 5.4-6 11-6 11z" fill="none" stroke="currentColor" strokeWidth="2" />
            <circle cx="12" cy="10" r="2.2" fill="currentColor" />
          </svg>
          {county}
        </button>
      )}
    </header>
  );
}
