import { useEffect, useRef, useState } from "react";
import { Spring, WaveTank } from "./WaveTank";
import Image from "next/image";
import CircleDripIcon from "./Icons/CircleDripIcon";

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
    const saw = (timestamp + offset) / 2000 -
      Math.floor((timestamp + offset) / 2000);
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
      ((widthRef.current / 2 + waveDropOffset) / widthRef.current) * 100,
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

    requestIdRef.current = requestAnimationFrame(update);
    globalThis.addEventListener("resize", resize);
    resize();

    return () => {
      globalThis.removeEventListener("resize", resize);
      if (requestIdRef.current !== undefined) {
        cancelAnimationFrame(requestIdRef.current);
      }
    };
  }, []);

  return (
    <div className="w-full bg-brown">
      <div className="w-[340px] h-[406px] relative mx-auto mt-20 bg-brown bg-[red]">
        <div className="w-full h-full text-brown absolute top-0 left-0 z-20">
            <CircleDripIcon />
        </div>

        <div className="w-full h-full text-brown absolute top-0 left-0 z-10">
          <Image src="/pantheon-portrait-small-edited-white.webp" fill alt="James Watt" className="object-scale-down" />
        </div>

        <svg
          width="100"
          height="200"
          viewBox="0 0 100 200"
          className="absolute left-[240px] top-[285px] z-20"
          aria-label="Water Drop"
        >
          <circle cx="24" cy={dropy} r="7" className="fill-white"></circle>
        </svg>

        <svg className="absolute left-[256px] top-[243px] z-20"
          viewBox="0 0 100 300">
          <path d={`M0,50 a1,${1 + ((counter+1)*0.2)} 0 0,0 15,0`} className="fill-white" />
        </svg>
      </div>

      <svg
        width="100%"
        height="100px"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="mt-5"
      >
        <polygon
          points={springsPath}
          className="fill-white"
        >
        </polygon>
      </svg>
    </div>
  );
}

export default LandingSection;