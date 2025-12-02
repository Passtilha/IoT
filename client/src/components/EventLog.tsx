import { ScrollArea } from "./ui/scroll-area";
import { Card } from "./ui/card";
import { Terminal } from "lucide-react";

interface LogEntry {
  timestamp: string;
  presence: number;
  obstruction: number;
  doorStatus: string;
}

interface EventLogProps {
  logs: LogEntry[];
}

export function EventLog({ logs }: EventLogProps) {
  return (
    <Card className="p-6 rounded-2xl bg-gray-900">
      <div className="flex items-center space-x-2 mb-4">
        <Terminal size={20} className="text-green-400" />
        <h3 className="text-white">Log de Eventos</h3>
      </div>
      
      <ScrollArea className="h-32">
        <div className="space-y-2 font-mono text-sm">
          {logs.length === 0 ? (
            <p className="text-gray-500">Aguardando eventos...</p>
          ) : (
            logs.map((log, index) => (
              <div
                key={index}
                className="text-green-400 bg-gray-800 px-3 py-2 rounded"
              >
                [{log.timestamp}] Presença={log.presence} | Obstrução=
                {log.obstruction} | Porta {log.doorStatus}
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </Card>
  );
}
