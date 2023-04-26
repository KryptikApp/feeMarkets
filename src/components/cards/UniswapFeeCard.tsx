import { computeUniswapTxCost, fetchCurrentFeeData } from "@/data/live/evm";
import { FeeData } from "ethers";
import { NextPage } from "next";
import { useEffect, useState } from "react";

type Props = {
  // title: string;
  // description: string;
  // img?: string;
};

const UniswapFeeCard: NextPage<Props> = (props) => {
  const [uniswapTxCost, setUniswapTxCost] = useState<number | null>(null);
  async function handleFeeFetch() {
    const feeData: FeeData = await fetchCurrentFeeData();
    const newUniswapTxCost = computeUniswapTxCost(feeData);
    setUniswapTxCost(newUniswapTxCost);
  }
  useEffect(() => {
    handleFeeFetch();
  }, []);
  return (
    <div className="w-full text-center">
      <div
        className={`${!uniswapTxCost && "bg-red-500/40 w-40 h-20 rounded-lg"}`}
      >
        {uniswapTxCost && (
          <div>
            <p className="text-2xl lg:text-5xl text-red-500 font-bold">
              ${uniswapTxCost.toFixed(2)}
            </p>
            <p className="text-lg text-gray-600">
              Average cost of a Uniswap Tx
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UniswapFeeCard;
