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
const ERASE_MS = 18;
const HOLD_MS = 620;
const GAP_MS = 120;

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
  const current = read();
  for (let i = current.length; i >= 0; i--) {
    if (runRef.current !== run) return false;
    commit(current.slice(0, i));
    await wait(ERASE_MS);
  }
  return true;
}

export default function Typewriter({ className = "" }: { className?: string }) {
  const [text, setText] = useState("");
  const runRef = useRef(0);
  const liveRef = useRef("");

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
      for (let i = 0; i < INTRO.length; i++) {
        if (!(await typeInto(INTRO[i], run, runRef, commit))) return;
        if (i === INTRO.length - 1) return;
        await wait(HOLD_MS);
        if (runRef.current !== run) return;
        if (!(await eraseAll(run, runRef, () => liveRef.current, commit))) return;
        await wait(GAP_MS);
        if (runRef.current !== run) return;
      }
    })();

    return () => {
      runRef.current += 1;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // While the pointer stays on the phrase, keep rotating through all ten.
  const rotate = async (run: number) => {
    while (runRef.current === run) {
      const pool = PHRASES.filter((phrase) => phrase !== liveRef.current);
      const next = pool[Math.floor(Math.random() * pool.length)];

      if (!(await eraseAll(run, runRef, () => liveRef.current, commit))) return;
      if (!(await typeInto(next, run, runRef, commit))) return;
      await wait(HOLD_MS);
    }
  };

  const handleEnter = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    void rotate(++runRef.current);
  };

  const handleLeave = () => {
    const run = ++runRef.current;
    void (async () => {
      if (!(await eraseAll(run, runRef, () => liveRef.current, commit))) return;
      await typeInto(DEFAULT_PHRASE, run, runRef, commit);
    })();
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
