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
  title: string;
  description: string;
  img?: string;
};

const EduCard: NextPage<Props> = (props) => {
  const { title, description, img } = { ...props };
  return (
    <div className="w-full bg-gray-400/40 dark:bg-purple-900/20 rounded-xl border border-purple-900 px-2 py-4">
      <div className="flex flex-row space-x-4">
        <div className="flex flex-col space-y-2 text-left">
          <div className="text-3xl font-bold">{title}</div>
          <div className="text-xl">{description}</div>
        </div>
      </div>
    </div>
  );
};

export default EduCard;
