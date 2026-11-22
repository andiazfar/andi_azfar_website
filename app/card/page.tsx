import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Andi Azfar Arif — Card",
  description: "Quick links to reach Andi Azfar Arif.",
};

const basePath = process.env.PAGES_BASE_PATH ?? "";

// Fill in `href` to show a link. Entries with no href are hidden, not shown as "soon".
const links: { label: string; sub: string; href: string | null; external?: boolean }[] = [
  { label: "Email", sub: "andiazfar@gmail.com", href: "mailto:andiazfar@gmail.com" },
  { label: "Resume", sub: "Google Drive", href: null, external: true },
  { label: "GitHub", sub: "andiazfar", href: "https://github.com/andiazfar", external: true },
  { label: "LinkedIn", sub: "Connect", href: null, external: true },
];

const row =
  "group flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900/40 px-5 py-4 transition-colors hover:border-zinc-600 hover:bg-zinc-900/70 active:bg-zinc-900";

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
        <header className="flex flex-col gap-2">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-500">
            Nice to meet you
          </p>
          <h1 className="text-4xl font-semibold tracking-tight">Andi Azfar Arif</h1>
          <p className="text-lg text-zinc-400">Problem Solving Enjoyer</p>
        </header>

        <a href={`${basePath}/andi-azfar-arif.vcf`} download className="flex items-center justify-between rounded-xl bg-zinc-100 px-5 py-4 text-zinc-900 transition-colors hover:bg-white active:bg-zinc-300">
          <span className="text-base font-medium">Save contact</span>
          <span aria-hidden>&darr;</span>
        </a>

        <nav className="flex flex-col gap-3" aria-label="Links">
          {links
            .filter((l) => l.href)
            .map((l) => (
              <a
                key={l.label}
                href={l.href!}
                {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className={row}
              >
                <span className="flex flex-col">
                  <span className="text-base font-medium tracking-tight">{l.label}</span>
                  <span className="text-sm text-zinc-500">{l.sub}</span>
                </span>
                <span aria-hidden className="text-zinc-600 transition-colors group-hover:text-zinc-300">
                  &rarr;
                </span>
              </a>
            ))}
          <Link href="/" className={row}>
            <span className="flex flex-col">
              <span className="text-base font-medium tracking-tight">Website</span>
              <span className="text-sm text-zinc-500">Projects &amp; more</span>
            </span>
            <span aria-hidden className="text-zinc-600 transition-colors group-hover:text-zinc-300">
              &rarr;
            </span>
          </Link>
        </nav>
      </main>
    </div>
  );
}
