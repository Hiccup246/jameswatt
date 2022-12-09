export default function TabButton({
  companyName,
  activated,
  clickHandler,
}: {
  companyName: string;
  activated: boolean;
  clickHandler: Function;
}) {
  const activatedClasses = activated ? "text-black activated" : "";

  return (
    <button
      aria-label={companyName}
      className={`
        bg-transparent relative z-20
        flex
        w-fit cursor-pointer
        whitespace-nowrap px-5 py-2
        text-black focus-visible:border-none
        max-small:mb-0 max-small:max-w-[var(--tab-width)]
        max-small:shrink-0 max-small:grow-0 max-small:basis-[var(--tab-width)]
        max-small:justify-center
        ${activatedClasses}
      `}
      onClick={(element) => clickHandler(element.currentTarget)}
    >
      {companyName}
    </button>
  );
}
