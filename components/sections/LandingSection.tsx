import { useEffect, useRef, useState } from "react";
import { Spring, WaveTank } from "../WaveTank";
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

function LandingSection() {
  const SVG_WIDTH = 100;
  const waveDropOffset = 100;
  const [counter, setCounter] = useState(0);
  const [dropy, setDropy] = useState(10);
  const [width, setWidth] = useState(SVG_WIDTH);
  const widthRef = useRef(width);
  const [springs, setSprings] = useState<Spring[]>(waveTank.springs);
  const requestIdRef = useRef<number>();
  const grid = SVG_WIDTH / waveTank.waveLength;
  const points = [
    [0, 100],
    [0, 0],
    ...springs.map((x, i) => [i * grid, x.p]),
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
      ((widthRef.current / 2 + waveDropOffset) / widthRef.current) * 100
    );
    waveTank.springs[dropPosition].p = -60;
  }

  useEffect(() => {
    widthRef.current = width;
  }, [width]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      return;
    }

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
    <div className="flex h-full w-full flex-col bg-brown">
      <div
        className={`
             grid h-fit w-full grid-cols-1
             md:mb-10 md:grid-cols-2 lg:mt-12
      `}
      >
        <div
          className={`
               relative flex h-auto w-full flex-col
               justify-start md:justify-start md:pr-10 lg:pr-28
        `}
        >
          <Image
            src={Human}
            priority
            height="80"
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
            height="80"
            className="place-self-center object-scale-down md:place-self-start"
            alt="Developer Text"
          />
        </div>
      </div>

      <div className="relative mx-auto mb-20 h-[376px] w-[310px] bg-brown md:mb-28 lg:mb-16 xl:mb-36">
        <div className="absolute top-0 left-0 z-20 h-full w-full text-brown">
          <CircleDripIcon />
        </div>

        <div className="absolute top-0 left-0 z-10 h-full w-full text-brown">
          <Image
            src={JamesWattImage}
            fill
            priority
            placeholder="blur"
            alt="James Watt"
            onLoad={() => startAnimation()}
            onError={() => startAnimation()}
            sizes="310px"
            className="object-scale-down"
          />
        </div>

        <svg
          width="100"
          height="350"
          viewBox="0 0 100 200"
          className="absolute left-[216.5px] top-[184px] z-20"
          aria-label="Water Drop"
        >
          <circle cx="24" cy={dropy} r="6" className="fill-white"></circle>
        </svg>

        <svg
          className="absolute left-[232.5px] top-[230px] z-20"
          viewBox="0 0 100 100"
          aria-label="Growing Drop"
        >
          <path
            d={`M0,50 a1,${1 + (counter + 1) * 0.2} 0 0,0 20,0`}
            className="fill-white"
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
          className="fill-white"
          stroke="white"
          transform="translate(0, 50)"
        ></polygon>
      </svg>
    </div>
  );
}

export default LandingSection;