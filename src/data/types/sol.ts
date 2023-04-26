// create interface from object below
export interface ISolSlotFee {
  slot: number;
  txns: number;
  votes: number;
  skipped: number;
  success: number;
  failed: number;
  cu: number;
  success_cu: number;
  failed_cu: number;
  rewards: number;
  epoch: number;
  leader_leader: string;
  fees_count: number;
  fees_percentage: number;
  fees_average: number;
  fees_total: number;
  fees_max: number;
  fees: {
    slot: number;
    count: number;
    percentage: number;
    average: number;
    min: number;
    max: number;
    median: number;
    total: number;
    epoch: number;
  };
  leader: {
    slot: number;
    leader: string;
  };
}

export interface ISolSlotFeeResponse {
  data: ISolSlotFee[];
}
