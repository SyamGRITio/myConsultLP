import { LINKS } from "@/lib/constants";

export function EmailLink() {
  return (
    <a
      href={LINKS.x}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block font-mono text-xs tracking-widest transition-all hover:-translate-y-1 [writing-mode:vertical-rl]"
      style={{ color: "var(--text-secondary)" }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = "var(--accent)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = "var(--text-secondary)";
      }}
    >
      @syam_nihick
    </a>
  );
}
