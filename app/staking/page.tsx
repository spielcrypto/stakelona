"use client";

import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useApp } from "@/context/AppContext";
import StakingPoolCard from "@/components/StakingPoolCard";
import Modal from "@/components/Modal";
import Button from "@/components/Button";
import { StakingPool } from "@/types";
import { useTranslation } from "react-i18next";

export default function StakingPage() {
  const { connected } = useWallet();
  const { stakingPools, addStakeToPool } = useApp();
  const { t } = useTranslation();
  const [selectedPool, setSelectedPool] = useState<StakingPool | null>(null);
  const [stakeAmount, setStakeAmount] = useState("");

  const handleStake = () => {
    if (!selectedPool || !connected || !stakeAmount) return;

    const amount = parseFloat(stakeAmount);
    if (isNaN(amount) || amount < selectedPool.minStake) {
      alert(t("staking.minimumStake", { amount: selectedPool.minStake }));
      return;
    }

    addStakeToPool(selectedPool.id, amount);
    alert(t("staking.stakedSuccess", { amount, pool: selectedPool.name }));
    setSelectedPool(null);
    setStakeAmount("");
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {t("staking.title")}
        </h1>
        <p className="text-lg text-gray-600 mb-6">{t("staking.description")}</p>

        {!connected && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <p className="text-yellow-800">
              <strong>{t("staking.connectWallet")}</strong>
            </p>
          </div>
        )}

        <div className="bg-gradient-to-r from-primary-600 to-primary-400 rounded-xl shadow-lg p-6 text-white mb-8">
          <h2 className="text-2xl font-bold mb-4">
            {t("staking.howItWorksTitle")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <div className="text-3xl mb-2">1️⃣</div>
              <h3 className="font-semibold mb-2">{t("staking.step1Title")}</h3>
              <p className="text-sm opacity-90">{t("staking.step1Desc")}</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <div className="text-3xl mb-2">2️⃣</div>
              <h3 className="font-semibold mb-2">{t("staking.step2Title")}</h3>
              <p className="text-sm opacity-90">{t("staking.step2Desc")}</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <div className="text-3xl mb-2">3️⃣</div>
              <h3 className="font-semibold mb-2">{t("staking.step3Title")}</h3>
              <p className="text-sm opacity-90">{t("staking.step3Desc")}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stakingPools.map((pool) => (
          <StakingPoolCard
            key={pool.id}
            pool={pool}
            onStake={setSelectedPool}
          />
        ))}
      </div>

      {selectedPool && (
        <Modal
          isOpen={!!selectedPool}
          onClose={() => {
            setSelectedPool(null);
            setStakeAmount("");
          }}
          title={`${t("staking.stakeIn")} ${selectedPool.name}`}
        >
          <div className="space-y-6">
            <div>
              <p className="text-gray-600 mb-4">{selectedPool.description}</p>

              <div className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg p-4 mb-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">{t("staking.apy")}</p>
                    <p className="text-2xl font-bold text-primary-600">
                      {selectedPool.apy}%
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">
                      {t("staking.lockPeriod")}
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {selectedPool.lockPeriod} {t("common.days")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {t("staking.minStake")}:
                  </span>
                  <span className="font-medium">
                    {selectedPool.minStake} {t("common.sol")}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {t("staking.totalStaked")}:
                  </span>
                  <span className="font-medium">
                    {selectedPool.totalStaked.toLocaleString()}{" "}
                    {t("common.sol")}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {t("staking.participants")}:
                  </span>
                  <span className="font-medium">
                    {selectedPool.participants.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t("staking.amountToStake")}
              </label>
              <input
                type="number"
                value={stakeAmount}
                onChange={(e) => setStakeAmount(e.target.value)}
                min={selectedPool.minStake}
                step="0.1"
                placeholder={`${t("staking.minStakeLabel")}: ${
                  selectedPool.minStake
                } ${t("common.sol")}`}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              {stakeAmount &&
                parseFloat(stakeAmount) >= selectedPool.minStake && (
                  <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-sm text-gray-700 mb-2">
                      {t("staking.estimatedRewards")}:
                    </p>
                    <p className="text-xl font-bold text-green-600">
                      {(
                        (((parseFloat(stakeAmount) * selectedPool.apy) / 100) *
                          selectedPool.lockPeriod) /
                        365
                      ).toFixed(4)}{" "}
                      {t("common.sol")}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {t("staking.after")} {selectedPool.lockPeriod}{" "}
                      {t("common.days")}
                    </p>
                  </div>
                )}
            </div>

            <div className="flex gap-3">
              <Button
                onClick={handleStake}
                className="flex-1"
                disabled={
                  !connected ||
                  !stakeAmount ||
                  parseFloat(stakeAmount) < selectedPool.minStake
                }
              >
                {t("staking.confirmStake")}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedPool(null);
                  setStakeAmount("");
                }}
                className="flex-1"
              >
                {t("marketplace.cancel")}
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
