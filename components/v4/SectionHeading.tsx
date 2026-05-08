type Props = {
  num: string;
  label: string;
};

export function SectionHeading({ label }: Props) {
  return (
    <h2
      className="mb-10 flex items-center gap-4 whitespace-nowrap text-2xl font-bold md:text-3xl"
      style={{ color: "var(--text-headline)" }}
    >
      <span>{label}</span>
      <span
        className="ml-4 h-px max-w-[300px] flex-grow"
        style={{ backgroundColor: "var(--bg-tertiary)" }}
      />
    </h2>
  );
}
