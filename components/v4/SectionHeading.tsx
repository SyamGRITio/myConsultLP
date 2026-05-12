type Props = {
  num: string;
  label: string;
};

export function SectionHeading({ label }: Props) {
  return (
    <h2
      className="mb-10 flex items-center gap-4 text-xl font-bold sm:text-2xl md:text-3xl"
      style={{
        color: "var(--text-headline)",
        wordBreak: "keep-all",
        overflowWrap: "break-word",
      }}
    >
      <span>{label}</span>
      <span
        className="ml-4 h-px min-w-12 max-w-[300px] flex-grow"
        style={{ backgroundColor: "var(--bg-tertiary)" }}
      />
    </h2>
  );
}
