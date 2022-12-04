export default function SectionLayout(props: SectionLayoutProps) {
    const bgColor = props.isBgColorPrimary == false ? "bg-brown" : "bg-white"
    const largeBottom = props.largeBottomPadding == false ? "pb-12" : "pb-36"

    return (
        <div className={`w-full flex flex-row justify-center pt-12 ${largeBottom} ${bgColor}`}>
            <div className="flex flex-col justify-start w-9/12 mx-auto">
                {props.children}
            </div>
        </div>
    );
  }