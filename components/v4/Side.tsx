import type { ReactNode } from "react";

type Props = {
  orientation: "left" | "right";
  children: ReactNode;
};

export function Side({ orientation, children }: Props) {
  return (
    <div
      className={`fixed bottom-0 z-40 hidden w-10 lg:block ${
        orientation === "left" ? "left-10" : "right-10"
      }`}
    >
      <div className="flex flex-col items-center gap-5">
        {children}
        <div
          className="h-24 w-px"
          style={{ backgroundColor: "var(--text-secondary)" }}
        />
      </div>
    </div>
  );
}
