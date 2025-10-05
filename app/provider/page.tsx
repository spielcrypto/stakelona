"use client";

import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useApp } from "@/context/AppContext";
import Card from "@/components/Card";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import { ServiceType, PaymentType } from "@/types";
import { useTranslation } from "react-i18next";

export default function ProviderPage() {
  const { connected, publicKey } = useWallet();
  const { registerService, getProviderServices } = useApp();
  const { t } = useTranslation();
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  // Form state
  const [serviceName, setServiceName] = useState("");
  const [description, setDescription] = useState("");
  const [serviceType, setServiceType] = useState<ServiceType>("ai_agent");
  const [paymentType, setPaymentType] = useState<PaymentType>("pay_per_use");
  const [pricePerRequest, setPricePerRequest] = useState("");
  const [stakeAmount, setStakeAmount] = useState("");
  const [stakeDuration, setStakeDuration] = useState("");

  const providerServices =
    connected && publicKey
      ? getProviderServices(
          publicKey.toBase58().slice(0, 4) +
            "..." +
            publicKey.toBase58().slice(-4)
        )
      : [];

  const handleRegisterService = () => {
    if (!connected || !publicKey) {
      alert(t("provider.connectWalletFirst"));
      return;
    }

    if (!serviceName || !description) {
      alert(t("provider.fillAllFields"));
      return;
    }

    if (paymentType === "pay_per_use" && !pricePerRequest) {
      alert(t("provider.setPricePerRequest"));
      return;
    }

    if (paymentType === "stake_duration" && (!stakeAmount || !stakeDuration)) {
      alert(t("provider.setStakeAmountDuration"));
      return;
    }

    const newService = {
      name: serviceName,
      description,
      type: serviceType,
      provider: "Your Service",
      providerAddress:
        publicKey.toBase58().slice(0, 4) +
        "..." +
        publicKey.toBase58().slice(-4),
      paymentType,
      ...(paymentType === "pay_per_use" && {
        pricePerRequest: parseFloat(pricePerRequest),
      }),
      ...(paymentType === "stake_duration" && {
        stakeAmount: parseFloat(stakeAmount),
        stakeDuration: parseInt(stakeDuration),
      }),
    };

    registerService(newService);
    alert(t("provider.serviceRegisteredSuccess"));

    // Reset form
    setServiceName("");
    setDescription("");
    setServiceType("ai_agent");
    setPaymentType("pay_per_use");
    setPricePerRequest("");
    setStakeAmount("");
    setStakeDuration("");
    setShowRegisterModal(false);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {t("provider.title")}
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          {t("provider.description")}
        </p>

        {!connected && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <p className="text-yellow-800">
              <strong>{t("provider.connectWallet")}</strong>
            </p>
          </div>
        )}

        {connected && (
          <div className="bg-gradient-to-r from-purple-600 to-purple-400 rounded-xl shadow-lg p-6 text-white mb-8">
            <h2 className="text-2xl font-bold mb-4">
              {t("provider.benefitsTitle")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white bg-opacity-20 rounded-lg p-4">
                <div className="text-3xl mb-2">💎</div>
                <h3 className="font-semibold mb-2">
                  {t("provider.benefit1Title")}
                </h3>
                <p className="text-sm opacity-90">
                  {t("provider.benefit1Desc")}
                </p>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-4">
                <div className="text-3xl mb-2">🔒</div>
                <h3 className="font-semibold mb-2">
                  {t("provider.benefit2Title")}
                </h3>
                <p className="text-sm opacity-90">
                  {t("provider.benefit2Desc")}
                </p>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-4">
                <div className="text-3xl mb-2">📈</div>
                <h3 className="font-semibold mb-2">
                  {t("provider.benefit3Title")}
                </h3>
                <p className="text-sm opacity-90">
                  {t("provider.benefit3Desc")}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {t("provider.yourServices")}
        </h2>
        {connected && (
          <Button onClick={() => setShowRegisterModal(true)}>
            + {t("provider.registerNewService")}
          </Button>
        )}
      </div>

      {connected && providerServices.length === 0 && (
        <Card>
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {t("provider.noServicesYet")}
            </h3>
            <p className="text-gray-600 mb-4">{t("provider.noServicesDesc")}</p>
            <Button onClick={() => setShowRegisterModal(true)}>
              {t("provider.registerService")}
            </Button>
          </div>
        </Card>
      )}

      {connected && providerServices.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {providerServices.map((service) => (
            <Card key={service.id}>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {service.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {service.type.replace("_", " ").toUpperCase()}
                  </p>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-semibold rounded-full">
                  {t("provider.active")}
                </span>
              </div>

              <p className="text-gray-600 mb-4">{service.description}</p>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-600 mb-1">
                    {t("provider.totalUsers")}
                  </p>
                  <p className="text-lg font-bold text-gray-900">
                    {service.totalUsers}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-600 mb-1">
                    {t("provider.rating")}
                  </p>
                  <p className="text-lg font-bold text-yellow-600">
                    ★ {service.rating.toFixed(1)}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-600 mb-1">
                    {t("provider.revenue")}
                  </p>
                  <p className="text-lg font-bold text-primary-600">
                    {service.revenue.toFixed(2)} {t("common.sol")}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-600 mb-1">
                    {t("provider.activeSubs")}
                  </p>
                  <p className="text-lg font-bold text-green-600">
                    {service.activeSubscriptions}
                  </p>
                </div>
              </div>

              {service.paymentType === "pay_per_use" && (
                <div className="bg-primary-50 rounded-lg p-3">
                  <p className="text-sm text-gray-600">
                    {t("provider.pricePerRequest")}
                  </p>
                  <p className="text-lg font-bold text-primary-600">
                    {service.pricePerRequest} {t("common.sol")}
                  </p>
                </div>
              )}

              {service.paymentType === "stake_duration" && (
                <div className="bg-primary-50 rounded-lg p-3">
                  <p className="text-sm text-gray-600">
                    {t("provider.subscriptionModel")}
                  </p>
                  <p className="text-lg font-bold text-primary-600">
                    {service.stakeAmount} SOL / {service.stakeDuration} days
                  </p>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}

      {showRegisterModal && (
        <Modal
          isOpen={showRegisterModal}
          onClose={() => setShowRegisterModal(false)}
          title={t("provider.registerNewService")}
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t("provider.serviceName")} *
              </label>
              <input
                type="text"
                value={serviceName}
                onChange={(e) => setServiceName(e.target.value)}
                placeholder={t("provider.serviceNamePlaceholder")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t("provider.descriptionLabel")} *
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={t("provider.descriptionPlaceholder")}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t("provider.serviceType")} *
              </label>
              <select
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value as ServiceType)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="ai_agent">{t("provider.aiAgent")}</option>
                <option value="video_content">
                  {t("provider.videoContent")}
                </option>
                <option value="file_access">{t("provider.fileAccess")}</option>
                <option value="event_access">
                  {t("provider.eventAccess")}
                </option>
                <option value="game_access">{t("provider.gameAccess")}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t("provider.paymentModel")} *
              </label>
              <select
                value={paymentType}
                onChange={(e) => setPaymentType(e.target.value as PaymentType)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="pay_per_use">{t("provider.payPerUse")}</option>
                <option value="stake_duration">
                  {t("provider.stakeDuration")}
                </option>
              </select>
            </div>

            {paymentType === "pay_per_use" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("provider.pricePerRequestLabel")} *
                </label>
                <input
                  type="number"
                  value={pricePerRequest}
                  onChange={(e) => setPricePerRequest(e.target.value)}
                  placeholder={t("provider.pricePerRequestPlaceholder")}
                  step="0.01"
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            )}

            {paymentType === "stake_duration" && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("provider.stakeAmountLabel")} *
                  </label>
                  <input
                    type="number"
                    value={stakeAmount}
                    onChange={(e) => setStakeAmount(e.target.value)}
                    placeholder={t("provider.stakeAmountPlaceholder")}
                    step="0.1"
                    min="0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("provider.durationLabel")} *
                  </label>
                  <input
                    type="number"
                    value={stakeDuration}
                    onChange={(e) => setStakeDuration(e.target.value)}
                    placeholder={t("provider.durationPlaceholder")}
                    min="1"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </>
            )}

            <div className="flex gap-3 pt-4">
              <Button onClick={handleRegisterService} className="flex-1">
                {t("provider.registerService")}
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowRegisterModal(false)}
                className="flex-1"
              >
                {t("provider.cancel")}
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
