export default function SectionLayout(props: SectionLayoutProps) {
  const bgColor = props.bgSecondary == true ? "bg-brown" : "bg-white";
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
