"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { useApp } from "@/context/AppContext";
import Card from "@/components/Card";
import { useTranslation } from "react-i18next";

export default function DashboardPage() {
  const { connected } = useWallet();
  const { userData } = useApp();
  const { t } = useTranslation();

  if (!connected) {
    return (
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {t("dashboard.title")}
        </h1>
        <Card>
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔌</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {t("dashboard.walletNotConnected")}
            </h3>
            <p className="text-gray-600">{t("dashboard.connectWalletDesc")}</p>
          </div>
        </Card>
      </div>
    );
  }

  const totalSpent = userData.serviceUsage.reduce(
    (sum, usage) => sum + usage.cost,
    0
  );

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {t("dashboard.title")}
        </h1>
        <p className="text-lg text-gray-600">{t("dashboard.description")}</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">
              {t("dashboard.totalStaked")}
            </p>
            <p className="text-3xl font-bold text-primary-600">
              {userData.totalStaked.toFixed(2)}
            </p>
            <p className="text-sm text-gray-500 mt-1">{t("common.sol")}</p>
          </div>
        </Card>

        <Card>
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">
              {t("dashboard.totalRewards")}
            </p>
            <p className="text-3xl font-bold text-green-600">
              {userData.totalRewards.toFixed(4)}
            </p>
            <p className="text-sm text-gray-500 mt-1">{t("common.sol")}</p>
          </div>
        </Card>

        <Card>
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">
              {t("dashboard.totalSpent")}
            </p>
            <p className="text-3xl font-bold text-orange-600">
              {totalSpent.toFixed(4)}
            </p>
            <p className="text-sm text-gray-500 mt-1">{t("common.sol")}</p>
          </div>
        </Card>

        <Card>
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">
              {t("dashboard.activeStakes")}
            </p>
            <p className="text-3xl font-bold text-purple-600">
              {
                userData.activeStakes.filter((s) => s.status === "active")
                  .length
              }
            </p>
            <p className="text-sm text-gray-500 mt-1">{t("dashboard.pools")}</p>
          </div>
        </Card>
      </div>

      {/* Active Pool Stakes */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {t("dashboard.activePoolStakesTitle")}
        </h2>

        {userData.activeStakes.length === 0 ? (
          <Card>
            <div className="text-center py-8">
              <div className="text-4xl mb-2">💰</div>
              <p className="text-gray-600">{t("dashboard.noActiveStakes")}</p>
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {userData.activeStakes.map((stake) => (
              <Card key={stake.id}>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {stake.poolName}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {t("dashboard.poolStake")}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 text-sm font-semibold rounded-full ${
                      stake.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {t(`dashboard.${stake.status}`)}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      {t("dashboard.stakedAmount")}:
                    </span>
                    <span className="font-bold text-primary-600">
                      {stake.amount.toFixed(2)} {t("common.sol")}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      {t("dashboard.rewardsEarned")}:
                    </span>
                    <span className="font-bold text-green-600">
                      {stake.rewards.toFixed(4)} {t("common.sol")}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {t("dashboard.startDate")}:
                    </span>
                    <span className="font-medium">
                      {stake.startDate.toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {t("dashboard.endDate")}:
                    </span>
                    <span className="font-medium">
                      {stake.endDate.toLocaleDateString()}
                    </span>
                  </div>

                  <div className="mt-4 bg-gray-50 rounded-lg p-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        {t("dashboard.timeRemaining")}:
                      </span>
                      <span className="text-sm font-medium text-gray-900">
                        {Math.max(
                          0,
                          Math.ceil(
                            (stake.endDate.getTime() - Date.now()) /
                              (1000 * 60 * 60 * 24)
                          )
                        )}{" "}
                        {t("common.days")}
                      </span>
                    </div>
                    <div className="mt-2 bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-primary-600 h-full rounded-full transition-all"
                        style={{
                          width: `${Math.min(
                            100,
                            Math.max(
                              0,
                              ((Date.now() - stake.startDate.getTime()) /
                                (stake.endDate.getTime() -
                                  stake.startDate.getTime())) *
                                100
                            )
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Service Stakes */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {t("dashboard.serviceSubscriptionsTitle")}
        </h2>

        {userData.serviceStakes.length === 0 ? (
          <Card>
            <div className="text-center py-8">
              <div className="text-4xl mb-2">📦</div>
              <p className="text-gray-600">
                {t("dashboard.noActiveSubscriptions")}
              </p>
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {userData.serviceStakes.map((stake) => (
              <Card key={stake.id}>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {stake.serviceName}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {t("dashboard.serviceSubscription")}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 text-sm font-semibold rounded-full ${
                      stake.status === "active"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {t(`dashboard.${stake.status}`)}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      {t("dashboard.stakedAmount")}:
                    </span>
                    <span className="font-bold text-primary-600">
                      {stake.amount.toFixed(2)} {t("common.sol")}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {t("dashboard.startDate")}:
                    </span>
                    <span className="font-medium">
                      {stake.startDate.toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {t("dashboard.endDate")}:
                    </span>
                    <span className="font-medium">
                      {stake.endDate.toLocaleDateString()}
                    </span>
                  </div>

                  <div className="mt-4 bg-blue-50 rounded-lg p-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        {t("dashboard.daysRemaining")}:
                      </span>
                      <span className="text-sm font-medium text-gray-900">
                        {Math.max(
                          0,
                          Math.ceil(
                            (stake.endDate.getTime() - Date.now()) /
                              (1000 * 60 * 60 * 24)
                          )
                        )}{" "}
                        {t("common.days")}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Service Usage History */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {t("dashboard.serviceUsageHistoryTitle")}
        </h2>

        {userData.serviceUsage.length === 0 ? (
          <Card>
            <div className="text-center py-8">
              <div className="text-4xl mb-2">📋</div>
              <p className="text-gray-600">{t("dashboard.noUsageHistory")}</p>
            </div>
          </Card>
        ) : (
          <Card>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      {t("dashboard.date")}
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      {t("dashboard.service")}
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      {t("dashboard.cost")}
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      {t("dashboard.paymentMethod")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {userData.serviceUsage.map((usage) => (
                    <tr
                      key={usage.id}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {usage.date.toLocaleDateString()}{" "}
                        {usage.date.toLocaleTimeString()}
                      </td>
                      <td className="py-3 px-4 font-medium text-gray-900">
                        {usage.serviceName}
                      </td>
                      <td className="py-3 px-4 font-bold text-primary-600">
                        {usage.cost.toFixed(4)} {t("common.sol")}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            usage.paymentMethod === "rewards"
                              ? "bg-green-100 text-green-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {t(`dashboard.${usage.paymentMethod}`)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
