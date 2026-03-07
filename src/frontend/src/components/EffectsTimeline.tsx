import { cn } from "@/lib/utils";
import React, { useState, useEffect } from "react";
import type { GoodEffect, SideEffect } from "../backend.d";

interface TimelineEvent {
  type: "good" | "side";
  description: string;
  timeMinutes: number;
}

interface EffectsTimelineProps {
  goodEffects: GoodEffect[];
  sideEffects: SideEffect[];
  medicineName: string;
  autoPlay?: boolean;
  onComplete?: () => void;
  className?: string;
}

function formatTime(minutes: number): string {
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
}

export function EffectsTimeline({
  goodEffects,
  sideEffects,
  medicineName,
  autoPlay = false,
  onComplete,
  className,
}: EffectsTimelineProps) {
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [activeEvents, setActiveEvents] = useState<Set<number>>(new Set());

  const allEvents: TimelineEvent[] = [
    ...goodEffects.map((e) => ({
      type: "good" as const,
      description: e.description,
      timeMinutes: Number(e.timeMinutes),
    })),
    ...sideEffects.map((e) => ({
      type: "side" as const,
      description: e.description,
      timeMinutes: Number(e.timeMinutes),
    })),
  ].sort((a, b) => a.timeMinutes - b.timeMinutes);

  const maxTime =
    allEvents.length > 0
      ? Math.max(...allEvents.map((e) => e.timeMinutes), 60)
      : 4320; // 72 hours in minutes

  useEffect(() => {
    if (!isPlaying) return;

    const duration = 8000; // 8 seconds for full timeline
    const interval = 50;
    const step = (interval / duration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const newProgress = Math.min(prev + step, 100);
        if (newProgress >= 100) {
          setIsPlaying(false);
          onComplete?.();
          clearInterval(timer);
        }
        return newProgress;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [isPlaying, onComplete]);

  useEffect(() => {
    const currentTimeMinutes = (progress / 100) * maxTime;
    const newActive = new Set<number>();
    allEvents.forEach((event, idx) => {
      if (event.timeMinutes <= currentTimeMinutes) {
        newActive.add(idx);
      }
    });
    setActiveEvents(newActive);
  }, [progress, allEvents, maxTime]);

  const getEventPosition = (timeMinutes: number) =>
    (timeMinutes / maxTime) * 100;

  const timeLabels = [0, 1, 6, 12, 24, 48, 72].filter(
    (h) => h * 60 <= maxTime + 60,
  );

  return (
    <div
      className={cn("rounded-2xl border border-border bg-card p-6", className)}
    >
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="font-display text-lg font-bold text-foreground">
            Effects Timeline
          </h3>
          <p className="text-sm text-muted-foreground">
            {medicineName} — Effect timeline (simulated)
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            if (progress >= 100) {
              setProgress(0);
              setActiveEvents(new Set());
              setIsPlaying(true);
            } else {
              setIsPlaying((p) => !p);
            }
          }}
          className={cn(
            "rounded-lg px-4 py-2 text-sm font-semibold transition-all",
            isPlaying
              ? "bg-destructive/10 text-destructive hover:bg-destructive/20"
              : "bg-primary/10 text-primary hover:bg-primary/20",
          )}
        >
          {isPlaying ? "⏸ Pause" : progress >= 100 ? "↺ Replay" : "▶ Play"}
        </button>
      </div>

      {/* Timeline bar */}
      <div className="relative mb-8">
        {/* Background */}
        <div className="relative h-6 overflow-hidden rounded-full bg-muted">
          {/* Progress fill */}
          <div
            className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-primary/60 to-primary transition-all duration-100"
            style={{ width: `${progress}%` }}
          />

          {/* Event markers */}
          {allEvents.map((event, idx) => (
            <div
              key={`marker-${event.type}-${event.timeMinutes}-${idx}`}
              className={cn(
                "absolute top-1/2 -translate-y-1/2 transition-all duration-300",
                "h-4 w-4 rounded-full border-2 border-white",
                activeEvents.has(idx)
                  ? event.type === "good"
                    ? "bg-success scale-125"
                    : "bg-destructive scale-125"
                  : event.type === "good"
                    ? "bg-success/40"
                    : "bg-destructive/40",
              )}
              style={{
                left: `calc(${getEventPosition(event.timeMinutes)}% - 8px)`,
                zIndex: 10,
              }}
            />
          ))}
        </div>

        {/* Time labels */}
        <div className="relative mt-2 h-5">
          {timeLabels.map((h) => (
            <div
              key={h}
              className="absolute -translate-x-1/2 text-xs text-muted-foreground"
              style={{ left: `${((h * 60) / maxTime) * 100}%` }}
            >
              {h === 0 ? "0" : `${h}h`}
            </div>
          ))}
        </div>
      </div>

      {/* Events list */}
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Effects Detail
        </p>
        {allEvents.length === 0 && (
          <p className="text-sm text-muted-foreground">
            No effects data available
          </p>
        )}
        <div className="grid gap-2 sm:grid-cols-2">
          {allEvents.map((event, idx) => (
            <div
              key={`event-${event.type}-${event.timeMinutes}-${idx}`}
              className={cn(
                "flex items-start gap-3 rounded-xl border p-3 transition-all duration-300",
                activeEvents.has(idx)
                  ? event.type === "good"
                    ? "border-success/40 bg-success/10"
                    : "border-destructive/40 bg-destructive/10"
                  : "border-border/50 bg-muted/30 opacity-50",
              )}
            >
              <div
                className={cn(
                  "mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-sm",
                  event.type === "good"
                    ? "bg-success/20 text-success"
                    : "bg-destructive/20 text-destructive",
                )}
              >
                {event.type === "good" ? "✓" : "⚠"}
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className={cn(
                    "text-sm font-medium",
                    event.type === "good" ? "text-success" : "text-destructive",
                  )}
                >
                  {event.description}
                </p>
                <p className="text-xs text-muted-foreground">
                  At {formatTime(event.timeMinutes)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="mt-4 flex gap-4 rounded-xl bg-muted/40 p-3 text-sm">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-success" />
          <span className="text-muted-foreground">
            {goodEffects.length} good effect
            {goodEffects.length !== 1 ? "s" : ""}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-destructive" />
          <span className="text-muted-foreground">
            {sideEffects.length} side effect
            {sideEffects.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>
    </div>
  );
}

export default EffectsTimeline;
