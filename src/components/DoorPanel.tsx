import { motion } from "motion/react";
import { Card } from "./ui/card";
import { DoorOpen, DoorClosed, ArrowLeftRight } from "lucide-react";

interface DoorPanelProps {
  isOpen: boolean;
}

export function DoorPanel({ isOpen }: DoorPanelProps) {
  return (
    <Card className="p-8 rounded-2xl">
      <div className="flex flex-col items-center space-y-6">
        <div
          className={`relative p-8 rounded-full transition-all duration-500 ${
            isOpen ? "bg-green-100" : "bg-red-100"
          }`}
        >
          {isOpen ? (
            <DoorOpen size={80} className="text-green-600" />
          ) : (
            <DoorClosed size={80} className="text-red-600" />
          )}
          
          {!isOpen && (
            <motion.div
              className="absolute -right-2 top-1/2 -translate-y-1/2"
              animate={{ x: [0, -10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowLeftRight size={24} className="text-red-400" />
            </motion.div>
          )}
        </div>

        <motion.div
          key={isOpen ? "open" : "closed"}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className={`px-8 py-4 rounded-xl ${
            isOpen ? "bg-green-500" : "bg-red-500"
          }`}
        >
          <h2 className="text-white text-center">
            {isOpen ? "Porta Aberta" : "Porta Fechada"}
          </h2>
        </motion.div>

        <div className="flex items-center space-x-2 text-gray-500">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-3 h-3 border-2 border-gray-400 border-t-transparent rounded-full" />
          </motion.div>
          <span className="text-sm">Atualizando leitura a cada 2 segundos...</span>
        </div>
      </div>
    </Card>
  );
}
