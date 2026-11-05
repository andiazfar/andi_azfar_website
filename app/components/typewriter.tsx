"use client";

import { useEffect, useRef, useState } from "react";
import type { RefObject } from "react";

const DEFAULT_PHRASE = "Problem Solving Enjoyer";

// The intro cycles on load and settles on the default.
const INTRO = ["ML Enthusiast", "Product Manager", "Marketing Noob", DEFAULT_PHRASE];

// After load, hovering picks one of these at random.
const PHRASES = [
  ...INTRO,
  "Coffee-Fuelled Builder",
  "Systems Tinkerer",
  "Data Curious",
  "Automation Nerd",
  "Details Person",
  "Learning in Public",
];

const TYPE_MS = 62;
const ERASE_MS = 30;
const HOLD_MS = 1150;
const GAP_MS = 260;

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
    const run = ++runRef.current;

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
    // Runs once on mount; commit is stable enough for the lifetime of the component.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cycleTo = async (target: string) => {
    const run = ++runRef.current;
    if (!(await eraseAll(run, runRef, () => liveRef.current, commit))) return;
    await typeInto(target, run, runRef, commit);
  };

  const handleSurprise = () => {
    const pool = PHRASES.filter((phrase) => phrase !== liveRef.current);
    const next = pool[Math.floor(Math.random() * pool.length)];
    void cycleTo(next);
  };

  const handleReset = () => {
    if (liveRef.current === DEFAULT_PHRASE) return;
    void cycleTo(DEFAULT_PHRASE);
  };

  return (
    <span
      className={className}
      onMouseEnter={handleSurprise}
      onMouseLeave={handleReset}
      onFocus={handleSurprise}
      onBlur={handleReset}
    >
      <span className="sr-only">{DEFAULT_PHRASE}</span>
      <span aria-hidden>
        <span>{text}</span>
        <span className="ml-0.5 inline-block h-[0.9em] w-[2px] translate-y-[0.08em] animate-blink bg-zinc-500 align-middle" />
      </span>
    </span>
  );
}

export { DEFAULT_PHRASE };
