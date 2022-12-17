import { ReactElement } from "react";

export default function ConveyorBelt({
  children,
  slideRight,
}: {
  children: ReactElement[];
  slideRight?: boolean;
}) {
  const slideAnimation = !!slideRight
    ? "animate-scroll-reverse"
    : "animate-scroll";

  return (
    <div className="relative w-full overflow-hidden">
      <div className="relative m-auto w-full">
        <div className={`hover:animation-pause flex w-fit ${slideAnimation}`}>
          {children}
        </div>
      </div>
    </div>
  );
}
