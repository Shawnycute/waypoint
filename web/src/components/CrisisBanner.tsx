// Hard rule 4: this exact text on every screen.
export default function CrisisBanner() {
  return (
    <aside className="crisis" aria-label="Veterans Crisis Line">
      <p>
        Veterans Crisis Line: <a href="tel:988">dial 988, then press 1</a>. Or <a href="sms:838255">text 838255</a>.
      </p>
    </aside>
  );
}
