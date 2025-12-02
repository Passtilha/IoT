import React, { useState, useEffect, useCallback, useRef } from "react";
import { SensorCard } from "./components/SensorCard";
import { DoorPanel } from "./components/DoorPanel";
import { EventLog } from "./components/EventLog";
import { Button } from "./components/ui/button";
import { Badge } from "./components/ui/badge";
import { User, ShieldAlert, RefreshCw, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";

const API_BASE_URL =
  (import.meta as ImportMeta & { env: { VITE_API_URL?: string } }).env.VITE_API_URL ??
  "http://localhost:3000";

interface LogEntry {
  timestamp: string;
  presence: number;
  obstruction: number;
  doorStatus: string;
}

export default function App() {
  const [presenceSensor, setPresenceSensor] = useState(0);
  const [obstructionSensor, setObstructionSensor] = useState(0);
  const [doorOpen, setDoorOpen] = useState(true);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const isSyncingRef = useRef(false);
  const presenceRef = useRef(presenceSensor);
  const obstructionRef = useRef(obstructionSensor);

  useEffect(() => {
    presenceRef.current = presenceSensor;
  }, [presenceSensor]);

  useEffect(() => {
    obstructionRef.current = obstructionSensor;
  }, [obstructionSensor]);

  const processReading = useCallback(async () => {
    if (isSyncingRef.current) return false;
    isSyncingRef.current = true;
    const now = new Date();
    const timestamp = now.toLocaleTimeString("pt-BR");
    const currentPresence = presenceRef.current;
    const currentObstruction = obstructionRef.current;
    try {
      const response = await fetch(`${API_BASE_URL}/sensores`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          presenca: currentPresence,
          obstrucao: currentObstruction,
        }),
      });

      if (!response.ok) {
        throw new Error("Falha ao comunicar com o servidor IoT.");
      }

      const data = (await response.json()) as { porta: number };
      const isDoorOpen = data.porta === 1;
      setDoorOpen(isDoorOpen);

      setLogs((prev) => [
        {
          timestamp,
          presence: currentPresence,
          obstruction: currentObstruction,
          doorStatus: isDoorOpen ? "ABERTA" : "FECHADA",
        },
        ...prev.slice(0, 4),
      ]);
      return true;
    } catch (error) {
      console.error(error);
      toast.error("Não foi possível sincronizar com o servidor IoT.");
      return false;
    } finally {
      isSyncingRef.current = false;
    }
  }, []);

  // Atualização automática a cada 2 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      void processReading();
    }, 2000);

    return () => clearInterval(interval);
  }, [processReading]);

  const handleSendToBackend = () => {
    setShowFeedback(true);
    void processReading().then((success) => {
      if (success) {
        toast.success("Dados enviados para o back-end!", {
          description: `Presença: ${presenceRef.current} | Obstrução: ${obstructionRef.current}`,
        });
      }

      setTimeout(() => {
        setShowFeedback(false);
      }, 2000);
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Cabeçalho */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="mb-2">Protótipo IoT – Controle de Porta de Elevador</h1>
          <p className="text-gray-600">
            Simulação de sensores e porta automatizada para integração front/back
          </p>
        </motion.div>

        {/* Layout Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Sensor de Presença */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <SensorCard
              title="Sensor de Presença"
              icon={User}
              value={presenceSensor}
              onToggle={() => setPresenceSensor(presenceSensor === 0 ? 1 : 0)}
              isActive={presenceSensor === 1}
            />
          </motion.div>

          {/* Painel da Porta */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <DoorPanel isOpen={doorOpen} />
          </motion.div>

          {/* Sensor de Obstrução */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <SensorCard
              title="Sensor de Obstrução"
              icon={ShieldAlert}
              value={obstructionSensor}
              onToggle={() =>
                setObstructionSensor(obstructionSensor === 0 ? 1 : 0)
              }
              isActive={obstructionSensor === 1}
            />
          </motion.div>
        </div>

        {/* Botão de Envio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center mb-6"
        >
          <div className="relative">
            <Button
              onClick={handleSendToBackend}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 rounded-xl px-8 cursor-pointer"
            >
              <RefreshCw className="mr-2" size={20} />
              Enviar para Back-end
            </Button>
            
            <AnimatePresence>
              {showFeedback && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap"
                >
                  <Badge className="bg-green-500 text-white px-4 py-2">
                    <CheckCircle2 className="mr-2" size={16} />
                    Dados enviados!
                  </Badge>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Log de Eventos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <EventLog logs={logs} />
        </motion.div>

        {/* Rodapé */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center border-t border-gray-300 pt-6"
        >
          <p className="text-gray-700 mb-1">
            Integrantes: Jorge Orcelli Mutran, Kaick Kenithi Nishiya, Lucas Quinto Roli, Lucas Prado, Lucas Kobayashi, Matheus Pestilli Rodrigues João
          </p>
          <p className="text-gray-600">Disciplina: IoT</p>
          <p className="text-gray-600 mt-1">Professor: Claudio Alexandre Gananca</p>
        </motion.footer>
      </div>
    </div>
  );
}
