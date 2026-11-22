import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Andi Azfar Arif — Card",
  description: "Quick links to reach Andi Azfar Arif.",
};

// Order on the page. Entries with no href are hidden until a URL is filled in.
const links: { label: string; sub: string; href: string | null }[] = [
  { label: "LinkedIn", sub: "andi-azfar-arif", href: "https://www.linkedin.com/in/andi-azfar-arif/" },
  { label: "GitHub", sub: "andiazfar", href: "https://github.com/andiazfar" },
];

const row =
  "group flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900/40 px-5 py-4 transition-colors hover:border-zinc-600 hover:bg-zinc-900/70 active:bg-zinc-900";

const arrow = (
  <span aria-hidden className="text-zinc-600 transition-colors group-hover:text-zinc-300">
    &rarr;
  </span>
);

export default function CardPage() {
  return (
    <div className="relative min-h-dvh overflow-hidden bg-[#08090a] text-zinc-100">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(40rem 30rem at 50% -10%, rgba(120,140,180,0.14), transparent 70%)",
        }}
      />
      <main className="relative mx-auto flex w-full max-w-md flex-col gap-8 px-6 py-14">
        <Link
          href="/"
          className="inline-flex w-fit items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-white"
        >
          <span aria-hidden>&larr;</span>
          Back to main page
        </Link>
        <nav className="flex flex-col gap-3" aria-label="Links">
          {links
            .filter((l) => l.href)
            .map((l) => (
              <a
                key={l.label}
                href={l.href!}
                target="_blank"
                rel="noopener noreferrer"
                className={row}
              >
                <span className="flex flex-col">
                  <span className="text-base font-medium tracking-tight">{l.label}</span>
                  <span className="text-sm text-zinc-500">{l.sub}</span>
                </span>
                {arrow}
              </a>
            ))}
          <Link href="/" className={row}>
            <span className="flex flex-col">
              <span className="text-base font-medium tracking-tight">Website</span>
              <span className="text-sm text-zinc-500">Projects &amp; more</span>
            </span>
            {arrow}
          </Link>
        </nav>
      </main>
    </div>
  );
}
