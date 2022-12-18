import { useEffect, useRef, useState } from "react";
import { WaveTank } from "../WaveTank";
import Image from "next/image";
import CircleDripIcon from "../Icons/CircleDripIcon";
import JamesWattImage from "../../public/panthy-tiny.webp";
import Human from "../../public/human.webp";
import Developer from "../../public/developer.webp";

// Source code for the functions easeInCirc, updateJuice, update, resize, drop, useEffect and the
// related SVG code is courtesy of the Fresh framework website. The code source can
// be found here https://github.com/denoland/fresh/tree/main/www

function easeInCirc(x: number) {
  return 1 - Math.sqrt(1 - Math.pow(x, 2));
}

const waveTank = new WaveTank();

const SVG_WIDTH = 100;
const DROP_OFFSET = 82;

export default function IntroSection() {
  const [counter, setCounter] = useState(0);
  const [dropy, setDropy] = useState(10);
  const [width, setWidth] = useState(SVG_WIDTH);
  const [springs, setSprings] = useState<Spring[]>(waveTank.springs);

  const widthRef = useRef(width);
  const requestIdRef = useRef<number>();

  const grid = SVG_WIDTH / waveTank.waveLength;
  const points = [
    [0, 100],
    [0, 0],
    ...springs.map((x, i) => [i * grid, x.position]),
    [width, 0],
    [width, 100],
  ];
  const springsPath = `${points.map((x) => x.join(",")).join(" ")}`;

  function updateJuice(timestamp: number) {
    const amp = 40;
    const x = timestamp / 2000;
    const saw = x - Math.floor(x);
    if (saw < 0.6) {
      setCounter(easeInCirc(saw) * amp);
      setDropy(10);
    } else {
      setCounter(easeInCirc(1 - saw) * amp * 0.1);
      setDropy(10 + Math.pow(saw - 0.6, 2) * 10000);
    }
  }

  function update(timestamp: number) {
    updateJuice(timestamp);
    waveTank.update(waveTank.springs);
    setSprings([...waveTank.springs]);

    const offset = 500;
    const saw =
      (timestamp + offset) / 2000 - Math.floor((timestamp + offset) / 2000);
    if (saw < 0.01) {
      drop();
    }
    requestIdRef.current = globalThis.requestAnimationFrame(update);
  }

  function resize() {
    setWidth(document.body.clientWidth);
  }

  function drop() {
    const dropPosition = Math.round(
      ((widthRef.current / 2 + DROP_OFFSET) / widthRef.current) * 100
    );
    waveTank.springs[dropPosition].position = -60;
  }

  useEffect(() => {
    widthRef.current = width;
  }, [width]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      return;
    }

    startAnimation();
    globalThis.addEventListener("resize", resize);
    resize();

    return () => {
      globalThis.removeEventListener("resize", resize);
      if (requestIdRef.current !== undefined) {
        cancelAnimationFrame(requestIdRef.current);
      }
    };
  }, []);

  function startAnimation() {
    requestIdRef.current = requestAnimationFrame(update);
  }

  return (
    <section className="flex h-full w-full flex-col bg-brown dark:bg-darkgrey">
      <div className="grid h-fit w-full grid-cols-1 md:mb-10 md:grid-cols-2 lg:mt-12">
        <div className="relative flex h-auto w-full flex-col justify-start md:justify-start md:pr-10 lg:pr-28">
          <Image
            src={Human}
            priority
            height={80}
            className="place-self-center object-scale-down md:place-self-end"
            alt="Human Text"
          />
        </div>

        <div
          className={`
               relative flex h-auto w-full flex-col
               justify-start md:justify-start md:pl-10 lg:pl-28
        `}
        >
          <Image
            src={Developer}
            priority
            height={80}
            className="place-self-center object-scale-down md:place-self-start"
            alt="Developer Text"
          />
        </div>
      </div>

      <div className="relative mx-auto mb-20 h-[372.5px] w-[310px] bg-brown md:mb-28 lg:mb-16 xl:mb-36">
        <div className="absolute -top-px -left-px z-20 h-[373.5px] h-full w-[311px] w-full stroke-white text-brown dark:stroke-redgrey dark:text-darkgrey">
          <CircleDripIcon />
        </div>

        <div className="absolute top-0 left-0 z-10 h-full w-full text-brown">
          <Image
            src={JamesWattImage}
            height={372.5}
            width={310}
            priority
            placeholder="blur"
            alt="James Watt"
            sizes="310px"
          />
        </div>

        <svg
          width="100"
          height="350"
          viewBox="0 0 100 200"
          className="absolute left-[216.5px] top-[184px] z-20"
          aria-label="Water Drop"
        >
          <circle
            cx="24"
            cy={dropy}
            r="6"
            className="fill-white dark:fill-redgrey"
          ></circle>
        </svg>

        <svg
          className="absolute left-[232px] top-[215px] z-20"
          width="16.5"
          aria-label="Growing Drop"
        >
          <path
            d={`M0,48 a1,${1.3 + (counter + 1) * 0.2} 0 0,0 16.5,0`}
            className="fill-white dark:fill-redgrey"
          />
        </svg>
      </div>

      <svg
        width="100%"
        height="100px"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="-mt-5"
        aria-label="Wave Tank"
      >
        <polygon
          points={springsPath}
          className="fill-white dark:fill-redgrey dark:stroke-redgrey"
          stroke="white"
          transform="translate(0, 50)"
        ></polygon>
      </svg>
    </section>
  );
}
