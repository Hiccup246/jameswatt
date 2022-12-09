import SectionLayout from "../layouts/SectionLayout";
import SliderComponent from "../SliderComponent";
import { GROUP1, GROUP2, GROUP3 } from "../../constants/TechnologyIcons";
import TechnologyIcon from "../TechnologyIcon";

export default function TechnologySectionTwo() {
  return (
    <SectionLayout>
      <h1 className="mb-16 text-center text-2xl font-bold sm:text-3xl">
        Technologies I Dabble With
      </h1>

      <div className="relative">
        <SliderComponent>
          {[...GROUP1, ...GROUP1].map((technologyIcon, index) => {
            return (
              <TechnologyIcon
                key={technologyIcon.name + index}
                icon={technologyIcon}
              />
            );
          })}
        </SliderComponent>

        <SliderComponent slideRight>
          {[...GROUP2, ...GROUP2].map((technologyIcon, index) => {
            return (
              <TechnologyIcon
                key={technologyIcon.name + index}
                icon={technologyIcon}
              />
            );
          })}
        </SliderComponent>

        <SliderComponent>
          {[...GROUP3, ...GROUP3].map((technologyIcon, index) => {
            return (
              <TechnologyIcon
                key={technologyIcon.name + index}
                icon={technologyIcon}
              />
            );
          })}
        </SliderComponent>

        <div className="to-transparent absolute top-0 left-0 h-full h-full w-5 bg-gradient-to-r from-white via-white dark:from-black sm:w-[50px] md:w-[100px] lg:w-[100px]"></div>
        <div className="to-transparent absolute top-0 right-0 h-full h-full w-5 bg-gradient-to-l from-white via-white dark:from-black sm:w-[50px] md:w-[100px] lg:w-[100px]"></div>
      </div>
    </SectionLayout>
  );
}
