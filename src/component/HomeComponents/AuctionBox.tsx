import { useEffect, useState, useRef } from "react";

export default function AuctionCircle({ duration = 5 }) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [started, setStarted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const radius = 70;
  const circumference = 2 * Math.PI * radius;

  // Preload audio
  useEffect(() => {
    audioRef.current = new Audio("/ding-sound-effect_2.mp3");
    audioRef.current.preload = "auto";
  }, []);

  // Start auction when button clicked
  const startAuction = () => {
    setStarted(true);
    startTimeRef.current = Date.now();
    updateTime();
  };

  // Smooth timer update
  const updateTime = () => {
    if (startTimeRef.current === null) return;
    const elapsed = (Date.now() - startTimeRef.current) / 1000;
    const newTimeLeft = Math.max(duration - elapsed, 0);
    setTimeLeft(newTimeLeft);

    if (elapsed < duration) {
      animationFrameRef.current = requestAnimationFrame(updateTime);
    } else {
      // play sound at 0
      if (audioRef.current) audioRef.current.play().catch(() => {});
    }
  };

  useEffect(() => {
    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const safeTimeLeft = Math.max(timeLeft, 0);

  // Smooth fraction progress (0 → 1)
  const elapsed = duration - safeTimeLeft;
  const fraction = Math.min(elapsed / duration, 1);
  const progress = fraction * circumference;

  return (
    <div className="auction-circle">
      <svg width="160" height="160">
        <circle className="bg-circle" cx="80" cy="80" r={radius} strokeWidth="8" />
        <circle
          className="progress-circle"
          cx="80"
          cy="80"
          r={radius}
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
        />
      </svg>

      <div className="circle-content">
        <h3>Auction</h3>
        <p>Highest Bid: $500</p>
        <p>{Math.ceil(safeTimeLeft)}s</p>

        {!started && (
          <button
            onClick={startAuction}
            style={{
              marginTop: "10px",
              padding: "8px 16px",
              fontSize: "16px",
              borderRadius: "6px",
              cursor: "pointer"
            }}
          >
            Start Auction
          </button>
        )}
      </div>
    </div>
  );
}



