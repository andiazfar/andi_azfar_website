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
const ERASE_MS = 8;
const HOLD_MS = 620;
const GAP_MS = 120;
const CHARS_PER_ERASE = 2;

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
  // A sequence in progress owns the span; hover is ignored until it finishes.
  const busyRef = useRef(false);
  const hoveredRef = useRef(false);

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
    // Mid-sequence: let it finish rather than restarting from scratch.
    if (busyRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    hoveredRef.current = true;
    const run = ++runRef.current;

    (async () => {
      busyRef.current = true;

      while (hoveredRef.current && runRef.current === run) {
        const pool = PHRASES.filter((phrase) => phrase !== liveRef.current);
        const next = pool[Math.floor(Math.random() * pool.length)];

        if (!(await eraseAll(run, runRef, () => liveRef.current, commit))) break;
        if (!(await typeInto(next, run, runRef, commit))) break;
        await wait(HOLD_MS);
      }

      // Pointer left during a phrase: finish it, then settle back to the default.
      if (!hoveredRef.current && runRef.current === run) {
        if (await eraseAll(run, runRef, () => liveRef.current, commit)) {
          await typeInto(DEFAULT_PHRASE, run, runRef, commit);
        }
      }

      busyRef.current = false;
    })();
  };

  const handleLeave = () => {
    hoveredRef.current = false;
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
