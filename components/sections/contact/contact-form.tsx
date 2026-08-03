"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertTriangle, CheckCircle2, Loader2, Send } from "lucide-react";
import {
  buildMailto,
  contactSchema,
  type ContactApiResponse,
  type ContactInput,
} from "@/lib/contact";
import { profile } from "@/lib/data";
import { cn } from "@/utils/cn";

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "success"; message: string }
  | { kind: "mailto"; message: string; href: string }
  | { kind: "error"; message: string };

export function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      message: "",
      website: "",
    },
    mode: "onBlur",
  });

  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const onSubmit = async (data: ContactInput) => {
    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const body: ContactApiResponse = await res.json();
      if (body.success) {
        setStatus({ kind: "success", message: body.message });
        reset();
        return;
      }
      if (body.reason === "not_configured") {
        const href = buildMailto(data, profile.email);
        setStatus({
          kind: "mailto",
          message:
            "The mail transport isn't set up on this deploy — click below to send from your mail client instead.",
          href,
        });
        return;
      }
      setStatus({
        kind: "error",
        message: body.message ?? "Something went wrong sending your message.",
      });
    } catch {
      const href = buildMailto(data, profile.email);
      setStatus({
        kind: "mailto",
        message:
          "Couldn't reach the send endpoint — click below to send from your mail client instead.",
        href,
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-label="Contact Faizan"
      className="flex flex-col gap-5"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="contact-name"
          label="Name"
          required
          error={errors.name?.message}
        >
          <input
            id="contact-name"
            type="text"
            autoComplete="name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            {...register("name")}
            className={inputClass(!!errors.name)}
            placeholder="Ada Lovelace"
          />
        </Field>
        <Field
          id="contact-email"
          label="Email"
          required
          error={errors.email?.message}
        >
          <input
            id="contact-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            {...register("email")}
            className={inputClass(!!errors.email)}
            placeholder="you@company.com"
          />
        </Field>
      </div>

      <Field
        id="contact-company"
        label="Company"
        hint="Optional — who are you writing on behalf of?"
        error={errors.company?.message}
      >
        <input
          id="contact-company"
          type="text"
          autoComplete="organization"
          aria-invalid={!!errors.company}
          aria-describedby={errors.company ? "contact-company-error" : undefined}
          {...register("company")}
          className={inputClass(!!errors.company)}
          placeholder="Acme Inc."
        />
      </Field>

      <Field
        id="contact-message"
        label="Message"
        required
        error={errors.message?.message}
      >
        <textarea
          id="contact-message"
          rows={6}
          aria-invalid={!!errors.message}
          aria-describedby={
            errors.message ? "contact-message-error" : undefined
          }
          {...register("message")}
          className={cn(
            inputClass(!!errors.message),
            "min-h-[10rem] resize-y",
          )}
          placeholder="A little context helps — role, timeline, or what you're building."
        />
      </Field>

      {/* Honeypot: real users leave this empty. Hidden with proper aria. */}
      <div aria-hidden="true" className="hidden">
        <label htmlFor="contact-website">
          Website
          <input
            id="contact-website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...register("website")}
          />
        </label>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={isSubmitting || status.kind === "sending"}
          className={cn(
            "inline-flex h-11 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-medium text-[#04121a] shadow-[0_10px_30px_-15px_rgba(34,211,238,0.7)] transition-all duration-200 hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          )}
        >
          {status.kind === "sending" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2} />
              Sending…
            </>
          ) : (
            <>
              <Send className="h-4 w-4" strokeWidth={2} />
              Send message
            </>
          )}
        </button>
        <a
          href={buildMailto(getValues(), profile.email)}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-[color:var(--color-border)] px-5 text-sm text-foreground/80 hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          Or open in your mail app
        </a>
      </div>

      <div aria-live="polite" role="status" className="min-h-[1.5rem]">
        {status.kind === "success" && (
          <p className="inline-flex items-center gap-2 text-sm text-success">
            <CheckCircle2 className="h-4 w-4" strokeWidth={2} />
            {status.message}
          </p>
        )}
        {status.kind === "mailto" && (
          <div className="flex flex-wrap items-center gap-3 text-sm text-warning">
            <AlertTriangle className="h-4 w-4" strokeWidth={2} />
            <span>{status.message}</span>
            <a
              href={status.href}
              className="rounded-full border border-warning/40 px-3 py-1 text-xs text-warning hover:bg-warning/10"
            >
              Open mail app
            </a>
          </div>
        )}
        {status.kind === "error" && (
          <p className="inline-flex items-center gap-2 text-sm text-error">
            <AlertTriangle className="h-4 w-4" strokeWidth={2} />
            {status.message}
          </p>
        )}
      </div>
    </form>
  );
}

interface FieldProps {
  id: string;
  label: string;
  hint?: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}

function Field({ id, label, hint, required, error, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="flex items-center gap-2 text-xs font-medium text-foreground/80"
      >
        {label}
        {required && (
          <span aria-hidden="true" className="text-error">
            *
          </span>
        )}
      </label>
      {children}
      {hint && !error && (
        <p className="text-[11px] text-muted">{hint}</p>
      )}
      {error && (
        <p
          id={`${id}-error`}
          className="text-[11px] text-error"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}

function inputClass(hasError: boolean): string {
  return cn(
    "w-full rounded-xl border bg-background/40 px-3.5 py-2.5 text-sm text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.02)] transition-colors placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background",
    hasError
      ? "border-error/60 focus:ring-error"
      : "border-[color:var(--color-border)] focus:border-primary/50",
  );
}
