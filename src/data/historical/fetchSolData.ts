import { Connection, GetVersionedBlockConfig } from "@solana/web3.js";
import { ISolSlotFee, ISolSlotFeeResponse } from "../types/sol";
import { parseSolFeeDataResponse } from "../parse/sol";

const rpcEndpoint: string =
  "https://solana-mainnet.g.alchemy.com/v2/FkhzqcNx3P8JEm87AgHpmzdk6WdYyk6P";
const solProvider = new Connection(rpcEndpoint);

// january 5th, 2023
const startSlot: number = 171000000;
// april 24th, 2023
const endSlot: number = 190305800;

/** Fetches blocks from a given time interval
 * @param startSlot - the starting slot to fetch from
 * @param endSlot - the ending slot to fetch from
 */

const maxSlotRange: number = 500;

export async function fetchSolFeeBlocks(startSlot?: number, endSlot?: number) {
  // iterate through the slots in the range to avoid 'too many requests' error
  const totalSlotFeeData: ISolSlotFee[] = [];
  // fetch latest slot if not provided
  if (!startSlot || !endSlot) {
    endSlot = await solProvider.getSlot();
    if (!endSlot) {
      return [];
    }
    startSlot = endSlot - 1000;
    endSlot = endSlot;
  }
  for (let i = startSlot; i < endSlot; i += maxSlotRange) {
    const urlToFetch: string = `https://solanacompass.com/blocks/query?sort=&per_page=25000000&filter[slots]=${i},${
      i + maxSlotRange
    }`;
    // for now trusting the data is returned on the same page
    const response = await fetch(urlToFetch);
    // const rawResponse: any = await response.json();
    // console.log(rawResponse);
    const slotData: ISolSlotFeeResponse = await response.json();
    // append to total slot fee data
    totalSlotFeeData.push(...slotData.data);
  }
  return totalSlotFeeData;
}

// fetchBlocks().then(() => console.log("Done fetching data."));
