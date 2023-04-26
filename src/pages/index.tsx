import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import ProgressBar from "../components/progress/ProgressBar";
import { useEffect, useRef, useState } from "react";
import EduCard from "@/components/cards/EduCard";
import { PopSquare } from "@/components/PopSquare";
import UniswapFeeCard from "@/components/cards/UniswapFeeCard";
import SolFeeCard from "@/components/cards/SolFeeCard";

export default function Home() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ container: ref });
  const [currentPercent, setCurrentPercent] = useState(0);
  const yRange = useTransform(scrollYProgress, [0, 1], [0, 100]);
  useEffect(
    () =>
      yRange.onChange((v) => {
        setCurrentPercent(Math.trunc(yRange.get()));
        // console.log(yRange.get());
      }),
    [yRange]
  );
  return (
    <div>
      <div className="h-[20vh]" />
      <div className="max-w-2xl mx-auto bg-gray-200/20 dark:bg-black/10 px-2 py-2 rounded-xl">
        {/* introduce fees */}
        <div className="">
          <div className="sticky top-2 bg-gradient-to-r from-indigo-500/90 via-purple-500/90 to-pink-500/90 border-purple-700 w-full rounded-xl p-2 text-center my-8 z-10">
            <h1 className="text-3xl md:text-7xl font-bold">Blockchain Fees</h1>
            <p className="text-lg md:text-2xl ">The what and why.</p>
          </div>
          <div className="h-[50vh]" />
          <div className="">
            <p className="my-4 text-xl md:text-3xl my-4 font-semibold">
              Fees help...
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
        {/* Scarce resource*/}
        <div className="">
          <div className="sticky top-2 bg-gradient-to-r from-sky-500/90 via-purple-500/90 to-green-500/90 border-purple-700 w-full rounded-xl p-2 text-center my-8 z-10">
            <h1 className="text-3xl md:text-7xl font-bold">Priority</h1>
            <p className="text-lg md:text-2xl ">
              Priority fees determine who goes first.
            </p>
          </div>
          <div className="flex flex-col space-y-8">
            <p className="text-lg md:text-2xl">
              Computing is a scarce resouce.
            </p>
            <p className="text-lg md:text-2xl">
              On the Solana blockchain, each block is limited to 48 million {""}
              <span className="bg-gray-400/60">compute units.</span>
            </p>
            <p className="text-lg md:text-2xl">
              Priority fees help allocate compute units. The higher the fee, the
              higher the priority.
            </p>
            <div className="text-lg md:text-2xl flex flex-row space-x-2 mx-auto">
              <p>Priority = </p>
              <div className="flex flex-col space-y-1 w-fit text-center">
                Total Fee
                <div className="h-1 w-full bg-purple-400"></div>
                Requested compute units
              </div>
            </div>
          </div>
        </div>
        {/* introduce problems*/}
        <div className="">
          <div className="sticky top-2 bg-gradient-to-r from-red-800/90 to-red-500/90 border-purple-700 w-full rounded-xl p-2 text-center mt-20 mb-8 z-10">
            <h1 className="text-3xl md:text-7xl font-bold">Expensive</h1>
            <p className="text-lg md:text-2xl ">High fees limit adoption.</p>
          </div>
          <UniswapFeeCard />
          <p className="my-4 text-lg md:text-2xl my-4">
            Blockchains promise decentralized access to computing, but high
            transaction fees limit adoption.
          </p>
          <p className="my-4 text-lg md:text-2xl my-4">
            As a result, many blockchain applications have been restricted to
            the{" "}
            <span className="bg-red-500/80 p-1 rounded-md">golden billion</span>{" "}
            who can afford double-digit fees for a simple transaction.
          </p>
          <Image
            src="/feeExamples/ethHighGasFee.webp"
            width={400}
            height={400}
            alt="High fee example"
            className="rounded-xl bg-red-700/50 p-1 mx-auto"
          />
        </div>
        {/* fee markets */}
        <div>
          <div className="sticky top-2 bg-gradient-to-r from-blue-700/90 to-sky-500/90 border-purple-700 w-full rounded-xl p-2 text-center mt-20 mb-8 z-10">
            <h1 className="text-3xl md:text-7xl font-bold">
              Local Fee Markets
            </h1>
            <p className="text-lg md:text-2xl ">A visual exploration.</p>
          </div>
          {/* pure fee markets */}
          <div className="mb-8">
            <div className="my-4">
              <p className="text-xl md:text-3xl font-semibold">
                Pure Local Fee Market
              </p>
              <p className="text-lg md:text-xl">
                A single program reaches capacity. A local fee market develops,
                and priority fees are required to use that program.
              </p>
            </div>

            <PopSquare>
              <div className="h-full flex flex-col md:flex-row text-center">
                <div className="bg-blue-400/20 md:w-[25%] h-[25%] md:rounded-tl-xl md:rounded-bl-xl md:rounded-tr-none rounded-tl-xl rounded-tr-xl md:h-full flex px-2">
                  <div className="my-auto mx-auto">
                    <p>Local Fee Market</p>
                    <p className="text-gray-500 text-lg">At Capacity</p>
                  </div>
                </div>
                <div className="my-auto mx-auto">
                  <p>Space Available</p>
                  <p className="text-gray-500 text-lg">No Priority Fees</p>
                </div>
              </div>
            </PopSquare>
          </div>
          {/* pure global fee markets */}
          <div className="mb-8">
            <div className="my-4">
              <p className="text-xl md:text-3xl font-semibold">
                Pure Global Fee Market
              </p>
              <p className="text-lg md:text-xl">
                There are no activity hotspots, but compute unit demand exceeds
                supply. All transactions require priority fees.
              </p>
            </div>

            <PopSquare>
              <div className="h-full flex flex-col md:flex-row text-center">
                <div className="bg-blue-400/20 w-full h-full rounded-xl flex px-2">
                  <div className="my-auto mx-auto">
                    <p>Global Fee Market</p>
                    <p className="text-gray-500 text-lg">At Capacity</p>
                  </div>
                </div>
              </div>
            </PopSquare>
          </div>
          {/* mixed global fee markets */}
          <div className="mb-8">
            <div className="my-4">
              <p className="text-xl md:text-3xl font-semibold">
                Mixed Global Fee Market
              </p>
              <p className="text-lg md:text-xl">
                Four programs reach capacity. The total compute unit supply is
                exhausted, and a global fee market emerges.
              </p>
            </div>

            <PopSquare>
              <div className="h-full flex flex-col md:flex-row text-center">
                <div className="bg-blue-400/20 md:w-[25%] h-[25%] md:rounded-tl-xl md:rounded-bl-xl md:rounded-tr-none rounded-tl-xl rounded-tr-xl md:h-full flex px-2">
                  <div className="my-auto mx-auto">
                    <p>Local Fee Market</p>
                    <p className="text-gray-500 text-lg">At Capacity</p>
                  </div>
                </div>
                {/* second local fee market */}
                <div className="bg-blue-800/20 md:w-[25%] h-[25%] md:h-full flex px-2">
                  <div className="my-auto mx-auto">
                    <p>Local Fee Market</p>
                    <p className="text-gray-500 text-lg">At Capacity</p>
                  </div>
                </div>
                {/* third local fee market */}
                <div className="bg-purple-400/20 md:w-[25%] h-[25%] md:h-full flex px-2">
                  <div className="my-auto mx-auto">
                    <p>Local Fee Market</p>
                    <p className="text-gray-500 text-lg">At Capacity</p>
                  </div>
                </div>
                {/* fourth local fee market */}
                <div className="bg-sky-400/20 md:w-[25%] h-[25%] md:rounded-tr-xl md:rounded-br-xl md:rounded-bl-none rounded-bl-xl rounded-br-xl md:h-full flex px-2">
                  <div className="my-auto mx-auto">
                    <p>Local Fee Market</p>
                    <p className="text-gray-500 text-lg">At Capacity</p>
                  </div>
                </div>
              </div>
            </PopSquare>
          </div>
          <div className="my-4">
            <p className="text-xl md:text-3xl font-semibold">
              Recent Solana Fee Data.
            </p>
            <p className="text-lg md:text-xl">
              Fee data from the most recent Solana block.
            </p>
          </div>
          {/* sol fee data*/}
          <SolFeeCard />
        </div>
      </div>
    </div>
  );
}
