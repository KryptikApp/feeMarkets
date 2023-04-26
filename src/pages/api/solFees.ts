// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { fetchSolFeeBlocks } from "@/data/historical/fetchSolData";
import { ISolSlotFee } from "@/data/types/sol";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  feeData: ISolSlotFee[] | null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const newSolFeeData = await fetchSolFeeBlocks();
    res.status(200).json({ feeData: newSolFeeData });
  } catch (e) {
    console.log(e);
    res.status(500).json({ feeData: null });
  }
}
