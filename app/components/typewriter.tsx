"use client";

import { useEffect, useRef, useState } from "react";
import type { RefObject } from "react";

const DEFAULT_PHRASE = "Problem Solving Enjoyer";

// The intro cycles on load and settles on the default.
const INTRO = ["ML Enthusiast", "Product Manager", "Marketing Noob", DEFAULT_PHRASE];

// Hovering rotates through all of these.
const PHRASES = [
  ...INTRO,
  "Coffee-Fuelled Builder",
  "Systems Tinkerer",
  "Data Curious",
  "Automation Nerd",
  "Details Person",
  "Learning in Public",
];

const TYPE_MS = 38;
const ERASE_MS = 14;
const HOLD_MS = 620;
const GAP_MS = 120;
const CHARS_PER_ERASE = 2;
// Hover: how long a phrase stays before the next one while the pointer is still on it,
// and how long the last phrase stays after the pointer leaves before resetting.
const HOVER_HOLD_MS = 2200;
const LEAVE_LINGER_MS = 2000;
const POLL_MS = 100;

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function typeInto(
  target: string,
  run: number,
  runRef: RefObject<number>,
  commit: (value: string) => void
) {
  for (let i = 1; i <= target.length; i++) {
    if (runRef.current !== run) return false;
    commit(target.slice(0, i));
    await wait(TYPE_MS);
  }
  return true;
}

async function eraseAll(
  run: number,
  runRef: RefObject<number>,
  read: () => string,
  commit: (value: string) => void
) {
  let current = read();
  while (current.length > 0) {
    if (runRef.current !== run) return false;
    current = current.slice(0, Math.max(0, current.length - CHARS_PER_ERASE));
    commit(current);
    await wait(ERASE_MS);
  }
  return true;
}

export default function Typewriter({ className = "" }: { className?: string }) {
  const [text, setText] = useState("");
  const runRef = useRef(0);
  const liveRef = useRef("");
  // The intro owns the span; hover is ignored until it finishes.
  const busyRef = useRef(false);
  const hoveredRef = useRef(false);
  // True from the first hover phrase until the reset to the default completes.
  const loopActiveRef = useRef(false);
  const shownAtRef = useRef(0);
  const leftAtRef = useRef(0);

  const commit = (value: string) => {
    liveRef.current = value;
    setText(value);
  };

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const run = ++runRef.current;

    if (reduce) {
      commit(DEFAULT_PHRASE);
      return () => {
        runRef.current += 1;
      };
    }

    (async () => {
      busyRef.current = true;
      for (let i = 0; i < INTRO.length; i++) {
        if (!(await typeInto(INTRO[i], run, runRef, commit))) return;
        if (i === INTRO.length - 1) break;
        await wait(HOLD_MS);
        if (runRef.current !== run) return;
        if (!(await eraseAll(run, runRef, () => liveRef.current, commit))) return;
        await wait(GAP_MS);
        if (runRef.current !== run) return;
      }
      busyRef.current = false;
    })();

    return () => {
      runRef.current += 1;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEnter = () => {
    // The intro owns the span until it finishes.
    if (busyRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    hoveredRef.current = true;
    shownAtRef.current = Date.now();
    // Re-entered while the phrase was still lingering: keep it, cancel the reset.
    if (loopActiveRef.current) return;

    const run = ++runRef.current;
    loopActiveRef.current = true;

    (async () => {
      let finished = true;

      while (true) {
        const pool = PHRASES.filter((phrase) => phrase !== liveRef.current);
        const next = pool[Math.floor(Math.random() * pool.length)];

        if (!(await eraseAll(run, runRef, () => liveRef.current, commit))) { finished = false; break; }
        if (!(await typeInto(next, run, runRef, commit))) { finished = false; break; }
        shownAtRef.current = Date.now();

        // Hold the phrase: while hovered, until it is time for the next one;
        // after the pointer leaves, linger a moment, then reset to the default.
        let leaveAndReset = false;
        while (true) {
          await wait(POLL_MS);
          if (runRef.current !== run) { finished = false; break; }
          const now = Date.now();
          if (hoveredRef.current && now - shownAtRef.current >= HOVER_HOLD_MS) break;
          if (!hoveredRef.current && now - leftAtRef.current >= LEAVE_LINGER_MS) {
            leaveAndReset = true;
            break;
          }
        }
        if (!finished) break;
        if (leaveAndReset) {
          if (await eraseAll(run, runRef, () => liveRef.current, commit)) {
            await typeInto(DEFAULT_PHRASE, run, runRef, commit);
          }
          break;
        }
      }

      loopActiveRef.current = false;
    })();
  };

  const handleLeave = () => {
    hoveredRef.current = false;
    leftAtRef.current = Date.now();
  };

  return (
    <span
      className={`inline-block w-full cursor-default ${className}`}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <span className="sr-only">{DEFAULT_PHRASE}</span>
      <span aria-hidden className="inline-flex h-[1.6em] items-center whitespace-nowrap">
        <span>{text}</span>
        <span className="ml-0.5 inline-block h-[0.9em] w-[2px] translate-y-[0.08em] animate-blink bg-zinc-500 align-middle" />
      </span>
    </span>
  );
}

export { DEFAULT_PHRASE };
