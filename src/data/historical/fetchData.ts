import { Connection, GetVersionedBlockConfig } from "@solana/web3.js";
import { ISolSlotFee, ISolSlotFeeResponse } from "../types/sol";
import { parseSolFeeDataResponse } from "../parse/sol";
import { ISlotFee } from "../types/feeSlot";
import { createObjectCsvWriter } from "csv-writer";
import { JsonRpcProvider } from "ethers";

const rpcEndpoint: string =
  "https://solana-mainnet.g.alchemy.com/v2/FkhzqcNx3P8JEm87AgHpmzdk6WdYyk6P";
const solProvider = new Connection(rpcEndpoint);

// january 5th, 2023
const startSlotSol: number = 171000000;
// april 24th, 2023
const endSlotSol: number = 190305800;

// avg slot time in ms
const slotTimeSol = 500;
const slotsPerDaySol = (24 * 60 * 60 * 1000) / slotTimeSol;

// max compute units in a sol slot
const solMaxCu = 48000000;

const solPath = "solFeeData.csv";
const ethPath = "ethFeeData.csv";

const csvHeader = [
  { id: "slot", title: "slot" },
  { id: "txns", title: "txns" },
  { id: "cu", title: "cu" },
  { id: "cu_percentage", title: "cu_percentage" },
  { id: "rewards", title: "rewards" },
  { id: "leader", title: "leader" },
  { id: "fees_count", title: "fees_count" },
  { id: "fees_percentage", title: "fees_percentage" },
  { id: "fees_average", title: "fees_average" },
  { id: "fees_total", title: "fees_total" },
  { id: "fees_max", title: "fees_max" },
];

// want to fetch 20 slots per day
const maxlotsPerDay = 20;

/** Fetches blocks from a given time interval
 * @param startSlot - the starting slot to fetch from
 * @param endSlot - the ending slot to fetch from
 */
export async function fetchSolFeeBlocks(
  startSlot?: number,
  endSlot?: number
): Promise<ISlotFee[]> {
  // fetch latest slot if not provided
  const mostRecentSlot = await solProvider.getSlot();
  // using most recent minus offset because the most recent slot may not have propogated
  if (!endSlot) {
    endSlot = mostRecentSlot - 100;
  }
  if (!startSlot) {
    startSlot = mostRecentSlot - 110;
  }
  const totalDays = (endSlot - startSlot) / slotsPerDaySol;
  const maxToFetch = Math.floor(totalDays * maxlotsPerDay);
  console.log(`Fetching ${maxToFetch} sol slots`);
  let toSkip = Math.floor((endSlotSol - startSlotSol) / maxToFetch);
  const feeSlotResult: ISlotFee[] = [];
  for (let i = startSlot; i < endSlot; i += toSkip) {
    try {
      console.log(`Fetching slot ${i}`);
      const urlToFetch: string = `https://solanacompass.com/blocks/query?sort=&per_page=25000000&filter[slots]=${i},${i}`;
      // for now trusting the data is returned on the same page
      const response = await fetch(urlToFetch);
      // const rawResponse: any = await response.json();
      // console.log(rawResponse);
      const slotResponse: ISolSlotFeeResponse = await response.json();
      const slotData: ISolSlotFee = slotResponse.data[0];
      // cast to ISlotFee
      const newSlotFee: ISlotFee = {
        slot: slotData.slot,
        txns: slotData.txns,
        cu: slotData.cu,
        cu_percentage: slotData.cu / solMaxCu,
        rewards: slotData.rewards,
        leader: slotData.leader_leader,
        fees_count: slotData.fees_count,
        fees_percentage: slotData.fees_percentage,
        fees_average: slotData.fees_average,
        fees_total: slotData.fees_total,
        fees_max: slotData.fees_max,
      };
      feeSlotResult.push(newSlotFee);
    } catch (e) {
      console.log(`Error fetching slot ${i}`);
      console.log(e);
    }
  }
  // write to csv
  const csvWriter = createObjectCsvWriter({
    path: solPath,
    header: csvHeader,
  });
  await csvWriter.writeRecords(feeSlotResult);
  return feeSlotResult;
}

// public RPC endpoint for Ethereum mainnet
const rpcEndpointEth = "https://eth.llamarpc.com";

// january 5th, 2023
const startSlotEth: number = 16339060;
// april 24th, 2023
const endSlotEth: number = 17119520;

// avg slot time in ms
const slotTimeEth = 12000;
const slotsPerDayEth = (24 * 60 * 60 * 1000) / slotTimeEth;

// maximum compute units in an eth slot
const maxCuEth: number = 30000000;

/** Fetches blocks from a given time interval
 * @param startSlot - the starting slot to fetch from
 * @param endSlot - the ending slot to fetch from
 */
export async function fetchEthFeeBlocks(
  startSlot?: number,
  endSlot?: number
): Promise<ISlotFee[]> {
  // fetch latest slot if not provided
  if (!endSlot) {
    endSlot = endSlotEth;
  }
  if (!startSlot) {
    startSlot = startSlotEth;
  }
  // init eth rpc client
  const ethProvider = new JsonRpcProvider(rpcEndpointEth);
  const totalDays = (endSlot - startSlot) / slotsPerDayEth;
  const maxToFetch = Math.floor(totalDays * maxlotsPerDay);
  const toSkip = Math.floor((endSlotEth - startSlotEth) / maxToFetch);
  const feeSlotResult: ISlotFee[] = [];
  console.log(`Fetching ${maxToFetch} eth slots`);
  // Calculate the total priority fees for all transactions in the block
  for (let i = startSlot; i < endSlot; i += toSkip) {
    try {
      console.log(`Fetching slot ${i}`);
      const block = await ethProvider.getBlock(i, true);
      if (!block) {
        console.log(`Error fetching block ${i}`);
        continue;
      }

      let priorityFees: number[] = [];

      for (const txHash of block.transactions) {
        const tx = await block.getPrefetchedTransaction(txHash);
        if (!tx) {
          continue;
        }
        priorityFees.push(Number(tx.maxPriorityFeePerGas));
      }
      const newSlotFee: ISlotFee = {
        slot: block.number,
        txns: block.transactions.length,
        cu: Number(block.gasUsed),
        cu_percentage: Number(block.gasUsed) / Number(block.gasLimit),
        leader: block.miner,
        base_fee: Number(block.baseFeePerGas),
        fees_count: block.transactions.length,
        fees_percentage: 100,
        fees_average:
          priorityFees.reduce((a, b) => a + b, 0) / priorityFees.length,
        fees_total: priorityFees.reduce((a, b) => a + b, 0),
        fees_max: Math.max(...priorityFees),
      };
      feeSlotResult.push(newSlotFee);
    } catch (e) {
      console.log(`Error fetching block ${i}`);
      console.log(e);
    }
  }
  // write to csv
  const csvWriter = createObjectCsvWriter({
    path: ethPath,
    header: csvHeader,
  });
  await csvWriter.writeRecords(feeSlotResult);
  return feeSlotResult;
}

// uncomment to fetch data
// fetchSolFeeBlocks().then(() => console.log("done fetching sol fee data"));
// fetchEthFeeBlocks().then(() => console.log("done fetching eth fee data"));
