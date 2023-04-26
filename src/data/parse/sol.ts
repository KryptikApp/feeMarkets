import { ISolSlotFeeResponse } from "../types/sol";

export function parseSolFeeDataResponse(res: any): ISolSlotFeeResponse {
  const newData: ISolSlotFeeResponse = JSON.parse(res);
  return newData;
}
