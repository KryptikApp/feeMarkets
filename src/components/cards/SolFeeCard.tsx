import { fetchSolFeeBlocks } from "@/data/historical/fetchSolData";
import { computeUniswapTxCost, fetchCurrentFeeData } from "@/data/live/evm";
import { ISolSlotFee } from "@/data/types/sol";
import { LoadingOutlined, RedoOutlined } from "@ant-design/icons";
import { FeeData } from "ethers";
import { NextPage } from "next";
import { useEffect, useState } from "react";

type Props = {
  // title: string;
  // description: string;
  // img?: string;
};

const SolFeeCard: NextPage<Props> = (props) => {
  const [solFeeData, setSolFeeData] = useState<ISolSlotFee[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [mosetRecentSolFeeData, setMostRecentSolFeeData] =
    useState<ISolSlotFee | null>(null);

  async function handleFeeFetch() {
    try {
      setLoading(true);
      const res = await fetch("/api/solFees");
      const newSolFeeData = (await res.json()).feeData;
      if (!newSolFeeData) {
        setLoading(false);
        throw new Error("Unable to fetch Solana fee data");
      }
      console.log("newSolFeeData");
      console.log(newSolFeeData);
      // set most recent fee data to state
      setSolFeeData(newSolFeeData);
      setMostRecentSolFeeData(newSolFeeData[0]);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      //pass for now
    }
  }
  useEffect(() => {
    handleFeeFetch();
  }, []);
  return (
    <div className="w-full text-center">
      {!mosetRecentSolFeeData && (
        <div
          className={`${"bg-purple-500/40 w-full h-20 rounded-lg animate-pulse"}`}
        />
      )}

      {mosetRecentSolFeeData && (
        <div className="bg-purple-500/40 rounded-xl p-2 text-lg md:text-xl">
          <div className="grid grid-cols-1 divide-y divide-gray-500/50">
            <div className="flex flex-row space-x-2">
              <p className="font-semibold">Slot:</p>
              <p>{mosetRecentSolFeeData.slot}</p>
            </div>
            <div className="flex flex-row space-x-2">
              <p className="font-semibold">Compute Units:</p>
              <p>{mosetRecentSolFeeData.cu}</p>
            </div>
            <div className="flex flex-row space-x-2">
              <p className="font-semibold">Compute Percent:</p>
              <p>{((mosetRecentSolFeeData.cu / 48000000) * 100).toFixed(2)}%</p>
            </div>
            <div className="flex flex-row space-x-2">
              <p className="font-semibold">Priority Percent:</p>
              <p>{(mosetRecentSolFeeData.fees_percentage * 100).toFixed(2)}%</p>
            </div>
            <div className="text-right text-gray-200">
              {!loading && (
                <RedoOutlined
                  className="mt-2 hover:cursor-pointer hover:font-bold items-end"
                  onClick={handleFeeFetch}
                />
              )}
              {loading && <LoadingOutlined className="mt-2 animate-spin" />}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SolFeeCard;
