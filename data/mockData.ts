import {
  Service,
  StakingPool,
  UserStake,
  ServiceStake,
  ServiceUsage,
} from "@/types";

export const mockServices: Service[] = [
  {
    id: "1",
    name: "AI Content Generator",
    description:
      "Advanced AI agent for generating high-quality content, articles, and creative writing",
    type: "ai_agent",
    provider: "TechAI Labs",
    providerAddress: "Fg7T...9xKp",
    paymentType: "pay_per_use",
    pricePerRequest: 0.1,
    totalUsers: 1243,
    rating: 4.8,
  },
  {
    id: "2",
    name: "Premium Video Course",
    description:
      "Access to exclusive blockchain development video tutorials and masterclasses",
    type: "video_content",
    provider: "CryptoEdu",
    providerAddress: "Bv9K...2mNq",
    paymentType: "stake_duration",
    stakeDuration: 30,
    stakeAmount: 2.5,
    totalUsers: 856,
    rating: 4.9,
  },
  {
    id: "3",
    name: "AI Code Assistant",
    description:
      "Smart AI assistant for code review, debugging, and optimization",
    type: "ai_agent",
    provider: "DevTools Inc",
    providerAddress: "Hw3M...7yLp",
    paymentType: "pay_per_use",
    pricePerRequest: 0.05,
    totalUsers: 2341,
    rating: 4.7,
  },
  {
    id: "4",
    name: "NFT Conference 2025",
    description:
      "Virtual access to the biggest NFT and Web3 conference of the year",
    type: "event_access",
    provider: "Web3Events",
    providerAddress: "Qp8N...4wRt",
    paymentType: "stake_duration",
    stakeDuration: 7,
    stakeAmount: 5.0,
    totalUsers: 432,
    rating: 4.6,
  },
  {
    id: "5",
    name: "GameFi Premium Access",
    description:
      "Unlock premium features and exclusive items in our blockchain game",
    type: "game_access",
    provider: "GameFi Studios",
    providerAddress: "Zx2V...6bHy",
    paymentType: "stake_duration",
    stakeDuration: 30,
    stakeAmount: 1.5,
    totalUsers: 3421,
    rating: 4.5,
  },
  {
    id: "6",
    name: "Research Papers Library",
    description: "Access to thousands of blockchain and crypto research papers",
    type: "file_access",
    provider: "CryptoResearch",
    providerAddress: "Lm5G...9pTx",
    paymentType: "pay_per_use",
    pricePerRequest: 0.02,
    totalUsers: 987,
    rating: 4.4,
  },
];

export const mockStakingPools: StakingPool[] = [
  {
    id: "pool1",
    name: "High Yield Pool",
    description:
      "Premium staking pool with highest returns for long-term stakers",
    apy: 12.5,
    totalStaked: 125000,
    minStake: 1.0,
    lockPeriod: 90,
    participants: 1234,
  },
  {
    id: "pool2",
    name: "Flexible Pool",
    description: "Short-term staking with flexible withdrawal options",
    apy: 8.0,
    totalStaked: 87500,
    minStake: 0.5,
    lockPeriod: 30,
    participants: 2341,
  },
  {
    id: "pool3",
    name: "Balanced Pool",
    description: "Medium-term staking with balanced risk and rewards",
    apy: 10.0,
    totalStaked: 156000,
    minStake: 0.75,
    lockPeriod: 60,
    participants: 1876,
  },
];

export const mockUserStakes: UserStake[] = [
  {
    id: "stake1",
    poolId: "pool1",
    poolName: "High Yield Pool",
    amount: 5.0,
    startDate: new Date("2024-09-01"),
    endDate: new Date("2024-11-30"),
    rewards: 0.52,
    status: "active",
  },
  {
    id: "stake2",
    poolId: "pool2",
    poolName: "Flexible Pool",
    amount: 2.5,
    startDate: new Date("2024-10-01"),
    endDate: new Date("2024-10-31"),
    rewards: 0.017,
    status: "active",
  },
];

export const mockServiceStakes: ServiceStake[] = [
  {
    id: "sstake1",
    serviceId: "2",
    serviceName: "Premium Video Course",
    amount: 2.5,
    startDate: new Date("2024-09-15"),
    endDate: new Date("2024-10-15"),
    status: "active",
  },
];

export const mockServiceUsage: ServiceUsage[] = [
  {
    id: "usage1",
    serviceId: "1",
    serviceName: "AI Content Generator",
    date: new Date("2024-10-01"),
    cost: 0.1,
    paymentMethod: "rewards",
  },
  {
    id: "usage2",
    serviceId: "3",
    serviceName: "AI Code Assistant",
    date: new Date("2024-10-02"),
    cost: 0.05,
    paymentMethod: "rewards",
  },
  {
    id: "usage3",
    serviceId: "1",
    serviceName: "AI Content Generator",
    date: new Date("2024-10-03"),
    cost: 0.1,
    paymentMethod: "rewards",
  },
];
