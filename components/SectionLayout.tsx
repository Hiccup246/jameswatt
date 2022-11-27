export default function SectionLayout(props: SectionLayoutProps) {
    const bgColor = props.isBgColorPrimary ? "bg-white" : "bg-brown"

    return (
        <div className={`w-full flex flex-row justify-center py-10 ${bgColor}`}>
            <div className="flex flex-col justify-start w-9/12 mx-auto">
                {props.children}
            </div>
        </div>
    );
  }