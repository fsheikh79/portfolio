import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { GeometricAvatar } from "./geometric-avatar";

const AVATAR_FILENAMES = ["avatar.jpg", "avatar.jpeg", "avatar.png", "avatar.webp"];

function resolveAvatar(): string | null {
  const publicDir = path.join(process.cwd(), "public");
  for (const name of AVATAR_FILENAMES) {
    const p = path.join(publicDir, name);
    try {
      if (fs.existsSync(p)) return `/${name}`;
    } catch {
      // fs check failed (permissions, etc.) — treat as missing.
    }
  }
  return null;
}

export function Avatar() {
  const src = resolveAvatar();
  const size = 176;

  const ring = (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-white/10"
    />
  );

  if (src) {
    return (
      <div className="relative">
        <div className="absolute -inset-3 rounded-full bg-gradient-to-br from-primary/25 via-secondary/20 to-highlight/25 blur-xl" />
        <div className="relative overflow-hidden rounded-full border border-white/10 bg-card">
          <Image
            src={src}
            alt="Portrait of Faizan Sheikh"
            width={size}
            height={size}
            priority
            className="h-44 w-44 object-cover"
          />
          {ring}
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="absolute -inset-3 rounded-full bg-gradient-to-br from-primary/25 via-secondary/20 to-highlight/25 blur-xl" />
      <div className="relative rounded-full">
        <GeometricAvatar size={size} />
        {ring}
      </div>
      <p className="mt-3 max-w-[16rem] text-center font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
        Placeholder · drop{" "}
        <code className="rounded bg-foreground/5 px-1 py-0.5 text-foreground/80 normal-case">
          public/avatar.jpg
        </code>{" "}
        to replace
      </p>
    </div>
  );
}
