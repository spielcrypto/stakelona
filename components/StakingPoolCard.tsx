import React from "react";
import { StakingPool } from "@/types";
import Card from "./Card";
import Button from "./Button";

interface StakingPoolCardProps {
  pool: StakingPool;
  onStake: (pool: StakingPool) => void;
}

export default function StakingPoolCard({
  pool,
  onStake,
}: StakingPoolCardProps) {
  return (
    <Card hover>
      <div className="flex flex-col h-full">
        <div className="mb-4">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{pool.name}</h3>
          <p className="text-gray-600">{pool.description}</p>
        </div>

        <div className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg p-4 mb-4">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">
              Annual Percentage Yield
            </p>
            <p className="text-4xl font-bold text-primary-600">{pool.apy}%</p>
          </div>
        </div>

        <div className="space-y-2 mb-4 flex-1">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Total Staked:</span>
            <span className="font-bold text-gray-900">
              {pool.totalStaked.toLocaleString()} SOL
            </span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Min Stake:</span>
            <span className="font-medium text-gray-900">
              {pool.minStake} SOL
            </span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Lock Period:</span>
            <span className="font-medium text-gray-900">
              {pool.lockPeriod} days
            </span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Participants:</span>
            <span className="font-medium text-gray-900">
              {pool.participants.toLocaleString()}
            </span>
          </div>
        </div>

        <Button onClick={() => onStake(pool)} className="w-full">
          Stake Now
        </Button>
      </div>
    </Card>
  );
}
