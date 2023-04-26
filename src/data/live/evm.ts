import { divByDecimals } from "@/utils";
import { BigNumberish, FeeData, JsonRpcProvider, parseUnits } from "ethers";

// public RPC endpoint for Ethereum mainnet
const rpcEndpoint = "https://eth.llamarpc.com";
// default gas limit for Uniswap transactions
const defaultUniswapGasLimit: number = 184523;
// default ETH price in USD
const defaultEthPrice = 1800;
// const default Uniswap cost in USD
const defaultUniswapCost = 15;

// fetches current fee data from the RPC endpoint
export async function fetchCurrentFeeData() {
  // create new provider with ethers
  const provider = new JsonRpcProvider(rpcEndpoint);
  // fetch fee data
  const feeData = await provider.getFeeData();
  // return fee data
  return feeData;
}

/** Returns the expected average cost of a uniswap transaction Ethereum mainnet. */
export function computeUniswapTxCost(feeData: FeeData): number {
  if (!feeData.maxFeePerGas || !feeData.maxPriorityFeePerGas) {
    return defaultUniswapCost;
  }
  try {
    const maxGasRequired: number =
      Number(feeData.gasPrice) * defaultUniswapGasLimit;
    // compute gas cost
    const gasCostEther: number = divByDecimals(Number(maxGasRequired), 18);
    const gasCostUsd = Number(gasCostEther) * defaultEthPrice;
    // return gas cost
    return gasCostUsd;
  } catch (err) {
    return defaultUniswapCost;
  }
}
