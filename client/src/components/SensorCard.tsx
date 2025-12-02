import { motion } from "motion/react";
import { Card } from "./ui/card";
import { Switch } from "./ui/switch";
import { LucideIcon } from "lucide-react";

interface SensorCardProps {
  title: string;
  icon: LucideIcon;
  value: number;
  onToggle: () => void;
  isActive: boolean;
}

export function SensorCard({ title, icon: Icon, value, onToggle, isActive }: SensorCardProps) {
  return (
    <motion.div
      animate={{
        scale: isActive ? 1.02 : 1,
      }}
      transition={{ duration: 0.3 }}
    >
      <Card
        className={`p-6 rounded-2xl transition-all duration-300 ${
          isActive
            ? title.includes("Presença")
              ? "bg-green-50 border-green-300"
              : title.includes("Obstrução")
              ? "bg-yellow-50 border-yellow-300"
              : "bg-blue-50 border-blue-300"
            : "bg-white border-gray-200"
        }`}
      >
        <div className="flex flex-col items-center space-y-4">
          <div
            className={`p-4 rounded-full transition-colors duration-300 ${
              isActive
                ? title.includes("Presença")
                  ? "bg-green-200"
                  : title.includes("Obstrução")
                  ? "bg-yellow-200"
                  : "bg-blue-200"
                : "bg-gray-100"
            }`}
          >
            <Icon
              size={32}
              className={
                isActive
                  ? title.includes("Presença")
                    ? "text-green-700"
                    : title.includes("Obstrução")
                    ? "text-yellow-700"
                    : "text-blue-700"
                  : "text-gray-500"
              }
            />
          </div>
          
          <h3 className="text-center">{title}</h3>
          
          <div className="flex items-center space-x-3 cursor-pointer">
            <span className="text-gray-600">OFF</span>
            <Switch checked={value === 1} onCheckedChange={onToggle} />
            <span className="text-gray-600">ON</span>
          </div>
          
          <div className="px-4 py-2 bg-gray-100 rounded-lg">
            <span className="font-mono">Valor: {value}</span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
