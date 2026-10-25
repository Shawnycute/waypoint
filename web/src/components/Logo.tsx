// Same artwork as public/waypoint-logo.svg, inlined so it renders with the page.
export default function Logo({ size = 24 }: { size?: number }) {
  return (
    <svg className="logo" width={size} height={size} viewBox="0 0 100 100" aria-hidden="true" focusable="false">
      <circle cx="50" cy="50" r="50" fill="#102848" />
      <polygon
        fill="#FFFFFF"
        points="50.00,0.00 62.93,32.20 97.55,34.55 70.92,56.80 79.39,90.45 50.00,72.00 20.61,90.45 29.08,56.80 2.45,34.55 37.07,32.20"
      />
      <circle cx="50" cy="50" r="7.3" fill="#102848" />
    </svg>
  );
}
