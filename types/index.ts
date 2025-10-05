export type ServiceType =
  | "ai_agent"
  | "video_content"
  | "file_access"
  | "event_access"
  | "game_access";

export type PaymentType = "pay_per_use" | "stake_duration";

export interface Service {
  id: string;
  name: string;
  description: string;
  type: ServiceType;
  provider: string;
  providerAddress: string;
  paymentType: PaymentType;
  pricePerRequest?: number; // SOL for pay per use
  stakeDuration?: number; // days
  stakeAmount?: number; // SOL to stake
  totalUsers: number;
  rating: number;
  imageUrl?: string;
}

export interface StakingPool {
  id: string;
  name: string;
  description: string;
  apy: number; // Annual Percentage Yield
  totalStaked: number; // SOL
  minStake: number; // SOL
  lockPeriod: number; // days
  participants: number;
}

export interface UserStake {
  id: string;
  poolId: string;
  poolName: string;
  amount: number; // SOL staked
  startDate: Date;
  endDate: Date;
  rewards: number; // SOL earned
  status: "active" | "completed";
}

export interface ServiceStake {
  id: string;
  serviceId: string;
  serviceName: string;
  amount: number; // SOL staked
  startDate: Date;
  endDate: Date;
  status: "active" | "completed";
}

export interface ServiceUsage {
  id: string;
  serviceId: string;
  serviceName: string;
  date: Date;
  cost: number; // SOL or rewards spent
  paymentMethod: "rewards" | "wallet";
}

export interface UserData {
  totalStaked: number;
  totalRewards: number;
  activeStakes: UserStake[];
  serviceStakes: ServiceStake[];
  serviceUsage: ServiceUsage[];
}

export interface ProviderService extends Service {
  revenue: number;
  activeSubscriptions: number;
}
