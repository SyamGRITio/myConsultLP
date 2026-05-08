import type { ReactNode } from "react";

type Props = {
  orientation: "left" | "right";
  children: ReactNode;
};

export function Side({ orientation, children }: Props) {
  return (
    <div
      className={`fixed bottom-0 z-40 hidden lg:block ${
        orientation === "left" ? "left-10 w-28" : "right-10 w-10"
      }`}
    >
      <div
        className={`flex flex-col gap-5 ${
          orientation === "left" ? "items-start" : "items-center"
        }`}
      >
        {children}
        <div
          className="h-24 w-px"
          style={{
            backgroundColor: "var(--text-secondary)",
            marginLeft: orientation === "left" ? "8px" : undefined,
          }}
        />
      </div>
    </div>
  );
}
