import { WifiOff } from "lucide-react";
import { useEffect, useState } from "react";

export function OfflineIndicator() {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const onOnline = () => {
      setIsOffline(false);
      try {
        const queued = JSON.parse(
          localStorage.getItem("medsim_offline_scores") || "[]",
        );
        if (queued.length > 0) {
          const lb = JSON.parse(
            localStorage.getItem("medsim_leaderboard") || "[]",
          );
          for (const entry of queued as Array<{ id: string; points: number }>) {
            const idx = lb.findIndex((e: { id: string }) => e.id === entry.id);
            if (idx >= 0) lb[idx].points += entry.points;
            else lb.push(entry);
          }
          localStorage.setItem("medsim_leaderboard", JSON.stringify(lb));
          localStorage.removeItem("medsim_offline_scores");
        }
      } catch {}
    };
    const onOffline = () => setIsOffline(true);
    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);
    return () => {
      window.removeEventListener("online", onOnline);
      window.removeEventListener("offline", onOffline);
    };
  }, []);

  if (!isOffline) return null;

  return (
    <div
      className="flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold"
      style={{
        background: "rgba(217,119,6,0.2)",
        border: "1px solid rgba(217,119,6,0.5)",
        color: "#f59e0b",
      }}
      data-ocid="nav.offline_indicator"
    >
      <WifiOff className="h-3 w-3" />
      <span>Offline</span>
    </div>
  );
}
