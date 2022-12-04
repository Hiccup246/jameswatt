import { useEffect, useRef, useState } from "react";
import { Spring, WaveTank } from "../WaveTank";
import Image from "next/image";
import CircleDripIcon from "../Icons/CircleDripIcon";
// import PantheonOneIcon from "../Icons/PantheonOneIcon";

function easeInCirc(x: number) {
  return 1 - Math.sqrt(1 - Math.pow(x, 2));
}

const waveTank = new WaveTank();

function LandingSectionTwo() {
  const SVG_WIDTH = 100;
  const [counter, setCounter] = useState(0);
  const [dropy, setDropy] = useState(0);
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
  const juice = `M18 ${63 + counter} C15 ${63 + counter} 16 ${
    63 + counter
  } 12 61L9 56C2 33 62 -3 80 12C103 27 44 56 29 58C27 58 25 59 24 61C20 ${
    63 + counter
  } 21 ${63 + counter} 18 ${63 + counter}Z`;

  function updateJuice(timestamp: number) {
    const amp = 40;
    const x = timestamp / 2000;
    const saw = x - Math.floor(x);
    if (saw < 0.6) {
      setCounter(easeInCirc(saw) * amp);
      setDropy(0);
    } else {
      setCounter(easeInCirc(1 - saw) * amp * 0.1);
      setDropy(0 + Math.pow(saw - 0.6, 2) * 10000);
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
      ((widthRef.current / 2 - 30) / widthRef.current) * 100,
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
    <div className="w-full">
      <div className="w-9/12 mx-auto flex flex-col relative mb-40">
        <div className="w-60 h-72 relative self-center mt-24 z-0">

          <div className="w-[600px] h-[666px] absolute top-0 z-10">
              {/* <PantheonOneIcon /> */}
              <Image src="/kisspng-acropolis-of-athens-icon-vector-material-pattern-outbound-travel-5a9aa18180b0b2.8193643415200833295271.png" fill alt="James Watt" objectFit="contain" />
          </div>

          <div className="w-[300px] h-[366px] z-20 absolute top-0">
            <Image src="/final-1-portrait.png" fill alt="James Watt" objectFit="contain" />
          </div>
        </div>
        
        <svg
            width="100"
            height="300"
            viewBox="0 0 100 300"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-[calc(50%-50px)] top-[94%] z-50"
            role="img"
            aria-label="Fresh logo"
        >
            <circle cx="52.5" cy={dropy} r="6" fill="white"></circle>        
        </svg>
      </div>
      <svg
          width="100%"
          height="100px"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="-mt-5"
      >
          <polygon
              points={springsPath}
              fill="white"
              transform="translate(0, 50)"
          >
          </polygon>
      </svg>
    </div>
  );
}

export default LandingSectionTwo;