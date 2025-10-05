"use client";

import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useApp } from "@/context/AppContext";
import ServiceCard from "@/components/ServiceCard";
import Modal from "@/components/Modal";
import Button from "@/components/Button";
import { Service } from "@/types";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { connected } = useWallet();
  const {
    services,
    userData,
    addServiceStake,
    useService: consumeService,
  } = useApp();
  const { t } = useTranslation();
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [filterType, setFilterType] = useState<string>("all");

  const filteredServices =
    filterType === "all"
      ? services
      : services.filter((s) => s.type === filterType);

  const handleServiceAction = (service: Service) => {
    setSelectedService(service);
  };

  const handleConsumeService = () => {
    if (!selectedService || !connected) return;

    if (
      selectedService.paymentType === "pay_per_use" &&
      selectedService.pricePerRequest
    ) {
      if (userData.totalRewards >= selectedService.pricePerRequest) {
        consumeService(selectedService.id, selectedService.pricePerRequest);
        alert(
          t("marketplace.serviceUsedSuccess", {
            cost: selectedService.pricePerRequest,
          })
        );
        setSelectedService(null);
      } else {
        alert(t("marketplace.insufficientRewards"));
      }
    }
  };

  const handleStakeForService = () => {
    if (!selectedService || !connected) return;

    if (
      selectedService.paymentType === "stake_duration" &&
      selectedService.stakeAmount &&
      selectedService.stakeDuration
    ) {
      addServiceStake(
        selectedService.id,
        selectedService.stakeAmount,
        selectedService.stakeDuration
      );
      alert(
        t("marketplace.stakedSuccess", {
          amount: selectedService.stakeAmount,
          duration: selectedService.stakeDuration,
        })
      );
      setSelectedService(null);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {t("marketplace.title")}
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          {t("marketplace.description")}
        </p>

        {connected && (
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">
                  {t("marketplace.availableRewards")}
                </p>
                <p className="text-2xl font-bold text-primary-600">
                  {userData.totalRewards.toFixed(4)} {t("common.sol")}
                </p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">
                  {t("marketplace.totalStaked")}
                </p>
                <p className="text-2xl font-bold text-green-600">
                  {userData.totalStaked.toFixed(2)} {t("common.sol")}
                </p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">
                  {t("marketplace.activeServices")}
                </p>
                <p className="text-2xl font-bold text-purple-600">
                  {userData.serviceStakes.length}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {[
            "all",
            "ai_agent",
            "video_content",
            "file_access",
            "event_access",
            "game_access",
          ].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filterType === type
                  ? "bg-primary-600 text-white shadow-md"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              {type === "all"
                ? t("marketplace.allServices")
                : t(`marketplace.${type}`)}
            </button>
          ))}
        </div>
      </div>

      {!connected && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <p className="text-yellow-800">
            <strong>{t("marketplace.connectWallet")}</strong>
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            onAction={handleServiceAction}
            actionLabel={
              connected
                ? t("marketplace.accessService")
                : t("marketplace.viewDetails")
            }
          />
        ))}
      </div>

      {selectedService && (
        <Modal
          isOpen={!!selectedService}
          onClose={() => setSelectedService(null)}
          title={selectedService.name}
        >
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {t("marketplace.description_label")}
              </h3>
              <p className="text-gray-600">{selectedService.description}</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {t("marketplace.provider")}
              </h3>
              <p className="text-gray-600">{selectedService.provider}</p>
              <p className="text-sm text-gray-500">
                {selectedService.providerAddress}
              </p>
            </div>

            {selectedService.paymentType === "pay_per_use" && (
              <div className="bg-primary-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">
                  {t("marketplace.payPerUse")}
                </h3>
                <p className="text-2xl font-bold text-primary-600 mb-2">
                  {selectedService.pricePerRequest} {t("common.sol")}{" "}
                  {t("marketplace.perRequest")}
                </p>
                <p className="text-sm text-gray-600">
                  {t("marketplace.yourRewards")}:{" "}
                  {userData.totalRewards.toFixed(4)} {t("common.sol")}
                </p>
              </div>
            )}

            {selectedService.paymentType === "stake_duration" && (
              <div className="bg-primary-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">
                  {t("marketplace.stakeToAccess")}
                </h3>
                <p className="text-lg mb-2">
                  <span className="font-bold text-primary-600">
                    {selectedService.stakeAmount} {t("common.sol")}
                  </span>{" "}
                  {t("marketplace.for")}{" "}
                  <span className="font-bold text-gray-900">
                    {selectedService.stakeDuration} {t("common.days")}
                  </span>
                </p>
                <p className="text-sm text-gray-600">
                  {t("marketplace.tokensLocked")}
                </p>
              </div>
            )}

            <div className="flex gap-3 pt-4">
              {selectedService.paymentType === "pay_per_use" && (
                <Button
                  onClick={handleConsumeService}
                  className="flex-1"
                  disabled={
                    !connected ||
                    userData.totalRewards <
                      (selectedService.pricePerRequest || 0)
                  }
                >
                  {t("marketplace.useService")} (
                  {selectedService.pricePerRequest} {t("common.sol")})
                </Button>
              )}
              {selectedService.paymentType === "stake_duration" && (
                <Button
                  onClick={handleStakeForService}
                  className="flex-1"
                  disabled={!connected}
                >
                  {t("marketplace.stakeAndAccess")}
                </Button>
              )}
              <Button
                variant="outline"
                onClick={() => setSelectedService(null)}
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
