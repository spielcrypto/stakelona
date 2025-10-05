import React from "react";
import { Service } from "@/types";
import Card from "./Card";
import Button from "./Button";

interface ServiceCardProps {
  service: Service;
  onAction: (service: Service) => void;
  actionLabel?: string;
}

const serviceTypeLabels: Record<Service["type"], string> = {
  ai_agent: "AI Agent",
  video_content: "Video Content",
  file_access: "File Access",
  event_access: "Event Access",
  game_access: "Game Access",
};

const serviceTypeColors: Record<Service["type"], string> = {
  ai_agent: "bg-purple-100 text-purple-800",
  video_content: "bg-red-100 text-red-800",
  file_access: "bg-blue-100 text-blue-800",
  event_access: "bg-green-100 text-green-800",
  game_access: "bg-yellow-100 text-yellow-800",
};

export default function ServiceCard({
  service,
  onAction,
  actionLabel = "View Details",
}: ServiceCardProps) {
  return (
    <Card hover>
      <div className="flex flex-col h-full">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-900 flex-1">
            {service.name}
          </h3>
          <span
            className={`px-2 py-1 text-xs font-semibold rounded-full ${
              serviceTypeColors[service.type]
            }`}
          >
            {serviceTypeLabels[service.type]}
          </span>
        </div>

        <p className="text-gray-600 mb-4 flex-1 line-clamp-2">
          {service.description}
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Provider:</span>
            <span className="font-medium text-gray-900">
              {service.provider}
            </span>
          </div>

          {service.paymentType === "pay_per_use" && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Price per use:</span>
              <span className="font-bold text-primary-600">
                {service.pricePerRequest} SOL
              </span>
            </div>
          )}

          {service.paymentType === "stake_duration" && (
            <>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Stake Amount:</span>
                <span className="font-bold text-primary-600">
                  {service.stakeAmount} SOL
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Duration:</span>
                <span className="font-medium text-gray-900">
                  {service.stakeDuration} days
                </span>
              </div>
            </>
          )}

          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Users:</span>
            <span className="font-medium text-gray-900">
              {service.totalUsers.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Rating:</span>
            <span className="font-medium text-yellow-600">
              ★ {service.rating.toFixed(1)}
            </span>
          </div>
        </div>

        <Button onClick={() => onAction(service)} className="w-full">
          {actionLabel}
        </Button>
      </div>
    </Card>
  );
}
