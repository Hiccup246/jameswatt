import { ReactElement } from "react";

export default function SliderComponent({
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
    <div className="container relative w-full overflow-hidden">
      <div className="relative m-auto h-fit w-full">
        <div
          className={`slide-track hover:animation-pause flex w-fit ${slideAnimation}`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
