"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { Service, StakingPool, UserData, ProviderService } from "@/types";
import {
  mockServices,
  mockStakingPools,
  mockUserStakes,
  mockServiceStakes,
  mockServiceUsage,
} from "@/data/mockData";

interface AppContextType {
  services: Service[];
  stakingPools: StakingPool[];
  userData: UserData;
  addStakeToPool: (poolId: string, amount: number) => void;
  addServiceStake: (
    serviceId: string,
    amount: number,
    duration: number
  ) => void;
  useService: (serviceId: string, cost: number) => void;
  registerService: (
    service: Omit<Service, "id" | "totalUsers" | "rating">
  ) => void;
  getProviderServices: (providerAddress: string) => ProviderService[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [services, setServices] = useState<Service[]>(mockServices);
  const [stakingPools] = useState<StakingPool[]>(mockStakingPools);
  const [userData, setUserData] = useState<UserData>({
    totalStaked: mockUserStakes.reduce((sum, stake) => sum + stake.amount, 0),
    totalRewards: mockUserStakes.reduce((sum, stake) => sum + stake.rewards, 0),
    activeStakes: mockUserStakes,
    serviceStakes: mockServiceStakes,
    serviceUsage: mockServiceUsage,
  });

  const addStakeToPool = (poolId: string, amount: number) => {
    const pool = stakingPools.find((p) => p.id === poolId);
    if (!pool) return;

    const newStake = {
      id: `stake${Date.now()}`,
      poolId,
      poolName: pool.name,
      amount,
      startDate: new Date(),
      endDate: new Date(Date.now() + pool.lockPeriod * 24 * 60 * 60 * 1000),
      rewards: 0,
      status: "active" as const,
    };

    setUserData((prev) => ({
      ...prev,
      totalStaked: prev.totalStaked + amount,
      activeStakes: [...prev.activeStakes, newStake],
    }));
  };

  const addServiceStake = (
    serviceId: string,
    amount: number,
    duration: number
  ) => {
    const service = services.find((s) => s.id === serviceId);
    if (!service) return;

    const newStake = {
      id: `sstake${Date.now()}`,
      serviceId,
      serviceName: service.name,
      amount,
      startDate: new Date(),
      endDate: new Date(Date.now() + duration * 24 * 60 * 60 * 1000),
      status: "active" as const,
    };

    setUserData((prev) => ({
      ...prev,
      serviceStakes: [...prev.serviceStakes, newStake],
    }));
  };

  const useService = (serviceId: string, cost: number) => {
    const service = services.find((s) => s.id === serviceId);
    if (!service) return;

    const newUsage = {
      id: `usage${Date.now()}`,
      serviceId,
      serviceName: service.name,
      date: new Date(),
      cost,
      paymentMethod: "rewards" as const,
    };

    setUserData((prev) => ({
      ...prev,
      totalRewards: Math.max(0, prev.totalRewards - cost),
      serviceUsage: [...prev.serviceUsage, newUsage],
    }));
  };

  const registerService = (
    service: Omit<Service, "id" | "totalUsers" | "rating">
  ) => {
    const newService: Service = {
      ...service,
      id: `service${Date.now()}`,
      totalUsers: 0,
      rating: 5.0,
    };

    setServices((prev) => [...prev, newService]);
  };

  const getProviderServices = (providerAddress: string): ProviderService[] => {
    return services
      .filter((s) => s.providerAddress === providerAddress)
      .map((s) => ({
        ...s,
        revenue: Math.random() * 100, // Mock revenue
        activeSubscriptions: Math.floor(Math.random() * s.totalUsers),
      }));
  };

  return (
    <AppContext.Provider
      value={{
        services,
        stakingPools,
        userData,
        addStakeToPool,
        addServiceStake,
        useService,
        registerService,
        getProviderServices,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
