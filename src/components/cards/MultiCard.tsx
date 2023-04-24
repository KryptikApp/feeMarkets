

import { NextPage } from "next";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import ProgressBar from "../progress/ProgressBar";
import EduCard from "./EduCard";
import { useScroll, useTransform } from "framer-motion";

type Props = {
  title: string;
  description: string;
  img?: string;
};

const MultiCard: NextPage<Props> = (props) => {
      const ref = useRef(null);
  const { scrollYProgress } = useScroll({ container: ref });
  const { title, description, img } = { ...props };
    const [currentPercent, setCurrentPercent] = useState(0);
      const yRange = useTransform(scrollYProgress, [0, 1], [0, 100]);
  useEffect(
    () =>
      yRange.onChange((v) => {
        setCurrentPercent(Math.trunc(yRange.get()));
        console.log(yRange.get());
      }),
    [yRange]
  );
  return (
 <div className="max-w-xl mx-auto">
  {/* <ProgressBar progressPercent={50} /> */}
  <div className="border-t border-l border-r rounded-tl-xl rounded-tr-xl dark:bg-gray-700/40">
    <div className="p-2">
      <h1 className="text-4xl font-bold ">Local Fee Markets</h1>
      <p className="text-lg ">A visual exploration.</p>
    </div>
    <ProgressBar progressPercent={currentPercent} />
  </div>
  <ul
    ref={ref}
    className="max-h-[60vh] overflow-auto border-r border-l border-b rounded-br-xl rounded-bl-xl grid grid-cols-1 gap-4 py-2 px-2"
  >
    <div className="min-h-40 h-40 w-full bg-white rounded-xl"></div>
    <EduCard title={"Test"} description={"Test description Fee Markets"} />
    <EduCard title={"Test"} description={"Test description Fee Markets"} />

    <EduCard title={"Test"} description={"Test description Fee Markets"} />
    <EduCard title={"Test"} description={"Test description Fee Markets"} />
  </ul>
</div>;
  );
};

export default MultiCard;

