"use client";

import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent, ReactNode } from "react";
import { TerminalSquare } from "lucide-react";
import { profile, projects, skills } from "@/lib/data";
import { cn } from "@/utils/cn";

interface HistoryLine {
  id: number;
  input: string;
  output: ReactNode;
}

const AVAILABLE_COMMANDS = [
  "whoami",
  "skills",
  "projects",
  "contact",
  "socials",
  "help",
  "clear",
  "ls",
] as const;

type Command = (typeof AVAILABLE_COMMANDS)[number];

function isCommand(value: string): value is Command {
  return (AVAILABLE_COMMANDS as readonly string[]).includes(value);
}

function OutputLine({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color?: string;
}) {
  return (
    <div className="grid grid-cols-[minmax(0,8rem)_minmax(0,1fr)] gap-3 text-xs sm:text-[13px]">
      <span className="text-muted" style={color ? { color } : undefined}>
        {label}
      </span>
      <span className="text-foreground/90">{value}</span>
    </div>
  );
}

function renderWhoami(): ReactNode {
  return (
    <div className="flex flex-col gap-1.5">
      <OutputLine label="name" value={profile.name} color="#22D3EE" />
      <OutputLine label="title" value={profile.title} />
      <OutputLine label="location" value={profile.location} />
      <OutputLine label="status" value={profile.status} color="#10B981" />
    </div>
  );
}

function renderSkills(): ReactNode {
  return (
    <div className="flex flex-col gap-1.5">
      {skills.map((category) => (
        <OutputLine
          key={category.key}
          label={category.title.toLowerCase()}
          value={`${category.skills.length} · ${category.skills
            .slice(0, 5)
            .map((s) => s.name)
            .join(", ")}${category.skills.length > 5 ? ", …" : ""}`}
        />
      ))}
    </div>
  );
}

function renderProjects(): ReactNode {
  return (
    <div className="flex flex-col gap-1.5">
      {projects.map((project) => (
        <OutputLine
          key={project.slug}
          label={project.slug}
          value={`${project.name} — ${project.tagline}`}
        />
      ))}
      <p className="mt-1 text-[11px] text-muted">
        Open a case study at{" "}
        <code className="rounded bg-foreground/5 px-1">/projects/&lt;slug&gt;</code>
      </p>
    </div>
  );
}

function renderContact(): ReactNode {
  return (
    <div className="flex flex-col gap-1.5">
      <OutputLine label="email" value={profile.email} color="#22D3EE" />
      <OutputLine label="phone" value={profile.phone} />
      <OutputLine label="location" value={profile.location} />
    </div>
  );
}

function renderSocials(): ReactNode {
  return (
    <div className="flex flex-col gap-1.5">
      {profile.socials
        .filter((s) => s.platform !== "location")
        .map((s) => (
          <OutputLine key={s.platform} label={s.platform} value={s.href} />
        ))}
    </div>
  );
}

function renderHelp(): ReactNode {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-xs text-muted">Available commands:</p>
      <div className="flex flex-wrap gap-1.5">
        {AVAILABLE_COMMANDS.map((cmd) => (
          <code
            key={cmd}
            className="rounded border border-[color:var(--color-border)] bg-foreground/5 px-1.5 py-0.5 text-[11px] text-foreground/80"
          >
            {cmd}
          </code>
        ))}
      </div>
      <p className="mt-1 text-[11px] text-muted">
        Try{" "}
        <code className="rounded bg-foreground/5 px-1">whoami</code> or{" "}
        <code className="rounded bg-foreground/5 px-1">projects</code>. Use{" "}
        <kbd className="rounded border border-[color:var(--color-border)] px-1 text-[10px]">
          ↑
        </kbd>{" "}
        for history,{" "}
        <kbd className="rounded border border-[color:var(--color-border)] px-1 text-[10px]">
          Tab
        </kbd>{" "}
        to complete.
      </p>
    </div>
  );
}

function runCommand(raw: string): {
  output: ReactNode;
  clear?: boolean;
} {
  const command = raw.trim().toLowerCase();
  if (!command) return { output: "" };
  switch (command) {
    case "whoami":
      return { output: renderWhoami() };
    case "skills":
      return { output: renderSkills() };
    case "projects":
    case "ls":
      return { output: renderProjects() };
    case "contact":
      return { output: renderContact() };
    case "socials":
      return { output: renderSocials() };
    case "help":
      return { output: renderHelp() };
    case "clear":
      return { output: "", clear: true };
    default:
      return {
        output: (
          <p className="text-xs text-error">
            command not found:{" "}
            <code className="rounded bg-foreground/5 px-1 text-error">
              {raw.trim()}
            </code>
            . type{" "}
            <code className="rounded bg-foreground/5 px-1 text-error">
              help
            </code>{" "}
            for available commands.
          </p>
        ),
      };
  }
}

const INITIAL_HISTORY: HistoryLine[] = [
  {
    id: 0,
    input: "whoami",
    output: renderWhoami(),
  },
];

export function TerminalWidget() {
  const [history, setHistory] = useState<HistoryLine[]>(INITIAL_HISTORY);
  const [value, setValue] = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>(["whoami"]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const nextId = useRef(INITIAL_HISTORY.length);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [history]);

  const submit = (raw: string) => {
    const trimmed = raw.trim();
    if (trimmed) {
      setCmdHistory((h) => [...h, trimmed]);
    }
    const { output, clear } = runCommand(raw);
    if (clear) {
      setHistory([]);
      nextId.current = 0;
    } else {
      const id = nextId.current++;
      setHistory((h) => [...h, { id, input: raw, output }]);
    }
    setValue("");
    setHistoryIndex(-1);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      submit(value);
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const nextIndex =
        historyIndex === -1
          ? cmdHistory.length - 1
          : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setValue(cmdHistory[nextIndex]);
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= cmdHistory.length) {
        setHistoryIndex(-1);
        setValue("");
      } else {
        setHistoryIndex(nextIndex);
        setValue(cmdHistory[nextIndex]);
      }
      return;
    }
    if (e.key === "Tab") {
      e.preventDefault();
      const partial = value.trim().toLowerCase();
      if (!partial) return;
      const matches = AVAILABLE_COMMANDS.filter((c) => c.startsWith(partial));
      if (matches.length === 1) {
        setValue(matches[0]);
      }
      return;
    }
    if (e.key === "l" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      setHistory([]);
      nextId.current = 0;
    }
  };

  const isKnown = isCommand(value.trim().toLowerCase());

  return (
    <div
      role="region"
      aria-label="Interactive terminal"
      className="overflow-hidden rounded-2xl border border-[color:var(--color-border)] bg-[#0b0d12] shadow-[var(--shadow-elevated)]"
    >
      <div className="flex items-center justify-between border-b border-white/5 bg-white/[0.02] px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="flex gap-1.5">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-error/80" />
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-warning/80" />
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-success/80" />
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
            faizan@portfolio · ~/
          </span>
        </div>
        <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
          <TerminalSquare className="h-3 w-3" strokeWidth={2} />
          bash-ish
        </span>
      </div>

      <div
        ref={scrollRef}
        className="h-[380px] overflow-y-auto p-4 font-mono text-xs leading-relaxed sm:text-[13px]"
        onClick={() => inputRef.current?.focus()}
      >
        {history.map((line) => (
          <div key={line.id} className="mb-3 flex flex-col gap-1">
            <div className="flex gap-2">
              <span className="shrink-0 text-primary">$</span>
              <span className="text-foreground/90">{line.input}</span>
            </div>
            {line.output && <div className="pl-4">{line.output}</div>}
          </div>
        ))}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit(value);
          }}
          className="flex items-center gap-2"
        >
          <span aria-hidden="true" className="shrink-0 text-primary">
            $
          </span>
          <input
            ref={inputRef}
            type="text"
            value={value}
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            aria-label="Terminal input"
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            className={cn(
              "w-full bg-transparent text-foreground/90 caret-primary outline-none placeholder:text-muted",
              !isKnown && value.trim().length > 0 && "text-warning",
            )}
            placeholder="type a command (help)"
          />
        </form>
      </div>
    </div>
  );
}
