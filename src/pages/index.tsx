import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import ProgressBar from "../components/progress/ProgressBar";
import { useEffect, useRef, useState } from "react";
import EduCard from "@/components/cards/EduCard";

export default function Home() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ container: ref });
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
    <div>
      <div className="h-[20vh]" />
      <div className="max-w-2xl mx-auto bg-black/10 px-2 py-2 rounded-xl">
        {/* introduce fees */}
        <div className="">
          <div className="sticky top-2 bg-purple-700/90 border-purple-700 w-full rounded-xl p-2 text-center my-8">
            <h1 className="text-3xl md:text-7xl font-bold">Blockchain Fees</h1>
            <p className="text-lg md:text-2xl ">The what and why.</p>
          </div>
          <div className="h-[50vh]" />
          <div className="">
            <p className="my-4 text-lg md:text-2xl my-4">
              Every blockchain transaction costs money.
            </p>
            <div className="grid grid-cols-1 space-y-12">
              <EduCard
                title={"Compensate Validators"}
                description={
                  "Fees provide compensation to the validator network for the CPU/GPU resources necessary to process transactions"
                }
              />
              <EduCard
                title={"Prevent Spam"}
                description={
                  "Fees reduce network spam by introducing real cost to transactions."
                }
              />
              <EduCard
                title={"Economic Stability"}
                description={
                  "Fees provide long-term economic stability to the network through a protocol-captured minimum fee amount per transaction."
                }
              />
            </div>
            <p className="my-4 text-lg md:text-2xl my-4">
              Over the long-term, networks will increasingly rely on transaction
              fees to sustain security.
            </p>
          </div>
        </div>
        {/* introduce problems*/}
        <div className="">
          <div className="sticky top-2 bg-pink-700/20 border-pink-700 w-full rounded-xl p-2 text-center my-8">
            <h1 className="text-3xl md:text-7xl font-bold">Expensive</h1>
            <p className="text-lg md:text-2xl ">High fees limit adoption.</p>
          </div>
          <p className="my-4 text-lg md:text-2xl my-4">
            Blockchains promise decentralized access to computing, but high
            transaction fees limit adoption.
          </p>

          <p className="my-4 text-lg md:text-2xl my-4">
            As a result, many blockchain applications have been restricted to
            the <span className="text-yellow-300">golden billion</span> who can
            afford double-digit fees for a simple transaction.
          </p>
        </div>
        {/* fee markets */}
        <div>
          <div className="sticky top-2 bg-green-700/90 w-full rounded-xl p-2 text-center my-8">
            <h1 className="text-3xl md:text-7xl font-bold">
              Local Fee Markets
            </h1>
            <p className="text-lg md:text-2xl ">A visual exploration.</p>
          </div>
          <div className="grid grid-cols-1 gap-12">
            <EduCard
              title={"Test"}
              description={"Test description Fee Markets"}
            />
            <EduCard
              title={"Test"}
              description={"Test description Fee Markets"}
            />
            <EduCard
              title={"Test"}
              description={"Test description Fee Markets"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
