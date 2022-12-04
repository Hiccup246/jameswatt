export default function SectionLayout(props: SectionLayoutProps) {
  const bgColor = props.isBgColorPrimary == false ? "bg-brown" : "bg-white";
  const largeBottom = props.largeBottomPadding == false ? "pb-12" : "pb-36";

  return (
    <div
      className={`flex w-full flex-row justify-center pt-12 ${largeBottom} ${bgColor}`}
    >
      <div className="mx-auto flex w-9/12 flex-col justify-start">
        {props.children}
      </div>
    </div>
  );
}
