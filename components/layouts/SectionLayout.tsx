export default function SectionLayout(props: SectionLayoutProps) {
  const bgColor =
    props.bgSecondary == true
      ? "bg-brown dark:bg-darkgrey text-black dark:text-softwhite"
      : "bg-white dark:bg-redgrey dark:text-softwhite";
  const largeBottom = props.noBottomPadding == true ? "pb-12" : "pb-20 pt-20";

  return (
    <div
      className={`flex w-full flex-row justify-center pt-12 ${largeBottom} ${bgColor}`}
    >
      <section className="mx-auto flex w-9/12 flex-col justify-start">
        {props.children}
      </section>
    </div>
  );
}
