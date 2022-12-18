import SectionLayout from "../layouts/SectionLayout";
import ConveyorBelt from "../ConveyorBelt";
import { GROUP1, GROUP2, GROUP3 } from "../../constants/TechnologyIcons";
import TechnologyIcon from "../TechnologyIcon";

export default function TechnologiesSection() {
  return (
    <SectionLayout>
      <h1 className="mb-16 text-center text-2xl font-bold sm:text-3xl">
        Technologies I Dabble With
      </h1>

      <div className="relative" tabIndex={0}>
        <ConveyorBelt>
          {[...GROUP1, ...GROUP1].map(
            (technologyIcon: LinkedIcon, index: number) => {
              return (
                <div
                  className="h-[110px] w-[200px] text-black"
                  key={technologyIcon.name + index}
                >
                  <TechnologyIcon icon={technologyIcon} />
                </div>
              );
            }
          )}
        </ConveyorBelt>

        <ConveyorBelt slideRight>
          {[...GROUP2, ...GROUP2].map(
            (technologyIcon: LinkedIcon, index: number) => {
              return (
                <div
                  className="h-[110px] w-[200px] text-black"
                  key={technologyIcon.name + index}
                >
                  <TechnologyIcon icon={technologyIcon} />
                </div>
              );
            }
          )}
        </ConveyorBelt>

        <ConveyorBelt>
          {[...GROUP3, ...GROUP3].map(
            (technologyIcon: LinkedIcon, index: number) => {
              return (
                <div
                  className="h-[110px] w-[200px] text-black"
                  key={technologyIcon.name + index}
                >
                  <TechnologyIcon icon={technologyIcon} />
                </div>
              );
            }
          )}
        </ConveyorBelt>

        <div className="to-transparent absolute top-0 left-0 h-full h-full w-5 bg-gradient-to-r from-white via-white dark:from-darkteal sm:w-[50px] md:w-[100px] lg:w-[100px]"></div>
        <div className="to-transparent absolute top-0 right-0 h-full h-full w-5 bg-gradient-to-l from-white via-white dark:from-darkteal sm:w-[50px] md:w-[100px] lg:w-[100px]"></div>
      </div>
    </SectionLayout>
  );
}
