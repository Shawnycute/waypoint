import { NavLink } from "react-router-dom";

const TABS = [
  { to: "/", label: "Home", icon: "M3 10.5 12 3l9 7.5V21h-6v-6H9v6H3z" },
  { to: "/health", label: "Health", icon: "M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" },
  {
    to: "/education",
    label: "Education",
    icon: "M4 5h5a3 3 0 0 1 3 3v12a2 2 0 0 0-2-2H4zM20 5h-5a3 3 0 0 0-3 3v12a2 2 0 0 1 2-2h6z",
  },
  { to: "/work", label: "Work", icon: "M4 8h16v12H4zM9 8V5h6v3M4 13h16" },
  { to: "/ask", label: "Ask", icon: "M4 5h16v11H10l-5 4v-4H4z" },
];

// Bottom bar on phones, top bar on desktop (see styles.css).
export default function TabBar() {
  return (
    <nav className="tabbar" aria-label="Main">
      {TABS.map((t) => (
        <NavLink key={t.to} to={t.to} end={t.to === "/"} className="tabbar-link">
          <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false">
            <path d={t.icon} fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
          </svg>
          <span>{t.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
