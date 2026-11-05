import { useEffect, useState } from "react";
import "./preloader.css";

type Phase = "loading" | "leaving" | "done";

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export default function Preloader() {
  const [phase, setPhase] = useState<Phase>(() =>
    prefersReducedMotion() ? "done" : "loading",
  );

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const leaveId = window.setTimeout(() => setPhase("leaving"), 2100);
    const doneId = window.setTimeout(() => setPhase("done"), 3100);

    return () => {
      window.clearTimeout(leaveId);
      window.clearTimeout(doneId);
    };
  }, []);

  useEffect(() => {
    if (phase === "done") return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [phase]);

  if (phase === "done") return null;

  return (
    <div
      className={`preloader ${phase === "leaving" ? "preloader--leaving" : ""}`}
      aria-hidden="true"
    >
      <div className="preloader-stage">
        <div className="preloader-halo" />
        <div className="preloader-ring">
          <svg viewBox="0 0 120 120" aria-hidden="true">
            <circle className="preloader-ring-track" cx="60" cy="60" r="54" />
            <circle className="preloader-ring-arc" cx="60" cy="60" r="54" />
          </svg>
        </div>
        <img className="preloader-logo" src="/icons/isa-wordmark.png" alt="" />
      </div>
    </div>
  );
}
