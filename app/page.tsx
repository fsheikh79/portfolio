import { profile } from "@/lib/data";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col justify-center gap-8 px-6 py-24">
      <div className="flex flex-col gap-2">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
          Milestone 1 · Foundation
        </span>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          {profile.name}
        </h1>
        <p className="text-lg text-muted">{profile.title}</p>
      </div>

      <p className="text-base leading-relaxed text-foreground/80">
        {profile.intro}
      </p>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {profile.socials.map((social) => (
          <a
            key={social.platform}
            href={social.href}
            className="rounded-xl border border-white/10 bg-card/60 px-4 py-3 text-sm text-foreground/90 transition-colors hover:border-primary/50 hover:text-primary"
          >
            <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
              {social.label}
            </span>
            <span className="mt-1 block truncate">{social.value}</span>
          </a>
        ))}
      </div>

      <p className="font-mono text-xs text-muted">
        Scaffold verified. Next milestone → design system + layout.
      </p>
    </main>
  );
}
