import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";

type Props = {
  progressPercent: number;
};

const ProgressBar: NextPage<Props> = (props) => {
  const { progressPercent } = { ...props };
  const progressval = useMotionValue(progressPercent);
  const width = useTransform<MotionValue<number>, string>(
    progressval,
    [0, 100],
    ["0%", "100%"]
  );
  useEffect(() => {
    progressval.set(progressPercent);
  }, [progressPercent]);
  return (
    <div className="w-[100%]">
      <motion.div
        id="progressBar"
        className="bg-gradient-to-r from-pink-400 to-purple-600 h-fit text-gray-700"
        style={{
          width: width,
        }}
      >
        <span className="ml-[2%] text-sm">
          {progressPercent > 5 ? `${progressPercent.toFixed(0)}%` : ""}
        </span>
      </motion.div>
    </div>
  );
};

export default ProgressBar;
