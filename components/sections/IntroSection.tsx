import Image from "next/image";
import PoolHero from "../PoolHero";

export default function IntroSection() {
  return (
    <div className="bg-brown dark:bg-darkgrey flex h-full w-full flex-col items-center gap-9 overflow-x-clip pt-8 pb-18 md:gap-12 md:pt-12 md:pb-28">
      <div className="grid h-fit w-full grid-cols-1 md:grid-cols-2">
        <div className="relative flex h-auto w-full flex-col justify-start md:justify-start md:pr-10 lg:pr-28">
          <Image
            src={"/human.webp"}
            priority
            width={230}
            height={80}
            className="place-self-center object-scale-down md:place-self-end"
            alt="Human Text"
          />
        </div>

        <div
          className={
            "relative flex h-auto w-full flex-col justify-start md:justify-start md:pl-10 lg:pl-28"
          }
        >
          <Image
            src={"/developer.webp"}
            priority
            width={316}
            height={80}
            className="place-self-center object-scale-down md:place-self-start"
            alt="Developer Text"
          />
        </div>
      </div>

      <PoolHero />
    </div>
  );
}
