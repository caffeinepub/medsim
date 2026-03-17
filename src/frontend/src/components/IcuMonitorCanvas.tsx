import { useEffect, useRef } from "react";

export interface IcuMonitorCanvasProps {
  heartRate: number;
  spo2: number;
  respirationRate: number;
  pathology: "normal" | "stemi" | "afib";
  frozen: boolean;
  audioEnabled: boolean;
  onAlarmChange?: (active: boolean) => void;
}

const ECG_COLOR = "#00ff41";
const SPO2_COLOR = "#ffff00";
const RESP_COLOR = "#ffffff";
const PIXELS_PER_SECOND = 250;
const ERASER_WIDTH = 14;

function playBeep(
  ctx: AudioContext,
  freq: number,
  duration: number,
  volume = 0.4,
) {
  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration);
  } catch (_e) {
    // ignore
  }
}

function playAlarmBeep(ctx: AudioContext) {
  try {
    const t = ctx.currentTime;
    [440, 880, 440].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.3, t + i * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.001, t + i * 0.12 + 0.1);
      osc.start(t + i * 0.12);
      osc.stop(t + i * 0.12 + 0.11);
    });
  } catch (_e) {}
}

export function IcuMonitorCanvas({
  heartRate,
  spo2,
  respirationRate,
  pathology,
  frozen,
  audioEnabled,
  onAlarmChange,
}: IcuMonitorCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const onAlarmChangeRef = useRef(onAlarmChange);
  onAlarmChangeRef.current = onAlarmChange;

  const stateRef = useRef({
    heartRate,
    spo2,
    respirationRate,
    pathology,
    frozen,
    audioEnabled,
    timeElapsed: 0,
    lastTimestamp: 0,
    lastScanX: 0,
    lastBeepTime: -999,
    lastAlarmBeepTime: -999,
    alarmActive: false,
    afibSeed: Math.random() * 100,
  });

  stateRef.current.heartRate = heartRate;
  stateRef.current.spo2 = spo2;
  stateRef.current.respirationRate = respirationRate;
  stateRef.current.pathology = pathology;
  stateRef.current.frozen = frozen;
  stateRef.current.audioEnabled = audioEnabled;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const audioCtxRef = { current: null as AudioContext | null };
    const getAudioCtx = () => {
      if (!audioCtxRef.current) {
        try {
          audioCtxRef.current = new AudioContext();
        } catch (_e) {}
      }
      return audioCtxRef.current;
    };

    const getSize = () => ({
      W: canvas.width,
      H: canvas.height,
      CH1_H: canvas.height * 0.4,
      CH2_H: canvas.height * 0.3,
    });

    const off = document.createElement("canvas");
    off.width = canvas.width;
    off.height = canvas.height;
    const offCtx = off.getContext("2d")!;
    offCtx.fillStyle = "#000000";
    offCtx.fillRect(0, 0, off.width, off.height);

    const s = stateRef.current;

    const ecgY = (t: number, channelMid: number, channelH: number): number => {
      const hr = s.heartRate;
      let rrBase = 60 / hr;
      if (s.pathology === "afib") {
        const jitter =
          0.18 * Math.sin(t * 2.3 + s.afibSeed) +
          0.1 * Math.sin(t * 5.1 + s.afibSeed * 0.7);
        rrBase = Math.max(0.3, rrBase * (1 + jitter));
      }
      const phase = (t % rrBase) / rrBase;
      const amp = channelH * 0.38;
      const mid = channelMid;
      let y = mid;

      if (s.pathology === "afib") {
        y +=
          Math.sin(t * 47.3 + s.afibSeed) * channelH * 0.015 +
          Math.sin(t * 83.7 + s.afibSeed) * channelH * 0.01;
        if (phase < 0.22) return y;
      } else {
        if (phase < 0.08) return mid;
        if (phase < 0.14) {
          const tp = (phase - 0.08) / 0.06;
          return mid - Math.sin(Math.PI * tp) * amp * 0.15;
        }
        if (phase < 0.22) return mid;
      }

      if (phase < 0.25) {
        const tp = (phase - 0.22) / 0.03;
        y = mid + Math.sin(Math.PI * tp) * amp * 0.12;
      } else if (phase < 0.3) {
        const tp = (phase - 0.25) / 0.05;
        y = mid - Math.sin(Math.PI * tp) * amp * 0.95;
      } else if (phase < 0.33) {
        const tp = (phase - 0.3) / 0.03;
        y = mid + Math.sin(Math.PI * tp) * amp * 0.18;
      } else if (phase < 0.42) {
        const stElev = s.pathology === "stemi" ? -amp * 0.22 : 0;
        y = mid + stElev;
      } else if (phase < 0.62) {
        const tp = (phase - 0.42) / 0.2;
        const tH = s.pathology === "stemi" ? amp * 0.45 : amp * 0.22;
        y = mid - Math.sin(Math.PI * tp) * tH;
      } else {
        y = mid;
      }
      return (
        y +
        (s.pathology === "afib"
          ? Math.sin(t * 47.3 + s.afibSeed) * channelH * 0.015
          : 0)
      );
    };

    const spo2Y = (t: number, channelMid: number, channelH: number): number => {
      const period = 60 / s.heartRate;
      const phase = (t % period) / period;
      const amp = channelH * 0.35 * Math.max(0.15, (s.spo2 - 70) / 35);
      const mid = channelMid;
      if (phase < 0.35) {
        const sinVal = Math.sin((Math.PI * phase) / 0.35);
        return mid - sinVal ** 1.5 * amp;
      }
      if (phase < 0.5) {
        const tp = (phase - 0.35) / 0.15;
        return mid - Math.sin(Math.PI * tp) * amp * 0.35;
      }
      return mid;
    };

    const respY = (t: number, channelMid: number, channelH: number): number => {
      const period = 60 / s.respirationRate;
      return (
        channelMid - Math.sin((2 * Math.PI * t) / period) * channelH * 0.38
      );
    };

    let W = canvas.width;
    let H = canvas.height;
    let ecgBuf = new Float32Array(W);
    let spo2Buf = new Float32Array(W);
    let respBuf = new Float32Array(W);

    const initBuffers = () => {
      const { CH1_H, CH2_H } = getSize();
      W = canvas.width;
      H = canvas.height;
      ecgBuf = new Float32Array(W);
      spo2Buf = new Float32Array(W);
      respBuf = new Float32Array(W);
      const ch1Mid = CH1_H / 2;
      const ch2Mid = CH1_H + CH2_H / 2;
      const ch3Mid = CH1_H + CH2_H + CH2_H / 2;
      for (let i = 0; i < W; i++) {
        ecgBuf[i] = ch1Mid;
        spo2Buf[i] = ch2Mid;
        respBuf[i] = ch3Mid;
      }
    };
    initBuffers();

    let rafId: number;

    const draw = (timestamp: number) => {
      const { CH1_H, CH2_H } = getSize();
      const ch1Mid = CH1_H / 2;
      const ch2Mid = CH1_H + CH2_H / 2;
      const ch3Mid = CH1_H + CH2_H + CH2_H / 2;

      const dt =
        s.lastTimestamp > 0
          ? Math.min((timestamp - s.lastTimestamp) / 1000, 0.05)
          : 0.016;
      s.lastTimestamp = timestamp;

      if (!s.frozen) {
        const pixelsToAdvance = Math.round(dt * PIXELS_PER_SECOND);
        const tStart = s.timeElapsed;
        s.timeElapsed += dt;

        for (let i = 0; i < pixelsToAdvance; i++) {
          const t = tStart + (i / pixelsToAdvance) * dt;
          const nx = Math.floor((s.lastScanX + i) % W);
          ecgBuf[nx] = ecgY(t, ch1Mid, CH1_H);
          spo2Buf[nx] = spo2Y(t, ch2Mid, CH2_H);
          respBuf[nx] = respY(t, ch3Mid, CH2_H);
        }
        s.lastScanX = (s.lastScanX + pixelsToAdvance) % W;

        const scanY = ecgBuf[s.lastScanX];
        const isRPeak = scanY < ch1Mid - CH1_H * 0.3;
        const timeSinceBeep = s.timeElapsed - s.lastBeepTime;
        const minBeepInterval = Math.max(0.25, (60 / s.heartRate) * 0.8);

        if (isRPeak && timeSinceBeep > minBeepInterval) {
          s.lastBeepTime = s.timeElapsed;
          if (s.audioEnabled) {
            const ac = getAudioCtx();
            if (ac) playBeep(ac, 880, 0.04);
          }
        }

        const alarmActive = s.spo2 < 90;
        if (alarmActive !== s.alarmActive) {
          s.alarmActive = alarmActive;
          onAlarmChangeRef.current?.(alarmActive);
        }
        if (
          alarmActive &&
          s.audioEnabled &&
          s.timeElapsed - s.lastAlarmBeepTime > 0.5
        ) {
          s.lastAlarmBeepTime = s.timeElapsed;
          const ac = getAudioCtx();
          if (ac) playAlarmBeep(ac);
        }
      }

      const scanX = s.lastScanX;

      offCtx.fillStyle = "rgba(0,0,0,0.07)";
      offCtx.fillRect(0, 0, W, H);

      offCtx.fillStyle = "#000000";
      for (let i = 0; i < ERASER_WIDTH; i++) {
        const ex = (scanX + i) % W;
        offCtx.fillRect(ex, 0, 1, H);
      }

      offCtx.strokeStyle = "rgba(0,255,65,0.07)";
      offCtx.lineWidth = 1;
      offCtx.setLineDash([3, 9]);
      offCtx.beginPath();
      offCtx.moveTo(0, CH1_H);
      offCtx.lineTo(W, CH1_H);
      offCtx.moveTo(0, CH1_H + CH2_H);
      offCtx.lineTo(W, CH1_H + CH2_H);
      offCtx.stroke();
      offCtx.setLineDash([]);

      const drawSegment = (
        buf: Float32Array,
        color: string,
        glowColor: string,
        glowWidth: number,
        lineWidth: number,
      ) => {
        const segLen = Math.min(8, W);
        const startX = (scanX - segLen + W) % W;

        offCtx.save();
        offCtx.strokeStyle = glowColor;
        offCtx.lineWidth = glowWidth;
        offCtx.shadowColor = glowColor;
        offCtx.shadowBlur = 8;
        offCtx.beginPath();
        let first = true;
        for (let i = 0; i <= segLen; i++) {
          const x = (startX + i) % W;
          const y = buf[x];
          if (first) {
            offCtx.moveTo(x, y);
            first = false;
          } else offCtx.lineTo(x, y);
        }
        offCtx.stroke();
        offCtx.restore();

        offCtx.save();
        offCtx.strokeStyle = color;
        offCtx.lineWidth = lineWidth;
        offCtx.beginPath();
        first = true;
        for (let i = 0; i <= segLen; i++) {
          const x = (startX + i) % W;
          const y = buf[x];
          if (first) {
            offCtx.moveTo(x, y);
            first = false;
          } else offCtx.lineTo(x, y);
        }
        offCtx.stroke();
        offCtx.restore();
      };

      drawSegment(ecgBuf, ECG_COLOR, "rgba(0,255,65,0.6)", 4, 1.5);
      drawSegment(spo2Buf, SPO2_COLOR, "rgba(255,255,0,0.5)", 3, 1.5);
      drawSegment(respBuf, RESP_COLOR, "rgba(255,255,255,0.4)", 3, 1.5);

      offCtx.font = '11px "Courier New", monospace';
      offCtx.fillStyle = "rgba(0,255,65,0.5)";
      offCtx.fillText("ECG II", 6, 14);
      offCtx.fillStyle = "rgba(255,255,0,0.5)";
      offCtx.fillText("SpO\u2082", 6, CH1_H + 14);
      offCtx.fillStyle = "rgba(255,255,255,0.5)";
      offCtx.fillText("RESP", 6, CH1_H + CH2_H + 14);

      if (s.alarmActive) {
        const flashAlpha = 0.08 + 0.08 * Math.sin(s.timeElapsed * Math.PI * 4);
        offCtx.fillStyle = `rgba(255,0,0,${flashAlpha})`;
        offCtx.fillRect(0, 0, W, H);
      }

      ctx.clearRect(0, 0, W, H);
      ctx.drawImage(off, 0, 0);

      rafId = requestAnimationFrame(draw);
    };

    rafId = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(rafId);
      audioCtxRef.current?.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={320}
      style={{
        width: "100%",
        height: "100%",
        display: "block",
        background: "#000000",
      }}
    />
  );
}
