// create interface from object below
export interface ISlotFee {
  slot: number;
  txns: number;
  votes?: number;
  skipped?: number;
  success?: number;
  failed?: number;
  cu: number;
  success_cu?: number;
  failed_cu?: number;
  cu_percentage: number;
  rewards?: number;
  leader: string;
  fees_count?: number;
  fees_percentage?: number;
  fees_average?: number;
  fees_total?: number;
  fees_max?: number;
  base_fee?: number;
}
